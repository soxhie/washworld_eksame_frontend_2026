import { FaPlus } from "react-icons/fa6";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { IoReload } from "react-icons/io5";

import { useState } from "react";
import PinInput from "../components/pinInput";

import "../onboarding.css"
export default function OnboardingStep3() {


  return (
    
      <div className="Onboarding-3">
        <button
                  className='tilbageLink'
                  type="button"
                 
                >
                  <FaChevronLeft /> Tilbage
                </button>
        <h1>Indtast kode</h1>
        <p>Indtast den kode, der er sendt til din e-mail. (Tjek også din spam-mappe)</p>
        <PinInput />
        <p>Det kan tage op til 1 minut at modtage koden.</p>
        <a href=""><IoReload /> Gensend kode</a>
         <button
            className='nextButton'
            type="button"
            onClick={() => {
              
            }}
          >
            <FaArrowRight />
          </button>
      </div>
      
  );
}
