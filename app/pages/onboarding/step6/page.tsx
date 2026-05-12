import { CiCreditCard1 } from "react-icons/ci";

import { useState } from "react";
export default function OnboardingStep6(){
    const [selectedPayment, setSelectedPayment] = useState("");
    return(
        <div className="Onboarding-6">
            <h1>Betalingsmetode</h1>
            <form action="">
            <div className="button">
                <input type="radio" name="paymentMethod" id="card" checked={selectedPayment === "card"} onChange={() => setSelectedPayment("card")} />
                <CiCreditCard1 size={39}/>
                <div>
                    <h3>Kort</h3>
                    <h4>Visa/Mastercard</h4>
                </div>
            </div>
            <div className="button">
                <input type="radio" name="paymentMethod" id="mobilepay" checked={selectedPayment === "mobilepay"} onChange={() => setSelectedPayment("mobilepay")} />
                <CiCreditCard1 size={39}/>
                <h3>MobilePay</h3>
            </div>
            <label htmlFor="">Kortnummer</label>
            <input  type="text" />
            <div style={{display:'flex',gap:"6px"}}>
                <div>
                    <label htmlFor="">Udløbsdato</label>
                    <input type="text"  />
                </div>
                <div>
                <label htmlFor="">CVV</label>
                <input type="text" maxLength={3} style={{width:"93px"}}/>
                </div>
            </div>
            <label htmlFor="">Telefonnummer</label>
            <input type="text" name="" id="" />
            </form>
        </div>
    )
}