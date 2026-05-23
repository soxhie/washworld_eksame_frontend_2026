"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getOnboardingData, saveOnboardingData, clearOnboardingData } from "../utils/onboardingStorage";
import { FaArrowRight, FaChevronLeft } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
 
import CardInput from "../components/cardInput";
import "../onboarding.css";
import MobilePayInput from "../components/MobilepayInput";
 
type PaymentMethod = {
    payment_gateway_id: string;
    payment_gateway_name: string;
    payment_gateway_icon_path: string;
};
 
export default function OnboardingStep4() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("Card");
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
 
    useEffect(() => {
        fetch("http://localhost:80/api-payment-gateways")
            .then(res => res.json())
            .then(data => {
                console.log("response:", data);
                if (data.status === "ok") setMethods(data.gateways ?? []);
                else setError("Kunne ikke hente betalingsmetoder.");
            })
            .catch(() => setError("Netværksfejl. Prøv igen."));
    }, []);
    const payload = getOnboardingData();
    console.log("payload being sent:", payload);
 
    const handleSubmit = async () => {
        if (!paymentMethod) { setError("Vælg venligst en betalingsmetode."); return; }
        saveOnboardingData({ transaction_gateway_fk: paymentMethod });
        const payload = getOnboardingData();
 
        setSubmitting(true);
        try {
            const res = await fetch("http://localhost:80/api-signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.message || "Tilmelding mislykkedes."); return; }
            clearOnboardingData();
            router.push("/pages/onboarding/step5");
        } catch {
            setError("Netværksfejl. Prøv igen.");
        } finally {
            setSubmitting(false);
        }
    };
 
    return (
        <div className="Onboarding-4">
            <button className='tilbageLink' type="button" onClick={() => router.back()}>
                <FaChevronLeft /> Tilbage
            </button>
            <h1>Betalingsmetode</h1>
 
            {methods.map(method => (
                <div
                    key={method.payment_gateway_id}
                    className={`button ${paymentMethod === method.payment_gateway_id ? "clicked" : ""}`}
                    onClick={() => setPaymentMethod(method.payment_gateway_id)}
                >
                    <img src={`http://localhost:80/icons/${method.payment_gateway_icon_path}`}
                        alt={method.payment_gateway_name}
                        style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "contain",
                        }} />
                    <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === method.payment_gateway_id}
                        readOnly
                    />
                    
                    <CiCreditCard1 size={39} />
                    <h3>{method.payment_gateway_name}</h3>
                </div>
            ))}

               
                {(() => {
                    const selectedMethod = methods.find(m => m.payment_gateway_id === paymentMethod);
                    if (!selectedMethod) return null;
                    if (selectedMethod.payment_gateway_name === "Mobilepay") {
                        return <MobilePayInput />;
                    }
                    if (selectedMethod.payment_gateway_name === "Betalingskort") {
                        return <CardInput />;
                    }
                    return null;
                })()}
                  

            <button className='nextButton' type="button" onClick={handleSubmit} disabled={submitting}>
                 <FaArrowRight />
            </button>
        </div>
    );
}
 
 