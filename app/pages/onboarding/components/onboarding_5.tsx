import { FaPlus } from "react-icons/fa6";
import { FaInfinity } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
export default function OnboardingStep5() {

  return (
   <div className="Onboarding-5">
        <h1>Vælg Abonnement</h1>
        <p><FaInfinity/> Ubegrænset bilvask</p>
        <button>
            <div>
                <h3>Guld- 139kr./md.</h3>
                <h4>God og effectiv</h4>
            </div>
            <FaChevronRight/>
            </button>
        <button>
            <div>
                <h3>Premium- 169kr./md.</h3>
                <h4>Extra Grundig</h4>
            </div>
                <FaChevronRight/>

        </button>
        <button>
            <div>
            <h3>Brilliant- 200kr./md.</h3>
            <h4>Bedste vask året rundt</h4>
            </div>
             <FaChevronRight/>
        </button>
   </div> 
    );
}