"use client";

import dynamic from "next/dynamic";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LuLocateFixed, LuSearch, LuSlidersHorizontal, LuX } from "react-icons/lu";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import "./dashboard.css";
import AppHeader from "../../components/layout/AppHeader";
import BottomNav from "../../components/layout/BottomNav";
import SwipeToStart from "../../components/SwipeToStart/SwipeToStart";
import mockDashboardData from "./data/mockDashboardData";
import MembershipCard from "../wash/components/MembershipCard";

const LiveWashMap = dynamic(() => import("./components/LiveWashMap"), {
  ssr: false,
  loading: () => <div className="mapLoading">Indlaeser kort...</div>,
});

type WashLocation = {
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

type TrafficDay = {
  time: string;
  level: number;
  active?: boolean;
};

const ACTIVITY_WEEKDAYS = ["MAN", "TIR", "ONS", "TOR", "FRE", "LØR", "SØN"];

function getWeekdayIndex(date = new Date()) {
  const jsDay = date.getDay();
  return (jsDay + 6) % 7;
}

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/ae/g, "æ")
    .replace(/oe/g, "ø")
    .replace(/aa/g, "å")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const MAX_TRAFFIC_LEVEL = 94;

function buildTrafficData(selectedLocation: WashLocation | undefined, selectedDayIndex: number, todayIndex: number): TrafficDay[] {
  if (!selectedLocation) {
    return [];
  }

  const busyBoost = selectedLocation.message ? 12 : 0;
  const regionBoost = selectedLocation.regionName?.toLowerCase().includes("hoved") ? 6 : 0;
  const dayPatternBoost = [2, 0, 4, 7, 12, 15, 10][selectedDayIndex] ?? 0;
  const dayShift = (selectedDayIndex * 2) % 14;
  const currentHour = new Date().getHours();
  const isToday = selectedDayIndex === todayIndex;
  const timeSlots = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"];
  const baseLevels = [28, 40, 52, 63, 71, 69, 60, 66, 77, 78, 57, 48, 33, 37];

  const levels = timeSlots.map((_, index) => {
    const shifted = baseLevels[(index + dayShift) % baseLevels.length] ?? 35;
    return Math.min(MAX_TRAFFIC_LEVEL, shifted + busyBoost + regionBoost + dayPatternBoost);
  });

  return timeSlots.map((time, index) => ({
    time,
    level: levels[index],
    active: isToday && Number.parseInt(time, 10) === currentHour,
  }));
}

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState<WashLocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);
  const [locateRequestCount, setLocateRequestCount] = useState(1);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedActivityDayIndex, setSelectedActivityDayIndex] = useState(() => getWeekdayIndex());

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/pages/login");
      return;
    }
    fetch("/api/washworld-locations", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (res.status === 401) {
          localStorage.removeItem("access_token");
          router.push("/pages/login");
          return;
        }
        if (!res.ok) {
          throw new Error("Kunne ikke hente Wash World lokationer.");
        }

        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) return;

        const parsed: WashLocation[] = data;
        setLocations(parsed);
        const soeborg = parsed.find((loc) => loc.name.toLowerCase().includes("søborg"));
        setSelectedLocationId(soeborg?.id ?? null);
        setIsLocationSheetOpen(false);
        setLoadError(parsed.length === 0 ? "Ingen Wash World lokationer fundet." : null);
      })
      .catch((error: unknown) => {
        setLoadError(error instanceof Error ? error.message : "Kunne ikke hente Wash World lokationer.");
      });
  }, [router]);

  const filteredLocations = useMemo(() => {
    const normalizedQuery = normalizeSearchText(searchQuery);
    if (!normalizedQuery) return locations;

    return locations.filter((location) => {
      const haystack = normalizeSearchText(`${location.name} ${location.address}`);
      return haystack.includes(normalizedQuery);
    });
  }, [searchQuery, locations]);

  const selectedLocation = filteredLocations.find((location) => location.id === selectedLocationId);
  const todayActivityDayIndex = useMemo(() => getWeekdayIndex(), []);
  const trafficData = useMemo(() => buildTrafficData(selectedLocation, selectedActivityDayIndex, todayActivityDayIndex), [selectedLocation, selectedActivityDayIndex, todayActivityDayIndex]);
  const averageActivityLevel = useMemo(() => {
    if (trafficData.length === 0) {
      return 0;
    }

    const total = trafficData.reduce((sum, item) => sum + item.level, 0);
    return Math.round(total / trafficData.length);
  }, [trafficData]);
  const activitySummary = averageActivityLevel > 72 ? "Travlt" : averageActivityLevel > 56 ? "Lidt travlt" : "Stille og roligt";
  const openingHoursLabel = selectedLocation?.openHours ?? "7-22";
  const membershipName = (mockDashboardData.user.membershipTier ?? "").replace(/^Medlemskab:\s*/i, "").trim() || "Standard";

  useEffect(() => {
    if (!isLocationSheetOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLocationSheetOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLocationSheetOpen]);

  return (
    <main className={isLocationSheetOpen ? "DashboardPage DashboardPageSheetOpen" : "DashboardPage"}>
      <AppHeader variant="brand" />

      <section className={isLocationSheetOpen ? "mapSection" : "mapSection mapSectionFullscreen"} aria-label="Wash World kort">
        <div className="mapSearchBar">
          <LuSearch aria-hidden="true" className="mapSearchIcon" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search locations" // Ændre til Søg vaskehaller
            className="mapSearchInput"
            aria-label="Soeg efter vaskehal"
          />
          {/* <button type="button" className="mapSearchButton" aria-label="Filtrer kort">
            <LuSlidersHorizontal aria-hidden="true" />
          </button> */}
        </div>

        <div className={isLocationSheetOpen ? "mapCanvasWrap" : "mapCanvasWrap mapCanvasWrapFullscreen"}>
          <LiveWashMap
            locations={filteredLocations}
            selectedLocationId={selectedLocationId ?? undefined}
            onSelectLocation={(locationId) => {
              setSelectedLocationId(locationId);
              setIsLocationSheetOpen(true);
              setIsFavorite(false);
            }}
            locateRequestCount={locateRequestCount}
          />

          {loadError ? <p className="mapErrorBanner">{loadError}</p> : null}

          <button type="button" className="locateButton" aria-label="Find min position" onClick={() => setLocateRequestCount((count) => count + 1)}>
            <LuLocateFixed aria-hidden="true" />
          </button>
        </div>

        {selectedLocation && isLocationSheetOpen ? (
<section className="locationSheet" aria-label="Valgt vaskehal">
  <div className="locationSheetHeaderRow">
    <button
      type="button"
      className="sheetSecondaryButton sheetIconButton sheetTopCloseButton"
      aria-label="Luk detaljer"
      onClick={() => setIsLocationSheetOpen(false)}
    >
      <LuX aria-hidden="true" />
    </button>
    <p className="locationSheetHeaderName">{selectedLocation.name}</p>
    <p className="locationSheetHeaderOpen">Åbent - {openingHoursLabel}</p>
  </div>

  <div className="locationSheetScrollable">

            {selectedLocation.message ? (
              <p className="locationAlert locationAlertTop" role="status">
                {selectedLocation.message}
              </p>
            ) : null}

            {/* <section className="membershipPanel" aria-label="Start vask sektion">
              <div className="membershipTopRow">
                <div>
                  <p className="membershipTitle">Medlemskab</p>
                  <p className="membershipTier">{membershipName}</p>
                  <p className="membershipBrand">Wash world</p>
                  <p className="membershipLocation">{selectedLocation.address}</p>
                </div>

                <button
                  type="button"
                  className={isFavorite ? "favoriteButton favoriteButtonActive" : "favoriteButton"}
                  onClick={() => setIsFavorite((prev) => !prev)}
                  aria-label={isFavorite ? "Fjern fra favoritter" : "Tilfoej til favoritter"}
                  aria-pressed={isFavorite}
                >
                  {isFavorite ? <IoHeart aria-hidden="true" /> : <IoHeartOutline aria-hidden="true" />}
                </button>
              </div>

              <div className="membershipSwipeWrap">
                <SwipeToStart label="Start din vask" flush onComplete={() => router.push("/pages/wash/washprogrampremium")} />
              </div>
            </section> */}
            <MembershipCard
              package="premium"
              location={selectedLocation.name}
              address={selectedLocation.address}
              isFavorite={isFavorite}
              onFavoriteToggle={() => setIsFavorite((prev) => !prev)}
              onStart={() => router.push("/pages/wash/activewash")}
              onSwitch={() => setIsLocationSheetOpen(false)}
              variant="dashboard"
            />

            <section className="activityPanel" aria-label="Aktivitet for valgt vaskehal">
              <div className="activityWeekdays" role="tablist" aria-label="Vaelg dag">
                {ACTIVITY_WEEKDAYS.map((weekday, index) => {
                  const isActiveDay = index === selectedActivityDayIndex;
                  return (
                    <button
                      key={weekday}
                      type="button"
                      role="tab"
                      aria-selected={isActiveDay}
                      className={isActiveDay ? "activityWeekdayButton isActive" : "activityWeekdayButton"}
                      onClick={() => setSelectedActivityDayIndex(index)}
                    >
                      {weekday}
                    </button>
                  );
                })}
              </div>

              <p className="activityStatus">
                <span className="activityDot" aria-hidden="true" />
                <strong>{selectedActivityDayIndex === todayActivityDayIndex ? "Nu:" : `${ACTIVITY_WEEKDAYS[selectedActivityDayIndex]}:`}</strong>{" "}
                {(() => {
                  const now = new Date();
                  const hour = now.getHours();
                  if (selectedActivityDayIndex === todayActivityDayIndex && (hour < 7 || hour >= 22)) {
                    return "Lukket";
                  }
                  return activitySummary;
                })()}
              </p>

              <div className="popularTimesChart" aria-label="Travlhed fordelt paa timer">
                {trafficData.map((item) => (
                  <div key={item.time} className={item.active ? "popularTimesColumnWrap isActive" : "popularTimesColumnWrap"}>
                    <div className="popularTimesColumnTrack" aria-hidden="true">
                      <span className={item.active ? "popularTimesColumn popularTimesColumnActive" : "popularTimesColumn"} style={{ height: `${(item.level / MAX_TRAFFIC_LEVEL) * 100}%` }} />
                    </div>
                    <span className="popularTimesHour">{Number.parseInt(item.time, 10) % 3 === 0 ? `${item.time}` : ""}</span>
                  </div>
                ))}
              </div>
            </section>
            {/* Hall details section */}
            {selectedLocation.hallsCount || selectedLocation.selfWashCount || selectedLocation.vacuumCount || selectedLocation.preWashCount || selectedLocation.maxHeight ? (
              <section
                className="hallDetailsPanel"
                aria-label="Hal detaljer"
                style={{ marginTop: 15, padding: 16, background: "linear-gradient(180deg, rgba(41, 42, 45, 0.9) 0%, rgba(35, 36, 39, 0.9) 100%)" }}
              >
                <h3 style={{ margin: 0, fontSize: 18 }}>Hal detaljer</h3>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: 15 }}>
                  <li>
                    <strong>Antal vaskehaller:</strong> {selectedLocation.hallsCount ?? "-"}
                  </li>
                  <li>
                    <strong>Antal selvvask:</strong> {selectedLocation.selfWashCount ?? "-"}
                  </li>
                  <li>
                    <strong>Antal støvsugere:</strong> {selectedLocation.vacuumCount ?? "-"}
                  </li>
                  <li>
                    <strong>Antal forvask:</strong> {selectedLocation.preWashCount ?? "-"}
                  </li>
                  <li>
                    <strong>Maks. højde:</strong> {selectedLocation.maxHeight ?? "-"}
                  </li>
                </ul>
              </section>
            ) : (
              <section className="hallDetailsPanel" aria-label="Hal detaljer" style={{ marginTop: 24, padding: 16, background: "#232323", color: "#bbb", textAlign: "center" }}>
                <span>Ingen haldetaljer fundet for denne lokation.</span>
              </section>
            )}

           </div>

          </section>
        ) : null}
      </section>

      <BottomNav activeTab="dashboard" variant="angled" />
    </main>
  );
}
