"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LuArrowRight, LuCircle, LuCircleDot, LuCreditCard } from "react-icons/lu";
import AppHeader from "../../../../../../components/layout/AppHeader";
import BottomNav from "../../../../../../components/layout/BottomNav";
import "../../../../profile.css";

type PaymentMethod = "card" | "mobilepay";

export default function MembershipPaymentPage() {
  const router = useRouter();
  const { planId } = useParams<{ planId: string }>();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <main className="ProfilePage">
      <AppHeader variant="brand" />
      <section className="membershipPaymentView" aria-label="Betalingsmetode">
        <button
          type="button"
          className="profileBackButton"
          onClick={() => router.push(`/pages/profile/membership/change/${planId}`)}
        >
          <span aria-hidden="true">‹</span>
          Tilbage
        </button>

        <h1 className="membershipPaymentTitle">Betalingsmetode</h1>

        <div className="membershipPaymentList" role="radiogroup" aria-label="Vælg betalingsmetode">
          <button
            type="button"
            role="radio"
            aria-checked={selectedMethod === "card"}
            className={`membershipPaymentOption${selectedMethod === "card" ? " isSelected" : ""}`}
            onClick={() => setSelectedMethod("card")}
          >
            {selectedMethod === "card" ? (
              <LuCircleDot className="membershipPaymentRadio" aria-hidden="true" />
            ) : (
              <LuCircle className="membershipPaymentRadio" aria-hidden="true" />
            )}
            <LuCreditCard className="membershipPaymentIcon" aria-hidden="true" />
            <span className="membershipPaymentTextWrap">
              <span className="membershipPaymentName">Kort</span>
              <span className="membershipPaymentMeta">Visa/Mastercard</span>
            </span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={selectedMethod === "mobilepay"}
            className={`membershipPaymentOption${selectedMethod === "mobilepay" ? " isSelected" : ""}`}
            onClick={() => setSelectedMethod("mobilepay")}
          >
            {selectedMethod === "mobilepay" ? (
              <LuCircleDot className="membershipPaymentRadio" aria-hidden="true" />
            ) : (
              <LuCircle className="membershipPaymentRadio" aria-hidden="true" />
            )}
            <LuCreditCard className="membershipPaymentIcon" aria-hidden="true" />
            <span className="membershipPaymentTextWrap">
              <span className="membershipPaymentName">MobilePay</span>
              <span className="membershipPaymentMeta">Visa/Mastercard</span>
            </span>
          </button>
        </div>

        {selectedMethod === "card" && (
          <div className="membershipPaymentFields" aria-label="Kortoplysninger">
            <label className="membershipPaymentFieldLabel" htmlFor="card-number">Kortnummer</label>
            <input
              id="card-number"
              className="membershipPaymentFieldInput"
              type="text"
              inputMode="numeric"
              value={cardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
            />

            <div className="membershipPaymentFieldRow">
              <div className="membershipPaymentFieldCol">
                <label className="membershipPaymentFieldLabel" htmlFor="expiry-date">Udløbsdato</label>
                <input
                  id="expiry-date"
                  className="membershipPaymentFieldInput"
                  type="text"
                  inputMode="numeric"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(event) => setExpiryDate(event.target.value)}
                />
              </div>

              <div className="membershipPaymentFieldCol">
                <label className="membershipPaymentFieldLabel" htmlFor="cvv">CVV</label>
                <input
                  id="cvv"
                  className="membershipPaymentFieldInput"
                  type="text"
                  inputMode="numeric"
                  value={cvv}
                  onChange={(event) => setCvv(event.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {selectedMethod === "mobilepay" && (
          <div className="membershipPaymentFields" aria-label="MobilePay oplysninger">
            <label className="membershipPaymentFieldLabel" htmlFor="phone-number">Telefonnummer</label>
            <input
              id="phone-number"
              className="membershipPaymentFieldInput"
              type="tel"
              inputMode="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>
        )}

        <button
          type="button"
          className="membershipPaymentNext"
          onClick={() => router.push(`/pages/profile/membership/change/${planId}/success`)}
          aria-label="Fortsæt"
        >
          <LuArrowRight aria-hidden="true" />
        </button>
      </section>
      <BottomNav activeTab="profile" variant="angled" />
    </main>
  );
}
