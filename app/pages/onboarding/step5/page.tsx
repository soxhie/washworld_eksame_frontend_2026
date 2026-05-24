"use client";

import { useRouter } from "next/navigation";
import "../onboarding.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
export default function OnboardingStep5() {
    const router = useRouter();

    return (
        <div className="Onboarding-5">
            <button className='tilbageLink' type="button" onClick={() => router.back()}>
             <FaChevronLeft /> Tilbage
            </button>
            <h1>Tjek din email</h1>
            <p>
                Vi har sendt dig et link til at bekræfte din konto. Klik på linket i
                emailen for at aktivere din profil.
            </p>
            <button className="nextButton" type="button" onClick={() => router.push("/pages/onboarding/step6")}>
                <FaArrowRight />
            </button>
        </div>
    );
}


