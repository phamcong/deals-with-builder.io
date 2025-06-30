import { cn } from "@/lib/utils";
import { DealStage } from "@shared/types";

interface StatusBadgeProps {
  stage: DealStage;
  className?: string;
}

const stageConfig = {
  proposal: {
    label: "Proposal",
    className: "border-blue-600 text-blue-600",
  },
  negotiation: {
    label: "Negotiation",
    className: "border-amber-600 text-amber-600",
  },
  discovery: {
    label: "Discovery",
    className: "border-blue-400 text-blue-400",
  },
  "closed-won": {
    label: "Closed Won",
    className: "border-green-500 text-green-600 bg-green-50",
  },
} as const;

export function StatusBadge({ stage, className }: StatusBadgeProps) {
  const config = stageConfig[stage];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center h-6 px-2 text-xs font-semibold border rounded-full whitespace-nowrap transition-all",
        config.className,
        className,
      )}
    >
      <span className="overflow-hidden text-ellipsis">{config.label}</span>
    </div>
  );
}
