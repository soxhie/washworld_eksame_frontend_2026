"use client";

import { useState } from "react";
import { IconType } from "react-icons";
import { IoPeopleOutline } from "react-icons/io5";
import { LuClock3, LuSettings, LuLogOut } from "react-icons/lu";
import AppHeader from "../../components/layout/AppHeader";
import BottomNav from "../../components/layout/BottomNav";
import profileData from "./data/mockProfileData";
import "./profile.css";


const iconMap: Record<string, IconType> = {
  membership: IoPeopleOutline,
  history: LuClock3,
  details: LuSettings,
  logout: LuLogOut,
};

export default function ProfilePage() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  function handleItemClick(id: string) {
    if (id === "logout") {
      setShowLogoutModal(true);
    }
  }

  function handleConfirmLogout() {
    // TODO: wire up real logout logic
    setShowLogoutModal(false);
  }

  return (
    <main className="ProfilePage">
      <AppHeader variant="brand" />

      <section className="profileMenu" aria-label="Profil menu">
        {profileData.menuItems.map((item) => {
          const Icon = iconMap[item.id];
          return (
            <button
              key={item.id}
              type="button"
              className="profileMenuItem"
              onClick={() => handleItemClick(item.id)}
            >
              {Icon && <Icon className="menuIcon" aria-hidden="true" />}
              <span className="menuLabel">{item.label}</span>
              <span className="menuChevron" aria-hidden="true">›</span>
            </button>
          );
        })}
      </section>

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
