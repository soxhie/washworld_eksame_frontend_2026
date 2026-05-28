
import React from "react";


interface MobilePayInputProps {
    detailsForm: { phone: string };
    onPhoneChange: (phone: string) => void;
}

export default function MobilePayInput({ detailsForm, onPhoneChange }: MobilePayInputProps) {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="user_phone">Telefonnummer</label>
            <input
                type="tel"
                name="user_phone"
                id="user_phone"
                value={detailsForm.phone}
                onChange={e => onPhoneChange(e.target.value)}
            />
        </div>
    );
}