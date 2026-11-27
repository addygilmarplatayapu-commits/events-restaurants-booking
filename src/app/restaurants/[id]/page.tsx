import { RestaurantDetailOrganism } from "@/components/organisms/RestaurantDetailOrganism";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RestaurantDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <RestaurantDetailOrganism restaurantId={id} />;
}