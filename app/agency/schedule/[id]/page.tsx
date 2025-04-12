import type { Metadata } from "next"
import ScheduleDetailClient from "./pageClient"
import { AgencyLayout } from "@/components/agency/layout"

export const metadata: Metadata = {
  title: "Schedule Details | Agency Dashboard",
  description: "View and manage schedule details",
}

export default function ScheduleDetailPage({ params }: { params: { id: string } }) {
  return (
    <AgencyLayout>
      <ScheduleDetailClient id={params.id} />
    </AgencyLayout>
  )
}
