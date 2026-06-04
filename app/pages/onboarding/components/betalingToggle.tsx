"use client";
import { useState, useEffect } from "react";
import { getOnboardingData, saveOnboardingData } from "../utils/onboardingStorage";
import CardInput from "../components/cardInput";
import "../onboarding.css";
import "../../../globals.css"
import MobilePayInput from "../components/MobilepayInput";


type PaymentMethod = {
  payment_gateway_id: string;
  payment_gateway_name: string;
  payment_gateway_icon_path: string;
};


export default function BetalingToggle() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const payload = getOnboardingData();
  const [phone, setPhone] = useState(typeof payload.user_phone === "string" ? payload.user_phone : "");
  
  const handlePhoneChange = (newPhone: string) => {
    setPhone(newPhone);
    saveOnboardingData({ user_phone: newPhone });
  };
  
  useEffect(() => {
    fetch("http://localhost:80/api-payment-gateways")
      .then((res) => res.json())
      .then((data) => {
        console.log("response:", data);
        if (data.status === "ok") {
          setMethods(data.gateways ?? []);
          const savedGateway = payload.transaction_gateway_fk;
          if (typeof savedGateway === "string") {
            setPaymentMethod(savedGateway);
          }
        }
        else console.error("Kunne ikke hente betalingsmetoder.");
      })
      .catch(() => console.error("Netværksfejl. Prøv igen."));
  }, []);

  return (
    <div className="Onboarding-4">
     
      {methods.map((method) => (
        <div
          key={method.payment_gateway_id}
          className={`button ${paymentMethod === method.payment_gateway_id ? "clicked" : ""}`}
          onClick={() => {
            setPaymentMethod(method.payment_gateway_id);
            saveOnboardingData({ transaction_gateway_fk: method.payment_gateway_id });
          }}
        >
          <img
            src={`http://localhost:80/icons/${method.payment_gateway_icon_path}`}
            alt={method.payment_gateway_name}
            style={{
              width: "40px",
              height: "40px",
              objectFit: "contain",
            }}
          />
          <input type="radio" name="paymentMethod" checked={paymentMethod === method.payment_gateway_id} readOnly />

         
          <h3>{method.payment_gateway_name}</h3>
        </div>
      ))}

      {(() => {
        const selectedMethod = methods.find((m) => m.payment_gateway_id === paymentMethod);
        if (!selectedMethod) return null;
        if (selectedMethod.payment_gateway_name === "Mobilepay") {
          return <MobilePayInput detailsForm={{ phone }} onPhoneChange={handlePhoneChange} />;
        }
        if (selectedMethod.payment_gateway_name === "Betalingskort") {
          return (
            <CardInput
            />
          );
        }
        return null;
      })()}

      
    </div>
  );
}

