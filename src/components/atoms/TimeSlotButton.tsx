interface TimeSlotButtonProps {
  time: string;
  selected: boolean;
  onClick: () => void;
}

export function TimeSlotButton({ time, selected, onClick }: TimeSlotButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-2.5 px-2 rounded-lg text-xs font-medium transition cursor-pointer ${
        selected
          ? "bg-[#6D28D9] text-white ring-2 ring-[#3B147A] ring-offset-1"
          : "bg-[#3B147A] text-white hover:bg-[#4c1d95]"
      }`}
    >
      {time}
    </button>
  );
}