import { RestaurantEvent, ReservationPayload, ReservationResponse } from "@/types/booking";

const RESTAURANTS_URL = process.env.NEXT_PUBLIC_RESTAURANTS_URL || "";
const RESERVATIONS_URL = process.env.NEXT_PUBLIC_RESERVATIONS_URL || "";

export async function getRestaurants(): Promise<RestaurantEvent[]> {
  const res = await fetch(RESTAURANTS_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener restaurantes y eventos");
  return res.json();
}

export async function getRestaurantById(id: string): Promise<RestaurantEvent> {
  const res = await fetch(`${RESTAURANTS_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener el detalle del restaurante");
  return res.json();
}

export async function createReservation(
  payload: ReservationPayload
): Promise<ReservationResponse> {
  const res = await fetch(RESERVATIONS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error al registrar la reservación en MockAPI");
  return res.json();
}

export async function getReservations(): Promise<ReservationResponse[]> {
  const res = await fetch(RESERVATIONS_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener las reservaciones");
  return res.json();
}