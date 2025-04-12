import type { Metadata } from "next"
import RouteDetailsPageClient from "./pageClient"

export const metadata: Metadata = {
  title: "Route Details",
  description: "View and manage route details",
}

export default function RouteDetailsPage({ params }: { params: { id: string } }) {
  return <RouteDetailsPageClient id={params.id} />
}
