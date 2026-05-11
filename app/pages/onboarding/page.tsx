"use client";
import OnboardingStep1 from './components/onboading'
import OnboardingStep2 from './components/onboarding_2'
import OnboardingStep3 from './components/onboarding_3';
import OnboardingStep4 from './components/onboarding_4';
import OnboardingStep5 from './components/onboarding_5';
import OnboardingStep7 from './components/onboarding_7';
import OnboardingStep6 from './components/onboarding_6';
import OnboadingStep8 from './components/onboarding_8';
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import Link from 'next/link';
import '../../globals.css'
import { useState } from 'react';



const steps = [
  OnboardingStep1,
  OnboardingStep2,
  OnboardingStep3,
  OnboardingStep4,
  OnboardingStep5,
  OnboardingStep6,
  OnboardingStep7,
  OnboadingStep8
]

export default function Onboarding() {
 const [step, setStep] = useState(0)

  const StepComponent = steps[step]

  return (
    <div className='Onboarding'>
      <button className='tilbageLink'
        disabled={step === 0}
        onClick={() => {
          if (step > 0) setStep(step - 1);
        }}
      >
       <FaChevronLeft /> Tilbage
      </button>
        <StepComponent />
      <button className='nextButton'
        disabled={step === steps.length - 1}
        onClick={() => {
          if (step < steps.length - 1) setStep(step + 1);
        }}
      >
       <FaArrowRight />
      </button>
       
        
        
     
    </div>
  );
}

