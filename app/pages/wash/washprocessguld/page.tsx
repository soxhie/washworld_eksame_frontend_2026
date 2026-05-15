"use client";

import AppHeader from "../../../components/layout/AppHeader";
import BottomNav from "../../../components/layout/BottomNav";
import WashProgram from "../components/WashProgram";

export default function ActiveWashPage() {
  return (
    <main style={{ minHeight: "100vh", overflowY: "auto", paddingBottom: 80 }}>
      <AppHeader variant="brand" />
      <WashProgram package="guld" />
      <BottomNav activeTab="wash" variant="angled" />
    </main>
  );
}