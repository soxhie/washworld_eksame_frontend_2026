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
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Check if email is present
    if (!email) {
      setError("Email is required.");
      return;
    }
    try {
      // Use query param for GET request
      const res = await fetch(`http://localhost:80/email-validation?user_email=${encodeURIComponent(email)}`);
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "User already signed up");
        return;
      }
      setSuccess("Signup successful!");
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };
  return (
    <form className="Onboarding-1" onSubmit={validateEmail}>
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
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      {error && <div style={{ color: 'red', marginTop: 4 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 4 }}>{success}</div>}
      <PasswordRequirements />
      <Toggle />
      <button
        className='nextButton'
        type="submit"
      >
        <FaArrowRight />
      </button>
    </form>
  );
}
