"use client";
import Image from "next/image";
import { useState } from "react";
import { saveOnboardingData } from "../utils/onboardingStorage";
import Toggle from "../components/toggle";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import PasswordRequirements from "../components/passwordRequirements";
import "../onboarding.css";

export default function OnboardingStep1() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("")
    const [succes, setSuccess] = useState("")
      
    
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
        
            <div className="Onboarding-1">
                 <button
                  className='tilbageLink'
                  type="button"
                 
                >
                  <FaChevronLeft /> Tilbage
                </button> 
                <h1 className="title">Indtast navn</h1>
                <div className="inputContainer">
                    <label>Navn</label>
                    <input
                        type="text"
                        name="user_name"
                        required
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="inputContainer">
                    <label htmlFor="Efternavn">Efternavn</label>
                    <input
                        type="text"
                        name="user_last_name"
                        required
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
               
            <div className="inputContainer">
                <label>Email</label>
                <input
                    name="user_email"
                    type="text"
                    required
                />
            </div>
            <PasswordRequirements/>
            <Toggle />
             <button
                        className='nextButton'
                        type="button"
                        onClick={() => {
                          validateEmail();
                          void saveOnboardingData({ firstName, lastName });
                        }}
                        
                      >
                        <FaArrowRight />
                      </button>

            </div>
       
    );
}
