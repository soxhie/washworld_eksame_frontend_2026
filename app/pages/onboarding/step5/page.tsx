import { FaPlus } from "react-icons/fa6";
import { FaInfinity } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { useState } from "react";
export default function OnboardingStep5() {
  const [selectedPlan, setSelectedPlan] = useState("");
    const plans = [
        { name: "guld", price: 139, description: "God og effectiv" },
        { name: "premium", price: 169, description: "Extra Grundig" },
        { name: "brilliant", price: 200, description: "Bedste vask året rundt" }
    ];
  return (
   <div className="Onboarding-5">
        <h1>Vælg Abonnement</h1>
        <p><FaInfinity/> Ubegrænset bilvask</p>
            <button >
            <input type="radio" value="guld" checked={selectedPlan === "guld"} onChange={() => setSelectedPlan("guld")} />
            <div>
                <h3>Guld- 139kr./md.</h3>
                <h4>God og effectiv</h4>
            </div>
            <FaChevronRight/>
            </button>
        <button>
            <input type="radio" value="premium" checked={selectedPlan === "premium"} onChange={() => setSelectedPlan("premium")} />
            <div>
                <h3>Premium- 169kr./md.</h3>
                <h4>Extra Grundig</h4>
            </div>
                <FaChevronRight/>

        </button>
        <button>
            <input type="radio" value="brilliant" checked={selectedPlan === "brilliant"} onChange={() => setSelectedPlan("brilliant")} />
            <div>
            <h3>Brilliant- 200kr./md.</h3>
            <h4>Bedste vask året rundt</h4>
            </div>
             <FaChevronRight/>
        </button>
   </div> 
    );
}