"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getOnboardingData, saveOnboardingData, clearOnboardingData } from "../utils/onboardingStorage";
import { FaArrowRight, FaChevronLeft } from "react-icons/fa";
import BetalingToggle from "../components/betalingToggle";
import "../onboarding.css";
import "../../../globals.css"
import Progress from "../components/progress";
import BackButton from "@/app/components/layout/BackButton";

// type PaymentMethod = {
//   payment_gateway_id: string;
//   payment_gateway_name: string;
//   payment_gateway_icon_path: string;
// };

export default function OnboardingStep6() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("");
  // const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");


  // useEffect(() => {
  //   fetch("http://localhost:80/api-payment-gateways")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("response:", data);
  //       if (data.status === "ok") setMethods(data.gateways ?? []);
  //       else setError("Kunne ikke hente betalingsmetoder.");
  //     })
  //     .catch(() => setError("Netværksfejl. Prøv igen."));
  // }, []);
  // const payload = getOnboardingData();
  // console.log("payload being sent:", payload);

  const handleSubmit = async () => {
    if (!paymentMethod) {
      setError("Vælg venligst en betalingsmetode.");
      return;
    }
    saveOnboardingData({ transaction_gateway_fk: paymentMethod });
    const payload = getOnboardingData();
    setSubmitting(true);
    try {
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
        <FaArrowRight />
      </button>
      <Progress />
    </div>
  );
}
