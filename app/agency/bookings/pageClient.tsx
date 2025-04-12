"use client"

import { useState } from "react"
import { Check, ChevronDown, Download, Eye, Filter, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for bookings
const bookings = [
  {
    id: "BK-1001",
    customerName: "John Smith",
    customerEmail: "john.smith@example.com",
    customerPhone: "+1 (555) 123-4567",
    tripId: "TR-5001",
    route: "New York to Boston",
    departureDate: "2023-11-15",
    departureTime: "08:30 AM",
    seats: ["A1", "A2"],
    amount: 120.0,
    status: "confirmed",
    paymentMethod: "Credit Card",
    bookingDate: "2023-11-01",
  },
  {
    id: "BK-1002",
    customerName: "Emily Johnson",
    customerEmail: "emily.j@example.com",
    customerPhone: "+1 (555) 234-5678",
    tripId: "TR-5002",
    route: "Chicago to Detroit",
    departureDate: "2023-11-16",
    departureTime: "10:15 AM",
    seats: ["B3"],
    amount: 45.5,
    status: "pending",
    paymentMethod: "PayPal",
    bookingDate: "2023-11-02",
  },
  {
    id: "BK-1003",
    customerName: "Michael Brown",
    customerEmail: "michael.b@example.com",
    customerPhone: "+1 (555) 345-6789",
    tripId: "TR-5003",
    route: "Los Angeles to San Francisco",
    departureDate: "2023-11-17",
    departureTime: "09:00 AM",
    seats: ["C4", "C5", "C6"],
    amount: 180.75,
    status: "confirmed",
    paymentMethod: "Credit Card",
    bookingDate: "2023-11-03",
  },
  {
    id: "BK-1004",
    customerName: "Sarah Wilson",
    customerEmail: "sarah.w@example.com",
    customerPhone: "+1 (555) 456-7890",
    tripId: "TR-5004",
    route: "Miami to Orlando",
    departureDate: "2023-11-18",
    departureTime: "11:30 AM",
    seats: ["D7"],
    amount: 55.25,
    status: "cancelled",
    paymentMethod: "Debit Card",
    bookingDate: "2023-11-04",
  },
  {
    id: "BK-1005",
    customerName: "David Lee",
    customerEmail: "david.l@example.com",
    customerPhone: "+1 (555) 567-8901",
    tripId: "TR-5005",
    route: "Seattle to Portland",
    departureDate: "2023-11-19",
    departureTime: "07:45 AM",
    seats: ["E8", "E9"],
    amount: 95.0,
    status: "confirmed",
    paymentMethod: "PayPal",
    bookingDate: "2023-11-05",
  },
  {
    id: "BK-1006",
    customerName: "Jennifer Martinez",
    customerEmail: "jennifer.m@example.com",
    customerPhone: "+1 (555) 678-9012",
    tripId: "TR-5006",
    route: "Dallas to Houston",
    departureDate: "2023-11-20",
    departureTime: "12:00 PM",
    seats: ["F10"],
    amount: 40.5,
    status: "pending",
    paymentMethod: "Credit Card",
    bookingDate: "2023-11-06",
  },
  {
    id: "BK-1007",
    customerName: "Robert Taylor",
    customerEmail: "robert.t@example.com",
    customerPhone: "+1 (555) 789-0123",
    tripId: "TR-5007",
    route: "Phoenix to Las Vegas",
    departureDate: "2023-11-21",
    departureTime: "02:30 PM",
    seats: ["G11", "G12"],
    amount: 110.25,
    status: "confirmed",
    paymentMethod: "Debit Card",
    bookingDate: "2023-11-07",
  },
  {
    id: "BK-1008",
    customerName: "Lisa Anderson",
    customerEmail: "lisa.a@example.com",
    customerPhone: "+1 (555) 890-1234",
    tripId: "TR-5008",
    route: "Denver to Salt Lake City",
    departureDate: "2023-11-22",
    departureTime: "08:15 AM",
    seats: ["H13"],
    amount: 65.75,
    status: "cancelled",
    paymentMethod: "PayPal",
    bookingDate: "2023-11-08",
  },
  {
    id: "BK-1009",
    customerName: "James Wilson",
    customerEmail: "james.w@example.com",
    customerPhone: "+1 (555) 901-2345",
    tripId: "TR-5009",
    route: "Atlanta to Nashville",
    departureDate: "2023-11-23",
    departureTime: "09:45 AM",
    seats: ["I14", "I15"],
    amount: 85.5,
    status: "confirmed",
    paymentMethod: "Credit Card",
    bookingDate: "2023-11-09",
  },
  {
    id: "BK-1010",
    customerName: "Patricia Garcia",
    customerEmail: "patricia.g@example.com",
    customerPhone: "+1 (555) 012-3456",
    tripId: "TR-5010",
    route: "Philadelphia to Washington DC",
    departureDate: "2023-11-24",
    departureTime: "10:30 AM",
    seats: ["J16"],
    amount: 50.25,
    status: "pending",
    paymentMethod: "Debit Card",
    bookingDate: "2023-11-10",
  },
]

export default function BookingsClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // Filter bookings based on search term and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.route.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Function to get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">{status}</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">{status}</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Function to view booking details
  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking)
    setIsDetailOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">Manage and view all customer bookings for your bus services.</p>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search bookings..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-1">
                    <Filter className="h-4 w-4" />
                    <span>Status</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("confirmed")}>Confirmed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>Cancelled</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>{filteredBookings.length} bookings found</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.id}</TableCell>
                          <TableCell>{booking.customerName}</TableCell>
                          <TableCell>{booking.route}</TableCell>
                          <TableCell>{booking.departureDate}</TableCell>
                          <TableCell>${booking.amount.toFixed(2)}</TableCell>
                          <TableCell>{getStatusBadge(booking.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => viewBookingDetails(booking)}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          No bookings found. Try adjusting your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Details Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>Complete information about this booking.</DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Booking Details</TabsTrigger>
                <TabsTrigger value="customer">Customer Info</TabsTrigger>
                <TabsTrigger value="trip">Trip Details</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Booking ID</p>
                    <p className="font-medium">{selectedBooking.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <div>{getStatusBadge(selectedBooking.status)}</div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Booking Date</p>
                    <p>{selectedBooking.bookingDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                    <p>{selectedBooking.paymentMethod}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Amount Paid</p>
                    <p className="font-medium">${selectedBooking.amount.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Seats</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedBooking.seats.map((seat) => (
                        <Badge key={seat} variant="outline">
                          {seat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <div className="space-x-2">
                    {selectedBooking.status === "pending" && (
                      <>
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          <Check className="h-4 w-4 mr-1" />
                          Confirm
                        </Button>
                        <Button size="sm" variant="destructive">
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </>
                    )}
                    {selectedBooking.status === "confirmed" && (
                      <Button size="sm" variant="destructive">
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    )}
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Download Ticket
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="customer" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Customer Name</p>
                    <p className="font-medium">{selectedBooking.customerName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p>{selectedBooking.customerEmail}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p>{selectedBooking.customerPhone}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="trip" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Trip ID</p>
                    <p className="font-medium">{selectedBooking.tripId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Route</p>
                    <p>{selectedBooking.route}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Departure Date</p>
                    <p>{selectedBooking.departureDate}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Departure Time</p>
                    <p>{selectedBooking.departureTime}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
