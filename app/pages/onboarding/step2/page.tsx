"use client";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import PasswordRequirements from "../components/passwordRequirements";
export default function OnboardingStep2({ formData, updateFormData }: { formData: any, updateFormData: (data: any) => void }) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="Onboarding-2">
            <h1>Opret bruger</h1>
            <div className="inputContainer">
                <label>Email</label>
                <input
                    name="user_email"
                    type="text"
                    value={formData.user_email || ""}
                    onChange={e => updateFormData({ user_email: e.target.value })}
                    required
                />
            </div>
            <PasswordRequirements />
          
            <div className="toggleContainer">
                <p>Jeg acceptere <a href="">Terms & Condtions</a></p>
                <label className="switch">
                    <input type="checkbox" aria-required={true} />
                    {/* <input type="checkbox" required /> */}
                    <span className="slider round"></span>
                </label>
            </div>
            <div className="toggleContainer">
                <p>Jeg acceptere <a href="">Privacy guidelines</a></p>
                <label className="switch">
                    <input type="checkbox" aria-required={true} />
                    {/* <input type="checkbox" required /> */}
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    );
}
