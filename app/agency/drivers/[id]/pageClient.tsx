"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Edit, FileText, MapPin, Phone, Star, Trash2, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

// Mock driver data
const mockDriver = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, Anytown, USA",
  licenseNumber: "DL12345678",
  licenseExpiry: new Date("2025-06-30"),
  dateOfBirth: new Date("1985-04-15"),
  dateJoined: new Date("2020-03-10"),
  status: "Active",
  avatar: "/placeholder.svg?height=200&width=200",
  rating: 4.8,
  totalTrips: 1243,
  totalHours: 5680,
  safetyScore: 98,
  punctualityScore: 95,
  certifications: [
    { name: "Commercial Driver License", issuedDate: new Date("2018-05-20"), expiryDate: new Date("2025-06-30") },
    { name: "First Aid Certification", issuedDate: new Date("2022-01-15"), expiryDate: new Date("2024-01-15") },
    { name: "Defensive Driving", issuedDate: new Date("2021-08-10"), expiryDate: new Date("2023-08-10") },
  ],
  recentTrips: [
    { id: "T1001", date: new Date("2023-03-15"), route: "New York to Boston", duration: "4h 30m", status: "Completed" },
    {
      id: "T982",
      date: new Date("2023-03-12"),
      route: "Boston to Washington DC",
      duration: "8h 15m",
      status: "Completed",
    },
    {
      id: "T965",
      date: new Date("2023-03-08"),
      route: "Washington DC to Philadelphia",
      duration: "3h 45m",
      status: "Completed",
    },
    {
      id: "T943",
      date: new Date("2023-03-05"),
      route: "Philadelphia to New York",
      duration: "2h 30m",
      status: "Completed",
    },
  ],
  availability: {
    monday: { available: true, hours: "8:00 AM - 6:00 PM" },
    tuesday: { available: true, hours: "8:00 AM - 6:00 PM" },
    wednesday: { available: true, hours: "8:00 AM - 6:00 PM" },
    thursday: { available: true, hours: "8:00 AM - 6:00 PM" },
    friday: { available: true, hours: "8:00 AM - 6:00 PM" },
    saturday: { available: false, hours: "Not Available" },
    sunday: { available: false, hours: "Not Available" },
  },
  performanceMetrics: [
    { month: "Jan", trips: 42, rating: 4.7 },
    { month: "Feb", trips: 38, rating: 4.8 },
    { month: "Mar", trips: 45, rating: 4.9 },
  ],
}

export default function DriverDetailClient({ id }: { id: string }) {
  const router = useRouter()
  const [driver, setDriver] = useState(mockDriver)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // In a real app, fetch driver data based on ID
  useEffect(() => {
    // Fetch driver data
    // For now, we're using mock data
  }, [id])

  const handleDelete = async () => {
    setLoading(true)
    try {
      // API call to delete driver
      // await deleteDriver(id)

      // Navigate back to drivers list
      router.push("/agency/drivers")
    } catch (error) {
      console.error("Failed to delete driver:", error)
    } finally {
      setLoading(false)
      setDeleteDialogOpen(false)
    }
  }

  const handleEdit = () => {
    router.push(`/agency/drivers/${id}/edit`)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : i < rating
                ? "text-yellow-400 fill-yellow-400 opacity-50"
                : "text-gray-300"
          }`}
        />
      ))
  }

  const renderAvailabilityBadge = (available: boolean) => {
    return available ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>
    ) : (
      <Badge variant="outline" className="text-gray-500">
        Not Available
      </Badge>
    )
  }

  const renderCertificationStatus = (expiryDate: Date) => {
    const now = new Date()
    const monthsRemaining = Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30))

    if (expiryDate < now) {
      return (
        <Badge variant="destructive" className="ml-2">
          Expired
        </Badge>
      )
    } else if (monthsRemaining <= 3) {
      return (
        <Badge variant="warning" className="ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Expiring Soon
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
          Valid
        </Badge>
      )
    }
  }

  if (!driver) {
    return <div className="flex items-center justify-center h-96">Loading driver details...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Driver Details</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Driver
          </Button>
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Driver
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Driver</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this driver? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                  {loading ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Driver Profile Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={driver.avatar} alt={driver.name} />
              <AvatarFallback>{getInitials(driver.name)}</AvatarFallback>
            </Avatar>
            <h3 className="text-2xl font-bold">{driver.name}</h3>
            <div className="flex items-center mt-1 mb-2">
              {renderStars(driver.rating)}
              <span className="ml-1 text-sm text-gray-600">{driver.rating.toFixed(1)}</span>
            </div>
            <Badge
              className={`mb-4 ${
                driver.status === "Active"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : driver.status === "On Leave"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    : "bg-red-100 text-red-800 hover:bg-red-100"
              }`}
            >
              {driver.status}
            </Badge>
            <div className="w-full space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">{driver.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">{driver.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">{driver.address}</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">License: {driver.licenseNumber}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">DOB: {format(driver.dateOfBirth, "PP")}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">Joined: {format(driver.dateJoined, "PP")}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Safety Score</span>
                <span className="text-sm font-medium">{driver.safetyScore}%</span>
              </div>
              <Progress value={driver.safetyScore} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Punctuality</span>
                <span className="text-sm font-medium">{driver.punctualityScore}%</span>
              </div>
              <Progress value={driver.punctualityScore} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Customer Rating</span>
                <div className="flex items-center">
                  {renderStars(driver.rating)}
                  <span className="ml-1 text-sm">{driver.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">{driver.totalTrips}</p>
                <p className="text-xs text-gray-500">Total Trips</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold">{Math.floor(driver.totalHours / 100)}</p>
                <p className="text-xs text-gray-500">Hours Driven (100s)</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Monthly Performance</h4>
              <div className="flex justify-between items-end h-32">
                {driver.performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-xs mb-1">{renderStars(metric.rating)[0]}</div>
                    <div
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${(metric.trips / 50) * 100}%` }}
                    ></div>
                    <div className="text-xs mt-1">{metric.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Availability */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Weekly Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Monday</span>
                <div className="flex items-center">
                  {renderAvailabilityBadge(driver.availability.monday.available)}
                  <span className="ml-2 text-sm">{driver.availability.monday.hours}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Tuesday</span>
                <div className="flex items-center">
                  {renderAvailabilityBadge(driver.availability.tuesday.available)}
                  <span className="ml-2 text-sm">{driver.availability.tuesday.hours}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Wednesday</span>
                <div className="flex items-center">
                  {renderAvailabilityBadge(driver.availability.wednesday.available)}
                  <span className="ml-2 text-sm">{driver.availability.wednesday.hours}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Thursday</span>
                <div className="flex items-center">
                  {renderAvailabilityBadge(driver.availability.thursday.available)}
                  <span className="ml-2 text-sm">{driver.availability.thursday.hours}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Friday</span>
                <div className="flex items-center">
                  {renderAvailabilityBadge(driver.availability.friday.available)}
                  <span className="ml-2 text-sm">{driver.availability.friday.hours}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Saturday</span>
                <div className="flex items-center">
                  {renderAvailabilityBadge(driver.availability.saturday.available)}
                  <span className="ml-2 text-sm">{driver.availability.saturday.hours}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-medium">Sunday</span>
                <div className="flex items-center">
                  {renderAvailabilityBadge(driver.availability.sunday.available)}
                  <span className="ml-2 text-sm">{driver.availability.sunday.hours}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trips" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trips">Recent Trips</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="trips">
          <Card>
            <CardHeader>
              <CardTitle>Recent Trips</CardTitle>
              <CardDescription>View the most recent trips completed by this driver</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trip ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {driver.recentTrips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell className="font-medium">{trip.id}</TableCell>
                      <TableCell>{format(trip.date, "PP")}</TableCell>
                      <TableCell>{trip.route}</TableCell>
                      <TableCell>{trip.duration}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            trip.status === "Completed"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : trip.status === "In Progress"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          }
                        >
                          {trip.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Trips
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <CardTitle>Certifications & Licenses</CardTitle>
              <CardDescription>View and manage driver certifications and licenses</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certification</TableHead>
                    <TableHead>Issued Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {driver.certifications.map((cert, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{cert.name}</TableCell>
                      <TableCell>{format(cert.issuedDate, "PP")}</TableCell>
                      <TableCell>{format(cert.expiryDate, "PP")}</TableCell>
                      <TableCell>{renderCertificationStatus(cert.expiryDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Add New Certification
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>View and manage driver documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Driver's License</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Medical Certificate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Background Check</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Training Certificate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Upload New Document
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
