"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { LuClock3, LuLocateFixed, LuSearch, LuSlidersHorizontal, LuX } from "react-icons/lu";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import "./dashboard.css";
import AppHeader from "../../components/layout/AppHeader";
import BottomNav from "../../components/layout/BottomNav";
import SwipeToStart from "../../components/SwipeToStart/SwipeToStart";
import mockDashboardData from "./data/mockDashboardData";

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

function buildTrafficData(selectedLocation: WashLocation | undefined): TrafficDay[] {
  if (!selectedLocation) {
    return [];
  }

  const busyBoost = selectedLocation.message ? 12 : 0;
  const regionBoost = selectedLocation.regionName?.toLowerCase().includes("hoved") ? 6 : 0;
  const currentHour = new Date().getHours();
  const timeSlots = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"];
  const levels = [28, 40, 52, 63, 71, 69, 60, 66, 77, 78, 57, 48, 33, 37].map((base) => Math.min(MAX_TRAFFIC_LEVEL, base + busyBoost + regionBoost));

  return timeSlots.map((time, index) => ({
    time,
    level: levels[index],
    active: Number.parseInt(time, 10) === currentHour,
  }));
}


export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState<WashLocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [isLocationSheetOpen, setIsLocationSheetOpen] = useState(false);
  const [locateRequestCount, setLocateRequestCount] = useState(1);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [busyView, setBusyView] = useState<"open" | "busy">("open");

  useEffect(() => {
    fetch("/api/washworld-locations")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Kunne ikke hente Wash World lokationer.");
        }

        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) return;

        const parsed: WashLocation[] = data;
        setLocations(parsed);
        setSelectedLocationId(null);
        setIsLocationSheetOpen(false);
        setLoadError(parsed.length === 0 ? "Ingen Wash World lokationer fundet." : null);
      })
      .catch((error: unknown) => {
        setLoadError(error instanceof Error ? error.message : "Kunne ikke hente Wash World lokationer.");
      });
  }, []);

  const filteredLocations = useMemo(() => {
    const normalizedQuery = normalizeSearchText(searchQuery);
    if (!normalizedQuery) return locations;

    return locations.filter((location) => {
      const haystack = normalizeSearchText(`${location.name} ${location.address}`);
      return haystack.includes(normalizedQuery);
    });
  }, [searchQuery, locations]);

  const hasVaryingOpenHours = useMemo(() => {
    const uniqueHours = new Set(
      locations
        .map((location) => location.openHours?.trim())
        .filter((hours): hours is string => Boolean(hours)),
    );

    return uniqueHours.size > 1;
  }, [locations]);

  const selectedLocation = filteredLocations.find((location) => location.id === selectedLocationId);
  const trafficData = useMemo(() => buildTrafficData(selectedLocation), [selectedLocation]);
  const openingHoursLabel = selectedLocation?.openHours ?? "7-22";
  const membershipName = (mockDashboardData.user.membershipTier ?? "")
    .replace(/^Medlemskab:\s*/i, "")
    .trim() || "Standard";

  const resetDetailInteractions = () => {
    setBusyView("open");
  };

  useEffect(() => {
    if (!isLocationSheetOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLocationSheetOpen(false);
        resetDetailInteractions();
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
            placeholder="Search locations"
            className="mapSearchInput"
            aria-label="Soeg efter vaskehal"
          />
          <button type="button" className="mapSearchButton" aria-label="Filtrer kort">
            <LuSlidersHorizontal aria-hidden="true" />
          </button>
        </div>

        <div className={isLocationSheetOpen ? "mapCanvasWrap" : "mapCanvasWrap mapCanvasWrapFullscreen"}>
          <LiveWashMap
            locations={filteredLocations}
            selectedLocationId={selectedLocationId ?? undefined}
            onSelectLocation={(locationId) => {
              setSelectedLocationId(locationId);
              setIsLocationSheetOpen(true);
              setIsFavorite(false);
              resetDetailInteractions();
            }}
            locateRequestCount={locateRequestCount}
          />

          {loadError ? <p className="mapErrorBanner">{loadError}</p> : null}

          <button
            type="button"
            className="locateButton"
            aria-label="Find min position"
            onClick={() => setLocateRequestCount((count) => count + 1)}
          >
            <LuLocateFixed aria-hidden="true" />
          </button>
        </div>

        {selectedLocation && isLocationSheetOpen ? (
          <section className="locationSheet" aria-label="Valgt vaskehal">
            <button
              type="button"
              className="sheetSecondaryButton sheetIconButton sheetTopCloseButton"
              aria-label="Luk detaljer"
              onClick={() => {
                setIsLocationSheetOpen(false);
                resetDetailInteractions();
              }}
            >
              <LuX aria-hidden="true" />
            </button>

            <div className="locationSheetTop">
              <div className="locationSheetMain">
                <p className="locationSheetEyebrow">Valgt vaskehal</p>
                <h1>{selectedLocation.name}</h1>
                <p className="locationSheetAddress">{selectedLocation.address}</p>

                {selectedLocation.message ? (
                  <p className="locationAlert locationAlertTop" role="status">
                    {selectedLocation.message}
                  </p>
                ) : null}
              </div>

              <div className="locationSheetSide">
                <button
                  type="button"
                  className={isFavorite ? "favoriteButton favoriteButtonActive" : "favoriteButton"}
                  onClick={() => setIsFavorite((prev) => !prev)}
                  aria-label={isFavorite ? "Fjern fra favoritter" : "Tilfoej til favoritter"}
                  aria-pressed={isFavorite}
                >
                  {isFavorite ? <IoHeart aria-hidden="true" /> : <IoHeartOutline aria-hidden="true" />}
                </button>

                {selectedLocation.imageUrl ? (
                  <Image
                    src={selectedLocation.imageUrl}
                    alt={selectedLocation.name}
                    className="locationThumb"
                    width={84}
                    height={84}
                    sizes="84px"
                  />
                ) : null}
              </div>
            </div>

            <section className="membershipPanel" aria-label="Dit medlemskab">
              <p className="membershipTitle">Medlemskab</p>
              <p className="membershipTier">{membershipName}</p>
              <p className="membershipCopy">Swipe for at starte din vask:</p>
              <p className="membershipLocation">
                {selectedLocation.name} - {selectedLocation.address}
              </p>
              <div className="membershipSwipeWrap">
                <SwipeToStart label="Start din vask" flush />
              </div>
            </section>

            {hasVaryingOpenHours ? (
              <div className="metaToggleBar" role="tablist" aria-label="Aabning og travlhed">
                <button
                  type="button"
                  role="tab"
                  aria-selected={busyView === "open"}
                  className={busyView === "open" ? "metaToggleButton isActive" : "metaToggleButton"}
                  onClick={() => setBusyView("open")}
                >
                  <LuClock3 aria-hidden="true" />
                  Aabent {openingHoursLabel}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={busyView === "busy"}
                  className={busyView === "busy" ? "metaToggleButton isActive" : "metaToggleButton"}
                  onClick={() => setBusyView("busy")}
                >
                  Travlhed {selectedLocation.message ? "Hoj" : "Moderat"}
                </button>
              </div>
            ) : null}

            <div className="popularTimesPanel" aria-label="Aabningstider og travlhed">
              {!hasVaryingOpenHours ? (
                <>
                  <div className="popularTimesHeader popularTimesHeaderStacked">
                    <div>
                      <span className="popularTimesTitle">Travlhed</span>
                      <span className="popularTimesNote popularTimesNoteBlock">
                        {trafficData.find((item) => item.active)?.time ?? "14"}:00: {selectedLocation.message ? "Normalt lidt travlt" : "Normalt moderat"}
                      </span>
                    </div>
                    <div className="openingHoursInline">
                      <LuClock3 aria-hidden="true" />
                      <span>Aabent {openingHoursLabel}</span>
                    </div>
                  </div>
                  <div className="popularTimesChart" aria-label="Travlhed fordelt paa timer">
                    {trafficData.map((item) => (
                      <div key={item.time} className={item.active ? "popularTimesColumnWrap isActive" : "popularTimesColumnWrap"}>
                        <div className="popularTimesColumnTrack" aria-hidden="true">
                          <span
                            className={item.active ? "popularTimesColumn popularTimesColumnActive" : "popularTimesColumn"}
                            style={{ height: `${(item.level / MAX_TRAFFIC_LEVEL) * 100}%` }}
                          />
                        </div>
                        <span className="popularTimesHour">{Number.parseInt(item.time, 10) % 3 === 0 ? `${item.time}` : ""}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : busyView === "open" ? (
                <>
                  <div className="openingTimesSummary">
                    <span className="openingTimesLabel">Aabningstider</span>
                    <strong>{openingHoursLabel}</strong>
                  </div>
                  <p className="openingTimesDescription">Alle Wash World lokationer i feedet viser samme aabningstid, saa vi viser den samlet her.</p>
                </>
              ) : (
                <>
                  <div className="popularTimesHeader">
                    <span className="popularTimesTitle">Travlhed</span>
                    <span className="popularTimesNote">
                      {trafficData.find((item) => item.active)?.time ?? "14"}:00: {selectedLocation.message ? "Normalt lidt travlt" : "Normalt moderat"}
                    </span>
                  </div>
                  <div className="popularTimesChart" aria-label="Travlhed fordelt paa timer">
                    {trafficData.map((item) => (
                      <div key={item.time} className={item.active ? "popularTimesColumnWrap isActive" : "popularTimesColumnWrap"}>
                        <div className="popularTimesColumnTrack" aria-hidden="true">
                          <span
                            className={item.active ? "popularTimesColumn popularTimesColumnActive" : "popularTimesColumn"}
                            style={{ height: `${(item.level / MAX_TRAFFIC_LEVEL) * 100}%` }}
                          />
                        </div>
                        <span className="popularTimesHour">{Number.parseInt(item.time, 10) % 3 === 0 ? `${item.time}` : ""}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="locationFacts" aria-label="Detaljer for valgt vaskehal">
              <p className="factItem">
                <span className="factLabel">Vaskehaller</span>
                <span className="factValue">{selectedLocation.hallsCount ?? 0}</span>
              </p>
              <p className="factItem">
                <span className="factLabel">Vask selv baase</span>
                <span className="factValue">{selectedLocation.selfWashCount ?? 0}</span>
              </p>
              <p className="factItem">
                <span className="factLabel">Stoevsugere</span>
                <span className="factValue">{selectedLocation.vacuumCount ?? 0}</span>
              </p>
              <p className="factItem">
                <span className="factLabel">Forvask</span>
                <span className="factValue">{selectedLocation.preWashCount ?? 0}</span>
              </p>
              {selectedLocation.maxHeight ? (
                <p className="factItem">
                  <span className="factLabel">Maks. hoejde</span>
                  <span className="factValue">{selectedLocation.maxHeight} m</span>
                </p>
              ) : null}
            </div>
          </section>
        ) : null}
      </section>

      <BottomNav activeTab="dashboard" variant="angled" />
    </main>
  );
}
