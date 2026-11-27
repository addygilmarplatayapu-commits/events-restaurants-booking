"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { RestaurantEvent } from "@/types/booking";
import { getRestaurantById, createReservation } from "@/services/api";
import { FormInput } from "@/components/atoms/FormInput";
import { PrimaryButton } from "@/components/atoms/PrimaryButton";
import { ReservationSummaryCard } from "@/components/molecules/ReservationSummaryCard";
import { SuccessPointsModal } from "@/components/organisms/SuccessPointsModal";
import { MobileShellTemplate } from "@/components/templates/MobileShellTemplate";

interface ReservationWizardOrganismProps {
  restaurantId: string;
}

export function ReservationWizardOrganism({
  restaurantId,
}: ReservationWizardOrganismProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const guests = Number(searchParams.get("guests") || 2);
  const date = searchParams.get("date") || "Wed, July 18";
  const timeSlot = searchParams.get("timeSlot") || "7:00 pm";

  const [restaurant, setRestaurant] = useState<RestaurantEvent | null>(null);
  const [step, setStep] = useState<"input" | "preview">("input");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    getRestaurantById(restaurantId).then(setRestaurant).catch(console.error);
  }, [restaurantId]);

  function handleProceed(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setFormError("Por favor completa nombre, correo y teléfono.");
      return;
    }
    if (!acceptedTerms) {
      setFormError("Debes aceptar los Terms of Use y Privacy Policy.");
      return;
    }
    setFormError("");
    setStep("preview");
  }

  async function handleConfirmReservation() {
    if (!restaurant) return;
    try {
      setSubmitting(true);
      setFormError("");
      await createReservation({
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        location: restaurant.location,
        image: restaurant.image,
        guests,
        date,
        timeSlot,
        fullName,
        email,
        phone,
        occasion: occasion || "None",
        specialRequest: specialRequest || "None",
        earnedPoints: restaurant.pointsReward || 100,
        createdAt: new Date().toISOString(),
      });
      setShowSuccess(true);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "No se pudo guardar la reserva"
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!restaurant) {
    return (
      <MobileShellTemplate>
        <div className="p-6 text-xs text-gray-500">Preparando reservación...</div>
      </MobileShellTemplate>
    );
  }

  return (
    <MobileShellTemplate>
      <div className="p-5 space-y-5">
        <header className="space-y-1">
          <button
            type="button"
            onClick={() => (step === "preview" ? setStep("input") : router.back())}
            className="w-8 h-8 -ml-1.5 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-800 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Reservation Preview</h1>
          <p className="text-xs text-gray-500">
            Confirm if there are errors in the entered details.
          </p>
        </header>

        <ReservationSummaryCard
          image={restaurant.image}
          name={restaurant.name}
          location={restaurant.location}
          guests={guests}
          date={date}
          timeSlot={timeSlot}
        />

        {formError && (
          <p className="text-xs text-rose-600 bg-rose-50 p-3 rounded-lg">
            {formError}
          </p>
        )}

        {step === "input" ? (
          <form onSubmit={handleProceed} className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Dinner Details</h3>

            <FormInput
              label="Full Name"
              placeholder="Enter your Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <FormInput
              label="Email Address"
              type="email"
              placeholder="Enter your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormInput
              label="Phone Number"
              type="tel"
              placeholder="+44 20 7234 3456"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">
                Select an Occasion (Optional)
              </label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:border-[#3B147A]"
              >
                <option value="">Select Occasion</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Business Dinner">Business Dinner</option>
                <option value="Casual">Casual</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-600">
                Add a Special Request (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Write any special request..."
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#3B147A]"
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs text-gray-500 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 rounded border-gray-300 text-[#3B147A]"
              />
              <span>
                By clicking &quot;Reserve Now&quot; you agree to the{" "}
                <strong className="text-[#3B147A]">Terms of Use</strong> and{" "}
                <strong className="text-[#3B147A]">Privacy Policy</strong>.
              </span>
            </label>

            <PrimaryButton type="submit">Proceed</PrimaryButton>
          </form>
        ) : (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Dinner Details</h3>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-gray-400">Full Name</p>
                <p className="font-semibold text-gray-800 mt-0.5">{fullName}</p>
              </div>
              <div>
                <p className="text-gray-400">Email Address</p>
                <p className="font-semibold text-gray-800 mt-0.5">{email}</p>
              </div>
              <div>
                <p className="text-gray-400">Phone Number</p>
                <p className="font-semibold text-gray-800 mt-0.5">{phone}</p>
              </div>
              <div>
                <p className="text-gray-400">Select an Occasion</p>
                <p className="font-semibold text-gray-800 mt-0.5">
                  {occasion || "None"}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Add a Special Request</p>
                <p className="font-semibold text-gray-800 mt-0.5">
                  {specialRequest || "None"}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 pt-3">
              <PrimaryButton variant="outline" onClick={() => setStep("input")}>
                Edit Reservation Details
              </PrimaryButton>
              <PrimaryButton
                onClick={handleConfirmReservation}
                disabled={submitting}
              >
                {submitting ? "Saving in MockAPI..." : "Reserve Now"}
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>

      {showSuccess && (
        <SuccessPointsModal
          points={restaurant.pointsReward || 100}
          onFinish={() => router.push("/")}
        />
      )}
    </MobileShellTemplate>
  );
}