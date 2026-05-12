import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
export default function OnboardingStep4() {
const [licensePlate, setLicensePlate] = useState("");
  return (
   <div className="Onboarding-4">
        <h1>Tilføj nummerplade</h1>
        <p>Vi bruger nummerpladen til automatisk genkendelse</p>
        <label htmlFor="">Nummerplade</label>
        <input type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} />
        <button><FaPlus/> Tilføj endnu en bil</button>
        <a href="">Tilføj senere</a>
   </div> 
    );
}