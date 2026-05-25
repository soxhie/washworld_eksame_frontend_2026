"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../../components/layout/AppHeader";
import BottomNav from "../../components/layout/BottomNav";
import MembershipCard from "./components/MembershipCard";
import NearbyHalls from "./components/NearbyHalls";
import RecentWashes from "./components/RecentWashes";
import BackButton from "../../components/layout/BackButton";

type WashWorldLocation = {
  id: string;
  name: string;
  address: string;
  position: [number, number];
  openHours?: string;
  message?: string;
};

type NearbyHall = WashWorldLocation & {
  status: "Travlt" | "Ledig" | "Fyldt";
  waitTime: string;
  distance: string;
  distanceKm: number;
};

const DEFAULT_POSITION: [number, number] = [55.6761, 12.5683];

const recentWashes = [
  { id: "1", location: "Wash World Søborg", time: "I går, 18:42", plan: "Guld" },
  { id: "2", location: "Wash World Søborg", time: "27 april 2026, 10:22", plan: "Guld" },
  { id: "3", location: "Wash World Søborg", time: "29 april 2026, 16:29", plan: "Guld" },
];

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function getDistanceKm(from: [number, number], to: [number, number]) {
  const earthRadiusKm = 6371;
  const deltaLatitude = toRadians(to[0] - from[0]);
  const deltaLongitude = toRadians(to[1] - from[1]);
  const latitude1 = toRadians(from[0]);
  const latitude2 = toRadians(to[0]);

  const a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) + Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2) * Math.cos(latitude1) * Math.cos(latitude2);

  return 2 * earthRadiusKm * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(distanceKm: number) {
  return distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m` : `${distanceKm.toFixed(1)} km`;
}

const MOCK_STATUSES: NearbyHall["status"][] = ["Travlt", "Ledig", "Fyldt"];
const MOCK_WAIT_TIMES: Record<NearbyHall["status"], string> = {
  Travlt: "Ca. 10 min ventetid",
  Ledig: "Klar nu",
  Fyldt: "Ca. 25 min ventetid",
};

function getMockQueueData(location: WashWorldLocation): Pick<NearbyHall, "status" | "waitTime"> {
  // Derive a stable index from the location id so the same hall always shows the same mock status
  const seed = [...location.id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const status = MOCK_STATUSES[seed % MOCK_STATUSES.length]!;
  return { status, waitTime: MOCK_WAIT_TIMES[status] };
}

function getBrowserPosition(): Promise<[number, number]> {
  if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
    return Promise.resolve(DEFAULT_POSITION);
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve([position.coords.latitude, position.coords.longitude]),
      () => resolve(DEFAULT_POSITION),
      {
        enableHighAccuracy: true,
        maximumAge: 15000,
        timeout: 10000,
      },
    );
  });
}

export default function WashPage() {
  const router = useRouter();
  const [nearbyHalls, setNearbyHalls] = useState<NearbyHall[]>([]);
  const [selectedHallId, setSelectedHallId] = useState<string | null>(null);
  const [isLoadingHalls, setIsLoadingHalls] = useState(true);
  const [hallError, setHallError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadNearbyHalls() {
      try {
        const [response, currentPosition] = await Promise.all([fetch("/api/washworld-locations"), getBrowserPosition()]);

        if (!response.ok) {
          throw new Error("Kunne ikke hente Wash World lokationer.");
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Uventet format fra Wash World lokationer.");
        }

        const parsedHalls = (data as WashWorldLocation[])
          .filter((location) => location.id && location.name && location.address && Array.isArray(location.position) && location.position.length === 2)
          .map((location) => {
            const distanceKm = getDistanceKm(currentPosition, location.position);
            const queueData = getMockQueueData(location);

            return {
              ...location,
              ...queueData,
              distanceKm,
              distance: formatDistance(distanceKm),
            };
          })
          .sort((left, right) => left.distanceKm - right.distanceKm)
          .slice(0, 3);

        if (!isActive) {
          return;
        }

        setNearbyHalls(parsedHalls);
        setSelectedHallId((current) => current ?? parsedHalls[0]?.id ?? null);
        setHallError(parsedHalls.length > 0 ? null : "Ingen vaskehaller blev fundet.");
      } catch (error) {
        if (!isActive) {
          return;
        }

        setNearbyHalls([]);
        setHallError(error instanceof Error ? error.message : "Kunne ikke hente Wash World lokationer.");
      } finally {
        if (isActive) {
          setIsLoadingHalls(false);
        }
      }
    }

    void loadNearbyHalls();

    return () => {
      isActive = false;
    };
  }, []);

  const selectedHall = useMemo(() => {
    if (nearbyHalls.length === 0) {
      return null;
    }

    return nearbyHalls.find((hall) => hall.id === selectedHallId) ?? nearbyHalls[0];
  }, [nearbyHalls, selectedHallId]);

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 100, background: "#000" }}>
      <AppHeader variant="brand" />
      <div style={{ padding: "0 18px" }}>
        <BackButton />
        {selectedHall ? (
          <MembershipCard
            package="brilliant"
            location={selectedHall.name}
            address={selectedHall.address}
            queueStatus={selectedHall.status}
            waitTime={selectedHall.waitTime}
            isFavorite={isFavorite}
            onFavoriteToggle={() => setIsFavorite((prev) => !prev)}
            onStart={() => router.push("/pages/wash/activewash")}
            onSwitch={() => {
              if (nearbyHalls.length < 2) {
                return;
              }

              const currentIndex = nearbyHalls.findIndex((hall) => hall.id === selectedHall.id);
              const nextHall = nearbyHalls[(currentIndex + 1) % nearbyHalls.length] ?? nearbyHalls[0];

              if (nextHall) {
                setSelectedHallId(nextHall.id);
              }
            }}
          />
        ) : (
          <section style={{ marginTop: 10, border: "1px solid #07de88", background: "#015126", padding: "14px 12px 18px" }}>
            <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, lineHeight: 1.1 }}>Medlemskab</h1>
            <p style={{ margin: "6px 0 0", color: "#08e184", fontSize: 14, fontWeight: 700 }}>
              {isLoadingHalls ? "Henter de nærmeste vaskehaller..." : (hallError ?? "Ingen vaskehaller tilgængelige.")}
            </p>
          </section>
        )}
        <NearbyHalls
          halls={nearbyHalls}
          onSwitch={(id) => {
            setSelectedHallId(id);
          }}
        />
        <RecentWashes washes={recentWashes} />
      </div>
      <BottomNav activeTab="wash" variant="angled" />
    </main>
  );
}
