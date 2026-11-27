"use client";

import { useEffect, useState } from "react";
import { Bell, CalendarCheck } from "lucide-react";
import { RestaurantEvent, ReservationResponse } from "@/types/booking";
import { getRestaurants, getReservations } from "@/services/api";
import { PointsBadge } from "@/components/atoms/PointsBadge";
import { LoyaltyCard } from "@/components/molecules/LoyaltyCard";
import { RestaurantCard } from "@/components/molecules/RestaurantCard";
import { BottomNavBar, NavTab } from "@/components/molecules/BottomNavBar";
import { MobileShellTemplate } from "@/components/templates/MobileShellTemplate";

const BASE_POINTS = 850;

export function HomeFeedOrganism() {
  const [restaurants, setRestaurants] = useState<RestaurantEvent[]>([]);
  const [reservations, setReservations] = useState<ReservationResponse[]>([]);
  const [claimedFreePoints, setClaimedFreePoints] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        const [restData, resvData] = await Promise.all([
          getRestaurants(),
          getReservations(),
        ]);
        setRestaurants(restData);
        setReservations(resvData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error cargando datos");
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  const earnedFromReservations = reservations.reduce(
    (acc, item) => acc + (Number(item.earnedPoints) || 0),
    0
  );
  const totalPoints =
    BASE_POINTS + earnedFromReservations + (claimedFreePoints ? 50 : 0);

  function toggleFavorite(id: string) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  const visibleRestaurants = restaurants.filter((r) => {
    if (activeTab === "saved" && !favorites.includes(r.id)) return false;
    if (
      activeTab === "search" &&
      searchQuery.trim() &&
      !r.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <MobileShellTemplate
      bottomNav={<BottomNavBar activeTab={activeTab} onChangeTab={setActiveTab} />}
    >
      <div className="p-5 space-y-5">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Good Morning</h1>
            <div className="mt-1.5">
              <PointsBadge points={totalPoints} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Notificaciones"
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700"
            >
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#3B147A] text-white text-xs font-bold flex items-center justify-center">
              EB
            </div>
          </div>
        </header>

        <LoyaltyCard
          totalPoints={totalPoints}
          claimedFreePoints={claimedFreePoints}
          onClaimFreePoints={() => setClaimedFreePoints(true)}
        />

        {activeTab === "search" && (
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search restaurant or location..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#3B147A]"
          />
        )}

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">
              {activeTab === "saved" ? "Saved Places" : "Fine Dining"}
            </h2>
            <span className="text-xs font-semibold text-[#3B147A]">
              See all &gt;
            </span>
          </div>

          {loading && (
            <p className="text-xs text-gray-500 py-4">Cargando desde MockAPI...</p>
          )}

          {error && (
            <p className="text-xs text-rose-600 bg-rose-50 p-3 rounded-lg">{error}</p>
          )}

          {!loading && !error && (
            <div className="flex gap-3.5 overflow-x-auto pb-2">
              {visibleRestaurants.map((item) => (
                <RestaurantCard
                  key={item.id}
                  item={item}
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </section>

        {/* Historial en vivo desde endpoint /reservations */}
        {reservations.length > 0 && (
          <section className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <CalendarCheck className="w-4 h-4 text-[#3B147A]" />
                My Reservations ({reservations.length})
              </h2>
              <span className="text-[11px] font-semibold text-emerald-600">
                +{earnedFromReservations} Pts earned
              </span>
            </div>
            <div className="space-y-2">
              {reservations.map((resv) => (
                <div
                  key={resv.id}
                  className="p-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{resv.restaurantName}</p>
                    <p className="text-gray-500">
                      {resv.date} • {resv.timeSlot} • {resv.guests} Guests
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[#3B147A] font-semibold">
                    +{resv.earnedPoints} Pts
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </MobileShellTemplate>
  );
}