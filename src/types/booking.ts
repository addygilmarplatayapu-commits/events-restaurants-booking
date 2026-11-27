export interface RestaurantEvent {
  id: string;
  name: string;
  location: string;
  priceLabel: string;
  rating: number;
  pointsReward: number;
  image: string;
  galleryCount: number;
  about: string;
  lunchSlots: string[];
  dinnerSlots: string[];
  phone: string;
  website: string;
}

export interface ReservationPayload {
  restaurantId: string;
  restaurantName: string;
  location: string;
  image: string;
  guests: number;
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  occasion: string;
  specialRequest: string;
  earnedPoints: number;
  createdAt: string;
}

export interface ReservationResponse extends ReservationPayload {
  id: string;
}
