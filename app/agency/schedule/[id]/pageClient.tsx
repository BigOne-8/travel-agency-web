"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertCircle, ArrowLeft, Bus, Calendar, Clock, Edit, MapPin, MoreHorizontal, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { format, parseISO } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data for a single schedule
const mockSchedule = {
  id: "1",
  routeId: "1",
  routeName: "New York to Boston",
  departureTime: "2023-06-01T08:00:00Z",
  arrivalTime: "2023-06-01T12:00:00Z",
  busId: "BUS-001",
  busDetails: {
    model: "Mercedes-Benz Tourismo",
    capacity: 52,
    amenities: ["WiFi", "Power Outlets", "Air Conditioning", "Restroom"],
    registrationNumber: "NY-12345",
    lastMaintenance: "2023-05-15",
  },
  driverId: "DRV-001",
  driverName: "John Doe",
  driverDetails: {
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    license: "CDL-123456",
    experience: "5 years",
  },
  status: "active",
  occupancy: 85,
  recurring: "daily",
  days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
  departureLocation: "New York Central Station",
  departureAddress: "42nd Street & Park Avenue, New York, NY 10017",
  arrivalLocation: "Boston Main Terminal",
  arrivalAddress: "700 Atlantic Avenue, Boston, MA 02111",
  distance: "215 miles",
  duration: "4 hours",
  price: "$45.00",
  bookings: [
    { id: "BKG-001", passengerName: "Alice Johnson", seats: 1, status: "confirmed" },
    { id: "BKG-002", passengerName: "Bob Smith", seats: 2, status: "confirmed" },
    { id: "BKG-003", passengerName: "Carol Williams", seats: 1, status: "confirmed" },
    { id: "BKG-004", passengerName: "David Brown", seats: 3, status: "pending" },
    { id: "BKG-005", passengerName: "Eve Davis", seats: 1, status: "cancelled" },
  ],
  notes: "This is a high-demand route. Consider adding additional buses during peak hours.",
  createdAt: "2023-05-15T10:30:00Z",
  updatedAt: "2023-05-20T14:45:00Z",
}

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    delayed: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    confirmed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  }

  return (
    <Badge variant="outline" className={cn(statusStyles[status as keyof typeof statusStyles])}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export default function ScheduleDetailClient({ id }: { id: string }) {
  const router = useRouter()
  const [schedule, setSchedule] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Fetch schedule data
  useEffect(() => {
    // In a real app, you would fetch the data from an API
    setSchedule(mockSchedule)
    setLoading(false)
  }, [id])

  // Handle delete
  const handleDelete = () => {
    // In a real app, you would call an API to delete the schedule
    console.log(`Deleting schedule ${id}`)
    router.push("/agency/schedules")
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading schedule details...</p>
        </div>
      </div>
    )
  }

  if (!schedule) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/agency/schedules">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Schedule Not Found</h1>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl font-medium mb-2">Schedule not found</p>
            <p className="text-muted-foreground mb-6">
              The schedule you are looking for does not exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/agency/schedules">Return to Schedules</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/agency/schedules">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{schedule.routeName}</h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-muted-foreground">Schedule ID: {schedule.id}</p>
              <StatusBadge status={schedule.status} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/agency/schedules/${id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Schedule
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/agency/schedules/${id}/duplicate`}>Duplicate Schedule</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Change Status</DropdownMenuItem>
              <DropdownMenuItem>Print Details</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={() => setDeleteDialogOpen(true)}>
                Delete Schedule
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the schedule and cannot be undone. All associated bookings will be
                  affected.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Schedule Information</CardTitle>
            <CardDescription>Detailed information about this schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-lg">Departure</p>
                    <p className="text-muted-foreground">{schedule.departureLocation}</p>
                    <p className="text-sm">{schedule.departureAddress}</p>
                    <p className="mt-1 font-medium">{format(parseISO(schedule.departureTime), "MMMM d, yyyy")}</p>
                    <p className="text-lg font-bold">{format(parseISO(schedule.departureTime), "HH:mm")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p>{schedule.duration}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Driver</p>
                    <p>{schedule.driverName}</p>
                    <div className="text-sm text-muted-foreground">
                      <p>Phone: {schedule.driverDetails.phone}</p>
                      <p>Email: {schedule.driverDetails.email}</p>
                      <p>License: {schedule.driverDetails.license}</p>
                      <p>Experience: {schedule.driverDetails.experience}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-lg">Arrival</p>
                    <p className="text-muted-foreground">{schedule.arrivalLocation}</p>
                    <p className="text-sm">{schedule.arrivalAddress}</p>
                    <p className="mt-1 font-medium">{format(parseISO(schedule.arrivalTime), "MMMM d, yyyy")}</p>
                    <p className="text-lg font-bold">{format(parseISO(schedule.arrivalTime), "HH:mm")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Distance</p>
                    <p>{schedule.distance}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Bus className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Bus</p>
                    <p>
                      {schedule.busId} - {schedule.busDetails.model}
                    </p>
                    <div className="text-sm text-muted-foreground">
                      <p>Capacity: {schedule.busDetails.capacity} seats</p>
                      <p>Registration: {schedule.busDetails.registrationNumber}</p>
                      <p>Last Maintenance: {schedule.busDetails.lastMaintenance}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {schedule.busDetails.amenities.map((amenity: string) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="font-medium mb-2">Recurrence</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="capitalize">{schedule.recurring}</p>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {schedule.days.map((day: string) => (
                  <Badge key={day} variant="outline" className="capitalize">
                    {day}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <p className="font-medium mb-2">Notes</p>
              <p className="text-muted-foreground">{schedule.notes}</p>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Created: {format(parseISO(schedule.createdAt), "MMMM d, yyyy HH:mm")}</p>
              <p>Last Updated: {format(parseISO(schedule.updatedAt), "MMMM d, yyyy HH:mm")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Occupancy & Bookings</CardTitle>
            <CardDescription>Current occupancy and booking information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium">Seat Occupancy</p>
                <p className="text-sm">{schedule.occupancy}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className={cn(
                    "h-2.5 rounded-full",
                    schedule.occupancy > 80 ? "bg-green-600" : schedule.occupancy > 50 ? "bg-yellow-400" : "bg-red-500",
                  )}
                  style={{ width: `${schedule.occupancy}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <p>0 seats</p>
                <p>{schedule.busDetails.capacity} seats</p>
              </div>
            </div>

            <div>
              <p className="font-medium mb-2">Ticket Price</p>
              <p className="text-xl font-bold">{schedule.price}</p>
            </div>

            <Separator />

            <div>
              <p className="font-medium mb-2">Bookings ({schedule.bookings.length})</p>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {schedule.bookings.map((booking: any) => (
                  <div key={booking.id} className="flex justify-between items-center p-2 border rounded-md">
                    <div>
                      <p className="font-medium">{booking.passengerName}</p>
                      <p className="text-xs text-muted-foreground">ID: {booking.id}</p>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={booking.status} />
                      <p className="text-xs mt-1">{booking.seats} seat(s)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href={`/agency/schedules/${id}/bookings`}>Manage Bookings</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
