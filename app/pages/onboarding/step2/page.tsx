"use client";
import { useState } from "react";
import Toggle from "../components/toggle";
import "../onboarding.css"
import PasswordRequirements from "../components/passwordRequirements";
import { StepComponent } from "../components/stepsComponent";
export default function OnboardingStep2() {
   
    return (
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
          
            <div className="toggleContainer">
                <p>Jeg acceptere <a href="">Terms & Condtions</a></p>
                <label className="switch">
                    <input type="checkbox" required />
                    <span className="slider round"></span>
                </label>
            </div>
            <div className="toggleContainer">
                <p>Jeg acceptere <a href="">Privacy guidelines</a></p>
                <label className="switch">
                    <input type="checkbox" required />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    );
}
