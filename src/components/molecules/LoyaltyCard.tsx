"use client";

import { Gift } from "lucide-react";

interface LoyaltyCardProps {
  totalPoints: number;
  claimedFreePoints: boolean;
  onClaimFreePoints: () => void;
}

export function LoyaltyCard({
  totalPoints,
  claimedFreePoints,
  onClaimFreePoints,
}: LoyaltyCardProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#3B147A] via-[#4C1D95] to-[#2E1065] p-4 text-white shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-purple-200 font-medium">Loyalty Points</p>
          <p className="text-3xl font-bold mt-1">
            {totalPoints} <span className="text-base font-semibold text-purple-200">Pts</span>
          </p>
        </div>
        <div className="w-11 h-11 rounded-xl bg-amber-400/20 flex items-center justify-center">
          <Gift className="w-6 h-6 text-amber-300" />
        </div>
      </div>

      <p className="text-xs text-purple-100/90 mt-2">
        Earn more points and Enjoy exclusive benefits
      </p>

      <div className="mt-4 rounded-xl bg-white/10 backdrop-blur-xs p-3 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-white">Free 50 Points</p>
          <p className="text-[11px] text-purple-200">Time Remaining: 10:45:22</p>
        </div>
        <button
          type="button"
          onClick={onClaimFreePoints}
          disabled={claimedFreePoints}
          className="px-4 py-1.5 rounded-lg bg-white text-[#3B147A] text-xs font-semibold hover:bg-purple-50 disabled:opacity-60 cursor-pointer"
        >
          {claimedFreePoints ? "Claimed" : "Claim"}
        </button>
      </div>
    </div>
  );
}