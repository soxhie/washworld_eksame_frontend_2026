"use client";
import { CiCreditCard1 } from "react-icons/ci";
import MobilePayInput from "../components/MobilepayInput";
import { StepComponent } from "../components/stepsComponent";
import CardInput from "../components/cardInput";
import { useState } from "react";

export default function OnboardingStep5() {
    const [paymentMethod, setPaymentMethod] = useState("card");

    return (
        <>
            <StepComponent currentStep={5} totalSteps={6} />
            <div className="Onboarding-6">
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
            </div>
        </>
    );
}


