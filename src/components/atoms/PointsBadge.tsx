import { Award } from "lucide-react";

interface PointsBadgeProps {
  points: number;
  label?: string;
}

export function PointsBadge({ points, label = "Points" }: PointsBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] shadow-xs">
      <Award className="w-3.5 h-3.5 text-yellow-200" />
      {points} {label}
    </span>
  );
}