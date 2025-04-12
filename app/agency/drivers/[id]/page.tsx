import type { Metadata } from "next"
import DriverDetailClient from "./pageClient"
import { AgencyLayout } from "@/components/agency/layout"

export const metadata: Metadata = {
  title: "Driver Profile | Agency Dashboard",
  description: "View and manage driver details",
}

export default function DriverDetailPage({ params }: { params: { id: string } }) {
  return (
    <AgencyLayout>
      <DriverDetailClient id={params.id} />
    </AgencyLayout>
  )
}
