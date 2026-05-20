"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaInfinity } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { StepComponent } from "../components/stepsComponent";
import CardInput from "../components/cardInput";


export default function OnboardingStep6() {
    const [paymentMethod, setPaymentMethod] = useState("card");

    return (
       
            
            <div className="Onboarding-5">
                <button
                          className='tilbageLink'
                          type="button"
                        
                        >
                          <FaChevronLeft /> Tilbage
                        </button>
                <h1>Vælg Abonnement</h1>
                <p>Få ubegrænset bilvask til en fast lav pris og vask, hvor og hvornår det passer dig.</p>
                {plans.map(plan => (
                    <button
                        type="button"
                        key={plan.name}
                        className={clickedPlan === plan.name ? "plan-btn clicked" : "plan-btn"}
                    >
                        <input
                            type="radio"
                            value={plan.name}
                            readOnly
                        />
                        <div>
                            <h3>{plan.name.charAt(0).toUpperCase() + plan.name.slice(1)}- {plan.price}kr./md.</h3>
                            <h4>{plan.description}</h4>
                        </div>
                        <FaChevronRight />
                    </button>
                ))}
                 <button
                          className='nextButton'
                          type="button"

                        >
                          <FaArrowRight />
                        </button>
            </div>
    
    );
}


