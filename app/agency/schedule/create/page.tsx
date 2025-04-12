import type { Metadata } from "next"
import CreateScheduleClient from "./pageClient"
import { AgencyLayout } from "@/components/agency/layout"

export const metadata: Metadata = {
  title: "Create Schedule | Agency Dashboard",
  description: "Create a new bus schedule",
}

export default function CreateSchedulePage() {
  return (
    <AgencyLayout>
      <CreateScheduleClient />
    </AgencyLayout>
  )
}
