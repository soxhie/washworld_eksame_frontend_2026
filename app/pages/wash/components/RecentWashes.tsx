"use client";

import Image from "next/image";
// import { LuCar } from "react-icons/lu";

type Wash = {
  id: string;
  location: string;
  time: string;
  plan: string;
};

type Props = {
  washes: Wash[];
};

export default function RecentWashes({ washes }: Props) {
  return (
    <section style={{ marginTop: 30 }}>
      <h3 style={{ fontSize: "var(--h3-size)", fontWeight: 800, margin: "20px 0 px", paddingLeft: "14px" }}>Seneste vaske</h3>
      <ul style={{ listStyle: "none", margin: 0, background: "rgba(74, 74, 74, 0.4)", padding: "6px" }}>
        {washes.map((wash, i) => (
          <li
            key={wash.id}
            style={{ display: "grid", gridTemplateColumns: "50px 1fr auto", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < washes.length - 1 ? "1px solid #08d17a" : "none" }}
          >
            <div style={{ width: 50, height: 50, background: "#041f14", display: "grid", placeItems: "center" }}>
              <Image src="/svg/bil_gron.svg" alt="Bil" width={35} height={35} style={{ height: "auto" }} />{" "}
              {/* <LuCar className="washHistoryIcon" aria-hidden="true" style={{ fontSize: 32, color: "var(--color-primary)" }}></LuCar> */}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{wash.location}</p>
              <p style={{ margin: "3px 0 0", fontSize: 12, color: "#d8d8d8" }}>{wash.time}</p>
            </div>
            <span style={{ background: "#18de84", color: "#000", fontSize: 12, fontWeight: 700, padding: "3px 8px", borderRadius: "2px", margin: "0 8px" }}>{wash.plan}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
