
import { StepComponent } from "../components/stepsComponent";
import CardInput from "../components/cardInput";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useState } from "react";

export default function OnboardingStep6() {
    const [paymentMethod, setPaymentMethod] = useState("card");

export default function OnboardingStep7() {
    return (
       
            <div className="Onboarding-6">
                <button
                          className='tilbageLink'
                          type="button"
                         
                        >
                          <FaChevronLeft /> Tilbage
                        </button>
                <h1>Betalingsmetode</h1>
                <div className="button">
                    <input
                        type="radio"
                        name="paymentMethod"
                        id="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                    />
                    <CiCreditCard1 size={39} />
                    <div>
                        <h3>Kort</h3>
                        <h4>Visa/Mastercard</h4>
                    </div>
                </div>
                <div className="button">
                    <input
                        type="radio"
                        name="paymentMethod"
                        id="mobilepay"
                        checked={paymentMethod === "mobilepay"}
                        onChange={() => setPaymentMethod("mobilepay")}
                    />
                    <CiCreditCard1 size={39} />
                    <h3>MobilePay</h3>
                </div>
                {paymentMethod === "card" && <CardInput />}
                {paymentMethod === "mobilepay" && <MobilePayInput />}
             <button
                      className='nextButton'
                      type="button"

                    >
                      <FaArrowRight />
                    </button>
            </div>
       
    );
}