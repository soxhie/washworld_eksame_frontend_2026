
import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../onboarding.css"


export default function PasswordRequirements() {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
   
    const [error] = useState<string>("");
    const [success] = useState("");

    // Function to check if password and repeat password match
    function doPasswordsMatch(pwd: string, repeatPwd: string) {
        return pwd === repeatPwd;
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="password">
            <div className="container">
                <div className="inputContainer">
                    <label>Adgangskode</label>
                    <div style={{position: "relative", 
                        display: "flex", 
                        alignItems: "center", 
                        top:'20px', 
                        marginBottom: "10px"}}>
                        <input
                            style={{position: 'absolute'}}
                            type={showPassword ? "text" : "password"}
                            name="user_password"
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
                        
                    </div>
                    <div style={{ fontWeight: 'bold',color: "lightgray"}}>
                     
                    </div>
                   
                </div>
                <div className="inputContainer">
                    <label>Bekræft adgangkode</label>
                    <div style={{position: "relative", display: "flex", alignItems: "center", top:'20px', marginBottom: "30px"}}>
                        <input
                            style={{position: 'absolute'}}
                            type={showPassword ? "text" : "password"}
                            name="repeat_user_password"
                           
                            required
                        />
                        <div
                            onClick={toggleShowPassword}
                            className="icon-container"
                        >
                            {showPassword ? <FaEye className="icon"/> : <FaEyeSlash className="icon"/>}
                        </div>
                    </div>
                    {/* Show error if passwords do not match and repeatPassword is not empty */}
                    {repeatPassword && !doPasswordsMatch(password, repeatPassword) && (
                        <div style={{color: "red", marginTop: "5px"}}>
                            Adgangkoder er ikke ens
                        </div>
                    )}
                </div>
                {/* Password requirements are now shown below the password field */}
                {error && <div style={{color: "red", marginTop: "10px"}}>{error}</div>}
                {success && <div style={{color: "green", marginTop: "10px"}}>{success}</div>}
            </div>
        </div>
    );
}