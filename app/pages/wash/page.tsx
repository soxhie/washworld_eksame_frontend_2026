"use client";

import { LuChevronRight } from "react-icons/lu";
import { PiCarProfileBold } from "react-icons/pi";
import AppHeader from "../../components/layout/AppHeader";
import BottomNav from "../../components/layout/BottomNav";
import "./wash.css";

const singleWashOffers = [
  {
    id: "gold",
    name: "Guld",
    price: "59 kr",
    note: "Inkluderet i dit medlemskab",
    helper: "Eller for 139 kr./md ubegrænset God og effektiv",
    included: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "89 kr",
    note: "",
    helper: "Eller for 169 kr./md ubegrænset Extra grundig",
    included: false,
  },
  {
    id: "brilliant",
    name: "Brilliant",
    price: "119 kr",
    note: "",
    helper: "Eller for 199 kr./md ubegrænset Bedste vask året rundt",
    included: false,
  },
];

const recentWashes = [
  { id: "1", location: "Wash World Soborg", time: "I gar, 18:42", plan: "Guld" },
  { id: "2", location: "Wash World Soborg", time: "27 april 2026, 10:22", plan: "Guld" },
  { id: "3", location: "Wash World Soborg", time: "29 april 2026, 16:29", plan: "Guld" },
];

export default function WashPage() {
  return (
    <main className="WashPage">
      <AppHeader variant="brand" />

      <div className="washContent">
        <section className="membershipCard" aria-label="Aktivt medlemskab">
          <h1 className="membershipTitle">Medlemskab</h1>
          <p className="membershipSubtitle">Guld abonnement - Aktiv</p>

          <div className="locationRow">
            <div>
              <p className="locationLabel">Vaskehal Soborg:</p>
              <p className="locationValue">Dynamovej 4, 2860 Soborg</p>
            </div>
            <button className="switchButton" type="button">
              Skift vaskehal <LuChevronRight aria-hidden="true" />
            </button>
          </div>

          <div className="queueRow">
            <span className="queueTag">Travlt</span>
            <span className="queueText">Ca. 10 min ventetid</span>
          </div>

          <button className="startWashButton" type="button">
            <span className="startWashIconWrap" aria-hidden="true">
              <LuChevronRight className="startWashIcon" />
            </span>
            <span className="startWashLabel">Start din vask</span>
          </button>
        </section>

        <section className="purchaseSection" aria-label="Tilkob af enkelt vask">
          <h2>Tilkob af enkelt vask</h2>

          {singleWashOffers.map((offer) => (
            <article className={offer.included ? "offer offerIncluded" : "offer"} key={offer.id}>
              <div className="offerHeader">
                <p className="offerNamePrice">
                  {offer.name} - {offer.price}
                </p>
                {offer.note ? <span className="offerNote">{offer.note}</span> : null}
              </div>

              <button className={offer.included ? "orderButton orderButtonDisabled" : "orderButton"} type="button">
                Bestil
              </button>
              <p className="offerHelper">{offer.helper}</p>
            </article>
          ))}
        </section>

        <section className="recentSection" aria-label="Seneste vaske">
          <h2>Seneste vaske</h2>
          <ul className="recentList">
            {recentWashes.map((wash) => (
              <li key={wash.id} className="recentItem">
                <div className="carIconBox" aria-hidden="true">
                  <PiCarProfileBold className="carIcon" />
                </div>
                <div className="recentText">
                  <p className="recentLocation">{wash.location}</p>
                  <p className="recentTime">{wash.time}</p>
                </div>
                <span className="planBadge">{wash.plan}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <BottomNav activeTab="wash" variant="angled" />
    </main>
  );
}
