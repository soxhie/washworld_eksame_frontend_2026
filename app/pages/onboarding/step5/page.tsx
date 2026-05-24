"use client";

import { useRouter } from "next/navigation";
import "../onboarding.css";

export default function OnboardingStep5() {
    const router = useRouter();

    return (
        <div className="Onboarding-5">
            <h1>Tjek din email</h1>
            <p>
                Vi har sendt dig et link til at bekræfte din konto. Klik på linket i
                emailen for at aktivere din profil.
            </p>
            <button className="nextButton" type="button" onClick={() => router.push("/pages/step6")}>
                Gå til login
            </button>
        </div>
    );
}


