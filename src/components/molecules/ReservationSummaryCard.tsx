import { MapPin, Users, Calendar } from "lucide-react";

interface ReservationSummaryCardProps {
  image: string;
  name: string;
  location: string;
  guests: number;
  date: string;
  timeSlot: string;
}

export function ReservationSummaryCard({
  image,
  name,
  location,
  guests,
  date,
  timeSlot,
}: ReservationSummaryCardProps) {
  return (
    <div className="flex items-center gap-3.5 py-3 border-b border-gray-100">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-xl object-cover shrink-0"
      />
      <div className="min-w-0">
        <h2 className="text-sm font-bold text-gray-900 truncate">{name}</h2>
        <p className="flex items-center gap-1 text-[11px] text-gray-500 truncate mt-0.5">
          <MapPin className="w-3 h-3 shrink-0" />
          {location}
        </p>
        <div className="flex items-center gap-3 text-[11px] text-gray-600 mt-1.5">
          <span className="inline-flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            {guests} Guests
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            {date} • {timeSlot}
          </span>
        </div>
      </div>
    </div>
  );
}