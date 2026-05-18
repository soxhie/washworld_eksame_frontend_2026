"use client";

import { useState, useEffect } from "react";
import TimerRing from "./TimerRing";
import { useRouter } from "next/navigation";

type Package = "guld" | "premium" | "brilliant";

const steps: Record<Package, string[]> = {
  guld: ["Skumforvask", "Aktiv shampoo", "Hjulvask", "Højtryksvask", "Børstevask", "Voks", "Tørring"],
  premium: ["Skumforvask", "Aktiv shampoo", "Hjulvask", "Højtryksvask", "Børstevask", "Voks", "Tørring", "Højglans", "Undervognsvask"],
  brilliant: ["Skumforvask", "Aktiv shampoo", "Hjulvask", "Højtryksvask", "Børstevask", "Voks", "Tørring", "Højglans", "Undervognsvask", "Skumvask", "Affedtning", "Sæsonrens", "Slutskyl"],
};

const stepDuration = 1;
// const stepDuration = 20;

export default function WashProgram({ package: pkg }: { package: Package }) {
  const programSteps = steps[pkg];
  const totalSeconds = programSteps.length * stepDuration;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const router = useRouter();

  const currentStep = Math.min(
    programSteps.length - 1,
    Math.floor((totalSeconds - secondsLeft) / stepDuration)
  );

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      router.push("/pages/wash/washcomplete");
    }
  }, [secondsLeft, router]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const isLastStep = currentStep === programSteps.length - 1;
  const label = isLastStep ? `${secs}sek` : `${mins}min`;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 20px", gap: 32 }}>
      <TimerRing
        totalSeconds={totalSeconds}
        secondsLeft={secondsLeft}
        label={label}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "var(--body-lg-size)" }}>
          {programSteps.map((step, i) => (
            <li
              key={step}
              style={{
                color: i === currentStep ? "var(--color-primary)" : i < currentStep ? "#fff" : "#555",
                fontWeight: i === currentStep ? 900 : 400,
                padding: "0 0",
              }}
            >
              {i + 1}. {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}