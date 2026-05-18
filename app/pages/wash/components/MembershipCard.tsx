"use client";

// import { LuArrowUpRight } from "react-icons/lu";
import SwipeButton from "../components/swipeBtn";

type Package = "guld" | "premium" | "brilliant";

type Props = {
  package: Package;
  location: string;
  address: string;
  queueStatus: string;
  waitTime: string;
  onStart: () => void;
  onSwitch: () => void;
};

const packageLabels: Record<Package, string> = {
  guld: "Guld abonnement - Aktiv",
  premium: "Premium abonnement - Aktiv",
  brilliant: "Brilliant abonnement - Aktiv",
};

const statusColors: Record<string, string> = {
  Travlt: "#ffbf24",
  Ledig: "#22c55e",
  Fyldt: "#ef4444",
};

export default function MembershipCard({ package: pkg, location, address, queueStatus, waitTime, onStart, onSwitch }: Props) {
  return (
    <section style={{ marginTop: 10, border: "1px solid #07de88", background: "#015126", padding: "14px 12px 18px" }}>
      <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, lineHeight: 0.8 }}>Medlemskab</h1>
      <p style={{ margin: "6px 0 16px", color: "#08e184", fontSize: 14, fontWeight: 700 }}>{packageLabels[pkg]}</p>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 11, alignItems: "flex-start" }}>
        <div>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{location}:</p>
          <p style={{ margin: "2px 0 0", color: "#14ef96", fontSize: 14, lineHeight: 1.2 }}>{address}</p>
        </div>
        <button type="button" onClick={onSwitch} style={{ border: "none", background: "transparent", color: "#76a08f", fontSize: 10, display: "flex", alignItems: "center", gap: 2, cursor: "pointer", marginTop: 2, textDecoration: "underline" }}>
          Skift vaskehal {/* <LuArrowUpRight /> */}
        </button>
      </div>

      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ background: statusColors[queueStatus] ?? "#ffbf24", color: "#0a0a0a", fontSize: 11, fontWeight: 700, padding: "2px 6px" }}>{queueStatus}</span>
        <span style={{ fontSize: 11 }}>{waitTime}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: 16 }}>
        <SwipeButton variant="vask" onActivate={onStart} />
      </div>
    </section>
  );
}