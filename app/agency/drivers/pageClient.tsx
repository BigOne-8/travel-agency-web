"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  AlertCircle,
  Award,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Download,
  FileText,
  MoreHorizontal,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Star,
  Upload,
  UserCog,
  UserPlus,
  X,
} from "lucide-react"
import { format, parseISO, differenceInYears } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

// Mock data for drivers
const mockDrivers = [
  {
    id: "DRV-001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    licenseNumber: "DL-123456",
    licenseExpiry: "2025-06-15",
    licenseClass: "Commercial Class A",
    dateOfBirth: "1985-03-12",
    address: "123 Main St, New York, NY 10001",
    emergencyContact: "Jane Doe (+1 555-987-6543)",
    hireDate: "2018-05-10",
    status: "active",
    rating: 4.8,
    totalTrips: 1245,
    totalHours: 8760,
    safetyScore: 95,
    punctualityScore: 98,
    customerFeedback: 4.7,
    certifications: ["Defensive Driving", "First Aid", "Passenger Assistance"],
    preferredRoutes: ["New York to Boston", "New York to Washington DC"],
    notes: "Excellent driver with perfect attendance record. Prefers morning shifts.",
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    profileImage: "/placeholder.svg?height=128&width=128",
    upcomingTrips: [
      {
        id: "TRIP-1001",
        route: "New York to Boston",
        date: "2023-06-01",
        departureTime: "08:00 AM",
        arrivalTime: "12:30 PM",
      },
      {
        id: "TRIP-1005",
        route: "Boston to New York",
        date: "2023-06-01",
        departureTime: "02:30 PM",
        arrivalTime: "07:00 PM",
      },
    ],
    recentTrips: [
      {
        id: "TRIP-0998",
        route: "New York to Boston",
        date: "2023-05-30",
        departureTime: "08:00 AM",
        arrivalTime: "12:30 PM",
        status: "completed",
      },
      {
        id: "TRIP-0995",
        route: "Boston to New York",
        date: "2023-05-30",
        departureTime: "02:30 PM",
        arrivalTime: "07:00 PM",
        status: "completed",
      },
      {
        id: "TRIP-0990",
        route: "New York to Boston",
        date: "2023-05-29",
        departureTime: "08:00 AM",
        arrivalTime: "12:30 PM",
        status: "completed",
      },
    ],
  },
  {
    id: "DRV-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    licenseNumber: "DL-234567",
    licenseExpiry: "2024-08-20",
    licenseClass: "Commercial Class A",
    dateOfBirth: "1990-07-22",
    address: "456 Oak Ave, Boston, MA 02108",
    emergencyContact: "John Smith (+1 555-876-5432)",
    hireDate: "2019-02-15",
    status: "active",
    rating: 4.6,
    totalTrips: 980,
    totalHours: 6860,
    safetyScore: 92,
    punctualityScore: 95,
    customerFeedback: 4.5,
    certifications: ["Defensive Driving", "First Aid"],
    preferredRoutes: ["Boston to New York", "Boston to Washington DC"],
    notes: "Reliable driver with good customer service skills. Prefers afternoon shifts.",
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
    profileImage: "/placeholder.svg?height=128&width=128",
    upcomingTrips: [
      {
        id: "TRIP-1002",
        route: "Boston to Washington DC",
        date: "2023-06-02",
        departureTime: "09:00 AM",
        arrivalTime: "03:30 PM",
      },
    ],
    recentTrips: [
      {
        id: "TRIP-0999",
        route: "Boston to New York",
        date: "2023-05-31",
        departureTime: "09:00 AM",
        arrivalTime: "01:30 PM",
        status: "completed",
      },
      {
        id: "TRIP-0996",
        route: "New York to Boston",
        date: "2023-05-31",
        departureTime: "03:30 PM",
        arrivalTime: "08:00 PM",
        status: "completed",
      },
    ],
  },
  {
    id: "DRV-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 345-6789",
    licenseNumber: "DL-345678",
    licenseExpiry: "2025-03-10",
    licenseClass: "Commercial Class A",
    dateOfBirth: "1982-11-05",
    address: "789 Pine St, Washington, DC 20001",
    emergencyContact: "Mary Johnson (+1 555-765-4321)",
    hireDate: "2017-08-22",
    status: "active",
    rating: 4.9,
    totalTrips: 1560,
    totalHours: 10920,
    safetyScore: 98,
    punctualityScore: 97,
    customerFeedback: 4.8,
    certifications: ["Defensive Driving", "First Aid", "Passenger Assistance", "Hazardous Materials"],
    preferredRoutes: ["Washington DC to New York", "Washington DC to Boston"],
    notes: "Experienced driver with excellent safety record. Flexible with shifts.",
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    profileImage: "/placeholder.svg?height=128&width=128",
    upcomingTrips: [
      {
        id: "TRIP-1003",
        route: "Washington DC to New York",
        date: "2023-06-02",
        departureTime: "10:00 AM",
        arrivalTime: "03:30 PM",
      },
      {
        id: "TRIP-1007",
        route: "New York to Washington DC",
        date: "2023-06-02",
        departureTime: "05:00 PM",
        arrivalTime: "10:30 PM",
      },
    ],
    recentTrips: [
      {
        id: "TRIP-0997",
        route: "Washington DC to Boston",
        date: "2023-05-30",
        departureTime: "07:00 AM",
        arrivalTime: "03:30 PM",
        status: "completed",
      },
      {
        id: "TRIP-0994",
        route: "Boston to Washington DC",
        date: "2023-05-30",
        departureTime: "05:00 PM",
        arrivalTime: "01:30 AM",
        status: "completed",
      },
    ],
  },
  {
    id: "DRV-004",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 456-7890",
    licenseNumber: "DL-456789",
    licenseExpiry: "2024-11-05",
    licenseClass: "Commercial Class A",
    dateOfBirth: "1988-05-18",
    address: "101 Maple Dr, Philadelphia, PA 19019",
    emergencyContact: "Michael Williams (+1 555-654-3210)",
    hireDate: "2020-01-10",
    status: "on_leave",
    rating: 4.5,
    totalTrips: 620,
    totalHours: 4340,
    safetyScore: 90,
    punctualityScore: 93,
    customerFeedback: 4.4,
    certifications: ["Defensive Driving", "First Aid"],
    preferredRoutes: ["Philadelphia to New York", "Philadelphia to Washington DC"],
    notes: "Good driver with strong customer service focus. Currently on medical leave until June 15, 2023.",
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    profileImage: "/placeholder.svg?height=128&width=128",
    upcomingTrips: [],
    recentTrips: [
      {
        id: "TRIP-0985",
        route: "Philadelphia to New York",
        date: "2023-05-25",
        departureTime: "08:30 AM",
        arrivalTime: "11:00 AM",
        status: "completed",
      },
      {
        id: "TRIP-0982",
        route: "New York to Philadelphia",
        date: "2023-05-25",
        departureTime: "01:00 PM",
        arrivalTime: "03:30 PM",
        status: "completed",
      },
    ],
  },
  {
    id: "DRV-005",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 567-8901",
    licenseNumber: "DL-567890",
    licenseExpiry: "2025-09-15",
    licenseClass: "Commercial Class A",
    dateOfBirth: "1979-12-03",
    address: "202 Cedar Ln, Boston, MA 02109",
    emergencyContact: "Lisa Brown (+1 555-543-2109)",
    hireDate: "2016-06-05",
    status: "active",
    rating: 4.7,
    totalTrips: 1820,
    totalHours: 12740,
    safetyScore: 94,
    punctualityScore: 96,
    customerFeedback: 4.6,
    certifications: ["Defensive Driving", "First Aid", "Passenger Assistance", "Mountain Driving"],
    preferredRoutes: ["Boston to New York", "Boston to Philadelphia"],
    notes: "Veteran driver with excellent knowledge of northeastern routes. Prefers early morning shifts.",
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    profileImage: "/placeholder.svg?height=128&width=128",
    upcomingTrips: [
      {
        id: "TRIP-1004",
        route: "Boston to Philadelphia",
        date: "2023-06-03",
        departureTime: "06:00 AM",
        arrivalTime: "11:30 AM",
      },
      {
        id: "TRIP-1008",
        route: "Philadelphia to Boston",
        date: "2023-06-03",
        departureTime: "01:00 PM",
        arrivalTime: "06:30 PM",
      },
    ],
    recentTrips: [
      {
        id: "TRIP-0993",
        route: "Boston to New York",
        date: "2023-05-29",
        departureTime: "06:00 AM",
        arrivalTime: "10:30 AM",
        status: "completed",
      },
      {
        id: "TRIP-0991",
        route: "New York to Boston",
        date: "2023-05-29",
        departureTime: "12:30 PM",
        arrivalTime: "05:00 PM",
        status: "completed",
      },
    ],
  },
  {
    id: "DRV-006",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 678-9012",
    licenseNumber: "DL-678901",
    licenseExpiry: "2024-05-20",
    licenseClass: "Commercial Class A",
    dateOfBirth: "1992-08-27",
    address: "303 Birch St, New York, NY 10002",
    emergencyContact: "Daniel Davis (+1 555-432-1098)",
    hireDate: "2021-03-15",
    status: "active",
    rating: 4.4,
    totalTrips: 410,
    totalHours: 2870,
    safetyScore: 89,
    punctualityScore: 91,
    customerFeedback: 4.3,
    certifications: ["Defensive Driving", "First Aid"],
    preferredRoutes: ["New York to Philadelphia", "New York to Boston"],
    notes: "Newer driver showing good potential. Responds well to feedback and training.",
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    profileImage: "/placeholder.svg?height=128&width=128",
    upcomingTrips: [
      {
        id: "TRIP-1006",
        route: "New York to Philadelphia",
        date: "2023-06-04",
        departureTime: "09:30 AM",
        arrivalTime: "12:00 PM",
      },
    ],
    recentTrips: [
      {
        id: "TRIP-0989",
        route: "New York to Philadelphia",
        date: "2023-05-28",
        departureTime: "09:30 AM",
        arrivalTime: "12:00 PM",
        status: "completed",
      },
      {
        id: "TRIP-0986",
        route: "Philadelphia to New York",
        date: "2023-05-28",
        departureTime: "02:00 PM",
        arrivalTime: "04:30 PM",
        status: "completed",
      },
    ],
  },
  {
    id: "DRV-007",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 789-0123",
    licenseNumber: "DL-789012",
    licenseExpiry: "2025-01-10",
    licenseClass: "Commercial Class A",
    dateOfBirth: "1984-02-14",
    address: "404 Elm Ct, Washington, DC 20002",
    emergencyContact: "Sarah Wilson (+1 555-321-0987)",
    hireDate: "2019-07-20",
    status: "inactive",
    rating: 4.2,
    totalTrips: 750,
    totalHours: 5250,
    safetyScore: 86,
    punctualityScore: 88,
    customerFeedback: 4.0,
    certifications: ["Defensive Driving"],
    preferredRoutes: ["Washington DC to Philadelphia", "Washington DC to New York"],
    notes: "Currently inactive due to personal reasons. Expected to return in July 2023.",
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    profileImage: "/placeholder.svg?height=128&width=128",
    upcomingTrips: [],
    recentTrips: [
      {
        id: "TRIP-0975",
        route: "Washington DC to Philadelphia",
        date: "2023-05-20",
        departureTime: "10:00 AM",
        arrivalTime: "01:30 PM",
        status: "completed",
      },
      {
        id: "TRIP-0972",
        route: "Philadelphia to Washington DC",
        date: "2023-05-20",
        departureTime: "03:30 PM",
        arrivalTime: "07:00 PM",
        status: "completed",
      },
    ],
  },
  {
    id: "DRV-008",
    name: "Lisa Martinez",
    email: "lisa.martinez@example.com",
    phone: "+1 (555) 890-1234",
    licenseNumber: "DL-890123",
    licenseExpiry: "2025-07-25",
    licenseClass: "Commercial Class A",
    dateOfBirth: "1987-09-08",
    address: "505 Spruce Way, Boston, MA 02110",
    emergencyContact: "Carlos Martinez (+1 555-210-9876)",
    hireDate: "2018-11-12",
    status: "active",
    rating: 4.7,
    totalTrips: 1120,
    totalHours: 7840,
    safetyScore: 93,
    punctualityScore: 94,
    customerFeedback: 4.6,
    certifications: ["Defensive Driving", "First Aid", "Passenger Assistance"],
    preferredRoutes: ["Boston to Washington DC", "Boston to New York"],
    notes: "Excellent driver with strong language skills (fluent in Spanish and Portuguese).",
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
    profileImage: "/placeholder.svg?height=128&width=128",
    upcomingTrips: [
      {
        id: "TRIP-1009",
        route: "Boston to Washington DC",
        date: "2023-06-05",
        departureTime: "07:30 AM",
        arrivalTime: "04:00 PM",
      },
    ],
    recentTrips: [
      {
        id: "TRIP-0988",
        route: "Boston to Washington DC",
        date: "2023-05-27",
        departureTime: "07:30 AM",
        arrivalTime: "04:00 PM",
        status: "completed",
      },
      {
        id: "TRIP-0984",
        route: "Washington DC to Boston",
        date: "2023-05-27",
        departureTime: "06:00 PM",
        arrivalTime: "02:30 AM",
        status: "completed",
      },
    ],
  },
]

// Mock data for certifications
const certifications = [
  "Defensive Driving",
  "First Aid",
  "Passenger Assistance",
  "Hazardous Materials",
  "Mountain Driving",
  "Winter Driving",
  "Emergency Response",
  "CPR",
  "ADA Compliance",
  "Customer Service",
]

// Mock data for routes
const routes = [
  "New York to Boston",
  "Boston to New York",
  "New York to Washington DC",
  "Washington DC to New York",
  "New York to Philadelphia",
  "Philadelphia to New York",
  "Boston to Washington DC",
  "Washington DC to Boston",
  "Boston to Philadelphia",
  "Philadelphia to Boston",
  "Washington DC to Philadelphia",
  "Philadelphia to Washington DC",
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    on_leave: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    suspended: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    training: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  }

  const statusLabels = {
    active: "Active",
    inactive: "Inactive",
    on_leave: "On Leave",
    suspended: "Suspended",
    training: "In Training",
  }

  return (
    <Badge variant="outline" className={cn(statusStyles[status as keyof typeof statusStyles])}>
      {statusLabels[status as keyof typeof statusLabels]}
    </Badge>
  )
}

// Rating component
const RatingDisplay = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-4 w-4",
            star <= Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
            star === Math.ceil(rating) && rating % 1 !== 0 && "text-yellow-400 fill-yellow-400 opacity-50",
          )}
        />
      ))}
      <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function DriversPageClient() {
  const router = useRouter()

  // State
  const [view, setView] = useState("list")
  const [drivers, setDrivers] = useState<any[]>(mockDrivers)
  const [filteredDrivers, setFilteredDrivers] = useState<any[]>(mockDrivers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [certificationFilter, setCertificationFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [selectedDriver, setSelectedDriver] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [isCertificateDialogOpen, setIsCertificateDialogOpen] = useState(false)
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [availableDrivers, setAvailableDrivers] = useState<any[]>([])

  // Apply filters
  useEffect(() => {
    let filtered = drivers

    if (searchTerm) {
      filtered = filtered.filter(
        (driver) =>
          driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driver.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((driver) => driver.status === statusFilter)
    }

    if (certificationFilter !== "all") {
      filtered = filtered.filter((driver) => driver.certifications.includes(certificationFilter))
    }

    if (availabilityFilter !== "all") {
      const day = availabilityFilter.toLowerCase()
      filtered = filtered.filter((driver) => driver.availability[day])
    }

    // Sort drivers
    filtered = [...filtered].sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })

    setFilteredDrivers(filtered)
  }, [drivers, searchTerm, statusFilter, certificationFilter, availabilityFilter, sortBy, sortOrder])

  // Calculate available drivers for a specific date
  useEffect(() => {
    const dayOfWeek = format(selectedDate, "EEEE").toLowerCase()
    const available = drivers.filter((driver) => driver.status === "active" && driver.availability[dayOfWeek])
    setAvailableDrivers(available)
  }, [selectedDate, drivers])

  // Handle driver selection
  const handleDriverSelect = (driver: any) => {
    setSelectedDriver(driver)
  }

  // Handle driver deletion
  const handleDeleteDriver = () => {
    // In a real app, you would call an API to delete the driver
    console.log(`Deleting driver ${selectedDriver.id}`)

    // Remove the driver from the list
    const updatedDrivers = drivers.filter((driver) => driver.id !== selectedDriver.id)
    setDrivers(updatedDrivers)
    setFilteredDrivers(updatedDrivers)
    setSelectedDriver(null)
    setIsDeleteDialogOpen(false)
  }

  // Handle export
  const handleExport = () => {
    // In a real app, you would generate a CSV or JSON file
    const dataStr = JSON.stringify(filteredDrivers, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `drivers-export-${format(new Date(), "yyyy-MM-dd")}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()

    setIsExportDialogOpen(false)
  }

  // Handle import
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedDrivers = JSON.parse(e.target?.result as string)

        // Merge imported drivers with existing ones
        const mergedDrivers = [...drivers, ...importedDrivers]
        setDrivers(mergedDrivers)
        setFilteredDrivers(mergedDrivers)
      } catch (error) {
        console.error("Error parsing imported drivers:", error)
      }
    }
    reader.readAsText(file)

    setIsImportDialogOpen(false)
  }

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setCertificationFilter("all")
    setAvailabilityFilter("all")
  }

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    return differenceInYears(new Date(), parseISO(dateOfBirth))
  }

  // Render list view
  const renderListView = () => (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search drivers..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="on_leave">On Leave</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="training">In Training</SelectItem>
            </SelectContent>
          </Select>
          <Select value={certificationFilter} onValueChange={setCertificationFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Certification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Certifications</SelectItem>
              {certifications.map((cert) => (
                <SelectItem key={cert} value={cert}>
                  {cert}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Days</SelectItem>
              <SelectItem value="monday">Monday</SelectItem>
              <SelectItem value="tuesday">Tuesday</SelectItem>
              <SelectItem value="wednesday">Wednesday</SelectItem>
              <SelectItem value="thursday">Thursday</SelectItem>
              <SelectItem value="friday">Friday</SelectItem>
              <SelectItem value="saturday">Saturday</SelectItem>
              <SelectItem value="sunday">Sunday</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={resetFilters}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => {
                    setSortBy("name")
                    setSortOrder(sortBy === "name" && sortOrder === "asc" ? "desc" : "asc")
                  }}
                >
                  Driver
                  {sortBy === "name" && (
                    <ChevronDown className={cn("h-4 w-4", sortOrder === "desc" ? "rotate-180" : "")} />
                  )}
                </div>
              </TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => {
                    setSortBy("licenseExpiry")
                    setSortOrder(sortBy === "licenseExpiry" && sortOrder === "asc" ? "desc" : "asc")
                  }}
                >
                  License
                  {sortBy === "licenseExpiry" && (
                    <ChevronDown className={cn("h-4 w-4", sortOrder === "desc" ? "rotate-180" : "")} />
                  )}
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => {
                    setSortBy("rating")
                    setSortOrder(sortBy === "rating" && sortOrder === "asc" ? "desc" : "asc")
                  }}
                >
                  Rating
                  {sortBy === "rating" && (
                    <ChevronDown className={cn("h-4 w-4", sortOrder === "desc" ? "rotate-180" : "")} />
                  )}
                </div>
              </TableHead>
              <TableHead>Certifications</TableHead>
              <TableHead>Upcoming Trips</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDrivers.length > 0 ? (
              filteredDrivers.map((driver) => (
                <TableRow
                  key={driver.id}
                  className={cn(selectedDriver?.id === driver.id && "bg-muted")}
                  onClick={() => handleDriverSelect(driver)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={driver.profileImage} alt={driver.name} />
                        <AvatarFallback>
                          {driver.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-xs text-muted-foreground">{driver.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">{driver.email}</p>
                      <p className="text-sm">{driver.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm">{driver.licenseNumber}</p>
                      <p
                        className={cn(
                          "text-xs",
                          new Date(driver.licenseExpiry) < new Date(new Date().setMonth(new Date().getMonth() + 3))
                            ? "text-red-500 font-medium"
                            : "text-muted-foreground",
                        )}
                      >
                        Expires: {format(parseISO(driver.licenseExpiry), "MMM d, yyyy")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={driver.status} />
                  </TableCell>
                  <TableCell>
                    <RatingDisplay rating={driver.rating} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {driver.certifications.map((cert: string) => (
                        <Badge key={cert} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {driver.upcomingTrips.length > 0 ? (
                      <div className="space-y-1">
                        {driver.upcomingTrips.slice(0, 2).map((trip: any) => (
                          <div key={trip.id} className="text-xs">
                            <p className="font-medium">{trip.route}</p>
                            <p className="text-muted-foreground">
                              {trip.date} • {trip.departureTime}
                            </p>
                          </div>
                        ))}
                        {driver.upcomingTrips.length > 2 && (
                          <p className="text-xs text-muted-foreground">+{driver.upcomingTrips.length - 2} more</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">No upcoming trips</p>
                    )}
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
                        <DropdownMenuItem asChild>
                          <Link href={`/agency/drivers/${driver.id}`}>View Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/agency/drivers/${driver.id}/edit`}>Edit Driver</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedDriver(driver)
                            setIsAssignDialogOpen(true)
                          }}
                        >
                          Assign to Trip
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedDriver(driver)
                            setIsCertificateDialogOpen(true)
                          }}
                        >
                          Manage Certifications
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedDriver(driver)
                            setIsDeleteDialogOpen(true)
                          }}
                          className="text-red-600"
                        >
                          Delete Driver
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No drivers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )

  // Render grid view
  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredDrivers.length > 0 ? (
        filteredDrivers.map((driver) => (
          <Card
            key={driver.id}
            className={cn(
              "cursor-pointer hover:border-primary transition-colors",
              selectedDriver?.id === driver.id && "border-primary",
            )}
            onClick={() => handleDriverSelect(driver)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={driver.profileImage} alt={driver.name} />
                  <AvatarFallback className="text-xl">
                    {driver.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{driver.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{driver.id}</p>
                <StatusBadge status={driver.status} />
                <div className="mt-4 w-full">
                  <RatingDisplay rating={driver.rating} />
                </div>
                <div className="mt-4 w-full">
                  <div className="flex justify-between text-sm">
                    <span>Total Trips:</span>
                    <span className="font-medium">{driver.totalTrips}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>License:</span>
                    <span className="font-medium">{driver.licenseNumber}</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-1">
                  {driver.certifications.slice(0, 2).map((cert: string) => (
                    <Badge key={cert} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                  {driver.certifications.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{driver.certifications.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between p-4 pt-0">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/agency/drivers/${driver.id}`}>View</Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/agency/drivers/${driver.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedDriver(driver)
                      setIsAssignDialogOpen(true)
                    }}
                  >
                    Assign to Trip
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="col-span-full flex justify-center p-8">
          <p className="text-muted-foreground">No drivers found</p>
        </div>
      )}
    </div>
  )

  // Render availability view
  const renderAvailabilityView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Driver Availability</h3>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                {format(selectedDate, "MMMM d, yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Drivers for {format(selectedDate, "EEEE, MMMM d, yyyy")}</CardTitle>
          <CardDescription>
            {availableDrivers.length} drivers available out of {drivers.filter((d) => d.status === "active").length}{" "}
            active drivers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {availableDrivers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableDrivers.map((driver) => (
                <div
                  key={driver.id}
                  className="flex items-center gap-3 p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleDriverSelect(driver)}
                >
                  <Avatar>
                    <AvatarImage src={driver.profileImage} alt={driver.name} />
                    <AvatarFallback>
                      {driver.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{driver.name}</p>
                    <div className="flex items-center gap-2">
                      <RatingDisplay rating={driver.rating} />
                      <Badge variant="outline" className="text-xs">
                        {driver.upcomingTrips.length} trips
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/agency/drivers/${driver.id}`}>
                      <UserCog className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No Available Drivers</p>
              <p className="text-muted-foreground text-center max-w-md mt-2">
                There are no available drivers for this date. Try selecting a different date or check driver schedules.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Availability Overview</CardTitle>
          <CardDescription>Driver availability for the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Driver</TableHead>
                  <TableHead>Monday</TableHead>
                  <TableHead>Tuesday</TableHead>
                  <TableHead>Wednesday</TableHead>
                  <TableHead>Thursday</TableHead>
                  <TableHead>Friday</TableHead>
                  <TableHead>Saturday</TableHead>
                  <TableHead>Sunday</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers
                  .filter((driver) => driver.status === "active")
                  .map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={driver.profileImage} alt={driver.name} />
                            <AvatarFallback>
                              {driver.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{driver.name}</span>
                        </div>
                      </TableCell>
                      {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                        <TableCell key={day}>
                          {driver.availability[day] ? (
                            <div className="flex justify-center">
                              <Check className="h-5 w-5 text-green-500" />
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <X className="h-5 w-5 text-red-500" />
                            </div>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Render performance view
  const renderPerformanceView = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Driver Performance Overview</CardTitle>
          <CardDescription>Compare performance metrics across all drivers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Safety Scores</h3>
              <div className="space-y-4">
                {[...drivers]
                  .sort((a, b) => b.safetyScore - a.safetyScore)
                  .map((driver) => (
                    <div key={driver.id} className="flex items-center gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={driver.profileImage} alt={driver.name} />
                        <AvatarFallback>
                          {driver.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium truncate">{driver.name}</p>
                          <p className="font-medium">{driver.safetyScore}%</p>
                        </div>
                        <Progress value={driver.safetyScore} className="h-2" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Punctuality Scores</h3>
              <div className="space-y-4">
                {[...drivers]
                  .sort((a, b) => b.punctualityScore - a.punctualityScore)
                  .map((driver) => (
                    <div key={driver.id} className="flex items-center gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={driver.profileImage} alt={driver.name} />
                        <AvatarFallback>
                          {driver.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium truncate">{driver.name}</p>
                          <p className="font-medium">{driver.punctualityScore}%</p>
                        </div>
                        <Progress value={driver.punctualityScore} className="h-2" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Customer Feedback</h3>
              <div className="space-y-4">
                {[...drivers]
                  .sort((a, b) => b.customerFeedback - a.customerFeedback)
                  .map((driver) => (
                    <div key={driver.id} className="flex items-center gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={driver.profileImage} alt={driver.name} />
                        <AvatarFallback>
                          {driver.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium truncate">{driver.name}</p>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <p className="font-medium">{driver.customerFeedback.toFixed(1)}</p>
                          </div>
                        </div>
                        <Progress value={driver.customerFeedback * 20} className="h-2" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Drivers by Experience</CardTitle>
            <CardDescription>Based on total trips completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...drivers]
                .sort((a, b) => b.totalTrips - a.totalTrips)
                .slice(0, 5)
                .map((driver, index) => (
                  <div key={driver.id} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                      {index + 1}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={driver.profileImage} alt={driver.name} />
                      <AvatarFallback>
                        {driver.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{driver.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Award className="h-3 w-3 mr-1" />
                        <span>{driver.totalTrips} trips</span>
                        <span className="mx-1">•</span>
                        <span>{Math.round((driver.totalHours / 24 / 365) * 10) / 10} years</span>
                      </div>
                    </div>
                    <RatingDisplay rating={driver.rating} />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Rated Drivers</CardTitle>
            <CardDescription>Based on customer ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...drivers]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 5)
                .map((driver, index) => (
                  <div key={driver.id} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                      {index + 1}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={driver.profileImage} alt={driver.name} />
                      <AvatarFallback>
                        {driver.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{driver.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{driver.totalTrips} trips</span>
                        <span className="mx-1">•</span>
                        <span>Safety: {driver.safetyScore}%</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-medium">{driver.rating.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Driver Management</h2>
          <p className="text-muted-foreground">Manage your bus drivers and their assignments</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsExportDialogOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsImportDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button asChild>
            <Link href="/agency/drivers/create">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Driver
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list" value={view} onValueChange={setView} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Columns
            </Button>
          </div>
        </div>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-6">{renderListView()}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grid" className="space-y-4">
          <Card>
            <CardContent className="p-6">{renderGridView()}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          {renderAvailabilityView()}
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {renderPerformanceView()}
        </TabsContent>
      </Tabs>

      {selectedDriver && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Driver Details</CardTitle>
                <CardDescription>Viewing details for selected driver</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedDriver(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedDriver.profileImage} alt={selectedDriver.name} />
                    <AvatarFallback>
                      {selectedDriver.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{selectedDriver.name}</h3>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={selectedDriver.status} />
                      <p className="text-sm text-muted-foreground">{selectedDriver.id}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Contact Information</p>
                  <div className="space-y-1 text-sm">
                    <p>Email: {selectedDriver.email}</p>
                    <p>Phone: {selectedDriver.phone}</p>
                    <p>Address: {selectedDriver.address}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Emergency Contact</p>
                  <p className="text-sm">{selectedDriver.emergencyContact}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">License Information</p>
                  <div className="space-y-1 text-sm">
                    <p>License Number: {selectedDriver.licenseNumber}</p>
                    <p>Class: {selectedDriver.licenseClass}</p>
                    <p
                      className={cn(
                        new Date(selectedDriver.licenseExpiry) <
                          new Date(new Date().setMonth(new Date().getMonth() + 3))
                          ? "text-red-500 font-medium"
                          : "",
                      )}
                    >
                      Expiry Date: {format(parseISO(selectedDriver.licenseExpiry), "MMMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Personal Information</p>
                  <div className="space-y-1 text-sm">
                    <p>
                      Date of Birth: {format(parseISO(selectedDriver.dateOfBirth), "MMMM d, yyyy")} (
                      {calculateAge(selectedDriver.dateOfBirth)} years)
                    </p>
                    <p>Hire Date: {format(parseISO(selectedDriver.hireDate), "MMMM d, yyyy")}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Certifications</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedDriver.certifications.map((cert: string) => (
                      <Badge key={cert} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">Performance Metrics</p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Safety Score:</span>
                        <span className="font-medium">{selectedDriver.safetyScore}%</span>
                      </div>
                      <Progress value={selectedDriver.safetyScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Punctuality Score:</span>
                        <span className="font-medium">{selectedDriver.punctualityScore}%</span>
                      </div>
                      <Progress value={selectedDriver.punctualityScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Customer Feedback:</span>
                        <span className="font-medium">{selectedDriver.customerFeedback.toFixed(1)}/5.0</span>
                      </div>
                      <Progress value={selectedDriver.customerFeedback * 20} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Experience</p>
                  <div className="space-y-1 text-sm">
                    <p>Total Trips: {selectedDriver.totalTrips}</p>
                    <p>
                      Total Hours: {selectedDriver.totalHours} (
                      {Math.round((selectedDriver.totalHours / 24 / 365) * 10) / 10} years)
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Notes</p>
                  <p className="text-sm">{selectedDriver.notes}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Upcoming Trips</h3>
              {selectedDriver.upcomingTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedDriver.upcomingTrips.map((trip: any) => (
                    <div key={trip.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{trip.route}</p>
                          <p className="text-sm text-muted-foreground">{trip.date}</p>
                        </div>
                        <Badge variant="outline">{trip.id}</Badge>
                      </div>
                      <div className="mt-2 flex items-center text-sm">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>
                          {trip.departureTime} - {trip.arrivalTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No upcoming trips scheduled</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <Link href={`/agency/drivers/${selectedDriver.id}`}>View Full Profile</Link>
            </Button>
            <Button asChild>
              <Link href={`/agency/drivers/${selectedDriver.id}/edit`}>Edit Driver</Link>
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this driver. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDriver} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Drivers</DialogTitle>
            <DialogDescription>Export your drivers to a JSON file that can be imported later.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <p>
                {filteredDrivers.length} {filteredDrivers.length === 1 ? "driver" : "drivers"} will be exported
              </p>
            </div>
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                The exported file will contain all drivers matching your current filters. You can import this file later
                to restore these drivers.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export Drivers
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Drivers</DialogTitle>
            <DialogDescription>Import drivers from a previously exported JSON file.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                Select a JSON file containing drivers to import. The system will merge these drivers with your existing
                ones.
              </p>
            </div>
            <Input type="file" accept=".json" onChange={handleImport} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign to Trip Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Driver to Trip</DialogTitle>
            <DialogDescription>{selectedDriver && `Assign ${selectedDriver.name} to a trip`}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Route</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a route" />
                </SelectTrigger>
                <SelectContent>
                  {routes.map((route) => (
                    <SelectItem key={route} value={route}>
                      {route}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Pick a date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Departure Time</Label>
                <Input type="time" />
              </div>
              <div className="space-y-2">
                <Label>Arrival Time</Label>
                <Input type="time" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Select Bus</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a bus" />
                </SelectTrigger>
                <SelectContent>
                  {["BUS-001", "BUS-002", "BUS-003", "BUS-004", "BUS-005"].map((bus) => (
                    <SelectItem key={bus} value={bus}>
                      {bus}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAssignDialogOpen(false)}>Assign Driver</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Certifications Dialog */}
      <Dialog open={isCertificateDialogOpen} onOpenChange={setIsCertificateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Certifications</DialogTitle>
            <DialogDescription>
              {selectedDriver && `Update certifications for ${selectedDriver.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Current Certifications</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedDriver?.certifications.map((cert: string) => (
                  <Badge key={cert} variant="secondary" className="flex items-center gap-1">
                    {cert}
                    <X className="h-3 w-3 ml-1 cursor-pointer" />
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Add Certifications</Label>
              <div className="grid grid-cols-2 gap-2">
                {certifications
                  .filter((cert) => !selectedDriver?.certifications.includes(cert))
                  .map((cert) => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Checkbox id={`cert-${cert}`} />
                      <Label htmlFor={`cert-${cert}`}>{cert}</Label>
                    </div>
                  ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Add New Certification</Label>
              <div className="flex gap-2">
                <Input placeholder="Enter certification name" />
                <Button variant="outline" size="sm">
                  Add
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCertificateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCertificateDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
