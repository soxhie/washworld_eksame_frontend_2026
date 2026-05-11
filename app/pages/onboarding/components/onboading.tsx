
"use client";
import Image from "next/image";

export default function OnboardingStep1() {

  return (
   <div className="Onboarding-1">
     
        <h1 className="title">Indtast navn</h1>
    
    <div className="inputContainer">
        <label>Navn</label>
        <input type="text" name="user_name" required />
    </div>
    <div className="inputContainer">
        <label htmlFor="Efternavn">Efternavn</label>2
        <input type="text" name="user_last_name" required/>
    </div>
    
   </div>
   
  );
}
