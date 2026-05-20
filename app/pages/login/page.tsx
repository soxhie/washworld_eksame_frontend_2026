"use client";
import "./login.css"
import "../../globals.css"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");
        try {
            const response = await fetch("http://127.0.0.1:80/api-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_email: email,
                    user_password: password
                })
            });
            const data = await response.json();
            if (!response.ok) {
                // Use backend error message if available
                setError(data.message || "Login mislykkedes. Tjek dine oplysninger.");
                return;
            }
            if (data?.user) {
                localStorage.setItem("authUser", JSON.stringify(data.user));
            }
            if (data?.access_token) {
                localStorage.setItem("access_token", data.access_token);
            }
            router.push("/pages/dashboard");
        } catch {
            setError("Systemfejl. Prøv igen senere.");
        }
    };

   
    
    return(
        <div className="login">
                        <Link href="/"
          className='tilbageLink'
           
        >
          <FaChevronLeft /> Tilbage
        </Link>
            <h1>Login</h1>
            <div className="inputContainer">
                           <label>Email</label>
                <input
                    name="user_email"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                       </div>
                       <div className="inputContainer">
                           <label>Adgangskode</label>
                           <div style={{ display: "flex" }}>
                <input
                    name="user_password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                               <div
                                   style={{ position: "absolute", right: "35px", marginTop: "8px", fontSize: "18px" }}
                                   onClick={() => setShowPassword(!showPassword)}
                               >
                                   {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                               </div>
                           </div>
                                <button
                                        className='nextButton'
                                        type="button"
                                        onClick={handleLogin}
                                >
                                        <FaArrowRight />
                                </button>
                                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                       </div>
        </div>
    )  
}