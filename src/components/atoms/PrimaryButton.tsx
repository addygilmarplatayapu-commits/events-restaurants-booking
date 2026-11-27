import React from "react";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
  children: React.ReactNode;
}

export function PrimaryButton({
  variant = "solid",
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  const base =
    "w-full py-3.5 px-5 rounded-xl font-semibold text-sm transition active:scale-[0.99] disabled:opacity-50 cursor-pointer";
  const styles =
    variant === "solid"
      ? "bg-[#3B147A] text-white hover:bg-[#2d0f5e] shadow-sm"
      : "bg-white text-[#3B147A] border border-gray-300 hover:bg-gray-50";

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}