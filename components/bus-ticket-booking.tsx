"use client"

import { useState } from "react"
import { format } from "date-fns"
import Link from "next/link"
import {
  ArrowRight,
  Bus,
  CalendarIcon,
  Clock,
  Filter,
  Loader2,
  MapPin,
  Search,
  Wifi,
  Power,
  Wind,
  Coffee,
  UserCircle2,
  ChevronRight,
  Info,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for bus trips
const trips = [
  {
    id: 1,
    company: "Express Lines",
    departureCity: "New York",
    arrivalCity: "Boston",
    departureTime: "08:00 AM",
    arrivalTime: "12:30 PM",
    duration: "4h 30m",
    price: 45,
    available: 23,
    busType: "Luxury",
    amenities: ["wifi", "power", "ac", "snacks"],
    rating: 4.7,
  },
  {
    id: 2,
    company: "City Connect",
    departureCity: "New York",
    arrivalCity: "Washington DC",
    departureTime: "09:15 AM",
    arrivalTime: "02:45 PM",
    duration: "5h 30m",
    price: 38,
    available: 15,
    busType: "Standard",
    amenities: ["wifi", "ac"],
    rating: 4.2,
  },
  {
    id: 3,
    company: "Coastal Buses",
    departureCity: "New York",
    arrivalCity: "Philadelphia",
    departureTime: "10:30 AM",
    arrivalTime: "01:00 PM",
    duration: "2h 30m",
    price: 25,
    available: 30,
    busType: "Economy",
    amenities: ["ac"],
    rating: 3.9,
  },
  {
    id: 4,
    company: "Mountain Transit",
    departureCity: "New York",
    arrivalCity: "Boston",
    departureTime: "12:00 PM",
    arrivalTime: "04:15 PM",
    duration: "4h 15m",
    price: 42,
    available: 8,
    busType: "Luxury",
    amenities: ["wifi", "power", "ac", "snacks"],
    rating: 4.8,
  },
  {
    id: 5,
    company: "Express Lines",
    departureCity: "New York",
    arrivalCity: "Washington DC",
    departureTime: "02:30 PM",
    arrivalTime: "08:00 PM",
    duration: "5h 30m",
    price: 40,
    available: 20,
    busType: "Standard",
    amenities: ["wifi", "ac"],
    rating: 4.5,
  },
]

const operators = ["Express Lines", "City Connect", "Coastal Buses", "Mountain Transit"]

const amenityIcons = {
  wifi: <Wifi className="h-4 w-4" />,
  power: <Power className="h-4 w-4" />,
  ac: <Wind className="h-4 w-4" />,
  snacks: <Coffee className="h-4 w-4" />,
}

export default function BusTicketBooking() {
  const [date, setDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [isRoundTrip, setIsRoundTrip] = useState(false)
  const [passengers, setPassengers] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [filteredTrips, setFilteredTrips] = useState(trips)
  const [priceRange, setPriceRange] = useState([0, 150])
  const [departureCity, setDepartureCity] = useState("New York")
  const [arrivalCity, setArrivalCity] = useState("")
  const [busType, setBusType] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedOperators, setSelectedOperators] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("price")
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  const handleSearch = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      let filtered = trips

      // Filter by departure city
      if (departureCity) {
        filtered = filtered.filter((trip) => trip.departureCity === departureCity)
      }

      // Filter by arrival city
      if (arrivalCity) {
        filtered = filtered.filter((trip) => trip.arrivalCity === arrivalCity)
      }

      // Filter by price range
      filtered = filtered.filter((trip) => trip.price >= priceRange[0] && trip.price <= priceRange[1])

      // Filter by bus type
      if (busType.length > 0) {
        filtered = filtered.filter((trip) => busType.includes(trip.busType))
      }

      // Filter by amenities
      if (selectedAmenities.length > 0) {
        filtered = filtered.filter((trip) => selectedAmenities.every((amenity) => trip.amenities.includes(amenity)))
      }

      // Filter by operators
      if (selectedOperators.length > 0) {
        filtered = filtered.filter((trip) => selectedOperators.includes(trip.company))
      }

      // Sort results
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "price":
            return a.price - b.price
          case "price-desc":
            return b.price - a.price
          case "duration":
            return a.duration.localeCompare(b.duration)
          case "departure":
            return a.departureTime.localeCompare(b.departureTime)
          case "rating":
            return b.rating - a.rating
          default:
            return 0
        }
      })

      setFilteredTrips(filtered)
      setIsLoading(false)
    }, 1000)
  }

  const toggleBusType = (type: string) => {
    setBusType(busType.includes(type) ? busType.filter((t) => t !== type) : [...busType, type])
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(
      selectedAmenities.includes(amenity)
        ? selectedAmenities.filter((a) => a !== amenity)
        : [...selectedAmenities, amenity],
    )
  }

  const toggleOperator = (operator: string) => {
    setSelectedOperators(
      selectedOperators.includes(operator)
        ? selectedOperators.filter((o) => o !== operator)
        : [...selectedOperators, operator],
    )
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col space-y-6">
        {/* Header with Authentication */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Find Your Bus</h1>
            <p className="text-muted-foreground">Search for bus tickets to your destination</p>
          </div>
          <div className="flex items-center gap-4">
            <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign In</DialogTitle>
                  <DialogDescription>
                    Sign in to your account to manage your bookings and save your preferences.
                  </DialogDescription>
                </DialogHeader>
                {/* Add sign in form here */}
              </DialogContent>
            </Dialog>
            <Link href="/agency/login">
              <Button variant="default" size="sm">
                <Bus className="mr-2 h-4 w-4" />
                Agency Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Form */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="round-trip" checked={isRoundTrip} onCheckedChange={setIsRoundTrip} />
                  <Label htmlFor="round-trip">Round Trip</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="passengers">Passengers:</Label>
                  <Select
                    value={passengers.toString()}
                    onValueChange={(value) => setPassengers(Number.parseInt(value))}
                  >
                    <SelectTrigger id="passengers" className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "passenger" : "passengers"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Select value={departureCity} onValueChange={setDepartureCity}>
                    <SelectTrigger id="from">
                      <SelectValue placeholder="Select departure city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="Boston">Boston</SelectItem>
                      <SelectItem value="Washington DC">Washington DC</SelectItem>
                      <SelectItem value="Philadelphia">Philadelphia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Select value={arrivalCity} onValueChange={setArrivalCity}>
                    <SelectTrigger id="to">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Boston">Boston</SelectItem>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="Washington DC">Washington DC</SelectItem>
                      <SelectItem value="Philadelphia">Philadelphia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Departure Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select departure date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {isRoundTrip && (
                  <div className="space-y-2">
                    <Label>Return Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !returnDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {returnDate ? format(returnDate, "PPP") : "Select return date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          initialFocus
                          disabled={(date) => date < (date || new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                {!isRoundTrip && (
                  <div className="flex items-end">
                    <Button className="w-full" onClick={handleSearch} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Search Buses
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {isRoundTrip && (
                <div className="flex justify-end">
                  <Button className="w-full md:w-auto" onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Search Buses
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <span className="font-medium text-primary">1. Search</span>
            <ChevronRight className="h-4 w-4" />
            <span>2. Select</span>
            <ChevronRight className="h-4 w-4" />
            <span>3. Payment</span>
          </div>
        </div>

        {/* Filter and Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters - Desktop */}
          <Card className="hidden md:block h-fit">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setBusType([])
                      setSelectedAmenities([])
                      setSelectedOperators([])
                      setPriceRange([0, 150])
                    }}
                  >
                    Reset
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Price Range</h4>
                  <div className="space-y-2">
                    <Slider
                      defaultValue={[0, 150]}
                      max={150}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Bus Type</h4>
                  <div className="space-y-2">
                    {["Luxury", "Standard", "Economy"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type.toLowerCase()}
                          checked={busType.includes(type)}
                          onCheckedChange={() => toggleBusType(type)}
                        />
                        <label
                          htmlFor={type.toLowerCase()}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Amenities</h4>
                  <div className="space-y-2">
                    {Object.entries(amenityIcons).map(([key, icon]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={selectedAmenities.includes(key)}
                          onCheckedChange={() => toggleAmenity(key)}
                        />
                        <label htmlFor={key} className="flex items-center gap-2 text-sm font-medium leading-none">
                          {icon}
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Operators</h4>
                  <div className="space-y-2">
                    {operators.map((operator) => (
                      <div key={operator} className="flex items-center space-x-2">
                        <Checkbox
                          id={operator.toLowerCase().replace(/\s+/g, "-")}
                          checked={selectedOperators.includes(operator)}
                          onCheckedChange={() => toggleOperator(operator)}
                        />
                        <label
                          htmlFor={operator.toLowerCase().replace(/\s+/g, "-")}
                          className="text-sm font-medium leading-none"
                        >
                          {operator}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full" onClick={handleSearch}>
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Filters - Mobile */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-[340px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your search results</SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-6">
                  {/* Mobile filters content - same as desktop */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Filters</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setBusType([])
                          setSelectedAmenities([])
                          setSelectedOperators([])
                          setPriceRange([0, 150])
                        }}
                      >
                        Reset
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Price Range</h4>
                      <div className="space-y-2">
                        <Slider
                          defaultValue={[0, 150]}
                          max={150}
                          step={1}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex justify-between text-sm">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Bus Type</h4>
                      <div className="space-y-2">
                        {["Luxury", "Standard", "Economy"].map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={type.toLowerCase()}
                              checked={busType.includes(type)}
                              onCheckedChange={() => toggleBusType(type)}
                            />
                            <label
                              htmlFor={type.toLowerCase()}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Amenities</h4>
                      <div className="space-y-2">
                        {Object.entries(amenityIcons).map(([key, icon]) => (
                          <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                              id={key}
                              checked={selectedAmenities.includes(key)}
                              onCheckedChange={() => toggleAmenity(key)}
                            />
                            <label htmlFor={key} className="flex items-center gap-2 text-sm font-medium leading-none">
                              {icon}
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Operators</h4>
                      <div className="space-y-2">
                        {operators.map((operator) => (
                          <div key={operator} className="flex items-center space-x-2">
                            <Checkbox
                              id={operator.toLowerCase().replace(/\s+/g, "-")}
                              checked={selectedOperators.includes(operator)}
                              onCheckedChange={() => toggleOperator(operator)}
                            />
                            <label
                              htmlFor={operator.toLowerCase().replace(/\s+/g, "-")}
                              className="text-sm font-medium leading-none"
                            >
                              {operator}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full" onClick={handleSearch}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Trip Listings */}
          <div className="md:col-span-3 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">
                  {filteredTrips.length} {filteredTrips.length === 1 ? "Trip" : "Trips"} Found
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Prices updated 5 min ago
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="duration">Duration: Shortest</SelectItem>
                    <SelectItem value="departure">Departure: Earliest</SelectItem>
                    <SelectItem value="rating">Rating: Highest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-24 bg-muted rounded-lg" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredTrips.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Info className="h-8 w-8 text-muted-foreground" />
                  <p className="font-medium">No trips found</p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or selecting different dates
                  </p>
                </div>
              </Card>
            ) : (
              filteredTrips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-muted p-6 flex flex-col justify-center items-center md:items-start">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          <img
                            src={`/placeholder.svg?height=64&width=64&text=${trip.company.charAt(0)}`}
                            alt={trip.company}
                            className="w-12 h-12 rounded-full"
                          />
                        </div>
                        <h3 className="font-semibold">{trip.company}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="text-yellow-500">★</span> {trip.rating}
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "mt-2",
                            trip.busType === "Luxury" && "bg-blue-50 text-blue-600 border-blue-200",
                            trip.busType === "Economy" && "bg-green-50 text-green-600 border-green-200",
                          )}
                        >
                          {trip.busType}
                        </Badge>
                      </div>

                      <div className="p-6 md:col-span-2">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                          <div className="flex items-center mb-2 md:mb-0">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{trip.duration}</span>
                          </div>
                          <TooltipProvider>
                            <div className="flex flex-wrap gap-2">
                              {trip.amenities.map((amenity) => (
                                <Tooltip key={amenity}>
                                  <TooltipTrigger asChild>
                                    <Badge variant="secondary" className="h-8 w-8 p-0 flex items-center justify-center">
                                      {amenityIcons[amenity]}
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</p>
                                  </TooltipContent>
                                </Tooltip>
                              ))}
                            </div>
                          </TooltipProvider>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-center">
                            <div className="text-xl font-bold">{trip.departureTime}</div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              {trip.departureCity}
                            </div>
                          </div>

                          <div className="flex-1 px-4">
                            <div className="relative">
                              <Separator className="absolute top-1/2 w-full" />
                              <div className="relative flex justify-center">
                                <span className="bg-background px-2 text-xs text-muted-foreground">
                                  {trip.duration}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-xl font-bold">{trip.arrivalTime}</div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              {trip.arrivalCity}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l">
                        <div>
                          <div className="text-2xl font-bold text-center md:text-right">${trip.price}</div>
                          <div className="text-sm text-muted-foreground text-center md:text-right">per person</div>
                        </div>
                        <div className="mt-4">
                          <Link href={`/booking/${trip.id}`} className="w-full">
                            <Button className="w-full">
                              Select Seats
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                          <p
                            className={cn(
                              "text-xs text-center mt-2",
                              trip.available <= 10 ? "text-red-500 font-medium" : "text-muted-foreground",
                            )}
                          >
                            {trip.available} seats available
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {/* Timezone Note */}
            <p className="text-center text-sm text-muted-foreground">
              All times shown are in EST (Eastern Standard Time)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
