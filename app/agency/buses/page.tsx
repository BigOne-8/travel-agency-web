import type { Metadata } from "next"
import Link from "next/link"
import { Bus, Filter, MoreHorizontal, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AgencyLayout } from "@/components/agency/layout"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Manage Buses",
  description: "Manage your bus fleet",
}

// Mock data for buses
const buses = [
  {
    id: "BUS-001",
    name: "Express Luxury 1",
    type: "Luxury",
    capacity: 45,
    registrationNumber: "NY-12345",
    status: "Active",
    lastMaintenance: "2023-06-15",
    nextMaintenance: "2023-07-15",
    driver: "John Smith",
    amenities: ["WiFi", "Power Outlets", "Air Conditioning", "Restroom", "Entertainment System"],
  },
  {
    id: "BUS-002",
    name: "City Connect 1",
    type: "Standard",
    capacity: 45,
    registrationNumber: "NY-23456",
    status: "Active",
    lastMaintenance: "2023-06-10",
    nextMaintenance: "2023-07-10",
    driver: "Sarah Johnson",
    amenities: ["WiFi", "Air Conditioning"],
  },
  {
    id: "BUS-003",
    name: "Coastal Economy 1",
    type: "Economy",
    capacity: 40,
    registrationNumber: "NY-34567",
    status: "Maintenance",
    lastMaintenance: "2023-06-20",
    nextMaintenance: "2023-07-05",
    driver: "Michael Brown",
    amenities: ["Air Conditioning"],
  },
  {
    id: "BUS-004",
    name: "Mountain Luxury 1",
    type: "Luxury",
    capacity: 45,
    registrationNumber: "NY-45678",
    status: "Active",
    lastMaintenance: "2023-06-05",
    nextMaintenance: "2023-07-05",
    driver: "Emily Davis",
    amenities: ["WiFi", "Power Outlets", "Air Conditioning", "Restroom", "Entertainment System", "Snacks"],
  },
  {
    id: "BUS-005",
    name: "Express Standard 1",
    type: "Standard",
    capacity: 45,
    registrationNumber: "NY-56789",
    status: "Active",
    lastMaintenance: "2023-06-01",
    nextMaintenance: "2023-07-01",
    driver: "Robert Wilson",
    amenities: ["WiFi", "Air Conditioning"],
  },
]

export default function BusesPage() {
  return (
    <AgencyLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Buses</h2>
          <Link href="/agency/buses/add">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Bus
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Bus Fleet Management</CardTitle>
            <CardDescription>View and manage all buses in your fleet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search buses..." className="pl-8 w-full" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Bus Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="economy">Economy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bus ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Registration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Next Maintenance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buses.map((bus) => (
                    <TableRow key={bus.id}>
                      <TableCell className="font-medium">{bus.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Bus className="mr-1 h-3 w-3 text-muted-foreground" />
                          {bus.name}
                        </div>
                      </TableCell>
                      <TableCell>{bus.type}</TableCell>
                      <TableCell>{bus.capacity} seats</TableCell>
                      <TableCell>{bus.registrationNumber}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            bus.status === "Active"
                              ? "default"
                              : bus.status === "Maintenance"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {bus.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{bus.nextMaintenance}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Link href={`/agency/buses/${bus.id}`} className="flex w-full">
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/agency/buses/${bus.id}/edit`} className="flex w-full">
                                Edit Bus
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Schedule Maintenance</DropdownMenuItem>
                            <DropdownMenuItem>View Trip History</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Remove from Fleet</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AgencyLayout>
  )
}
