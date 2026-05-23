"use client";

import { useState } from "react";
import { IoPeopleOutline } from "react-icons/io5";

interface MembershipCancelViewProps {
  onBack: () => void;
}

export default function MembershipCancelView({ onBack }: MembershipCancelViewProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const cancelReasons = ["For dyrt", "Bruger det ikke", "Andet"];

  return (
    <section className="membershipCancelView" aria-label="Annuller medlemskab">
      <button type="button" className="profileBackButton" onClick={onBack}>
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
        * Hvis du opsiger nu, fortsætter medlemskabet til slutningen af din betalingsperiode.
      </p>

      <h3 className="membershipCancelReasonTitle">
        Hjælp os med at blive bedre og fortæl hvorfor du ønsker at annullere dit medlemskab
      </h3>

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
