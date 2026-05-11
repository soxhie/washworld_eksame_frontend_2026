"use client";

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
  return (
    <main className="ProfilePage">
      <AppHeader variant="brand" />

      <section className="profileMenu" aria-label="Profil menu">
        {profileData.menuItems.map((item) => {
          const Icon = iconMap[item.id];
          return (
            <button key={item.id} type="button" className="profileMenuItem">
              {Icon && <Icon className="menuIcon" aria-hidden="true" />}
              <span className="menuLabel">{item.label}</span>
              <span className="menuChevron" aria-hidden="true">›</span>
            </button>
          );
        })}
      </section>

      <BottomNav activeTab="profile" variant="angled" />
    </main>
  );
}
