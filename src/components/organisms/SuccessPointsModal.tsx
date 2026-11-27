"use client";

import { Award, X } from "lucide-react";
import { PrimaryButton } from "@/components/atoms/PrimaryButton";

interface SuccessPointsModalProps {
  points: number;
  onFinish: () => void;
}

export function SuccessPointsModal({ points, onFinish }: SuccessPointsModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/55 flex items-center justify-center p-5">
      <div className="w-full max-w-[350px] bg-white rounded-3xl p-6 text-center relative shadow-2xl overflow-hidden">
        <button
          type="button"
          onClick={onFinish}
          aria-label="Cerrar"
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#3B147A] text-white flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Medalla celebratoria */}
        <div className="mx-auto mt-3 mb-5 w-20 h-20 rounded-full bg-amber-50 border-4 border-amber-200 flex items-center justify-center relative">
          <Award className="w-11 h-11 text-amber-500" />
          <span className="absolute -top-1 -left-2 w-2.5 h-2.5 rounded-full bg-pink-500" />
          <span className="absolute top-1 -right-3 w-2.5 h-2.5 rounded-full bg-purple-600" />
          <span className="absolute -bottom-1 left-1 w-2 h-2 rounded-full bg-emerald-400" />
        </div>

        <p className="text-3xl font-extrabold text-gray-900">
          {points} <span className="text-base font-bold">Pts</span>
        </p>

        <p className="text-xs text-gray-500 mt-2 mb-6 px-4">
          You have earned {points} Loyalty Points for the reservation done.
        </p>

        <PrimaryButton onClick={onFinish}>
          Make another Reservation
        </PrimaryButton>
      </div>
    </div>
  );
}