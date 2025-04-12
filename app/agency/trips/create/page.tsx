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
  title: "Create Trip",
  description: "Create a new bus trip",
}

export default function CreateTripPage() {
  return (
    <AgencyLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center gap-4">
          <Link href="/agency/trips">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Create New Trip</h2>
        </div>

        <form>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
                <CardDescription>Enter the basic information for this trip</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="route">Route</Label>
                      <Select>
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
                      <Select>
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
                            <span>Select date</span>
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
                        <Input type="time" id="departure-time" placeholder="Departure Time" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="arrival-time">Arrival Time</Label>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input type="time" id="arrival-time" placeholder="Arrival Time" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="driver">Driver</Label>
                      <Select>
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
                      <Select defaultValue="scheduled">
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
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
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing & Availability</CardTitle>
                <CardDescription>Set pricing and seat availability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="base-price">Base Price ($)</Label>
                    <Input type="number" id="base-price" placeholder="0.00" min="0" step="0.01" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input type="number" id="discount" placeholder="0" min="0" max="100" />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="available-seats">Available Seats</Label>
                    <Input type="number" id="available-seats" placeholder="45" min="0" disabled />
                    <p className="text-xs text-muted-foreground">Based on the selected bus capacity</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reserved-seats">Reserved Seats</Label>
                    <Input type="number" id="reserved-seats" placeholder="0" min="0" />
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
                <CardDescription>Add pickup and drop-off locations for this trip</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Departure Location</Label>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter departure location" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Arrival Location</Label>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter arrival location" />
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
                <CardDescription>Select amenities available on this trip</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="wifi" className="rounded border-gray-300" />
                    <Label htmlFor="wifi">WiFi</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="power" className="rounded border-gray-300" />
                    <Label htmlFor="power">Power Outlets</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="ac" className="rounded border-gray-300" />
                    <Label htmlFor="ac">Air Conditioning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="restroom" className="rounded border-gray-300" />
                    <Label htmlFor="restroom">Restroom</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="entertainment" className="rounded border-gray-300" />
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
              <Link href="/agency/trips">Cancel</Link>
            </Button>
            <Button type="submit">Create Trip</Button>
          </div>
        </form>
      </div>
    </AgencyLayout>
  )
}
