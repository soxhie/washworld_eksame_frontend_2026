"use client";
import { use, useState } from "react"
import { useRef } from "react"
import "../onboarding.css"
import PasswordRequirements from "../components/passwordRequirements";
import { StepComponent } from "../components/stepsComponent";
import Toggle from "../components/toggle";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

export default function OnboardingStep2() {
    const [error, setError] = useState("")
    const [succes, setSuccess] = useState("")
    const emailRef = useRef<HTMLInputElement>(null);

    // Email validation handler
    const validateEmail = async () => {
        setError("");
        const email = emailRef.current?.value || "";
        if (!email) return;
        try {
            const res = await fetch("http://localhost:8080/email-validation", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_email: email })
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Bruger allerede oprettet");
            } else {
                setError("");
            }
        } catch (err) {
            setError("Serverfejl ved validering af email");
        }
    };
    
    
   
   
    return (
       
            <div className="Onboarding-2">
            <button
                      className='tilbageLink'
                      type="button"                  
                    >
                      <FaChevronLeft /> Tilbage
                    </button>
            <h1>Opret bruger</h1>
            <div className="inputContainer">
                <label>Email</label>
                <input
                    name="user_email"
                    type="text"
                    required
                    ref={emailRef}
                    
                />
                {error && <div style={{ color: 'red', marginTop: 4 }}>{error}</div>}
            </div>
            <PasswordRequirements />
          
            <Toggle />
             <button
                className='nextButton'
                type="button"
                onClick={() => {
                  validateEmail();
                }}
            >
                <FaArrowRight />
            </button>
        </div>
        
        );
}
