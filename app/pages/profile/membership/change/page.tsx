"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../../../../components/layout/AppHeader";
import BottomNav from "../../../../components/layout/BottomNav";
import MembershipCreate from "../../components/MembershipCreate";
import { SubscriptionPlan } from "../../data/membershipTypes";
import "../../profile.css";

export default function MembershipChangePage() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/washworld-subscriptions");
        if (!res.ok) {
          if (isMounted) setError("failed");
          return;
        }
        const data: unknown = await res.json();
        if (Array.isArray(data) && isMounted) {
          setSubscriptions(data as SubscriptionPlan[]);
        } else if (isMounted) {
          setError("empty");
        }
      } catch {
        if (isMounted) setError("failed");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void load();
    return () => {
      isMounted = false;
    };
  }, []);

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
