"use client";

import "./dashboard.css";
import AppHeader from "../../components/layout/AppHeader";
import ActiveBookingCard from "./components/ActiveBookingCard";
import QuickActionsGrid from "./components/QuickActionsGrid";
import RecentActivityList from "./components/RecentActivityList";
import BottomNav from "../../components/layout/BottomNav";
import mockDashboardData from "./data/mockDashboardData";

export default function DashboardPage() {
  // TODO: Wire this to real API state later: loading | empty | populated | error
  const screenState = "populated";
  const data = mockDashboardData;

  return (
    <main className="DashboardPage">
      <AppHeader variant="dashboard" user={data.user} notifications={data.notifications} />

      <section className="dashboardSection">
        <h2>Aktiv booking</h2>
        {screenState === "error" ? (
          <p className="stateText">Kunne ikke hente booking data.</p>
        ) : (
          <ActiveBookingCard booking={data.activeBooking} />
        )}
      </section>

      <section className="dashboardSection">
        <h2>Hurtige handlinger</h2>
        <QuickActionsGrid actions={data.quickActions} />
      </section>

      <section className="dashboardSection dashboardSectionLast">
        <h2>Seneste aktivitet</h2>
        <RecentActivityList items={data.recentActivity} />
      </section>

      <BottomNav activeTab="dashboard" variant="angled" />
    </main>
  );
}
