"use client";

import { useState } from "react";
import AppHeader from "../../components/layout/AppHeader";
import BottomNav from "../../components/layout/BottomNav";
import ProfileMenu from "./components/ProfileMenu";
import ProfileDetailsForm from "./components/ProfileDetailsForm";
import ProfileMembershipFlow from "./components/ProfileMembershipFlow";
import "./profile.css";


const iconMap: Record<string, IconType> = {
  membership: IoPeopleOutline,
  history: LuClock3,
  details: LuSettings,
  logout: LuLogOut,
};
import WashHistory from "./components/WashHistory";
import mockWashHistory from "./data/mockWashHistory";

export default function ProfilePage() {
  const [activeView, setActiveView] = useState<"menu" | "membership" | "details" | "history">("menu");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [detailsForm, setDetailsForm] = useState({
    phone: "+45 11 22 33 44",
    email: "filip@email.dk",
    password: "********",
    paymentMethod: "**** 4242",
    address: "Jagtvej 123, 2200 Kobenhavn N",
    plateNumber: "AB 12 456",
  });

  function handleItemClick(id: string) {
    if (id === "logout") {
      setShowLogoutModal(true);
      return;
    }
    if (id === "details") {
      setActiveView("details");
      setSaveMessage(null);
      return;
    }
    if (id === "membership") {
      setActiveView("membership");
      setSaveMessage(null);
      return;
    }
    if (id === "history") {
      setActiveView("history");
      setSaveMessage(null);
      return;
    }
  }

  function handleDetailsChange(field: keyof typeof detailsForm, value: string) {
    setDetailsForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleDetailsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveMessage("Dine oplysninger er opdateret.");
  }

  function handleConfirmLogout() {
    // TODO: wire up real logout logic
    setShowLogoutModal(false);
  }

  return (
    <main className="ProfilePage">
      <AppHeader variant="brand" />
      {activeView === "menu" && (
        <ProfileMenu onItemClick={handleItemClick} />
      )}
      {activeView === "history" && (
        <WashHistory
          history={mockWashHistory}
          onBack={() => setActiveView("menu")}
        />
      )}
      {activeView === "membership" && (
        <ProfileMembershipFlow onExit={() => setActiveView("menu")} />
      )}
      {activeView === "details" && (
        <ProfileDetailsForm
          detailsForm={detailsForm}
          onChange={handleDetailsChange}
          onSubmit={handleDetailsSubmit}
          onBack={() => {
            setActiveView("menu");
            setSaveMessage(null);
          }}
          saveMessage={saveMessage}
        />
      )}
      {showLogoutModal && (
        <div className="logoutOverlay" role="dialog" aria-modal="true" aria-label="Log ud bekræftelse">
          <div className="logoutModal">
            <p className="logoutQuestion">Log ud af din konto ?</p>
            <div className="logoutActions">
              <button
                type="button"
                className="logoutConfirm"
                onClick={handleConfirmLogout}
              >
                Log ud
              </button>
              <button
                type="button"
                className="logoutCancel"
                onClick={() => setShowLogoutModal(false)}
              >
                Fortryd
              </button>
            </div>
          </div>
        </div>
      )}
      <BottomNav activeTab="profile" variant="angled" />
    </main>
  );
}
