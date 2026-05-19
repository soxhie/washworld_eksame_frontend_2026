"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaInfinity } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { StepComponent } from "../components/stepsComponent";
export default function OnboardingStep5() {
    const plans = [
        { name: "guld", price: 139, description: "God og effectiv" },
        { name: "premium", price: 169, description: "Extra Grundig" },
        { name: "brilliant", price: 200, description: "Bedste vask året rundt" }
    ];
    const [clickedPlan, setClickedPlan] = useState<string | null>(null);
    return (
        <>
            <StepComponent currentStep={4} totalSteps={7} />
            <div className="Onboarding-5">
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
                {/* isFilled can be used for validation UI if needed */}
            </div>
        </>
    );
}