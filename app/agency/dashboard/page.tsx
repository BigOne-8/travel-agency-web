import type { Metadata } from "next"
import AgencyDashboardPageClient from "./pageClient"

export const metadata: Metadata = {
  title: "Agency Dashboard",
  description: "Manage your bus agency operations",
}

export default function AgencyDashboardPage() {
  return <AgencyDashboardPageClient />
}
