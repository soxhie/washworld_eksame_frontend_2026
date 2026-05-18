import {
  LuCar,
  LuCreditCard,
  LuLock,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";
import React from "react";

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

export default function ProfileDetailsForm({
  detailsForm,
  onChange,
  onSubmit,
  onBack,
  saveMessage,
}: ProfileDetailsFormProps) {
  return (
    <section className="profileDetails" aria-label="Mine oplysninger formular">
      <button
        type="button"
        className="profileBackButton"
        onClick={onBack}
      >
        <span aria-hidden="true">‹</span>
        Tilbage
      </button>

      <form className="detailsForm" onSubmit={onSubmit}>
        <h1 className="detailsFormTitle">Mine oplysninger</h1>

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
            <input
              id="details-payment"
              type="text"
              className="detailsFieldInput"
              value={detailsForm.paymentMethod}
              onChange={(event) => onChange("paymentMethod", event.target.value)}
            />

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
    </section>
  );
}
