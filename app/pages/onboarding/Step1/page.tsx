"use client";
import Image from "next/image";
import { useState } from "react";
import { saveOnboardingData } from "../utils/onboardingStorage";
import Toggle from "../components/toggle";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import PasswordRequirements from "../components/passwordRequirements";
import "../onboarding.css";
import { StepComponent } from "../components/stepsComponent";
export default function OnboardingStep1() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    return (
        
            <div className="Onboarding-1">
                 <button
                  className='tilbageLink'
                  type="button"
                 
                >
                  <FaChevronLeft /> Tilbage
                </button> <button
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
                <h1>Opret bruger</h1>
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
                          handleNext();
                        }}
                      >
                        <FaArrowRight />
                      </button>

            </div>
       
    );
}
