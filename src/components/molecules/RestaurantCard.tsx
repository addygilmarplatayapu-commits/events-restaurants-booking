"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { RestaurantEvent } from "@/types/booking";

interface RestaurantCardProps {
  item: RestaurantEvent;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function RestaurantCard({
  item,
  isFavorite,
  onToggleFavorite,
}: RestaurantCardProps) {
  return (
    <div className="min-w-[175px] max-w-[175px] shrink-0 flex flex-col">
      <div className="relative h-28 w-full rounded-xl overflow-hidden bg-gray-100">
        <Link href={`/restaurants/${item.id}`} className="block w-full h-full">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </Link>

        <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-[#3B147A] text-white text-xs font-semibold">
          {item.priceLabel}
        </span>

        <button
          type="button"
          onClick={() => onToggleFavorite(item.id)}
          aria-label="Guardar favorito"
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-xs cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-rose-500 text-rose-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      <Link href={`/restaurants/${item.id}`} className="mt-2">
        <div className="flex items-center justify-between gap-1">
          <h3 className="text-xs font-semibold text-gray-900 truncate">
            {item.name}
          </h3>
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-gray-800 shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {item.rating}
          </span>
        </div>
        <p className="text-[11px] text-gray-500 truncate mt-0.5">{item.location}</p>
      </Link>
    </div>
  );
}