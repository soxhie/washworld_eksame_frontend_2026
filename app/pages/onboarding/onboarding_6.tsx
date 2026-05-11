import { CiCreditCard1 } from "react-icons/ci";
export default function OnboardingStep6(){

    return(
        <div className="Onboarding-6">
            <h1>Betalingsmetode</h1>
            <button>
                <input type="radio" name="" id="" />
                <CiCreditCard1 size={39}/>
                <div>
                    <h3>Kort</h3>
                    <h4>Visa/Mastercard</h4>
                </div>
            </button>
            <button>
                <input type="radio" name="" id="" />
                <CiCreditCard1 size={39}/>
                <h3>MobilePay</h3>
            </button>
        </div>
    )
}