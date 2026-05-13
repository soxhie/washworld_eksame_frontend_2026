import { CiCreditCard1 } from "react-icons/ci";
import { useState } from "react";
export default function OnboardingStep7({ formData, updateFormData }) {
    return (
        <div className="Onboarding-7">
            <h1>Betalingsmetode</h1>
            <div className="button">
                <input
                    type="radio"
                    name="paymentMethod"
                    id="card"
                    checked={formData.transaction_gateway_fk === "card"}
                    onChange={() => updateFormData({ transaction_gateway_fk: "card" })}
                />
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
                    checked={formData.transaction_gateway_fk === "mobilepay"}
                    onChange={() => updateFormData({ transaction_gateway_fk: "mobilepay" })}
                />
                <h3>MobilePay</h3>
            </div>
            <label htmlFor="">Telefonnummer</label>
            <input
                type="text"
                name="user_phone"
                id="user_phone"
                value={formData.user_phone}
                onChange={e => updateFormData({ user_phone: e.target.value })}
            />
        </div>
    );
}