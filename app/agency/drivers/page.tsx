import type { Metadata } from "next"
import DriversPageClient from "./pageClient"
import { AgencyLayout } from "@/components/agency/layout"

export const metadata: Metadata = {
  title: "Driver Management | Agency Dashboard",
  description: "Manage your bus drivers and their assignments",
}

export default function DriversPage() {
  return (
    <AgencyLayout>
      <DriversPageClient />
    </AgencyLayout>
  )
}
