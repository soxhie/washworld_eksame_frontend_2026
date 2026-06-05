"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getOnboardingData, clearOnboardingData } from "../utils/onboardingStorage";
import { FaArrowRight } from "react-icons/fa";
import BetalingToggle from "../components/betalingToggle";
import "../onboarding.css";
import "../../../globals.css"
import Progress from "../components/progress";
import BackButton from "@/app/components/layout/BackButton";
import { saveOnboardingData } from "../utils/onboardingStorage";

// type PaymentMethod = {
//   payment_gateway_id: string;
//   payment_gateway_name: string;
//   payment_gateway_icon_path: string;
// };

export default function OnboardingStep6() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [methods, setMethods] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");


   useEffect(() => {
     fetch("http://localhost:80/api-payment-gateways")
       .then((res) => res.json())
       .then((data) => {
         console.log("response:", data);
         if (data.status === "ok") setMethods(data.gateways ?? []);
         else setError("Kunne ikke hente betalingsmetoder.");
       })
       .catch(() => setError("Netværksfejl. Prøv igen."));
   }, []);
   const payload = getOnboardingData();
   console.log("payload being sent:", payload);

  const handleSubmit = async () => {
    setError("");
    const payload = getOnboardingData();
    const selectedGateway = payload.transaction_gateway_fk;
    const membershipFk = payload.membership_fk;
    const userName = payload.user_name;
    const userLastName = payload.user_last_name;
    const userEmail = payload.user_email;
    const userPhone = payload.user_phone;
    const userPassword = payload.user_password;
   
    const carPlate = payload.car_plate;

    if (typeof selectedGateway !== "string" || !selectedGateway) {
      setError("Vælg venligst en betalingsmetode.");
      return;
    }
    saveOnboardingData({ transaction_gateway_fk: paymentMethod });
    
    setSubmitting(true);
    try {
      localStorage.removeItem("onboarding_verification_key");
      localStorage.removeItem("onboarding_email_verified");

      const res = await fetch("http://localhost:80/api-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Tilmelding mislykkedes.");
        return;
      }
      if (data.verification_key) {
        localStorage.setItem("onboarding_verification_key", data.verification_key);
      }
      clearOnboardingData();
      router.push("/pages/onboarding/step7");
    } catch {
      setError("Netværksfejl. Prøv igen.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="Onboarding-4">
      <BackButton />
      <h1>Betalingsmetode</h1>
        {/* <BetalingToggle/> */}
        <BetalingToggle onSelect={setPaymentMethod} />
      {error && <p className="error">{error}</p>}
      <button className="nextButton" type="button" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "..." : <FaArrowRight />}
      </button>
      <Progress />
    </div>
  );
}
