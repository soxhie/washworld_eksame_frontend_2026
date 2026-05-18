"use client";
import { LuArrowUpRight } from "react-icons/lu";

type Hall = {
  id: string;
  name: string;
  address: string;
  status: "Travlt" | "Ledig" | "Fyldt";
  waitTime: string;
  distance: string;
};

const statusColors: Record<Hall["status"], string> = {
  Travlt: "#ffbf24",
  Ledig: "#22c55e",
  Fyldt: "#ef4444",
};

type Props = {
  halls: Hall[];
  onSwitch: (id: string) => void;
};

export default function NearbyHalls({ halls, onSwitch }: Props) {
  return (
    <section style={{ marginTop: 30 }}>
      <h3 style={{ fontSize: "var(--h3-size)", fontWeight: 800, margin: 0 }}>Vaskehaller i nærheden</h3>
      {halls.map((hall, i) => (
        <div key={hall.id} style={{ borderBottom: i < halls.length - 1 ? "1px solid #08d17a" : "none", padding: "12px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: "var(--body-md-size)", margin: 0 }}>{hall.name}</p>
              <p style={{ fontSize: "var(--body-sm-size)", color: "#ccc", margin: "2px 0 6px" }}>{hall.address}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ background: statusColors[hall.status], color: "#000", fontWeight: 700, fontSize: 11, padding: "2px 6px" }}>{hall.status}</span>
                <span style={{ fontSize: 11, color: statusColors[hall.status] }}>{hall.waitTime}</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between" }}>
              <button
                onClick={() => onSwitch(hall.id)}
                style={{ background: "none", border: "none", color: "#fff", textDecoration: "underline", cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", gap: 2 }} >
                Skift til<LuArrowUpRight />
              </button>
              <span style={{ fontSize: 11, color: "#fff" }}>{hall.distance}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
