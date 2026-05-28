"use client";
import { useRouter } from "next/navigation";
import AppHeader from "../../../../components/layout/AppHeader";
import BottomNav from "../../../../components/layout/BottomNav";
import MembershipCreate from "../../components/MembershipCreate";
import { useSubscriptions } from "@/app/hooks/useSubscriptions";
import "../../profile.css";

export default function MembershipChangePage() {
  const router = useRouter();
  const { subscriptions, isLoading, error } = useSubscriptions();

  return (
    <main className="ProfilePage">
      <AppHeader variant="brand" />
      <MembershipCreate
        onBack={() => router.push("/pages/profile/membership/details")}
        plans={subscriptions}
        isLoading={isLoading}
        error={error}
        onPlanClick={(plan) =>
          router.push(`/pages/profile/membership/change/${plan.id}`)
        }
      />
      <BottomNav activeTab="profile" variant="angled" />
    </main>
  );
}