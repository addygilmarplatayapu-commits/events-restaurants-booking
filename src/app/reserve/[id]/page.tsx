import { Suspense } from "react";
import { ReservationWizardOrganism } from "@/components/organisms/ReservationWizardOrganism";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReservePage({ params }: PageProps) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="p-6 text-xs">Cargando...</div>}>
      <ReservationWizardOrganism restaurantId={id} />
    </Suspense>
  );
}