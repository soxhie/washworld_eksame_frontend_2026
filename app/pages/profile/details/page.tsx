"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../../../components/layout/AppHeader";
import BottomNav from "../../../components/layout/BottomNav";
import ProfileDetailsForm from "../components/ProfileDetailsForm";
import "../profile.css";


const DEFAULT_DETAILS_FORM = {
  phone: "+45 11 22 33 44",
  email: "test@email.dk",
  password: "********",
  paymentMethod: "**** 4242",
  address: "Jagtvej 123, 2200 Kobenhavn N",
  plateNumber: "AB 12 456",
};


export default function ProfileDetailsPage() {
  const router = useRouter();
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [detailsForm, setDetailsForm] = useState(DEFAULT_DETAILS_FORM);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    fetch("http://127.0.0.1:80/api-my-info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setDetailsForm((prev) => ({
            ...prev,
            phone: data.user.user_phone || prev.phone,
            email: data.user.user_email || prev.email,
            address: data.user.user_adress || prev.address,
            plateNumber: data.user.car_plate || prev.plateNumber,
            paymentMethod: data.user.payment_gateway_name || prev.paymentMethod,
          }));
        }
      });
  }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaveMessage(null);

    const token = localStorage.getItem("access_token");
    if (!token) {
      setSaveMessage("Du skal være logget ind.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:80/api-update-my-info", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_phone: detailsForm.phone,
          user_email: detailsForm.email,
          user_address: detailsForm.address,
          car_plate: detailsForm.plateNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSaveMessage(data.message || "Kunne ikke gemme oplysninger.");
        return;
      }

      setSaveMessage("Dine oplysninger er opdateret.");
    } catch {
      setSaveMessage("Systemfejl. Prøv igen senere.");
    }
  }

  return (
    <main className="ProfilePage">
      <AppHeader variant="brand" />
      <ProfileDetailsForm
        detailsForm={detailsForm}
        onChange={(field, value) =>
          setDetailsForm((prev) => ({ ...prev, [field]: value }))
        }
        onSubmit={handleSave}
        onBack={() => router.push("/pages/profile")}
        saveMessage={saveMessage}
      />
      <BottomNav activeTab="profile" variant="angled" />
    </main>
  );
}
