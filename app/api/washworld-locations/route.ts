import { NextResponse } from "next/server";

type WashWorldApiLocation = {
  uid?: string;
  Location_id?: string;
  name?: string;
  address?: string;
  open_hours?: string;
  message?: string;
  region_name?: string;
  halls_count?: number;
  skip_count?: number;
  service_units?: {
    self_wash?: { total_count?: number };
    vacuum?: { total_count?: number };
    pre_wash?: { total_count?: number };
  };
  max_height?: string;
  image?: string | false;
  hidden?: number;
  coordinates?: {
    x?: string | number;
    y?: string | number;
  };
};

type NormalizedLocation = {
  id: string;
  name: string;
  address: string;
  position: [number, number];
  openHours?: string;
  message?: string;
  regionName?: string;
  hallsCount?: number;
  selfWashCount?: number;
  vacuumCount?: number;
  preWashCount?: number;
  maxHeight?: string;
  imageUrl?: string;
};

// Helper function to convert coordinate values to numbers, handling both string and number inputs and filtering out invalid values
// Wash World's API is inconsistent with its coordinate formats, so we need to be flexible in parsing them while ensuring we end up with valid numbers or null
// We consider a value valid if it can be parsed into a finite number. Invalid values (like non-numeric strings, null, undefined, or non-finite numbers) will be normalized to null to indicate missing/invalid coordinates.
function toNumber(value: string | number | undefined) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value === "string") {
    const normalized = value.replace(",", ".").trim();
    const parsed = Number.parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

// Normalize the API response to ensure we have consistent data and filter out invalid entries
// We require at least a name, address, and valid coordinates to consider a location valid
function normalizeLocation(location: WashWorldApiLocation): NormalizedLocation | null {
  const latitude = toNumber(location.coordinates?.y);
  const longitude = toNumber(location.coordinates?.x);

  if (!location.name || !location.address || latitude === null || longitude === null) {
    return null;
  }

  return {
    id: location.uid || location.Location_id || location.name,
    name: location.name.includes(" - ") ? `Wash World ${location.name.split(" - ")[0]}` : location.name,
    address: location.address,
    position: [latitude, longitude],
    openHours: location.open_hours,
    message: location.message || undefined,
    regionName: location.region_name || undefined,
    hallsCount: location.halls_count,
    selfWashCount: location.service_units?.self_wash?.total_count,
    vacuumCount: location.service_units?.vacuum?.total_count,
    preWashCount: location.service_units?.pre_wash?.total_count,
    maxHeight: location.max_height || undefined,
    imageUrl: typeof location.image === "string" ? location.image : undefined,
  };
}

// Cache for 1 hour since locations don't change often and API is slow
// Revalidate on error after 5 minutes to avoid long downtime if API is down
// Note: This is a server component, so we can use NextResponse and fetch directly
// We are fetching from Wash World's public API, so CORS is not an issue and we can keep the API key hidden if needed

export async function GET() {
  try {
    const response = await fetch("https://headless.washworld.dk/wp-json/ww/v1/locations", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch Wash World locations" }, { status: 502 });
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      return NextResponse.json({ error: "Unexpected Wash World response format" }, { status: 502 });
    }

    const locations = data.map((location) => normalizeLocation(location as WashWorldApiLocation)).filter((location): location is NormalizedLocation => location !== null);

    return NextResponse.json(locations);
  } catch {
    return NextResponse.json({ error: "Unable to load Wash World locations" }, { status: 500 });
  }
}
