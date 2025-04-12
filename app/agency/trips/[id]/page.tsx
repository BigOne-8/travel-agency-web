import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Bus, Calendar, Clock, Edit, MapPin, Printer, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AgencyLayout } from "@/components/agency/layout"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Trip Details",
  description: "View trip details",
}

// Mock trip data
const trip = {
  id: "TRIP-1001",
  route: "New York to Boston",
  departureCity: "New York",
  arrivalCity: "Boston",
  departureLocation: "Port Authority Bus Terminal, New York",
  arrivalLocation: "South Station, Boston",
  departureTime: "08:00 AM",
  arrivalTime: "12:30 PM",
  duration: "4h 30m",
  date: "2023-07-15",
  bus: "BUS-001",
  busType: "Luxury",
  driver: "John Smith",
  status: "Active",
  price: 45,
  discount: 0,
  bookedSeats: 32,
  totalSeats: 45,
  amenities: ["WiFi", "Power Outlets", "Air Conditioning", "Restroom", "Entertainment System"],
  notes: "This is a direct express service with no intermediate stops.",
  createdAt: "2023-06-20",
  updatedAt: "2023-07-01",
}

// Mock booking data
const bookings = [
  {
    id: "BKG-5001",
    passengerName: "Alice Johnson",
    seatNumber: "12A",
    bookingDate: "2023-07-01",
    status: "Confirmed",
    amount: 45,
  },
  {
    id: "BKG-5002",
    passengerName: "Bob Smith",
    seatNumber: "12B",
    bookingDate: "2023-07-01",
    status: "Confirmed",
    amount: 45,
  },
  {
    id: "BKG-5003",
    passengerName: "Charlie Brown",
    seatNumber: "14C",
    bookingDate: "2023-07-02",
    status: "Confirmed",
    amount: 45,
  },
  {
    id: "BKG-5004",
    passengerName: "Diana Prince",
    seatNumber: "15A",
    bookingDate: "2023-07-05",
    status: "Confirmed",
    amount: 45,
  },
  {
    id: "BKG-5005",
    passengerName: "Edward Norton",
    seatNumber: "16B",
    bookingDate: "2023-07-08",
    status: "Confirmed",
    amount: 45,
  },
]

export default function TripDetailsPage() {
  return (
    <AgencyLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/agency/trips">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{trip.id}</h2>
              <p className="text-muted-foreground">{trip.route}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print Manifest
            </Button>
            <Link href={`/agency/trips/${trip.id}/edit`}>
              <Button size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit Trip
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Trip Information</CardTitle>
              <CardDescription>Detailed information about this trip</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Status</p>
                    <Badge
                      variant={
                        trip.status === "Active" ? "default" : trip.status === "Scheduled" ? "outline" : "secondary"
                      }
                    >
                      {trip.status}
                    </Badge>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Date</p>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{trip.date}</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Duration</p>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{trip.duration}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Departure</p>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{trip.departureCity}</p>
                          <p className="text-sm text-muted-foreground">{trip.departureLocation}</p>
                          <p className="text-sm">{trip.departureTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium">Bus</p>
                      <div className="flex items-center gap-2">
                        <Bus className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p>
                            {trip.bus} ({trip.busType})
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {trip.bookedSeats}/{trip.totalSeats} seats booked
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Arrival</p>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{trip.arrivalCity}</p>
                          <p className="text-sm text-muted-foreground">{trip.arrivalLocation}</p>
                          <p className="text-sm">{trip.arrivalTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-medium">Driver</p>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <p>{trip.driver}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {trip.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Notes</p>
                  <p className="text-sm text-muted-foreground">{trip.notes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing & Revenue</CardTitle>
              <CardDescription>Financial information for this trip</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Base Price</p>
                  <p className="text-2xl font-bold">${trip.price.toFixed(2)}</p>
                  {trip.discount > 0 && (
                    <p className="text-sm text-muted-foreground">{trip.discount}% discount applied</p>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-sm">Booked Seats</p>
                    <p className="font-medium">{trip.bookedSeats}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Total Revenue</p>
                    <p className="font-medium">${(trip.bookedSeats * trip.price).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Occupancy Rate</p>
                    <p className="font-medium">{Math.round((trip.bookedSeats / trip.totalSeats) * 100)}%</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm font-medium">Trip Created</p>
                  <p className="text-sm text-muted-foreground">{trip.createdAt}</p>

                  <p className="text-sm font-medium mt-4">Last Updated</p>
                  <p className="text-sm text-muted-foreground">{trip.updatedAt}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Passenger Bookings</CardTitle>
            <CardDescription>View all bookings for this trip</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Passenger Name</TableHead>
                    <TableHead>Seat</TableHead>
                    <TableHead>Booking Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.passengerName}</TableCell>
                      <TableCell>{booking.seatNumber}</TableCell>
                      <TableCell>{booking.bookingDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{booking.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">${booking.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {bookings.length} of {trip.bookedSeats} bookings
              </p>
              <Button variant="outline" size="sm">
                View All Bookings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AgencyLayout>
  )
}
