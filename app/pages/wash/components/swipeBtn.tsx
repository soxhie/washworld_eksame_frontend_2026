"use client";
import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

const VARIANTS = {
  vask: { label: "Start din vask", activeLabel: "Vask begyndt!" },
  medlem: { label: "Bliv medlem", activeLabel: "Ja tak!" },
};

type Variant = keyof typeof VARIANTS;

type Props = {
  variant: Variant;
  onActivate?: () => void;
};

export default function SwipeButton({ variant, onActivate }: Props) {
  const [offset, setOffset] = useState(0);
  const [done, setDone] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const initialOffsetRef = useRef(0);
  const { label, activeLabel } = VARIANTS[variant];

  const getMax = () => {
    const track = trackRef.current;
    if (!track) return 0;
    return Math.max(0, track.clientWidth - 46);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (done) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    startXRef.current = event.clientX;
    initialOffsetRef.current = offset;
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId) || done) return;
    const delta = event.clientX - startXRef.current;
    const max = getMax();
    setOffset(Math.min(max, Math.max(0, initialOffsetRef.current + delta)));
  };

  const finishSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    const max = getMax();
    if (offset >= max * 0.82 && max > 0) {
      setOffset(max);
      setDone(true);
      setTimeout(() => onActivate?.(), 600);
      return;
    }
    setOffset(0);
  };

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finishSwipe}
      onPointerCancel={finishSwipe}
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
        touchAction: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: done ? "auto" : 6,
          right: done ? 6 : "auto",
          transform: done ? "none" : `translateX(${offset}px)`,
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: done ? "#fff" : "#22c55e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: done ? "all 0.3s ease" : "none",
        }}
      >
        {done ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span
        style={{
          width: "100%",
          textAlign: "center",
          fontWeight: 600,
          fontSize: 16,
          color: done ? "#fff" : "#374151",
          pointerEvents: "none",
        }}
      >
        {done ? activeLabel : label}
      </span>
    </div>
  );
}
