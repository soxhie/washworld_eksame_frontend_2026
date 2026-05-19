import { FaPlus } from "react-icons/fa6";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { IoReload } from "react-icons/io5";

import { useState } from "react";
import PinInput from "../components/pinInput";
import { StepComponent } from "../components/stepsComponent";
export default function OnboardingStep3() {
  return (
    <>
      <StepComponent currentStep={3} totalSteps={6} />
      <div className="Onboarding-4">
        <h1>Tilføj nummerplade</h1>
        <p>Vi bruger nummerpladen til automatisk genkendelse</p>
        <label htmlFor="">Nummerplade</label>
        <input
          type="text"
        />
        <button type="button"><FaPlus /> Tilføj endnu en bil</button>
        <a href="/pages/onboarding/step5">Tilføj senere</a>
        {/* isFilled can be used for validation UI if needed */}
      </div>
    </>
  );
}
