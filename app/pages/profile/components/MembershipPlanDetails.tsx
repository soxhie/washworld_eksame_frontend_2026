"use client";
import BackButton from "@/app/components/layout/BackButton";
import { IconType } from "react-icons";
import {
  LuCloud,
  LuDisc,
  LuDroplets,
  LuSparkles,
  LuSun,
  LuWind,
} from "react-icons/lu";
import { IoPeopleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import SwipeToStart from "../../../components/SwipeToStart/SwipeToStart";
import { SubscriptionPlan } from "../data/membershipTypes";

function featureIcon(featureName: string): IconType {
  const normalized = featureName.toLowerCase();
  if (normalized.includes("shampoo") || normalized.includes("skum")) return LuCloud;
  if (normalized.includes("borste") || normalized.includes("vask")) return LuDroplets;
  if (normalized.includes("torr") || normalized.includes("blow")) return LuWind;
  if (normalized.includes("hjul") || normalized.includes("hojtryk")) return LuDisc;
  if (normalized.includes("voks") || normalized.includes("glans") || normalized.includes("poler")) return LuSparkles;
  return LuSun;
}

interface MembershipPlanDetailsProps {
  onBack: () => void;
  plan: SubscriptionPlan;
}

export default function MembershipPlanDetails({ onBack, plan }: MembershipPlanDetailsProps) {
  const router = useRouter();

  return (
    <section className="membershipPlanDetails" aria-label={`Valgt plan ${plan.name}`}>
      {/* <button type="button" className="profileBackButton" onClick={onBack}>
        <span aria-hidden="true">‹</span>
        Tilbage
      </button> */}
      <BackButton/>

      <article className="membershipPlanCard" aria-label="Valgt medlemskabsplan">
              <span className="membershipPlanIconWrap" aria-hidden="true">
                <IoPeopleOutline className="membershipPlanPeopleIcon" />
              </span>
              <div className="membershipCreatePlanInfo">
                <span className="membershipCreatePlanName">{plan.name}</span>
                <span className="membershipCreatePlanPrice">{plan.price}kr./md</span>
                <span className="membershipCreatePlanDescription">{plan.shortDescription || "Læs mere om planen"}</span>
              </div>
      </article>

      <h2 className="membershipIncludedTitle">Inkluderet i valgte {plan.name} program:</h2>

      <ul className="membershipIncludedList" aria-label="Inkluderede ydelser">
        {plan.features.map((feature) => {
          const Icon = featureIcon(feature);
          return (
            <li key={feature} className="membershipIncludedItem">
              <span className="membershipIncludedIconWrap" aria-hidden="true">
                <Icon className="membershipIncludedFeatureIcon" />
              </span>
              <span className="membershipIncludedLabel">{feature}</span>
            </li>
          );
        })}
      </ul>

      <SwipeToStart
        label="Skift medlemskab"
        completedLabel="Videresender..."
        onComplete={() => router.push(`/pages/profile/membership/change/${plan.id}/success`)}
      />
    </section>
  );
}
