
"use client";
import Image from "next/image";
import { useState } from "react";
import "../onboarding.css"
export default function OnboardingStep1({ formData, updateFormData }: { formData: any, updateFormData: (data: any) => void }) {
    
    
    return (
        <div className="Onboarding-1">
            <h1 className="title">Indtast navn</h1>
            <div className="inputContainer">
                <label>Navn</label>
                <input
                    type="text"
                    name="user_name"
                    value={formData.user_name || ""}
                    onChange={e => updateFormData({ user_name: e.target.value })}
                    required
                />
            </div>
            <div className="inputContainer">
                <label htmlFor="Efternavn">Efternavn</label>
                <input
                    type="text"
                    name="user_last_name"
                    value={formData.user_last_name || ""}
                    onChange={e => updateFormData({ user_last_name: e.target.value })}
                    required
                />
            </div>
        </div>
    );
}
