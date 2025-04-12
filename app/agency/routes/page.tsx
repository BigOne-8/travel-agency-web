import type { Metadata } from "next"
import RoutesPageClient from "./pageClient"

export const metadata: Metadata = {
  title: "Manage Routes",
  description: "Create and manage your bus routes",
}

export default function RoutesPage() {
  return <RoutesPageClient />
}
