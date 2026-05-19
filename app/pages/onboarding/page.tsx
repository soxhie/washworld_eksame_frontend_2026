
"use client";

import React from "react";

import OnboardingStep1 from "./step1/page";
import OnboardingStep2 from "./step2/page";
import OnboardingStep4 from "./step2/page";
import OnboardingStep5 from "./step3/page";
import OnboardingStep6 from "./step4/page";
import OnboardingStep7 from "./step5/page";

import { StepComponent } from "./components/stepsComponent";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import "./onboarding.css";
import { useState, useEffect } from 'react';




export default function Onboarding() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [value, setValue] = useState("")

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
          } catch { }
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
        } catch { }
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



    </div>
  );
}

