import Link from "next/link";
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

interface MembershipDetailsProps {
  onBack: () => void;
  onCancel: () => void;
}

export default function MembershipDetails({ onBack, onCancel }: MembershipDetailsProps) {
  return (
    <section className="membershipDetails" aria-label="Mit medlemskab detaljer">
      <button type="button" className="profileBackButton" onClick={onBack}>
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

      <Link href="/pages/profile/membership/change" className="membershipManageButton">
        <span>Ændre medlemskab</span>
        <span className="membershipManageArrow" aria-hidden="true">›</span>
      </Link>

      <button type="button" className="membershipCancelButton" onClick={onCancel}>
        Annuller medlemskab
      </button>
    </section>
  );
}
