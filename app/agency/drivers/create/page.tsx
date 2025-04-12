import type { Metadata } from "next"
import CreateDriverClient from "./pageClient"
import { AgencyLayout } from "@/components/agency/layout"

export const metadata: Metadata = {
  title: "Create Driver | Agency Dashboard",
  description: "Add a new driver to your fleet",
}

export default function CreateDriverPage() {
  return (
    <AgencyLayout>
      <CreateDriverClient />
    </AgencyLayout>
  )
}
