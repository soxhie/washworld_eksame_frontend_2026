import { useEffect, useState } from "react";
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
import MembershipOptions from "./MembershipOptions";

type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  interval: string;
  shortDescription: string;
  features: string[];
};

type MembershipView = "options" | "details" | "create" | "planDetails" | "cancel";

const includedFeatures = [
  "Hojtryksskyl",
  "Shampoo",
  "Borstevask",
  "Hjulvask",
  "Undervognsskyl",
  "Skyllevoks",
  "Polering",
  "Torring",
];

interface ProfileMembershipFlowProps {
  onExit: () => void;
}

function featureIcon(featureName: string): IconType {
  const normalized = featureName.toLowerCase();

  if (normalized.includes("shampoo") || normalized.includes("skum")) {
    return LuCloud;
  }
  if (normalized.includes("borste") || normalized.includes("vask")) {
    return LuDroplets;
  }
  if (normalized.includes("torr") || normalized.includes("blow")) {
    return LuWind;
  }
  if (normalized.includes("hjul") || normalized.includes("hojtryk")) {
    return LuDisc;
  }
  if (normalized.includes("voks") || normalized.includes("glans") || normalized.includes("poler")) {
    return LuSparkles;
  }

  return LuSun;
}

function MembershipDetails({
  onBack,
  onCancel,
}: {
  onBack: () => void;
  onCancel: () => void;
}) {
  return (
    <section className="membershipDetails" aria-label="Mit medlemskab detaljer">
      <button
        type="button"
        className="profileBackButton"
        onClick={onBack}
      >
        <span aria-hidden="true">‹</span>
        Tilbage
      </button>

      <article className="membershipPlanCard" aria-label="Aktiv medlemskabsplan">
        <span className="membershipPlanIconWrap" aria-hidden="true">
          <span className="membershipPlanIconGroup">OO</span>
        </span>
        <div className="membershipPlanInfo">
          <h1 className="membershipPlanName">Premium</h1>
          <p className="membershipPlanPrice">169kr./md</p>
          <p className="membershipPlanDate">Betalingsdato: 01/07/2026</p>
        </div>
      </article>

      <h2 className="membershipIncludedTitle">Inkluderet i valgte Brilliant program:</h2>

      <ul className="membershipIncludedList" aria-label="Inkluderede ydelser">
        {includedFeatures.map((feature) => (
          <li key={feature} className="membershipIncludedItem">
            <span className="membershipIncludedIcon" aria-hidden="true" />
            <span className="membershipIncludedLabel">{feature}</span>
          </li>
        ))}
      </ul>

      <button type="button" className="membershipManageButton">
        <span>Manage membership</span>
        <span className="membershipManageArrow" aria-hidden="true">›</span>
      </button>

      <button type="button" className="membershipCancelButton" onClick={onCancel}>
        Annuller medlemskab
      </button>
    </section>
  );
}

function MembershipCancelView({ onBack }: { onBack: () => void }) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const cancelReasons = ["For dyrt", "Bruger det ikke", "Andet"];

  return (
    <section className="membershipCancelView" aria-label="Annuller medlemskab">
      <button
        type="button"
        className="profileBackButton"
        onClick={onBack}
      >
        <span aria-hidden="true">‹</span>
        Tilbage
      </button>

      <h1 className="membershipCancelTitle">Annuller medlemskab</h1>
      <p className="membershipCancelSubtitle">Vi er kede af at se dig gå</p>

      <article className="membershipPlanCard" aria-label="Aktivt medlemskab der annulleres">
        <span className="membershipPlanIconWrap" aria-hidden="true">
          <IoPeopleOutline className="membershipPlanPeopleIcon" />
        </span>
        <div className="membershipPlanInfo">
          <h2 className="membershipPlanName">Premium</h2>
          <p className="membershipPlanPrice">169kr./md</p>
          <p className="membershipPlanDate">Aktiv til: 01/07/2026</p>
        </div>
      </article>

      <p className="membershipCancelNote">
        * Hvis du opsiger nu, fortsaetter medlemskabet til slutningen af din betalingsperiode.
      </p>

      <h2 className="membershipCancelReasonTitle">Hvorfor annullerer du?</h2>

      <div className="membershipCancelReasonList" role="group" aria-label="Aarsag til annullering">
        {cancelReasons.map((reason) => (
          <button
            key={reason}
            type="button"
            className={`membershipCancelReasonButton${selectedReason === reason ? " isSelected" : ""}`}
            onClick={() => setSelectedReason(reason)}
          >
            {reason}
          </button>
        ))}
      </div>

      <button type="button" className="membershipCancelConfirmButton">
        Annuller medlemskab
      </button>
    </section>
  );
}

function MembershipCreate({
  onBack,
  plans,
  onPlanClick,
  isLoading,
  error,
}: {
  onBack: () => void;
  plans: SubscriptionPlan[];
  onPlanClick: (plan: SubscriptionPlan) => void;
  isLoading: boolean;
  error: string | null;
}) {
  return (
    <section className="membershipCreate" aria-label="Opret medlemskab">
      <button
        type="button"
        className="profileBackButton"
        onClick={onBack}
      >
        <span aria-hidden="true">‹</span>
        Tilbage
      </button>

      <h1 className="membershipCreateTitle">Medlemskab</h1>
      <p className="membershipCreateSubtitle">Vælg dit medlemskab</p>

      <h2 className="membershipCreateSectionTitle">
        <span aria-hidden="true">∞</span>
        Ubegraenset bilvask
      </h2>

      <div className="membershipCreateCards">
        {isLoading && (
          <article className="membershipCreateCard">
            <div className="membershipCreateCardAction" aria-live="polite">
              <span className="membershipCreateCardDescription">Henter medlemskaber...</span>
            </div>
          </article>
        )}

        {!isLoading && error && (
          <article className="membershipCreateCard">
            <div className="membershipCreateCardAction" aria-live="polite">
              <span className="membershipCreateCardDescription">Kunne ikke hente medlemskaber lige nu.</span>
              <span className="membershipCreateReadMore">Prøv igen senere</span>
            </div>
          </article>
        )}

        {!isLoading && !error && plans.length === 0 && (
          <article className="membershipCreateCard">
            <div className="membershipCreateCardAction" aria-live="polite">
              <span className="membershipCreateCardDescription">Ingen medlemskaber fundet.</span>
            </div>
          </article>
        )}

        {plans.map((plan) => (
          <article key={plan.name} className="membershipCreateCard">
            <button
              type="button"
              className="membershipCreateCardAction"
              aria-label={`Vaelg ${plan.name}`}
              onClick={() => onPlanClick(plan)}
            >
              <span className="membershipCreateCardTopLine">
                <strong>{plan.name}</strong>- {plan.price}kr./md.
              </span>
              <span className="membershipCreateCardDescription">{plan.shortDescription || "Læs mere om planen"}</span>
              <span className="membershipCreateReadMore">Læs mere</span>
              <span className="membershipCreateChevron" aria-hidden="true">›</span>
            </button>
          </article>
        ))}
      </div>

      <h2 className="membershipCreateSectionTitle">
        <span aria-hidden="true">✧</span>
        Betal pr.vask
      </h2>

      <article className="membershipCreateCard membershipCreatePayAsYouGoCard">
        <button type="button" className="membershipCreateCardAction" aria-label="Vælg betal pr vask">
          <span className="membershipCreateCardDescription membershipCreatePayAsYouGoText">
            Du betaler automatisk hver gang du vasker.
          </span>
          <span className="membershipCreateReadMore">Læs mere</span>
          <span className="membershipCreateChevron" aria-hidden="true">›</span>
        </button>
      </article>
    </section>
  );
}

function MembershipPlanDetails({
  onBack,
  plan,
}: {
  onBack: () => void;
  plan: SubscriptionPlan;
}) {
  return (
    <section className="membershipPlanDetails" aria-label={`Valgt plan ${plan.name}`}>
      <button
        type="button"
        className="profileBackButton"
        onClick={onBack}
      >
        <span aria-hidden="true">‹</span>
        Tilbage
      </button>

      <article className="membershipPlanCard" aria-label="Valgt medlemskabsplan">
        <span className="membershipPlanIconWrap" aria-hidden="true">
          <IoPeopleOutline className="membershipPlanPeopleIcon" />
        </span>
        <div className="membershipPlanInfo">
          <h1 className="membershipPlanName">{plan.name}</h1>
          <p className="membershipPlanPrice">{plan.price}kr./md</p>
          <p className="membershipPlanSubtitle">{plan.shortDescription || "Ubegrænset bilvask"}</p>
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

      <button type="button" className="membershipJoinButton">
        <span className="membershipJoinButtonIcon" aria-hidden="true">›</span>
        <span className="membershipJoinButtonText">Bliv medlem</span>
      </button>
    </section>
  );
}

export default function ProfileMembershipFlow({ onExit }: ProfileMembershipFlowProps) {
  const [membershipView, setMembershipView] = useState<MembershipView>("options");
  const [subscriptions, setSubscriptions] = useState<SubscriptionPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(false);
  const [subscriptionsError, setSubscriptionsError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadSubscriptions() {
      setIsLoadingSubscriptions(true);
      setSubscriptionsError(null);

      try {
        const response = await fetch("/api/washworld-subscriptions");

        if (!response.ok) {
          if (isMounted) {
            setSubscriptionsError("failed");
          }
          return;
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data) || data.length === 0 || !isMounted) {
          if (isMounted) {
            setSubscriptionsError("empty");
          }
          return;
        }

        const mappedSubscriptions = data as SubscriptionPlan[];
        setSubscriptions(mappedSubscriptions);

        const brilliantPlan = mappedSubscriptions.find(
          (plan) => plan.name.toLowerCase() === "brilliant",
        );

        setSelectedPlan(brilliantPlan || mappedSubscriptions[0]);
      } catch {
        if (isMounted) {
          setSubscriptionsError("failed");
        }
      } finally {
        if (isMounted) {
          setIsLoadingSubscriptions(false);
        }
      }
    }

    void loadSubscriptions();

    return () => {
      isMounted = false;
    };
  }, []);

  if (membershipView === "options") {
    return (
      <MembershipOptions
        onBack={onExit}
        onExistingMembershipClick={() => setMembershipView("details")}
        onCreateMembershipClick={() => setMembershipView("create")}
      />
    );
  }

  if (membershipView === "details") {
    return (
      <MembershipDetails
        onBack={() => setMembershipView("options")}
        onCancel={() => setMembershipView("cancel")}
      />
    );
  }

  if (membershipView === "create") {
    return (
      <MembershipCreate
        onBack={() => setMembershipView("options")}
        plans={subscriptions}
        isLoading={isLoadingSubscriptions}
        error={subscriptionsError}
        onPlanClick={(plan) => {
          setSelectedPlan(plan);
          setMembershipView("planDetails");
        }}
      />
    );
  }

  if (membershipView === "planDetails" && selectedPlan) {
    return (
      <MembershipPlanDetails
        plan={selectedPlan}
        onBack={() => setMembershipView("create")}
      />
    );
  }

  if (membershipView === "cancel") {
    return <MembershipCancelView onBack={() => setMembershipView("details")} />;
  }

  return null;
}