import { FaPlus } from "react-icons/fa6";
export default function OnboardingStep4() {

  return (
   <div className="Onboarding-4">
        <h1>Tilføj nummerplade</h1>
        <p>Vi bruger nummerpladen til automatisk genkendelse</p>
        <label htmlFor="">Nummerplade</label>
        <input type="text" />
        <button><FaPlus/> Tilføj endnu en bil</button>
        <a href="">Tilføj senere</a>
   </div> 
    );
}