import type { Metadata } from "next"
import Link from "next/link"
import { Bus, Clock, Filter, MapPin, MoreHorizontal, Plus, Search } from "lucide-react"

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
  title: "Manage Trips",
  description: "Create and manage your bus trips",
}

// Mock data for trips
const trips = [
  {
    id: "TRIP-1001",
    route: "New York to Boston",
    departureTime: "08:00 AM",
    arrivalTime: "12:30 PM",
    date: "2023-07-15",
    bus: "BUS-001",
    driver: "John Smith",
    status: "Active",
    price: 45,
    bookedSeats: 32,
    totalSeats: 45,
  },
  {
    id: "TRIP-1002",
    route: "New York to Washington DC",
    departureTime: "09:15 AM",
    arrivalTime: "02:45 PM",
    date: "2023-07-15",
    bus: "BUS-002",
    driver: "Sarah Johnson",
    status: "Active",
    price: 38,
    bookedSeats: 28,
    totalSeats: 45,
  },
  {
    id: "TRIP-1003",
    route: "New York to Philadelphia",
    departureTime: "10:30 AM",
    arrivalTime: "01:00 PM",
    date: "2023-07-15",
    bus: "BUS-003",
    driver: "Michael Brown",
    status: "Active",
    price: 25,
    bookedSeats: 18,
    totalSeats: 40,
  },
  {
    id: "TRIP-1004",
    route: "New York to Boston",
    departureTime: "12:00 PM",
    arrivalTime: "04:15 PM",
    date: "2023-07-16",
    bus: "BUS-004",
    driver: "Emily Davis",
    status: "Scheduled",
    price: 42,
    bookedSeats: 12,
    totalSeats: 45,
  },
  {
    id: "TRIP-1005",
    route: "New York to Washington DC",
    departureTime: "02:30 PM",
    arrivalTime: "08:00 PM",
    date: "2023-07-16",
    bus: "BUS-005",
    driver: "Robert Wilson",
    status: "Scheduled",
    price: 40,
    bookedSeats: 15,
    totalSeats: 45,
  },
]

export default function TripsPage() {
  return (
    <AgencyLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Trips</h2>
          <Link href="/agency/trips/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Trip
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Trip Management</CardTitle>
            <CardDescription>View and manage all your scheduled bus trips</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search trips..." className="pl-8 w-full" />
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
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="today">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="all">All Dates</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trip ID</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Bus</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell className="font-medium">{trip.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                          {trip.route}
                        </div>
                      </TableCell>
                      <TableCell>{trip.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                          {trip.departureTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Bus className="mr-1 h-3 w-3 text-muted-foreground" />
                          {trip.bus}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            trip.status === "Active" ? "default" : trip.status === "Scheduled" ? "outline" : "secondary"
                          }
                        >
                          {trip.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {trip.bookedSeats}/{trip.totalSeats}
                      </TableCell>
                      <TableCell>${trip.price}</TableCell>
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
                              <Link href={`/agency/trips/${trip.id}`} className="flex w-full">
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/agency/trips/${trip.id}/edit`} className="flex w-full">
                                Edit Trip
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Bookings</DropdownMenuItem>
                            <DropdownMenuItem>Print Manifest</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Cancel Trip</DropdownMenuItem>
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
