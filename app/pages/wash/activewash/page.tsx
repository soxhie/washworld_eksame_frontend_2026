"use client";
import { useState } from "react";
import WashStartOverlay from "../components/WashStartOverlay";
import AppHeader from "../../../components/layout/AppHeader";
import BottomNav from "../../../components/layout/BottomNav";
import WashProgram from "../components/WashProgram";

export default function ActiveWashPage() {
  const [showOverlay, setShowOverlay] = useState(true);

  return (
<main style={{ minHeight: "100vh", overflowY: "auto", paddingBottom: 80, background: "#000" }}>      {showOverlay && <WashStartOverlay onComplete={() => setShowOverlay(false)} />}
      <AppHeader variant="brand" />
      <WashProgram package="brilliant" />
      <BottomNav activeTab="wash" variant="angled" />
    </main>
  );
}

