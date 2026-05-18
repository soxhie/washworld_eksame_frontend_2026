"use client";

import { useState } from "react";
import AppHeader from "@/app/components/layout/AppHeader";
import BottomNav from "@/app/components/layout/BottomNav";
import PackageFeatures from "../../components/PackageFeature";
import PackageSelector from "../../components/PackageSelector";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

type Package = "guld" | "premium" | "brilliant";

export default function PackagesPage() {
  const [active, setActive] = useState<Package>("guld");
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", overflowY: "auto", paddingBottom: 80 }}>
      <AppHeader variant="brand" />
      <div style={{ padding: "24px 20px 0" }}>
        <button
          onClick={() => router.back()}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "var(--body-md-size)", marginBottom: 16 }}
        >
          <FaChevronLeft /> Tilbage
        </button>
        <h1 style={{ fontSize: "var(--display-h1-size)", lineHeight: "var(--display-h1-line)", fontWeight: 800, margin: 0, textAlign: "center" }}>Vaskepakker</h1>
        <p style={{ fontSize: "var(--body-sm-size)", lineHeight: "var(--body-sm-line)", margin: "4px 0 36px", textAlign: "center" }}>Vælg mellem følgende vaske</p>
        <PackageSelector active={active} onChange={setActive} />
      </div>
      <div style={{ marginTop: 2 }}>
        <PackageFeatures active={active} />
      </div>
      <BottomNav activeTab="wash" variant="angled" />
    </div>
  );
}
