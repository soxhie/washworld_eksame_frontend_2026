"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../../components/layout/AppHeader";
import BottomNav from "../../components/layout/BottomNav";
import ProfileMenu from "./components/ProfileMenu";
import "./profile.css";

export default function ProfilePage() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/pages/login");
      return;
    }
    fetch("http://localhost:80/api-my-info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (res.status === 401) {
          localStorage.removeItem("access_token");
          router.push("/pages/login");
          return;
        }
        const data = await res.json();
        if (data.status === "ok") {
          setUser(data.user);
        } else {
          setError(data.message || "Kunne ikke hente brugerdata");
        }
      })
      .catch(() => setError("System under maintenance"))
      .finally(() => setLoading(false));
  }, [router]);

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
      {loading ? (
        <div>Indlæser...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : user ? (
        <>
          <ProfileMenu onItemClick={handleItemClick} />
        </>
      ) : null}
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
