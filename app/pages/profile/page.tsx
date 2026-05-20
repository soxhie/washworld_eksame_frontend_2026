"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../../components/layout/AppHeader";
import BottomNav from "../../components/layout/BottomNav";
import ProfileMenu from "./components/ProfileMenu";
import "./profile.css";

export default function ProfilePage() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  function handleItemClick(id: string) {
    if (id === "logout") {
      setShowLogoutModal(true);
      return;
    }
    if (id === "membership") {
      router.push("/pages/profile/membership/details");
      return;
    }
    router.push(`/pages/profile/${id}`);
  }

  async function handleConfirmLogout() {
    try {
      await fetch("http://127.0.0.1:80/logout", {
        method: "GET",
      });
    } catch {}
    localStorage.removeItem("authUser");
    localStorage.removeItem("access_token");
    setShowLogoutModal(false);
    router.push("/pages/login");
  }

  return (
    <main className="ProfilePage">
      <AppHeader variant="brand" />
      <ProfileMenu onItemClick={handleItemClick} />
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
