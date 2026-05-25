import React from "react";
import { LuCar } from "react-icons/lu";
import BackButton from "../../../components/layout/BackButton";

export interface WashHistoryItem {
  location: string;
  date: string;
  time: string;
  label: string;
}

interface WashHistoryProps {
  history: WashHistoryItem[];
  onBack?: () => void;
  showBackButton?: boolean;
  title?: string;
}

export default function WashHistory({ history, onBack, showBackButton = true, title = "Seneste vaske historik" }: WashHistoryProps) {
  return (
    <section className="washHistory" aria-label="Seneste vaske historik">
      {showBackButton && onBack ? (
        // <button
        //   type="button"
        //   className="profileBackButton"
        //   onClick={onBack}
        // >
        //   <span aria-hidden="true">‹</span>
        //   Tilbage
        // </button>
        <BackButton />
      ) : null}
      <h3 style={{ color: "#fff", marginBottom: "0.5rem", fontSize: "var(--h3-size)", fontWeight: 800, marginLeft: "10px" }}>Seneste vaske historik</h3>

      <ul className="washHistoryList">
        {history.map((item, idx) => (
          <li className="washHistoryItem" key={idx}>
            <div className="washHistoryIconWrap">
              <LuCar className="washHistoryIcon" aria-hidden="true" />
            </div>
            <div className="washHistoryInfo">
              <div className="washHistoryLocation">{item.location}</div>
              <div className="washHistoryDateTime">
                {item.date}, {item.time}
              </div>
            </div>
            <span className="washHistoryLabel">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
