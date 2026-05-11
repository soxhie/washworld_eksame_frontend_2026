import { CiCreditCard1 } from "react-icons/ci";
export default function OnboardingStep7(){

    return(
        <div className="Onboarding-7">
            <h1>Betalingsmetode</h1>
            <form action="">
            <div className="button">
                <input type="radio" name="paymentMethod" id="card" />
              
                <div>
                    <h3>Kort</h3>
                    <h4>Visa/Mastercard</h4>
                </div>
            </div>
            <div className="button">
                <input type="radio" name="paymentMethod" id="mobilepay" />
               
                <h3>MobilePay</h3>
            </div>
            <label htmlFor="">Telefonnummer</label>
            <input type="text" name="" id="" />
            </form>
        </div>
    )
}