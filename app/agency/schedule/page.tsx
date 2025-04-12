import type { Metadata } from "next"
import SchedulePageClient from "./pageClient"
import { AgencyLayout } from "@/components/agency/layout"

export const metadata: Metadata = {
  title: "Schedule Management | Agency Dashboard",
  description: "Manage your bus schedules and timetables",
}

export default function SchedulePage() {
  return (
    <AgencyLayout>
      <SchedulePageClient />
    </AgencyLayout>
  )
}
