"use client";
 
import { useRef, useState } from "react";
 
const VARIANTS = {
  vask:   { label: "Start din vask", activeLabel: "Vask begyndt!" },
  medlem: { label: "Bliv medlem",    activeLabel: "Ja tak!"   },
};
 
type Variant = keyof typeof VARIANTS;
 
type Props = {
  variant: Variant;
  onActivate?: () => void;
};
 
export default function SwipeButton({ variant, onActivate }: Props) {
  const [done, setDone] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
 
  const { label, activeLabel } = VARIANTS[variant];
 
  function start(clientX: number) {
    startX.current = clientX;
  }
 
  function move(clientX: number) {
    if (!trackRef.current || done) return;
    const width = trackRef.current.offsetWidth;
    const progress = (clientX - startX.current) / width;
    if (progress > 0.55) {
      setDone(true);
      onActivate?.();
    }
  }
 
  return (
    <div
      ref={trackRef}
      onMouseDown={(e) => start(e.clientX)}
      onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
      onTouchStart={(e) => start(e.touches[0].clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      style={{
        position: "relative",
        width: 256,
        height: 44,
        borderRadius: 999,
        background: done ? "#22c55e" : "#f3f4f6",
        cursor: done ? "default" : "grab",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Thumb */}
      <div style={{
        position: "absolute",
        [done ? "right" : "left"]: 6,
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: done ? "#fff" : "#22c55e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {done
          ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        }
      </div>
 
      {/* Label */}
      <span style={{
        width: "100%",
        textAlign: "center",
        fontWeight: 600,
        fontSize: 16,
        color: done ? "#fff" : "#374151",
        pointerEvents: "none",
      }}>
        {done ? activeLabel : label}
      </span>
    </div>
  );
}