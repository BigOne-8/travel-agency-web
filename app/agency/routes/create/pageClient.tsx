"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bus, Clock, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AgencyLayout } from "@/components/agency/layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

// Mock data for cities
const cities = [
  "New York",
  "Boston",
  "Washington DC",
  "Philadelphia",
  "Baltimore",
  "Hartford",
  "Springfield",
  "Providence",
  "Newark",
  "Trenton",
]

// Mock data for buses
const buses = [
  { id: "BUS-001", type: "Luxury", capacity: 45, driver: "John Smith" },
  { id: "BUS-002", type: "Standard", capacity: 45, driver: "Sarah Johnson" },
  { id: "BUS-003", type: "Economy", capacity: 40, driver: "Michael Brown" },
  { id: "BUS-004", type: "Luxury", capacity: 45, driver: "Emily Davis" },
  { id: "BUS-005", type: "Standard", capacity: 45, driver: "Robert Wilson" },
]

// Mock data for amenities
const amenities = [
  "WiFi",
  "Power Outlets",
  "Air Conditioning",
  "Restroom",
  "Entertainment System",
  "Snacks & Beverages",
  "Reclining Seats",
  "Extra Legroom",
  "USB Charging",
]

export default function CreateRoutePageClient() {
  const [stops, setStops] = useState<string[]>([])
  const [selectedBuses, setSelectedBuses] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [trips, setTrips] = useState([
    {
      departureTime: "08:00",
      arrivalTime: "12:30",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
  ])

  const addStop = () => {
    setStops([...stops, ""])
  }

  const removeStop = (index: number) => {
    const newStops = [...stops]
    newStops.splice(index, 1)
    setStops(newStops)
  }

  const updateStop = (index: number, value: string) => {
    const newStops = [...stops]
    newStops[index] = value
    setStops(newStops)
  }

  const addTrip = () => {
    setTrips([...trips, { departureTime: "", arrivalTime: "", days: [] }])
  }

  const removeTrip = (index: number) => {
    const newTrips = [...trips]
    newTrips.splice(index, 1)
    setTrips(newTrips)
  }

  const updateTrip = (index: number, field: "departureTime" | "arrivalTime", value: string) => {
    const newTrips = [...trips]
    newTrips[index][field] = value
    setTrips(newTrips)
  }

  const toggleTripDay = (tripIndex: number, day: string) => {
    const newTrips = [...trips]
    const dayIndex = newTrips[tripIndex].days.indexOf(day)
    if (dayIndex === -1) {
      newTrips[tripIndex].days.push(day)
    } else {
      newTrips[tripIndex].days.splice(dayIndex, 1)
    }
    setTrips(newTrips)
  }

  const toggleBus = (busId: string) => {
    if (selectedBuses.includes(busId)) {
      setSelectedBuses(selectedBuses.filter((id) => id !== busId))
    } else {
      setSelectedBuses([...selectedBuses, busId])
    }
  }

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

  return (
    <AgencyLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center gap-4">
          <Link href="/agency/routes">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Create New Route</h2>
        </div>

        <form>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details for this route</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="route-name">Route Name</Label>
                    <Input id="route-name" placeholder="Enter route name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="route-status">Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger id="route-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="seasonal">Seasonal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="origin">Origin</Label>
                    <Select>
                      <SelectTrigger id="origin">
                        <SelectValue placeholder="Select origin city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city.toLowerCase().replace(/\s+/g, "-")}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Select>
                      <SelectTrigger id="destination">
                        <SelectValue placeholder="Select destination city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city.toLowerCase().replace(/\s+/g, "-")}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance (miles)</Label>
                    <Input id="distance" type="number" placeholder="Enter distance" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration-hours">Duration</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input id="duration-hours" type="number" placeholder="Hours" />
                      <Input id="duration-minutes" type="number" placeholder="Minutes" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="base-price">Base Price ($)</Label>
                    <Input id="base-price" type="number" placeholder="Enter base price" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter route description" className="min-h-[100px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Stops</CardTitle>
                    <CardDescription>Add intermediate stops for this route</CardDescription>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addStop}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Stop
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stops.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No stops added yet. Click "Add Stop" to add intermediate stops.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {stops.map((stop, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <Select value={stop} onValueChange={(value) => updateStop(index, value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select stop" />
                              </SelectTrigger>
                              <SelectContent>
                                {cities.map((city) => (
                                  <SelectItem key={city} value={city}>
                                    {city}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeStop(index)}>
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Schedule</CardTitle>
                    <CardDescription>Set departure and arrival times</CardDescription>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addTrip}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Trip
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trips.map((trip, index) => (
                    <div key={index} className="space-y-4 p-4 border rounded-md">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Trip #{index + 1}</h3>
                        {index > 0 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeTrip(index)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        )}
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`departure-time-${index}`}>Departure Time</Label>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id={`departure-time-${index}`}
                              type="time"
                              value={trip.departureTime}
                              onChange={(e) => updateTrip(index, "departureTime", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`arrival-time-${index}`}>Arrival Time</Label>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id={`arrival-time-${index}`}
                              type="time"
                              value={trip.arrivalTime}
                              onChange={(e) => updateTrip(index, "arrivalTime", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Operating Days</Label>
                        <div className="flex flex-wrap gap-2">
                          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                            <Badge
                              key={day}
                              variant={trip.days.includes(day) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => toggleTripDay(index, day)}
                            >
                              {day.substring(0, 3)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                  <CardDescription>Select amenities available on this route</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={`amenity-${amenity.toLowerCase().replace(/\s+/g, "-")}`}
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <label
                          htmlFor={`amenity-${amenity.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assign Buses</CardTitle>
                  <CardDescription>Select buses to assign to this route</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {buses.map((bus) => (
                      <div key={bus.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`bus-${bus.id}`}
                          checked={selectedBuses.includes(bus.id)}
                          onCheckedChange={() => toggleBus(bus.id)}
                        />
                        <label
                          htmlFor={`bus-${bus.id}`}
                          className="flex flex-1 items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          <div className="flex items-center gap-2">
                            <Bus className="h-4 w-4 text-muted-foreground" />
                            <span>{bus.id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{bus.type}</Badge>
                            <span className="text-muted-foreground">{bus.capacity} seats</span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Pricing Options</CardTitle>
                <CardDescription>Configure pricing options for this route</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="weekend-price">Weekend Price Adjustment (%)</Label>
                      <Input id="weekend-price" type="number" placeholder="e.g. 10 for 10% increase" />
                      <p className="text-xs text-muted-foreground">
                        Enter a percentage to adjust prices on weekends. Use positive values for increase, negative for
                        decrease.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="holiday-price">Holiday Price Adjustment (%)</Label>
                      <Input id="holiday-price" type="number" placeholder="e.g. 15 for 15% increase" />
                      <p className="text-xs text-muted-foreground">
                        Enter a percentage to adjust prices on holidays. Use positive values for increase, negative for
                        decrease.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="dynamic-pricing">Dynamic Pricing</Label>
                        <p className="text-xs text-muted-foreground">
                          Automatically adjust prices based on demand and seat availability
                        </p>
                      </div>
                      <Switch id="dynamic-pricing" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label htmlFor="seasonal-pricing">Seasonal Pricing</Label>
                        <p className="text-xs text-muted-foreground">
                          Apply different pricing for different seasons (summer, winter, etc.)
                        </p>
                      </div>
                      <Switch id="seasonal-pricing" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 flex justify-end gap-4">
              <Button variant="outline" asChild>
                <Link href="/agency/routes">Cancel</Link>
              </Button>
              <Button type="submit">Create Route</Button>
            </div>
          </div>
        </form>
      </div>
    </AgencyLayout>
  )
}
