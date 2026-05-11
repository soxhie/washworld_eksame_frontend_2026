interface Booking {
  serviceName: string;
  locationName: string;
  scheduledAt: string;
  status: string;
}

interface ActiveBookingCardProps {
  booking?: Booking;
}

export default function ActiveBookingCard({ booking }: ActiveBookingCardProps) {
  if (!booking) {
    return <p className="stateText">Du har ingen aktiv booking.</p>;
  }

  return (
    <article className="dashboardCard">
      <p className="cardTitle">{booking.serviceName}</p>
      <p className="cardMeta">{booking.locationName}</p>
      <p className="cardMeta">{booking.scheduledAt}</p>
      <p className="cardStatus">Status: {booking.status}</p>

      {/* TODO: Add CTA buttons when booking flow route is ready */}
    </article>
  );
}
