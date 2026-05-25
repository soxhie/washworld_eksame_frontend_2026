"use client";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "var(--body-sm-size)", marginBottom: 30, marginTop: 12 }}>
      <FaChevronLeft /> <span style={{ paddingTop: 3 }}>Tilbage</span>{" "}
    </button>
  );
}
