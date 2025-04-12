import type { Metadata } from "next"
import CreateRoutePageClient from "./pageClient"

export const metadata: Metadata = {
  title: "Create Route",
  description: "Create a new bus route",
}

export default function CreateRoutePage() {
  return <CreateRoutePageClient />
}
