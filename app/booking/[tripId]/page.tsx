"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Bus, Calendar, Clock, MapPin, QrCode, User, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Mock trip data
const trip = {
  id: "TRIP-1001",
  company: "Express Lines",
  departureCity: "New York",
  arrivalCity: "Boston",
  departureTime: "08:00 AM",
  arrivalTime: "12:30 PM",
  duration: "4h 30m",
  date: "2024-03-01",
  price: 45,
  busType: "Luxury",
  totalSeats: 45,
  bookedSeats: ["1A", "2A", "5C", "8B", "12D", "15A"],
  amenities: ["WiFi", "Power Outlets", "Air Conditioning"],
}

const generateSeatLayout = () => {
  const rows = 12
  const seatsPerRow = 4
  const layout = []
  const seatLetters = ["A", "B", "C", "D"]

  for (let i = 1; i <= rows; i++) {
    const row = []
    for (let j = 0; j < seatsPerRow; j++) {
      const seatNumber = `${i}${seatLetters[j]}`
      row.push({
        id: seatNumber,
        isBooked: trip.bookedSeats.includes(seatNumber),
      })
    }
    layout.push(row)
  }

  return layout
}

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedSeat, setSelectedSeat] = useState<string>("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingCode, setBookingCode] = useState("")
  const seatLayout = generateSeatLayout()

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeat(seatId)
  }

  const handlePayment = () => {
    // Generate a random booking code
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    setBookingCode(code)
    setShowConfirmation(true)
  }

  return (
    <div className="container max-w-5xl mx-auto py-6 px-4 md:px-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Book Your Trip</h1>
      </div>

      <div className="grid gap-6">
        {/* Trip Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">From</div>
                <div className="font-semibold">{trip.departureCity}</div>
                <div className="text-sm">{trip.departureTime}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">To</div>
                <div className="font-semibold">{trip.arrivalCity}</div>
                <div className="text-sm">{trip.arrivalTime}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Trip Details</div>
                <div className="font-semibold">{trip.company}</div>
                <div className="text-sm">{trip.duration}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Steps */}
        <div className="grid gap-6">
          {/* Step 1: Seat Selection */}
          <Card className={step !== 1 ? "opacity-60" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>1. Select Your Seat</CardTitle>
                {step !== 1 && (
                  <Button variant="outline" size="sm" onClick={() => setStep(1)}>
                    Edit
                  </Button>
                )}
              </div>
              <CardDescription>Choose your preferred seat</CardDescription>
            </CardHeader>
            {step === 1 && (
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-4 justify-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm border-2" />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-muted" />
                      <span>Booked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-primary" />
                      <span>Selected</span>
                    </div>
                  </div>

                  <div className="relative max-w-md mx-auto">
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-muted/50 flex items-center justify-center rounded-r-lg">
                      <Bus className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="grid gap-4 p-4">
                      {seatLayout.map((row, rowIndex) => (
                        <div key={rowIndex} className="grid grid-cols-4 gap-4">
                          {row.map((seat) => (
                            <button
                              key={seat.id}
                              disabled={seat.isBooked}
                              onClick={() => handleSeatSelect(seat.id)}
                              className={`w-8 h-8 rounded-sm border-2 flex items-center justify-center text-xs
                                ${seat.isBooked ? "bg-muted border-muted cursor-not-allowed" : ""}
                                ${selectedSeat === seat.id ? "bg-primary border-primary text-primary-foreground" : ""}
                                ${!seat.isBooked && selectedSeat !== seat.id ? "hover:border-primary" : ""}
                              `}
                            >
                              {seat.id}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setStep(2)} disabled={!selectedSeat}>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
            {step !== 1 && selectedSeat && (
              <CardContent>
                <p className="text-sm">Selected Seat: {selectedSeat}</p>
              </CardContent>
            )}
          </Card>

          {/* Step 2: Passenger Details */}
          <Card className={step !== 2 ? "opacity-60" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>2. Passenger Details</CardTitle>
                {step > 2 && (
                  <Button variant="outline" size="sm" onClick={() => setStep(2)}>
                    Edit
                  </Button>
                )}
              </div>
              <CardDescription>Enter passenger information</CardDescription>
            </CardHeader>
            {step === 2 && (
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter first name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter last name" required />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="Enter phone number" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idType">ID Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="driving-license">Driving License</SelectItem>
                        <SelectItem value="national-id">National ID</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input id="idNumber" placeholder="Enter ID number" required />
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)}>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            )}
          </Card>

          {/* Step 3: Payment */}
          <Card className={step !== 3 ? "opacity-60" : ""}>
            <CardHeader className="pb-3">
              <CardTitle>3. Payment</CardTitle>
              <CardDescription>Complete your payment</CardDescription>
            </CardHeader>
            {step === 3 && (
              <CardContent>
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ticket Price</span>
                        <span>${trip.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service Fee</span>
                        <span>$2.00</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${(trip.price + 2).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <RadioGroup defaultValue="card">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card">Credit/Debit Card</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                    </RadioGroup>

                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button onClick={handlePayment}>Pay ${(trip.price + 2).toFixed(2)}</Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>

      {/* Booking Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Booking Confirmed!</DialogTitle>
            <DialogDescription className="text-center">
              Your ticket has been booked successfully. Save or download your ticket for your journey.
            </DialogDescription>
          </DialogHeader>

          {/* Ticket Design */}
          <div className="mt-4 rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <Bus className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">{trip.company}</h3>
                    <p className="text-sm text-muted-foreground">{trip.busType} Bus</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Booking Code</p>
                  <p className="font-mono text-lg font-bold tracking-wider text-primary">{bookingCode}</p>
                </div>
              </div>

              {/* QR Code and Trip Info */}
              <div className="grid gap-6 md:grid-cols-[1fr_200px]">
                <div className="space-y-4">
                  {/* Route */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="relative mt-1">
                        <div className="absolute left-2 h-full w-[2px] bg-muted" />
                        <MapPin className="relative h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{trip.departureCity}</p>
                        <p className="text-sm text-muted-foreground">{trip.departureTime}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="relative mt-1">
                        <MapPin className="relative h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{trip.arrivalCity}</p>
                        <p className="text-sm text-muted-foreground">{trip.arrivalTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid gap-3 text-sm">
                    <div className="flex gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Date: <span className="font-medium">{trip.date}</span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Duration: <span className="font-medium">{trip.duration}</span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Seat: <span className="font-medium">{selectedSeat}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-lg bg-white p-2 shadow-sm">
                    <QrCode className="h-32 w-32" />
                  </div>
                  <p className="text-xs text-muted-foreground">Scan for verification</p>
                </div>
              </div>

              {/* Amenities */}
              <div className="border-t pt-4">
                <p className="mb-2 text-sm font-medium">Included Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {trip.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-between gap-4">
            <Button variant="outline" className="w-full" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" />
              Print Ticket
            </Button>
            <Button className="w-full" asChild>
              <Link href="/">Done</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
