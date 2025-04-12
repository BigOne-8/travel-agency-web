import type { Metadata } from "next"
import { AgencyLayout } from "@/components/agency/layout"
import ReportsClient from "./pageClient"

export const metadata: Metadata = {
  title: "AI Reports | Bus Booking Agency",
  description: "AI-powered reports and analytics for your bus booking business",
}

export default function ReportsPage() {
  return (
    <AgencyLayout>
      <ReportsClient />
    </AgencyLayout>
  )
}
