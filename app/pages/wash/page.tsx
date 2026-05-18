"use client";

import AppHeader from "../../components/layout/AppHeader";
import BottomNav from "../../components/layout/BottomNav";
import MembershipCard from "./components/MembershipCard";
import NearbyHalls from "./components/NearbyHalls";
import RecentWashes from "./components/RecentWashes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

const halls = [
  { id: "1", name: "Wash World Valby", address: "Vigerslev Alle 109, 2500 Valby", status: "Travlt" as const, waitTime: "Ca. 10 min ventetid", distance: "2.7 km" },
  { id: "2", name: "Wash World Amager", address: "Amagerbrogade 246, 2300 kbh S", status: "Ledig" as const, waitTime: "Klar nu", distance: "4.1 km" },
  { id: "3", name: "Wash World Lyngby", address: "Lyngby Hovedgade 68, 2800 Lyngby", status: "Fyldt" as const, waitTime: "Ca. 25 min ventetid", distance: "6.3 km" },
];

const recentWashes = [
  { id: "1", location: "Wash World Søborg", time: "I går, 18:42", plan: "Guld" },
  { id: "2", location: "Wash World Søborg", time: "27 april 2026, 10:22", plan: "Guld" },
  { id: "3", location: "Wash World Søborg", time: "29 april 2026, 16:29", plan: "Guld" },
];

export default function WashPage() {
  const router = useRouter();
  const [selectedHall, setSelectedHall] = useState(halls[0]);

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 100 }}>
      <AppHeader variant="brand" />
      <div style={{ padding: "0 18px" }}>
        <button
          onClick={() => router.back()}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "var(--body-sm-size)", marginBottom: 16 }}
        >
          <FaChevronLeft /> Tilbage
        </button>
        <MembershipCard
          package="brilliant"
          location={selectedHall.name}
          address={selectedHall.address}
          queueStatus={selectedHall.status}
          waitTime={selectedHall.waitTime}
          onStart={() => router.push("/pages/wash/washprogrambrilliant")}
          onSwitch={() => console.log("skift")}
        />
        <NearbyHalls
          halls={halls}
          onSwitch={(id) => {
            const hall = halls.find((h) => h.id === id);
            if (hall) setSelectedHall(hall);
          }}
        />
        <RecentWashes washes={recentWashes} />
      </div>
      <BottomNav activeTab="wash" variant="angled" />
    </main>
  );
}
