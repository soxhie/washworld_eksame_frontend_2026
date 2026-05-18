// "use client";

// import { useEffect, useState } from "react";

// type Props = {
//   totalSeconds?: number;
// };

// export default function TimerRing({ totalSeconds = 900 }: Props) {
//   const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

//   const size = 160;
//   const stroke = 8;
//   const radius = (size - stroke) / 2;
//   const circumference = 2 * Math.PI * radius;

//   useEffect(() => {
//     const id = setInterval(() => {
//       setSecondsLeft((s) => (s <= 0 ? 0 : s - 1));
//     }, 1000);
//     return () => clearInterval(id);
//   }, []);

//   const mins = Math.floor(secondsLeft / 60);
//   console.log(secondsLeft); // tilføj denne
//   const secs = secondsLeft % 60;
//   const label = `${mins}min`;

//   return (
//     <div style={{ position: "relative", width: size, height: size }}>
//       <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
//         <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#333" strokeWidth={stroke} />
//         <circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           fill="none"
//           stroke="#22c55e"
//           strokeWidth={stroke}
//           strokeLinecap="round"
//           strokeDasharray={circumference}
//           strokeDashoffset={circumference}
//           style={{
//             animation: `fillRing ${totalSeconds}s linear forwards`,
//           }}
//         />
//       </svg>
//       <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontWeight: 700,
//           fontSize: 22,
//           color: "#fff",
//           fontFamily: "sans-serif",
//         }}
//       >
//         {label}
//       </div>
//       <style>{`
//         @keyframes fillRing {
//           from { stroke-dashoffset: ${circumference}; }
//           to   { stroke-dashoffset: 0; }
//         }
//       `}</style>
//     </div>
//   );
// }"use client";

type Props = {
  totalSeconds: number;
  secondsLeft: number;
  label: string;
};

export default function TimerRing({ totalSeconds, secondsLeft, label }: Props) {
  const size = 160;
  const r = 72;
  const circ = 2 * Math.PI * r;
  const dashOffset = circ * (secondsLeft / totalSeconds);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx="80" cy="80" r={r} fill="none" stroke="#333" strokeWidth="8" />
        <circle
          cx="80" cy="80" r={r}
          fill="none" stroke="#22c55e" strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 500, fontSize: 22, color: "#fff",
      }}>
        {label}
      </div>
    </div>
  );
}