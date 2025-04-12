import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AgencyLayout } from "@/components/agency/layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export const metadata: Metadata = {
  title: "Edit Trip",
  description: "Edit trip details",
}

// Mock trip data
const trip = {
  id: "TRIP-1001",
  route: "ny-bos",
  departureCity: "New York",
  arrivalCity: "Boston",
  departureLocation: "Port Authority Bus Terminal, New York",
  arrivalLocation: "South Station, Boston",
  departureTime: "08:00",
  arrivalTime: "12:30",
  duration: "4h 30m",
  date: "2023-07-15",
  bus: "bus-001",
  busType: "Luxury",
  driver: "john-smith",
  status: "Active",
  price: 45,
  discount: 0,
  bookedSeats: 32,
  totalSeats: 45,
  amenities: ["wifi", "power", "ac", "restroom", "entertainment"],
  notes: "This is a direct express service with no intermediate stops.",
}

export default function EditTripPage() {
  return (
    <AgencyLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center gap-4">
          <Link href={`/agency/trips/${trip.id}`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Edit Trip: {trip.id}</h2>
        </div>

        <form>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
                <CardDescription>Update the basic information for this trip</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="route">Route</Label>
                      <Select defaultValue={trip.route}>
                        <SelectTrigger id="route">
                          <SelectValue placeholder="Select a route" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ny-bos">New York to Boston</SelectItem>
                          <SelectItem value="ny-was">New York to Washington DC</SelectItem>
                          <SelectItem value="ny-phi">New York to Philadelphia</SelectItem>
                          <SelectItem value="bos-ny">Boston to New York</SelectItem>
                          <SelectItem value="was-ny">Washington DC to New York</SelectItem>
                          <SelectItem value="phi-ny">Philadelphia to New York</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bus">Bus</Label>
                      <Select defaultValue={trip.bus}>
                        <SelectTrigger id="bus">
                          <SelectValue placeholder="Select a bus" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bus-001">BUS-001 (Luxury - 45 seats)</SelectItem>
                          <SelectItem value="bus-002">BUS-002 (Standard - 45 seats)</SelectItem>
                          <SelectItem value="bus-003">BUS-003 (Economy - 40 seats)</SelectItem>
                          <SelectItem value="bus-004">BUS-004 (Luxury - 45 seats)</SelectItem>
                          <SelectItem value="bus-005">BUS-005 (Standard - 45 seats)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={cn("w-full justify-start text-left font-normal")}>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>{trip.date}</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent mode="single" initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="departure-time">Departure Time</Label>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input type="time" id="departure-time" defaultValue={trip.departureTime} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="arrival-time">Arrival Time</Label>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input type="time" id="arrival-time" defaultValue={trip.arrivalTime} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="driver">Driver</Label>
                      <Select defaultValue={trip.driver}>
                        <SelectTrigger id="driver">
                          <SelectValue placeholder="Assign a driver" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john-smith">John Smith</SelectItem>
                          <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                          <SelectItem value="michael-brown">Michael Brown</SelectItem>
                          <SelectItem value="emily-davis">Emily Davis</SelectItem>
                          <SelectItem value="robert-wilson">Robert Wilson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select defaultValue={trip.status}>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Scheduled">Scheduled</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Trip Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter any special instructions or notes for this trip"
                      className="min-h-[100px]"
                      defaultValue={trip.notes}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing & Availability</CardTitle>
                <CardDescription>Update pricing and seat availability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="base-price">Base Price ($)</Label>
                    <Input
                      type="number"
                      id="base-price"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      defaultValue={trip.price}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input type="number" id="discount" placeholder="0" min="0" max="100" defaultValue={trip.discount} />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="available-seats">Available Seats</Label>
                    <Input type="number" id="available-seats" value={trip.totalSeats} disabled />
                    <p className="text-xs text-muted-foreground">Based on the selected bus capacity</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="booked-seats">Booked Seats</Label>
                    <Input type="number" id="booked-seats" value={trip.bookedSeats} disabled />
                    <p className="text-xs text-muted-foreground">Current bookings for this trip</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reserved-seats">Reserved Seats</Label>
                    <Input type="number" id="reserved-seats" placeholder="0" min="0" defaultValue="0" />
                    <p className="text-xs text-muted-foreground">
                      Seats reserved for offline bookings or special purposes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Pickup & Drop-off Points</CardTitle>
                <CardDescription>Update pickup and drop-off locations for this trip</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Departure Location</Label>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter departure location" defaultValue={trip.departureLocation} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Arrival Location</Label>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter arrival location" defaultValue={trip.arrivalLocation} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Additional Stops</Label>
                      <Button variant="outline" size="sm">
                        Add Stop
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">No additional stops added yet</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
                <CardDescription>Update amenities available on this trip</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="wifi"
                      className="rounded border-gray-300"
                      defaultChecked={trip.amenities.includes("wifi")}
                    />
                    <Label htmlFor="wifi">WiFi</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="power"
                      className="rounded border-gray-300"
                      defaultChecked={trip.amenities.includes("power")}
                    />
                    <Label htmlFor="power">Power Outlets</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="ac"
                      className="rounded border-gray-300"
                      defaultChecked={trip.amenities.includes("ac")}
                    />
                    <Label htmlFor="ac">Air Conditioning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="restroom"
                      className="rounded border-gray-300"
                      defaultChecked={trip.amenities.includes("restroom")}
                    />
                    <Label htmlFor="restroom">Restroom</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="entertainment"
                      className="rounded border-gray-300"
                      defaultChecked={trip.amenities.includes("entertainment")}
                    />
                    <Label htmlFor="entertainment">Entertainment System</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="snacks" className="rounded border-gray-300" />
                    <Label htmlFor="snacks">Snacks & Beverages</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href={`/agency/trips/${trip.id}`}>Cancel</Link>
            </Button>
            <Button variant="destructive" type="button" className="mr-auto">
              Delete Trip
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </AgencyLayout>
  )
}
