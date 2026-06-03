"use client";
import "./login.css";
import "../../globals.css";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import PinInput from "../onboarding/components/pinInput";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPinMode = searchParams.get("mode") === "pin";
  const storedAuthUser = typeof window !== "undefined" ? localStorage.getItem("authUser") : null;

  let parsedAuthUser: { user_email?: string } | null = null;
  try {
    parsedAuthUser = storedAuthUser ? JSON.parse(storedAuthUser) : null;
  } catch {
    parsedAuthUser = null;
  }

  const fallbackEmail = parsedAuthUser?.user_email ?? "";
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(fallbackEmail);
  const [password, setPassword] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:80/api-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: email,
          user_password: password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
        }
        if (data.user) {
          localStorage.setItem("authUser", JSON.stringify(data.user));
        }
        setError("");
        router.push("/pages/dashboard");
      }
    } catch {
      setError("System under maintenance");
    } finally {
      setLoading(false);
    }
  }

  async function handlePinLogin() {
    setError("");
    if (!email) {
      setError("Mangler email til PIN-login. Log venligst ind med email og adgangskode.");
      return;
    }
    if (pinCode.length !== 4) {
      setError("Indtast en 4-cifret PIN-kode.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:80/api-login-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: email,
          user_pin_code: pinCode,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "PIN login failed");
      } else {
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
        }
        if (data.user) {
          localStorage.setItem("authUser", JSON.stringify(data.user));
        }
        setError("");
        router.push("/pages/dashboard");
      }
    } catch {
      setError("System under maintenance");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <Link href="/" className="tilbageLink">
        <FaChevronLeft /> Tilbage
      </Link>
      <h1>Login</h1>
      <form action="handle">
        {isPinMode ? (
          <>
            <div className="inputContainer">
             
              <input hidden name="user_email" type="text" value={email} readOnly />
            </div>
           
              <label>PIN-kode</label>
              <PinInput onChange={setPinCode} />
            
          </>
        ) : (
          <>
            <div className="inputContainer">
              <label>Email</label>
              <input
                name="user_email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="icon-container"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </div>
              </div>
            </div>
            <Link className="glemtAdgangskode" href="/pages/forgotPassword">
              Glemt adgangskode?
            </Link>
          </>
        )}

        <button
          className="nextButton"
          type="button"
          onClick={isPinMode ? handlePinLogin : handleLogin}
          disabled={loading}
        >
          <FaArrowRight />
        </button>
      </form>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
}
