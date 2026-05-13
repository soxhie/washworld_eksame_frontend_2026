import { FaPlus } from "react-icons/fa6";
import { FaInfinity } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { useState } from "react";
export default function OnboardingStep5({  }) {
    const plans = [
        { name: "guld", price: 139, description: "God og effectiv" },
        { name: "premium", price: 169, description: "Extra Grundig" },
        { name: "brilliant", price: 200, description: "Bedste vask året rundt" }
    ];
    return (
        <div className="Onboarding-5">
            <h1>Vælg Abonnement</h1>
            <p><FaInfinity /> Ubegrænset bilvask</p>
            {plans.map(plan => (
                <button type="button" key={plan.name}>
                    <input
                        type="radio"
                        value={plan.name}
                        
                    />
                    <div>
                        <h3>{plan.name.charAt(0).toUpperCase() + plan.name.slice(1)}- {plan.price}kr./md.</h3>
                        <h4>{plan.description}</h4>
                    </div>
                    <FaChevronRight />
                </button>
            ))}
        </div>
    );
}