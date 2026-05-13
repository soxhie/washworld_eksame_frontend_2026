"use client";

import AppHeader from "@/app/components/layout/AppHeader";
import BottomNav from "@/app/components/layout/BottomNav";
import PackageFeatures from "../../components/PackageFeature";

export default function PackagesPage() {
  return (
    <>
      <AppHeader variant="brand" />
      <div>
        <PackageFeatures active="premium" />
      </div>
      <BottomNav activeTab="wash" variant="angled" />
    </>
  );
}