"use client";

import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
export default function OnboardingStep2() {
const [showPassword, setShowPassword] = useState(false);

  return (
   <div className="Onboarding-2">
     
        <h1>Opret bruger</h1>
       
    <div className="inputContainer">
        <label>Email</label>
        <input name="email" type="text" required />
    </div>
    <div className="inputContainer">
        <label>Adgangskode</label>
        <div style={{display:"flex"}}>
        <input name="password" type={showPassword ? "text" : "password"} required />
        <div style={{ position:"absolute", right:"35px", marginTop:"8px",fontSize:"18px"}} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </div>
        </div>
    </div>
    <div className="inputContainer">
        <label htmlFor="">Gentag adgangskode</label>
         <div style={{display:"flex"}}>
        <input name="confirm_password" type={showPassword ? "text" : "password"} required />
        <div style={{ position:"absolute", right:"35px", marginTop:"8px", fontSize:"18px"}} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </div>
        </div>
    </div>
    <div className="toggleContainer">
        <p>Jeg acceptere <a href="">Terms & Condtions</a></p>
        <label className="switch">
            <input type="checkbox" required/>
            <span className="slider round"></span>
        </label>
    </div>
    <div className="toggleContainer">
        <p>Jeg acceptere <a href="">Privacy guidelines</a></p>
        <label className="switch">
        <input type="checkbox" required/>
        <span className="slider round"></span>
    </label>
    </div>
    
   </div>
   
  );
}
