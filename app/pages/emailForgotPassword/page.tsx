

import { useSearchParams } from "next/navigation";

export default function EmailForgotPassword() {
    const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const key = searchParams?.get("key") || "";
    const resetLink = key ? `/reset-password?key=${key}` : "/reset-password";
    return (
        <div>
            <h1>Forgot Password</h1>
            <p>
                To reset your password
                <a href={resetLink} style={{ marginLeft: 8 }}>
                    please click here
                </a>
            </p>
        </div>
    );
}