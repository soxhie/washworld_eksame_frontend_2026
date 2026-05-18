
"use client";

import React from "react";

import OnboardingStep1 from "./Step1/page";
import OnboardingStep2 from "./step2/page";
import OnboardingStep3 from "./step3/page";
import OnboardingStep4 from "./step4/page";
import OnboardingStep5 from "./step5/page";
import OnboardingStep6 from "./step6/page";
import OnboardingStep7 from "./step7/page";
import OnboardingStep8 from "./step8/page";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
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
  OnboardingStep8
];



function StepComponent({ stepIndex, formData, updateFormData, onNext, onBack }) {
  const Step = steps[stepIndex];
  return (
    <div>
      <button
        className='tilbageLink'
        type="button"
        onClick={onBack}
        disabled={stepIndex === 0}
      >
        <FaChevronLeft /> Tilbage
      </button>
      <Step formData={formData} updateFormData={updateFormData} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
        <button
          className='nextButton'
          type="button"
          onClick={onNext}
          disabled={stepIndex === steps.length - 1}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default function Onboarding() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);



  // Save formData to localStorage on every change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("onboardingFormData", JSON.stringify(formData));
      // Debug: log the saved data for each step
      const saved = localStorage.getItem("onboardingFormData");
      console.log("[Onboarding] Saved to localStorage:", saved);
    }
  }, [formData]);

  // Load formData from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("onboardingFormData");
      if (saved) {
        try {
          setFormData(JSON.parse(saved));
        } catch {}
      }
    }
  }, []);

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    // If moving to step 8 (index 7), trigger signup
    if (currentStep === steps.length - 2) {
      await handleSignup();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };


  // Signup handler: posts data to backend and clears localStorage on success
  const handleSignup = async () => {
    setError("");
    setSuccess("");
    try {
      let dataToSend = formData;
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("onboardingFormData");
        if (saved) {
          try {
            dataToSend = JSON.parse(saved);
          } catch {}
        }
      }
      const response = await fetch("http://127.0.0.1:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        let errorMsg = "Signup failed.";
        try {
          const data = await response.json();
          errorMsg = data.error || data.message || errorMsg;
        } catch {}
        throw new Error(errorMsg);
      }
      setSuccess("Signup successful!");
      if (typeof window !== "undefined") {
        localStorage.removeItem("onboardingFormData");
      }
    } catch (error) {
      setError(error.message || "An error occurred during signup.");
    }
  };

  return (
    <div className='Onboarding'>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={e => e.preventDefault()}>
        <StepComponent
          stepIndex={currentStep}
          formData={formData}
          updateFormData={setFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
        {/* Show signup button only on last step (optional, but signup is triggered on step 8 automatically) */}
        {currentStep === steps.length - 1 && (
          <button type="button" className="signupButton" onClick={handleSignup} style={{marginTop: 24}}>
            Sign Up
          </button>
        )}
      </form>
    </div>
  );
}

