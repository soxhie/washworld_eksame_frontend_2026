import Link from "next/link";
import Image from "next/image";
import BackButton from "../../../components/layout/BackButton";
const includedFeatures = ["Hojtryksskyl", "Shampoo", "Borstevask", "Hjulvask", "Undervognsskyl", "Skyllevoks", "Polering", "Torring"];
const featureIcons: Record<string, string> = {
  Hojtryksskyl: "/svg/vaskeikoner/hotryksvask_hvid.svg",
  Shampoo: "/svg/vaskeikoner/aktiv_shampoo_hvid.svg",
  Borstevask: "/svg/vaskeikoner/borstevask_hvid.svg",
  Hjulvask: "/svg/vaskeikoner/hjulvask_hvid.svg",
  Undervognsskyl: "/svg/vaskeikoner/undervogns_hvid.svg",
  Skyllevoks: "/svg/vaskeikoner/skyllevoks_hvid.svg",
  Polering: "/svg/vaskeikoner/hojglans_hvid.svg",
  Torring: "/svg/vaskeikoner/torring_hvid.svg",
};

interface MembershipDetailsProps {
  onBack: () => void;
  onCancel: () => void;
}

export default function MembershipDetails({ onBack, onCancel }: MembershipDetailsProps) {
  return (
    <section className="membershipDetails" aria-label="Mit medlemskab detaljer">
      {/* <button type="button" className="profileBackButton" onClick={onBack}>
        <span aria-hidden="true">‹</span>
        Tilbage
      </button> */}
      <BackButton />

      <article className="membershipPlanCard" aria-label="Aktiv medlemskabsplan">
        <span className="membershipPlanIconWrap" aria-hidden="true">
          <span className="membershipPlanIconGroup">OO</span>
        </span>
        <div className="membershipPlanInfo" style={{ padding: "20px" }}>
          <h1 className="membershipPlanName" style={{ lineHeight: 1 }}>
            Premium
          </h1>
          <p className="membershipPlanPrice" style={{ lineHeight: 1.5 }}>
            169kr./md
          </p>
          <p className="membershipPlanDate" style={{ lineHeight: 1 }}>
            Betalingsdato: 01/07/2026
          </p>
        </div>
      </article>

      <h2 className="membershipIncludedTitle">Inkluderet i valgte Brilliant program:</h2>

      <ul className="membershipIncludedList" aria-label="Inkluderede ydelser">
        {/* {includedFeatures.map((feature) => (
    <li key={feature} className="membershipIncludedItem">
      <span className="membershipIncludedIcon" aria-hidden="true" />
      <span className="membershipIncludedLabel">{feature}</span>
    </li>
  ))} */}
        {includedFeatures.map((feature) => (
          <li key={feature} className="membershipIncludedItem">
            <Image src={featureIcons[feature]} alt={feature} width={24} height={24} />
            <span className="membershipIncludedLabel">{feature}</span>
          </li>
        ))}
      </ul>

      <Link href="/pages/profile/membership/change" className="membershipManageButton">
        <span>Ændre medlemskab</span>
        <span className="membershipManageArrow" aria-hidden="true">
          ›
        </span>
      </Link>

      <button type="button" className="membershipCancelButton" onClick={onCancel}>
        Annuller medlemskab
      </button>
    </section>
  );
}
