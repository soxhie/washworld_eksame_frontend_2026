"use client";

import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import Link from 'next/link';
import "./onboarding.css";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';




const steps = [
  OnboardingStep1,
  OnboardingStep2,
  OnboardingStep3,
  OnboardingStep4,
  OnboardingStep5,
  OnboardingStep6,
  OnboardingStep7,
  OnboadingStep8
];
   
export default function Onboarding() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // Get step from search params, default to 0
  const stepParam = searchParams.get('step');
  const step = stepParam ? Math.max(0, Math.min(steps.length - 1, parseInt(stepParam))) : 0;
  const StepComponent = steps[step];

  // Navigation helpers
  const goToStep = (newStep: number) => {
    router.push(`?step=${newStep}`);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const form = e.target as HTMLFormElement;
      const res = await fetch("http://localhost:80/signup", {
        method: "POST",
        body: new FormData(form)
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data || { status: "error", message: "Signup failed" });
        return;
      }
      setSuccess("Signup successful!");
      setTimeout(() => {
        // Optionally redirect or reset
      }, 1500);
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className='Onboarding'>
      <button
        className='tilbageLink'
        disabled={step === 0}
        onClick={() => {
          if (step > 0) goToStep(step - 1);
        }}
      >
        <FaChevronLeft /> Tilbage
      </button>
      <form onSubmit={handleSubmit}>
        <StepComponent />
      </form>
      {error && <div style={{ color: "red", marginTop: "10px" }}>{typeof error === 'string' ? error : error.message || JSON.stringify(error)}</div>}
      {success && <div style={{ color: "green", marginTop: "10px" }}>{success}</div>}
      {step < steps.length - 1 ? (
        <Link href={`?step=${step + 1}`} passHref legacyBehavior>
          <button
            className='nextButton'
            type="button"
          >
            <FaArrowRight />
          </button>
        </Link>
      ) : (
        <button
          className='nextButton'
          type="button"
          disabled
        >
          <FaArrowRight />
        </button>
      )}
    </div>
  );
}

