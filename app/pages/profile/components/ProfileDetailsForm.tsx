import {
  LuCar,
  LuCreditCard,
  LuLock,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";
import React from "react";
import BackButton from "../../../components/layout/BackButton";
import BetalingToggle from "../../onboarding/components/betalingToggle";
import { useEffect, useState } from "react";
interface ProfileDetailsFormProps {
  detailsForm: {
    phone: string;
    email: string;
    password: string;
    paymentMethod: string;
    address: string;
    plateNumber: string;
  };
  onChange: (field: keyof ProfileDetailsFormProps["detailsForm"], value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
  saveMessage: string | null;
}
type PaymentMethod = {
  payment_gateway_id: string;
  payment_gateway_name: string;
  payment_gateway_icon_path: string;
};

export default function ProfileDetailsForm({
  detailsForm,
  onChange,
  onSubmit,
  onBack,
  saveMessage,
}: ProfileDetailsFormProps) {
  const [showPopup, setShowPopUp] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Card");
    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

   useEffect(() => {
    fetch("http://localhost:80/api-payment-gateways")
      .then((res) => res.json())
      .then((data) => {
        console.log("response:", data);
        if (data.status === "ok") setMethods(data.gateways ?? []);
        else setError("Kunne ikke hente betalingsmetoder.");
      })
      .catch(() => setError("Netværksfejl. Prøv igen."));
  }, []);
  

   
  
  return (
    <section className="profileDetails" aria-label="Mine oplysninger formular">
      {/* <button
        type="button"
        className="profileBackButton"
        onClick={onBack}
      >
        <span aria-hidden="true">‹</span>
        Tilbage
      </button> */}
      <BackButton />
      

      <form className="detailsForm" onSubmit={onSubmit}>
        {/* <h3 className="detailsFormTitle" style={{ color: "#fff", marginBottom: "0.5rem", fontSize: "var(--h3-size)", fontWeight: 800, marginLeft: "10px" }}>Mine oplysninger</h3> */}
                <h1 style={{ fontSize: "var(--display-h1-size)", lineHeight: "var(--display-h1-line)", fontWeight: 800, marginBottom:"10px", textAlign: "center" }}>Mine oplysninger</h1>
        <label className="detailsField" htmlFor="details-phone">
          <span className="detailsFieldLabelWrap">
            <LuPhone className="detailsFieldIcon" aria-hidden="true" />
            <span className="detailsFieldLabel">Telefonnummer</span>
          </span>
          <div className="detailsFieldValueRow">
            <input
              id="details-phone"
              type="tel"
              className="detailsFieldInput"
              value={detailsForm.phone}
              onChange={(event) => onChange("phone", event.target.value)}
            />

          </div>
        </label>

        <label className="detailsField" htmlFor="details-email">
          <span className="detailsFieldLabelWrap">
            <LuMail className="detailsFieldIcon" aria-hidden="true" />
            <span className="detailsFieldLabel">E-mail</span>
          </span>
          <div className="detailsFieldValueRow">
            <input
              id="details-email"
              type="email"
              className="detailsFieldInput"
              value={detailsForm.email}
              onChange={(event) => onChange("email", event.target.value)}
            />

          </div>
        </label>

        <label className="detailsField" htmlFor="details-password">
          <span className="detailsFieldLabelWrap">
            <LuLock className="detailsFieldIcon" aria-hidden="true" />
            <span className="detailsFieldLabel">Adgangskode</span>
          </span>
          <div className="detailsFieldValueRow">
            <input
              id="details-password"
              type="text"
              className="detailsFieldInput"
              value={detailsForm.password}
              onChange={(event) => onChange("password", event.target.value)}
            />

          </div>
        </label>

        <label className="detailsField" htmlFor="details-payment">
          <span className="detailsFieldLabelWrap">
            <LuCreditCard className="detailsFieldIcon" aria-hidden="true" />
            <span className="detailsFieldLabel">Betalingsmetode</span>
          </span>
          <div className="detailsFieldValueRow">
            <button
              type="button"
              id="details-payment"
              className="detailsFieldInput"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
              onClick={() => setShowPopUp(true)}
            >
              {/* Show the selected payment method icon if available, otherwise default icon */}
              {(() => {
                const selected = methods.find((m) => m.payment_gateway_id === detailsForm.paymentMethod);
                if (selected) {
                  return (
                    <img
                      src={`http://localhost:80/icons/${selected.payment_gateway_icon_path}`}
                      alt={selected.payment_gateway_name}
                      style={{ width: "28px", height: "28px", objectFit: "contain" }}
                    />
                  );
                }
                return <LuCreditCard aria-hidden="true" />;
              })()}
              <span>
                {(() => {
                  const selected = methods.find((m) => m.payment_gateway_id === detailsForm.paymentMethod);
                  return selected ? selected.payment_gateway_name : "Vælg betalingsmetode";
                })()}
              </span>
            </button>
          </div>
        </label>

        <label className="detailsField" htmlFor="details-address">
          <span className="detailsFieldLabelWrap">
            <LuMapPin className="detailsFieldIcon" aria-hidden="true" />
            <span className="detailsFieldLabel">Adresse</span>
          </span>
          <div className="detailsFieldValueRow">
            <input
              id="details-address"
              type="text"
              className="detailsFieldInput"
              value={detailsForm.address}
              onChange={(event) => onChange("address", event.target.value)}
            />

          </div>
        </label>

        <label className="detailsField" htmlFor="details-plate">
          <span className="detailsFieldLabelWrap">
            <LuCar className="detailsFieldIcon" aria-hidden="true" />
            <span className="detailsFieldLabel">Nummerplade</span>
          </span>
          <div className="detailsFieldValueRow">
            <input
              id="details-plate"
              type="text"
              className="detailsFieldInput"
              value={detailsForm.plateNumber}
              onChange={(event) => onChange("plateNumber", event.target.value)}
            />

          </div>
        </label>

        <button type="submit" className="detailsSaveButton">
          Gem alle oplysninger
        </button>

        {saveMessage ? <p className="detailsSaveMessage">{saveMessage}</p> : null}
      </form>
      {showPopup && (
        <div className="betalingsOverlay">
          <div className="batalingPopup">
            <h1>Betalingsmetoder</h1>

            {methods.map((method) => (
              <div
                key={method.payment_gateway_id}
                className={`button ${detailsForm.paymentMethod === method.payment_gateway_id ? "clicked" : ""}`}
                onClick={() => {
                  setPaymentMethod(method.payment_gateway_id);
                  onChange("paymentMethod", method.payment_gateway_id);
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
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={detailsForm.paymentMethod === method.payment_gateway_id}
                  readOnly
                />
                <h3>{method.payment_gateway_name}</h3>
              </div>
            ))}
            <button
              className="detailsSaveButton"
              type="button"
              onClick={() => setShowPopUp(false)}
            >
              Gem
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
