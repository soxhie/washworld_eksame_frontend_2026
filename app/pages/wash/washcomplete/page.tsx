"use client";

import AppHeader from "../../../components/layout/AppHeader";
import BottomNav from "../../../components/layout/BottomNav";
import { PiCarBold } from "react-icons/pi";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WashCompletePage() {
  const router = useRouter();

  return (
    <main style={{ minHeight: "100vh", overflowY: "auto", paddingBottom: 80, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <AppHeader variant="brand" />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: 24, padding: "40px 20px", marginBottom: 120 }}>
        <h1 style={{ fontSize: "var(--h2-size)", fontWeight: 800, textAlign: "center" }}>Program afsluttet</h1>
        {/* <PiCarBold style={{ fontSize: 120, color: "var(--color-primary)" }} /> */}
        <Image src="/svg/bil_gron.svg" alt="Bil" width={100} height={100} />
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "var(--h3-size)", fontWeight: 700 }}>Tak for dit besøg</h2>
          <p style={{ fontSize: "var(--body-md-size)", color: "#ccc" }}>Vi ønsker dig en god tur videre</p>
        </div>
<button onClick={() => router.push("/pages/dashboard")} style={{ color: "var(--color-primary)", background: "none", border: "none", cursor: "pointer", fontSize: "var(--body-md-size)" }}>Tilbage til start</button>      </div>
      <BottomNav activeTab="wash" variant="angled" />
    </main>
  );
}
