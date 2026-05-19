"use client";
import { useState } from "react";

import "../onboarding.css"
import PasswordRequirements from "../components/passwordRequirements";
import { StepComponent } from "../components/stepsComponent";
import Toggle from "../components/toggle";
export default function OnboardingStep2() {

    return (
        <>
            <StepComponent currentStep={2} totalSteps={6} />
            <div className="Onboarding-2">
                <h1>Opret bruger</h1>
                <div className="inputContainer">
                    <label>Email</label>
                    <input
                        name="user_email"
                        type="text"

                        required
                    />
                </div>
                <PasswordRequirements />

                <Toggle />
            </div>
        </>);
}
