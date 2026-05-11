import Link from "next/link";

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  targetRoute: string;
}

interface QuickActionsGridProps {
  actions?: QuickAction[];
}

export default function QuickActionsGrid({ actions = [] }: QuickActionsGridProps) {
  if (!actions.length) {
    return <p className="stateText">Ingen handlinger fundet.</p>;
  }

  return (
    <div className="quickActionsGrid">
      {actions.map((action) => (
        <Link key={action.id} href={action.targetRoute} className="actionCard">
          <p className="actionIcon" aria-hidden="true">
            {action.icon}
          </p>
          <p>{action.label}</p>
        </Link>
      ))}
    </div>
  );
}
