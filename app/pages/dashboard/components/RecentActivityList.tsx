interface ActivityItem {
  id: string;
  title: string;
  date: string;
  amount: string;
  status: string;
}

interface RecentActivityListProps {
  items?: ActivityItem[];
}

export default function RecentActivityList({ items = [] }: RecentActivityListProps) {
  if (!items.length) {
    return <p className="stateText">Ingen aktivitet endnu.</p>;
  }

  return (
    <ul className="activityList">
      {items.map((item) => (
        <li key={item.id} className="activityItem">
          <div>
            <p className="cardTitle">{item.title}</p>
            <p className="cardMeta">{item.date}</p>
          </div>

          <div className="activityRight">
            <p className="cardTitle">{item.amount}</p>
            <p className="cardMeta">{item.status}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
