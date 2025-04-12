"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  BarChart3,
  Bus,
  Calendar,
  Clock,
  Edit,
  Map,
  MoreHorizontal,
  TrendingUp,
  Download,
  Users,
  DollarSign,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AgencyLayout } from "@/components/agency/layout"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock route data
const route = {
  id: "RT-1001",
  name: "New York to Boston Express",
  origin: "New York",
  destination: "Boston",
  distance: "215 miles",
  duration: "4h 30m",
  basePrice: 45,
  status: "Active",
  popularity: 92,
  avgOccupancy: 85,
  revenue: "$45,230",
  growth: 12.3,
  stops: ["Hartford", "Springfield"],
  tripsPerDay: 8,
  createdAt: "2023-01-15",
  description:
    "Express service connecting New York City and Boston with limited stops for faster travel times. Features comfortable seating, WiFi, and power outlets.",
  amenities: ["WiFi", "Power Outlets", "Air Conditioning", "Restroom", "Entertainment System"],
  schedule: [
    {
      departureTime: "06:00 AM",
      arrivalTime: "10:30 AM",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    {
      departureTime: "08:00 AM",
      arrivalTime: "12:30 PM",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    {
      departureTime: "10:00 AM",
      arrivalTime: "02:30 PM",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    {
      departureTime: "12:00 PM",
      arrivalTime: "04:30 PM",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    {
      departureTime: "02:00 PM",
      arrivalTime: "06:30 PM",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    {
      departureTime: "04:00 PM",
      arrivalTime: "08:30 PM",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    {
      departureTime: "06:00 PM",
      arrivalTime: "10:30 PM",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    { departureTime: "08:00 PM", arrivalTime: "12:30 AM", days: ["Friday", "Saturday"] },
  ],
  monthlyStats: [
    { month: "Jan", revenue: 42000, occupancy: 82, passengers: 3200 },
    { month: "Feb", revenue: 40500, occupancy: 80, passengers: 3100 },
    { month: "Mar", revenue: 41200, occupancy: 81, passengers: 3150 },
    { month: "Apr", revenue: 43500, occupancy: 83, passengers: 3250 },
    { month: "May", revenue: 44800, occupancy: 84, passengers: 3300 },
    { month: "Jun", revenue: 45230, occupancy: 85, passengers: 3350 },
  ],
  assignedBuses: [
    { id: "BUS-001", type: "Luxury", capacity: 45, driver: "John Smith" },
    { id: "BUS-004", type: "Luxury", capacity: 45, driver: "Emily Davis" },
    { id: "BUS-005", type: "Standard", capacity: 45, driver: "Robert Wilson" },
  ],
}

export default function RouteDetailsPageClient({ id }: { id: string }) {
  const [timeFilter, setTimeFilter] = useState("monthly")

  return (
    <AgencyLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/agency/routes">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{route.name}</h2>
              <p className="text-muted-foreground">{route.id}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Map className="mr-2 h-4 w-4" />
              View on Map
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Link href={`/agency/routes/${id}/edit`}>
              <Button size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit Route
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{route.revenue}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />+{route.growth}% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Popularity</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{route.popularity}%</div>
              <Progress value={route.popularity} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{route.avgOccupancy}%</div>
              <Progress value={route.avgOccupancy} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trips</CardTitle>
              <Bus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{route.tripsPerDay}/day</div>
              <div className="text-xs text-muted-foreground">{route.tripsPerDay * 30} trips per month</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="buses">Assigned Buses</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Route Information</CardTitle>
                  <CardDescription>Detailed information about this route</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Basic Details</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <Badge variant={route.status === "Active" ? "default" : "secondary"}>{route.status}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Distance:</span>
                            <span className="font-medium">{route.distance}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-medium">{route.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Base Price:</span>
                            <span className="font-medium">${route.basePrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Created:</span>
                            <span className="font-medium">{route.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Amenities</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {route.amenities.map((amenity) => (
                            <Badge key={amenity} variant="outline">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Route Path</h3>
                        <div className="mt-2 relative pl-6 space-y-2">
                          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-muted" />
                          <div className="relative">
                            <div className="absolute left-[-20px] top-1 h-2 w-2 rounded-full bg-primary" />
                            <div className="font-medium">{route.origin}</div>
                            <div className="text-xs text-muted-foreground">Origin</div>
                          </div>
                          {route.stops.map((stop, index) => (
                            <div key={index} className="relative">
                              <div className="absolute left-[-20px] top-1 h-2 w-2 rounded-full bg-muted-foreground" />
                              <div className="font-medium">{stop}</div>
                              <div className="text-xs text-muted-foreground">Stop {index + 1}</div>
                            </div>
                          ))}
                          <div className="relative">
                            <div className="absolute left-[-20px] top-1 h-2 w-2 rounded-full bg-primary" />
                            <div className="font-medium">{route.destination}</div>
                            <div className="text-xs text-muted-foreground">Destination</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Description</h3>
                      <p className="mt-2 text-muted-foreground">{route.description}</p>
                      <div className="mt-4">
                        <h3 className="text-lg font-medium">Quick Stats</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Daily Trips:</span>
                            <span className="font-medium">{route.tripsPerDay}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Monthly Passengers:</span>
                            <span className="font-medium">~{route.monthlyStats[5].passengers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Assigned Buses:</span>
                            <span className="font-medium">{route.assignedBuses.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Route Map</CardTitle>
                  <CardDescription>Visual representation of the route</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                    <Map className="h-16 w-16 text-muted" />
                    <span className="ml-2 text-muted-foreground">Route map visualization</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>6-month performance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted" />
                    <span className="ml-2 text-muted-foreground">Performance chart</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Route Schedule</CardTitle>
                    <CardDescription>Daily departure and arrival times</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Add Trip
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left font-medium">Departure</th>
                        <th className="p-2 text-left font-medium">Arrival</th>
                        <th className="p-2 text-left font-medium">Duration</th>
                        <th className="p-2 text-left font-medium">Days</th>
                        <th className="p-2 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {route.schedule.map((trip, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              {trip.departureTime}
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              {trip.arrivalTime}
                            </div>
                          </td>
                          <td className="p-2">{route.duration}</td>
                          <td className="p-2">
                            <div className="flex flex-wrap gap-1">
                              {trip.days.map((day) => (
                                <Badge key={day} variant="outline" className="text-xs">
                                  {day.substring(0, 3)}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="p-2 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Trip</DropdownMenuItem>
                                <DropdownMenuItem>View Bookings</DropdownMenuItem>
                                <DropdownMenuItem>Assign Bus</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule Overview</CardTitle>
                <CardDescription>Visual representation of weekly trips</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border p-4">
                  <div className="grid grid-cols-7 gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="text-center font-medium">
                        {day}
                      </div>
                    ))}
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <div key={day} className="space-y-2 border rounded-md p-2">
                        {route.schedule
                          .filter((trip) =>
                            trip.days.includes(
                              day === "Mon"
                                ? "Monday"
                                : day === "Tue"
                                  ? "Tuesday"
                                  : day === "Wed"
                                    ? "Wednesday"
                                    : day === "Thu"
                                      ? "Thursday"
                                      : day === "Fri"
                                        ? "Friday"
                                        : day === "Sat"
                                          ? "Saturday"
                                          : "Sunday",
                            ),
                          )
                          .map((trip, index) => (
                            <div key={index} className="text-xs p-1 bg-muted/50 rounded">
                              {trip.departureTime}
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Route Performance</CardTitle>
                    <CardDescription>Detailed analytics for this route</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={timeFilter} onValueChange={setTimeFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted-foreground">Performance analytics chart</span>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Revenue Trend</h3>
                    <div className="space-y-4">
                      {route.monthlyStats.map((stat) => (
                        <div key={stat.month} className="flex items-center gap-4">
                          <div className="w-12 text-sm">{stat.month}</div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">${stat.revenue.toLocaleString()}</span>
                            </div>
                            <Progress value={(stat.revenue / 50000) * 100} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Occupancy Trend</h3>
                    <div className="space-y-4">
                      {route.monthlyStats.map((stat) => (
                        <div key={stat.month} className="flex items-center gap-4">
                          <div className="w-12 text-sm">{stat.month}</div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{stat.occupancy}%</span>
                            </div>
                            <Progress value={stat.occupancy} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Passenger Count</h3>
                    <div className="space-y-4">
                      {route.monthlyStats.map((stat) => (
                        <div key={stat.month} className="flex items-center gap-4">
                          <div className="w-12 text-sm">{stat.month}</div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{stat.passengers.toLocaleString()}</span>
                            </div>
                            <Progress value={(stat.passengers / 4000) * 100} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="text-lg font-medium mb-4">Key Performance Indicators</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Revenue per Trip</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ${Math.round(route.monthlyStats[5].revenue / (route.tripsPerDay * 30))}
                        </div>
                        <div className="text-xs text-muted-foreground">+5.2% from last month</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Passengers per Trip</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {Math.round(route.monthlyStats[5].passengers / (route.tripsPerDay * 30))}
                        </div>
                        <div className="text-xs text-muted-foreground">+3.8% from last month</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Revenue per Mile</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          $
                          {Math.round(
                            route.monthlyStats[5].revenue /
                              Number.parseInt(route.distance.split(" ")[0]) /
                              (route.tripsPerDay * 30),
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">+4.5% from last month</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="buses" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Assigned Buses</CardTitle>
                    <CardDescription>Buses currently assigned to this route</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Bus className="mr-2 h-4 w-4" />
                    Assign Bus
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left font-medium">Bus ID</th>
                        <th className="p-2 text-left font-medium">Type</th>
                        <th className="p-2 text-left font-medium">Capacity</th>
                        <th className="p-2 text-left font-medium">Driver</th>
                        <th className="p-2 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {route.assignedBuses.map((bus) => (
                        <tr key={bus.id} className="border-b">
                          <td className="p-2">
                            <div className="flex items-center">
                              <Bus className="mr-2 h-4 w-4 text-muted-foreground" />
                              {bus.id}
                            </div>
                          </td>
                          <td className="p-2">
                            <Badge variant="outline">{bus.type}</Badge>
                          </td>
                          <td className="p-2">{bus.capacity} seats</td>
                          <td className="p-2">{bus.driver}</td>
                          <td className="p-2 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Bus Details</DropdownMenuItem>
                                <DropdownMenuItem>Change Driver</DropdownMenuItem>
                                <DropdownMenuItem>View Schedule</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Remove from Route</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bus Assignment Schedule</CardTitle>
                <CardDescription>Weekly schedule of bus assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <Calendar className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted-foreground">Bus assignment calendar</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AgencyLayout>
  )
}
