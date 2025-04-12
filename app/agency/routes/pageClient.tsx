"use client"

import { useState } from "react"
import {
  ArrowUpDown,
  ChevronDown,
  Download,
  Filter,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  Map,
  Calendar,
  Bus,
  Clock,
  BarChart3,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

// Mock data for routes
const routes = [
  {
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
  },
  {
    id: "RT-1002",
    name: "New York to Washington DC",
    origin: "New York",
    destination: "Washington DC",
    distance: "225 miles",
    duration: "5h 30m",
    basePrice: 38,
    status: "Active",
    popularity: 88,
    avgOccupancy: 82,
    revenue: "$38,450",
    growth: 8.7,
    stops: ["Philadelphia", "Baltimore"],
    tripsPerDay: 6,
    createdAt: "2023-01-20",
  },
  {
    id: "RT-1003",
    name: "New York to Philadelphia",
    origin: "New York",
    destination: "Philadelphia",
    distance: "95 miles",
    duration: "2h 30m",
    basePrice: 25,
    status: "Active",
    popularity: 85,
    avgOccupancy: 78,
    revenue: "$28,120",
    growth: 5.2,
    stops: ["Newark", "Trenton"],
    tripsPerDay: 10,
    createdAt: "2023-02-05",
  },
  {
    id: "RT-1004",
    name: "Boston to New York",
    origin: "Boston",
    destination: "New York",
    distance: "215 miles",
    duration: "4h 15m",
    basePrice: 42,
    status: "Active",
    popularity: 90,
    avgOccupancy: 83,
    revenue: "$42,780",
    growth: 10.5,
    stops: ["Springfield", "Hartford"],
    tripsPerDay: 8,
    createdAt: "2023-01-15",
  },
  {
    id: "RT-1005",
    name: "Washington DC to New York",
    origin: "Washington DC",
    destination: "New York",
    distance: "225 miles",
    duration: "5h 15m",
    basePrice: 40,
    status: "Active",
    popularity: 86,
    avgOccupancy: 80,
    revenue: "$36,900",
    growth: 7.8,
    stops: ["Baltimore", "Philadelphia"],
    tripsPerDay: 6,
    createdAt: "2023-01-20",
  },
  {
    id: "RT-1006",
    name: "Philadelphia to New York",
    origin: "Philadelphia",
    destination: "New York",
    distance: "95 miles",
    duration: "2h 15m",
    basePrice: 25,
    status: "Active",
    popularity: 84,
    avgOccupancy: 76,
    revenue: "$27,500",
    growth: 4.8,
    stops: ["Trenton", "Newark"],
    tripsPerDay: 10,
    createdAt: "2023-02-05",
  },
  {
    id: "RT-1007",
    name: "Boston to Washington DC",
    origin: "Boston",
    destination: "Washington DC",
    distance: "440 miles",
    duration: "9h 45m",
    basePrice: 65,
    status: "Inactive",
    popularity: 60,
    avgOccupancy: 55,
    revenue: "$18,200",
    growth: -2.5,
    stops: ["Providence", "New York", "Philadelphia", "Baltimore"],
    tripsPerDay: 2,
    createdAt: "2023-03-10",
  },
]

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

// Mock data for route performance
const routePerformance = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [4500, 5200, 4800, 5500, 6200, 6800],
    },
    {
      label: "Occupancy",
      data: [75, 78, 76, 80, 83, 85],
    },
  ],
}

export default function RoutesPageClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Filter and sort routes
  const filteredRoutes = routes
    .filter((route) => {
      const matchesSearch =
        searchTerm === "" ||
        route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.destination.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || route.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity - a.popularity
        case "revenue":
          return (
            Number.parseFloat(b.revenue.replace("$", "").replace(",", "")) -
            Number.parseFloat(a.revenue.replace("$", "").replace(",", ""))
          )
        case "occupancy":
          return b.avgOccupancy - a.avgOccupancy
        case "growth":
          return b.growth - a.growth
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const getRouteById = (id: string) => {
    return routes.find((route) => route.id === id)
  }

  return (
    <AgencyLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Routes</h2>
            <p className="text-muted-foreground">Manage your bus routes and analyze performance</p>
          </div>
          <Dialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Route
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Route</DialogTitle>
                <DialogDescription>Create a new bus route with all necessary details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
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

                <div className="grid grid-cols-2 gap-4">
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance (miles)</Label>
                    <Input id="distance" type="number" placeholder="Enter distance" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input id="duration-hours" type="number" placeholder="Hours" />
                      <Input id="duration-minutes" type="number" placeholder="Minutes" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="base-price">Base Price ($)</Label>
                    <Input id="base-price" type="number" placeholder="Enter base price" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trips-per-day">Trips Per Day</Label>
                    <Input id="trips-per-day" type="number" placeholder="Enter number of trips" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Stops</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {cities.slice(0, 6).map((city) => (
                      <div key={city} className="flex items-center space-x-2">
                        <Checkbox id={`stop-${city.toLowerCase().replace(/\s+/g, "-")}`} />
                        <label
                          htmlFor={`stop-${city.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {city}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter route description" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddRouteOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Route</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all-routes" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all-routes">All Routes</TabsTrigger>
            <TabsTrigger value="popular-routes">Popular Routes</TabsTrigger>
            <TabsTrigger value="route-map">Route Map</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="all-routes" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Route Management</CardTitle>
                <CardDescription>View and manage all your bus routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search routes..."
                        className="pl-8 w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="seasonal">Seasonal</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="revenue">Revenue</SelectItem>
                        <SelectItem value="occupancy">Occupancy</SelectItem>
                        <SelectItem value="growth">Growth</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Route</TableHead>
                        <TableHead>Origin - Destination</TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            Duration
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            Base Price
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            Popularity
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRoutes.map((route) => (
                        <TableRow key={route.id} className={selectedRoute === route.id ? "bg-muted/50" : ""}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>{route.name}</span>
                              <span className="text-xs text-muted-foreground">{route.id}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                              {route.origin} - {route.destination}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                              {route.duration}
                            </div>
                          </TableCell>
                          <TableCell>${route.basePrice}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                route.status === "Active"
                                  ? "default"
                                  : route.status === "Inactive"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {route.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">{route.popularity}%</span>
                                <span className="flex items-center text-xs">
                                  {route.growth > 0 ? (
                                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                                  )}
                                  {route.growth > 0 ? "+" : ""}
                                  {route.growth}%
                                </span>
                              </div>
                              <Progress value={route.popularity} className="h-1" />
                            </div>
                          </TableCell>
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
                                <DropdownMenuItem onClick={() => setSelectedRoute(route.id)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Route
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  View Schedule
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Bus className="mr-2 h-4 w-4" />
                                  Assign Buses
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => setIsDeleteDialogOpen(true)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Route
                                </DropdownMenuItem>
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

            {selectedRoute && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{getRouteById(selectedRoute)?.name}</CardTitle>
                      <CardDescription>{getRouteById(selectedRoute)?.id}</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedRoute(null)}>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Route Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Origin:</span>
                          <span className="font-medium">{getRouteById(selectedRoute)?.origin}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Destination:</span>
                          <span className="font-medium">{getRouteById(selectedRoute)?.destination}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Distance:</span>
                          <span className="font-medium">{getRouteById(selectedRoute)?.distance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{getRouteById(selectedRoute)?.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Base Price:</span>
                          <span className="font-medium">${getRouteById(selectedRoute)?.basePrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Trips Per Day:</span>
                          <span className="font-medium">{getRouteById(selectedRoute)?.tripsPerDay}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Created:</span>
                          <span className="font-medium">{getRouteById(selectedRoute)?.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Performance</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Popularity:</span>
                          <span className="font-medium">{getRouteById(selectedRoute)?.popularity}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Avg. Occupancy:</span>
                          <span className="font-medium">{getRouteById(selectedRoute)?.avgOccupancy}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Revenue:</span>
                          <span className="font-medium">{getRouteById(selectedRoute)?.revenue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Growth:</span>
                          <span
                            className={cn(
                              "font-medium",
                              getRouteById(selectedRoute)?.growth > 0 ? "text-green-500" : "text-red-500",
                            )}
                          >
                            {getRouteById(selectedRoute)?.growth > 0 ? "+" : ""}
                            {getRouteById(selectedRoute)?.growth}%
                          </span>
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button variant="outline" size="sm" className="w-full">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          View Detailed Analytics
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Stops</h3>
                      <div className="space-y-2">
                        <div className="relative pl-6 space-y-2">
                          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-muted" />
                          <div className="relative">
                            <div className="absolute left-[-20px] top-1 h-2 w-2 rounded-full bg-primary" />
                            <div className="font-medium">{getRouteById(selectedRoute)?.origin}</div>
                            <div className="text-xs text-muted-foreground">Origin</div>
                          </div>
                          {getRouteById(selectedRoute)?.stops.map((stop, index) => (
                            <div key={index} className="relative">
                              <div className="absolute left-[-20px] top-1 h-2 w-2 rounded-full bg-muted-foreground" />
                              <div className="font-medium">{stop}</div>
                              <div className="text-xs text-muted-foreground">Stop {index + 1}</div>
                            </div>
                          ))}
                          <div className="relative">
                            <div className="absolute left-[-20px] top-1 h-2 w-2 rounded-full bg-primary" />
                            <div className="font-medium">{getRouteById(selectedRoute)?.destination}</div>
                            <div className="text-xs text-muted-foreground">Destination</div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button variant="outline" size="sm" className="w-full">
                          <Map className="mr-2 h-4 w-4" />
                          View on Map
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Route</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this route? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="popular-routes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Popular Routes</CardTitle>
                <CardDescription>Your top performing routes by popularity and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Top Routes by Popularity</h3>
                    <div className="space-y-4">
                      {routes
                        .sort((a, b) => b.popularity - a.popularity)
                        .slice(0, 5)
                        .map((route, index) => (
                          <div key={route.id} className="flex items-center gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                              {index + 1}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{route.name}</p>
                                <Badge variant="outline">{route.popularity}%</Badge>
                              </div>
                              <Progress value={route.popularity} className="h-2" />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>
                                  {route.origin} - {route.destination}
                                </span>
                                <span>{route.tripsPerDay} trips/day</span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Top Routes by Revenue</h3>
                    <div className="space-y-4">
                      {routes
                        .sort(
                          (a, b) =>
                            Number.parseFloat(b.revenue.replace("$", "").replace(",", "")) -
                            Number.parseFloat(a.revenue.replace("$", "").replace(",", "")),
                        )
                        .slice(0, 5)
                        .map((route, index) => (
                          <div key={route.id} className="flex items-center gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                              {index + 1}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{route.name}</p>
                                <Badge>{route.revenue}</Badge>
                              </div>
                              <Progress
                                value={Number.parseFloat(route.revenue.replace("$", "").replace(",", "")) / 500}
                                className="h-2"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>
                                  {route.origin} - {route.destination}
                                </span>
                                <span className="flex items-center">
                                  {route.growth > 0 ? (
                                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                                  )}
                                  {route.growth > 0 ? "+" : ""}
                                  {route.growth}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Route Comparison</CardTitle>
                <CardDescription>Compare performance metrics between routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="route1">First Route</Label>
                      <Select defaultValue="RT-1001">
                        <SelectTrigger id="route1">
                          <SelectValue placeholder="Select route" />
                        </SelectTrigger>
                        <SelectContent>
                          {routes.map((route) => (
                            <SelectItem key={route.id} value={route.id}>
                              {route.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="route2">Second Route</Label>
                      <Select defaultValue="RT-1002">
                        <SelectTrigger id="route2">
                          <SelectValue placeholder="Select route" />
                        </SelectTrigger>
                        <SelectContent>
                          {routes.map((route) => (
                            <SelectItem key={route.id} value={route.id}>
                              {route.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="metric">Metric</Label>
                      <Select defaultValue="popularity">
                        <SelectTrigger id="metric">
                          <SelectValue placeholder="Select metric" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popularity">Popularity</SelectItem>
                          <SelectItem value="revenue">Revenue</SelectItem>
                          <SelectItem value="occupancy">Occupancy</SelectItem>
                          <SelectItem value="growth">Growth</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted" />
                    <span className="ml-2 text-muted-foreground">Route comparison chart</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="route-map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Route Map</CardTitle>
                <CardDescription>Visual representation of your bus routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <Map className="h-16 w-16 text-muted" />
                  <span className="ml-2 text-muted-foreground">Interactive route map visualization</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {routes.map((route) => (
                    <Badge key={route.id} variant="outline" className="cursor-pointer hover:bg-muted">
                      {route.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Route Analytics</CardTitle>
                    <CardDescription>Detailed performance metrics for your routes</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="monthly">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Time period" />
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
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Routes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{routes.length}</div>
                        <div className="text-xs text-muted-foreground">
                          {routes.filter((r) => r.status === "Active").length} active routes
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Average Occupancy</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {Math.round(routes.reduce((acc, route) => acc + route.avgOccupancy, 0) / routes.length)}%
                        </div>
                        <div className="text-xs text-muted-foreground">+3.2% from last month</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          $
                          {routes
                            .reduce(
                              (acc, route) => acc + Number.parseFloat(route.revenue.replace("$", "").replace(",", "")),
                              0,
                            )
                            .toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">+8.5% from last month</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted" />
                    <span className="ml-2 text-muted-foreground">Route performance analytics</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Route Performance Breakdown</h3>
                    <Accordion type="single" collapsible className="w-full">
                      {routes.map((route) => (
                        <AccordionItem key={route.id} value={route.id}>
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <span>{route.name}</span>
                              <Badge variant="outline">{route.status}</Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                              <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Revenue</p>
                                <p className="text-lg font-medium">{route.revenue}</p>
                                <div className="flex items-center text-xs">
                                  {route.growth > 0 ? (
                                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                                  ) : (
                                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                                  )}
                                  <span className={cn(route.growth > 0 ? "text-green-500" : "text-red-500")}>
                                    {route.growth > 0 ? "+" : ""}
                                    {route.growth}% from last month
                                  </span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Popularity</p>
                                <p className="text-lg font-medium">{route.popularity}%</p>
                                <Progress value={route.popularity} className="h-2" />
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Occupancy</p>
                                <p className="text-lg font-medium">{route.avgOccupancy}%</p>
                                <Progress value={route.avgOccupancy} className="h-2" />
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Trips Per Day</p>
                                <p className="text-lg font-medium">{route.tripsPerDay}</p>
                                <p className="text-xs text-muted-foreground">
                                  {route.tripsPerDay * 30} trips per month
                                </p>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AgencyLayout>
  )
}
