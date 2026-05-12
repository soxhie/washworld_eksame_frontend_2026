import { CiCreditCard1 } from "react-icons/ci";
import { useState } from "react";
export default function OnboardingStep7(){
        const [selectedPayment, setSelectedPayment] = useState("");
        const [telefonnummer, setTelefonnummer] = useState("");
    return(
        <div className="Onboarding-7">
            <h1>Betalingsmetode</h1>
            <form action="">
            <div className="button">
                <input type="radio" name="paymentMethod" id="card" checked={selectedPayment === "card"} onChange={() => setSelectedPayment("card")} />
              
                <div>
                    <h3>Kort</h3>
                    <h4>Visa/Mastercard</h4>
                </div>
            </div>
            <div className="button">
                <input type="radio" name="paymentMethod" id="mobilepay" checked={selectedPayment === "mobilepay"} onChange={() => setSelectedPayment("mobilepay")} />
               
                <h3>MobilePay</h3>
            </div>
            <label htmlFor="">Telefonnummer</label>
            <input type="text" name="" id="" value={telefonnummer} onChange={(e) => setTelefonnummer(e.target.value)} />
            </form>
        </div>
    )
}