import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../onboarding.css"
export default function PasswordRequirements() {
    
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordReq, setPasswordReq] = useState("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState("");

    const passwordRequirements = [
        {
            label: "At least one 8 characters",
            test: (pwd: string) => /[A-Z]/.test(pwd),
        },
        {
            label: "At least one uppercase letter",
            test: (pwd: string) => /[A-Z]/.test(pwd),
        },
       
        {
            label: "At least one number",
            test: (pwd: string) => /[0-9]/.test(pwd),
        },
        {
            label: "At least one special character (!@#$%^&*(),.?\":{}|",
            test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        },  
       
    ];
    const passwordStrength = passwordRequirements.filter((req) => req.test(password)).length;
    const strengthLabel = ["Weak", "Medium", "Strong"][passwordStrength - 2] || "Very Weak";

    
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const validatePassword = (pwd: string) => {
        const lengthReq = /.{8,}/;
        const upperReq = /[A-Z]/;
        const numberReq = /[0-9]/;
        const specialReq = /[!@#$%^&*(),.?":{}|<>]/;
        return lengthReq.test(pwd) && upperReq.test(pwd) && numberReq.test(pwd) && specialReq.test(pwd);
    };
   

    return (
        <div className="password">
         
            <div className="container">

                <div className="inputContainer">
                    <label>Password</label>
                    <div style={{position: "relative", display: "flex", alignItems: "center", top:'20px', marginBottom: "10px"}}>
                        <input
                            style={{position: 'absolute'}}
                            type={showPassword ? "text" : "password"}
                            name="user_password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            
                        />                                              
                        <div
                            onClick={toggleShowPassword}
                            className="icon-container"
                        >
                            {showPassword ? <FaEye className="icon"/> : <FaEyeSlash className="icon"/>}
                        </div>
                    </div>
                    <div style={{display: 'flex', gap: '2px', marginTop: '20px'}}>
                        <progress 
                            value={strengthLabel === "Very Weak" ? 0 : strengthLabel === "Weak" ? 1 : strengthLabel === "Medium" ? 1 : 1} 
                            style={{accentColor: strengthLabel === "Very Weak" ? 'red' : strengthLabel === "Weak" ? 'red' : strengthLabel === "Medium" ? 'orange' : strengthLabel === "Strong" ? 'green' : undefined}}
                            max={1}
                            
                        />
                        <progress 
                            value={strengthLabel === "Very Weak" ? 0 : strengthLabel === "Weak" ? 0 : strengthLabel === "Medium" ? 1 : 1} 
                            style={{accentColor: strengthLabel === "Medium" ? 'orange' : strengthLabel === "Strong" ? 'green' : undefined}}
                            max={1}
                           
                        />
                        <progress 
                            value={strengthLabel === "Very Weak" ? 0 : strengthLabel === "Weak" ? 0 : strengthLabel === "Medium" ? 0 : strengthLabel === "Strong" ? 1 : 1} 
                            style={{accentColor: strengthLabel === "Strong" ?  'green' : undefined}}
                            max={1}
                           
                        />
                    </div>
                    <div style={{ fontWeight: 'bold',color: "lightgray"}}>
                       {strengthLabel}
                    </div>
                    <ul style={{listStyle: "none", paddingLeft: 0, marginTop: "0px", marginBottom: 0,  }}>
                        {passwordRequirements.map((req, idx) => {
                            const met = req.test(password);
                            return (
                                <li key={idx}  style={{color: met ? 'green' : '#ddd', fontSize: '0.95em', display: 'flex',}}>
                                    {met && <span style={{marginRight: '6px'}}>✓</span>}
                                    {req.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                
                  <div className="inputContainer">
                <label htmlFor="">Gentag adgangskode</label>
                <div style={{ display: "flex" }}>
                    <input
                        name="confirm_password"
                        type={showPassword ? "text" : "password"}
                        
                        required
                    />
                    <div
                        style={{ position: "absolute", right: "35px", marginTop: "8px", fontSize: "18px" }}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                </div>
            </div>
             
          
            {/* Password requirements are now shown below the password field */}
            {error && <div style={{color: "red", marginTop: "10px"}}>{error}</div>}
            {success && <div style={{color: "green", marginTop: "10px"}}>{success}</div>}
            </div>
        </div>
    );
}