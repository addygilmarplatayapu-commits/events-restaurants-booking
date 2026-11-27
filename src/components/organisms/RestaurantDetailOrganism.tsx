"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  MoreVertical,
  MapPin,
  Share2,
  Heart,
  Users,
  Calendar,
  Phone,
  Globe,
  Navigation,
  Images,
} from "lucide-react";
import { RestaurantEvent } from "@/types/booking";
import { getRestaurantById } from "@/services/api";
import { PointsBadge } from "@/components/atoms/PointsBadge";
import { TimeSlotGrid } from "@/components/molecules/TimeSlotGrid";
import { MobileShellTemplate } from "@/components/templates/MobileShellTemplate";

interface RestaurantDetailOrganismProps {
  restaurantId: string;
}

export function RestaurantDetailOrganism({
  restaurantId,
}: RestaurantDetailOrganismProps) {
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<RestaurantEvent | null>(null);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("Wed, July 18");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const data = await getRestaurantById(restaurantId);
        setRestaurant(data);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [restaurantId]);

  function handleSelectSlot(slot: string) {
    setSelectedSlot(slot);
    const params = new URLSearchParams({
      guests: String(guests),
      date,
      timeSlot: slot,
    });
    router.push(`/reserve/${restaurantId}?${params.toString()}`);
  }

  if (loading || !restaurant) {
    return (
      <MobileShellTemplate>
        <div className="p-6 text-xs text-gray-500">
          Cargando detalles desde MockAPI...
        </div>
      </MobileShellTemplate>
    );
  }

  return (
    <MobileShellTemplate>
      <div className="pb-8">
        {/* Hero Image */}
        <div className="relative h-64 w-full bg-gray-200">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-4 inset-x-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-9 h-9 rounded-full bg-black/45 text-white flex items-center justify-center backdrop-blur-xs cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-black/45 text-white flex items-center justify-center backdrop-blur-xs"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-gray-800 text-xs font-semibold shadow-md">
            <Images className="w-3.5 h-3.5 text-[#3B147A]" />
            View All ({restaurant.galleryCount})
          </span>
        </div>

        {/* Info principal */}
        <div className="p-5 space-y-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{restaurant.name}</h1>
            <p className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              {restaurant.location}
            </p>

            {/* Share / Save / 100pts */}
            <div className="flex items-center gap-2.5 mt-3.5">
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
              <button
                type="button"
                onClick={() => setSaved((s) => !s)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    saved ? "fill-rose-500 text-rose-500" : ""
                  }`}
                />
                Save
              </button>
              <PointsBadge points={restaurant.pointsReward} label="pts" />
            </div>
          </div>

          {/* Selector de invitados y fecha */}
          <div className="flex items-center justify-between py-2.5 border-y border-gray-100 text-xs font-medium text-gray-700">
            <label className="inline-flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#3B147A]" />
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-transparent font-semibold focus:outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} Guests
                  </option>
                ))}
              </select>
            </label>

            <label className="inline-flex items-center gap-1.5 text-[#3B147A] font-semibold">
              <Calendar className="w-4 h-4" />
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="Today">Today</option>
                <option value="Wed, July 18">Wed, July 18</option>
                <option value="Thu, July 19">Thu, July 19</option>
                <option value="Fri, July 20">Fri, July 20</option>
              </select>
            </label>
          </div>

          {/* Grillas de horarios Lunch y Dinner */}
          <TimeSlotGrid
            title="Lunch"
            slots={restaurant.lunchSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />

          <TimeSlotGrid
            title="Dinner"
            slots={restaurant.dinnerSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
          />

          {/* About */}
          <section className="space-y-2 pt-2">
            <h2 className="text-sm font-bold text-gray-900">
              About {restaurant.name}
            </h2>
            <p className="text-xs leading-relaxed text-gray-600">
              {restaurant.about}
            </p>
          </section>

          {/* Mapa y Contacto */}
          <section className="space-y-3">
            <div className="relative h-36 w-full rounded-xl overflow-hidden border border-gray-200 bg-emerald-50 flex items-center justify-center">
              <div className="text-center px-4">
                <MapPin className="w-7 h-7 text-[#3B147A] mx-auto" />
                <p className="text-xs font-semibold text-gray-800 mt-1">
                  {restaurant.location}
                </p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  restaurant.location
                )}`}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-neutral-900/80 text-white text-[11px] font-medium"
              >
                View Map Larger
              </a>
            </div>

            <div className="rounded-xl border border-gray-100 divide-y divide-gray-100 text-xs">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  restaurant.location
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 text-[#3B147A] font-medium hover:bg-gray-50"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
              <a
                href={`tel:${restaurant.phone}`}
                className="flex items-center gap-3 p-3 text-[#3B147A] font-medium hover:bg-gray-50"
              >
                <Phone className="w-4 h-4" />
                {restaurant.phone}
              </a>
              <a
                href={restaurant.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 text-[#3B147A] font-medium hover:bg-gray-50"
              >
                <Globe className="w-4 h-4" />
                {restaurant.website}
              </a>
            </div>
          </section>
        </div>
      </div>
    </MobileShellTemplate>
  );
}