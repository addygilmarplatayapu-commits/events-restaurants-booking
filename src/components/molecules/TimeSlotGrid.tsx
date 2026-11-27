import { TimeSlotButton } from "@/components/atoms/TimeSlotButton";

interface TimeSlotGridProps {
  title: string;
  slots: string[];
  selectedSlot: string;
  onSelectSlot: (slot: string) => void;
}

export function TimeSlotGrid({
  title,
  slots,
  selectedSlot,
  onSelectSlot,
}: TimeSlotGridProps) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      <div className="grid grid-cols-3 gap-2.5">
        {slots.map((slot) => (
          <TimeSlotButton
            key={slot}
            time={slot}
            selected={selectedSlot === slot}
            onClick={() => onSelectSlot(slot)}
          />
        ))}
      </div>
    </div>
  );
}