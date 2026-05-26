"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveOnboardingData } from "../utils/onboardingStorage";
import Toggle from "../components/toggle";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import PasswordRequirements from "../components/passwordRequirements";
import "../onboarding.css";
import Progress from "../components/progress";
import BackButton from "@/app/components/layout/BackButton";


export default function OnboardingStep1() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
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
    if (firstName.length < 2) {
      setError("First name must be at least 2 characters.");
      return;
    }
    if (firstName.length > 20) {
      setError("First name must be less than 20 characters.");
      return;
    }
    try {
      // Use query param for GET request
      const res = await fetch(`http://localhost:80/email-validation?user_email=${encodeURIComponent(email)}`);
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Bruger allerede oprettet");
        return;
      }
      if (password !== repeatPassword) {
        setError("Adgangkoder er ikke ens");
        return;
      }
     

      saveOnboardingData({ user_name: firstName, user_last_name: lastName, user_email: email, user_phone: phone, user_password: password });
      setTimeout(() => {
        router.push("/pages/onboarding/step2");
      }, 1500);
    } catch (err) {
      setError("Network error. Please try igen.");
    }
  };
  return (
    <div>
    <form className="Onboarding-1" onSubmit={validateEmail} action="#" autoComplete="off">
      {/* <button
        className='tilbageLink'
        type="button"
        onClick={() => router.back()}
      >
        <FaChevronLeft /> Tilbage
      </button> */}
        <BackButton/>
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
      <div className="inputContainer">
        <label>Telefonnummer</label>
        <input
          type="tel"
          required
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="12 34 56 78"


        />
      </div>

      {error && <div style={{ color: 'red', marginTop: 4 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 4 }}>{success}</div>}
      <PasswordRequirements
        password={password}
        setPassword={setPassword}
        repeatPassword={repeatPassword}
        setRepeatPassword={setRepeatPassword}
      />
      <Toggle />
      <button className='nextButton' type="submit">
        <FaArrowRight />
      </button>
    </form>
    <Progress/>
    </div>
  );
}