"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveOnboardingData } from "../utils/onboardingStorage";
import { FaArrowRight } from "react-icons/fa";
import PinInput from "../components/pinInput";
import "../onboarding.css";
import Progress from "../components/progress";
import BackButton from "@/app/components/layout/BackButton";


export default function OnboardingStep3() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [pinCode, setPinCode] = useState("");

  const validateEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (pinCode.length !== 4) {
      setError("Indtast en 4-cifret PIN-kode.");
      return;
    }

    try {
      saveOnboardingData({ user_pin_code: pinCode });
      router.push("/pages/onboarding/step4");
    } catch {
      setError("Network error. Please try igen.");
    }
  };

  return (
    <div>
      <form className="Onboarding-1" onSubmit={validateEmail} action="#" autoComplete="off">
        <BackButton />
        <h1 className="title">Indtast PIN-kode</h1>

        <PinInput onChange={setPinCode} />
        {error && <div style={{ color: "red", marginTop: 4 }}>{error}</div>}

        <button className="nextButton" type="submit">
          <FaArrowRight />
        </button>
      </form>
      <Progress />
    </div>
  );
}