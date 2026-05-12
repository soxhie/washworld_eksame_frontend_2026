
"use client";
import Image from "next/image";
import { useState } from "react";
export default function OnboardingStep1() {
    const [username, setUsername] = useState("");
    const [userLastName, setUserLastName] = useState("");
  return (
   <div className="Onboarding-1">

        <h1 className="title">Indtast navn</h1>
    
    <div className="inputContainer">
        <label>Navn</label>
        <input type="text" name="user_name" value={username} onChange={(e) => setUsername(e.target.value)} required />
    </div>
    <div className="inputContainer">
        <label htmlFor="Efternavn">Efternavn</label>
        <input type="text" name="user_last_name" value={userLastName} onChange={(e) => setUserLastName(e.target.value)} required/>
    </div>
    
   </div>
   
  );
}
