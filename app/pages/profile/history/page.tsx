"use client";

import { useRouter } from "next/navigation";
import AppHeader from "../../../components/layout/AppHeader";
import BottomNav from "../../../components/layout/BottomNav";
import WashHistory from "../components/WashHistory";
import mockWashHistory from "../data/mockWashHistory";
import "../profile.css";

export default function ProfileHistoryPage() {
  const router = useRouter();

  return (
    <main className="ProfilePage">
      <AppHeader variant="brand" />
      <WashHistory
        history={mockWashHistory}
        onBack={() => router.push("/pages/profile")}
      />
      <BottomNav activeTab="profile" variant="angled" />
    </main>
  );
}
