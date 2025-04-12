"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
  MapPin,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Upload,
  Users,
  X,
  ArrowUp,
} from "lucide-react"
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  parseISO,
  isToday,
} from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Bus } from "lucide-react"

// Mock data for schedules
const mockSchedules = [
  {
    id: "SCH-1001",
    routeId: "RT-1001",
    routeName: "New York to Boston",
    departureTime: "2023-06-01T08:00:00Z",
    arrivalTime: "2023-06-01T12:30:00Z",
    busId: "BUS-001",
    busType: "Luxury",
    driverId: "DRV-001",
    driverName: "John Doe",
    status: "active",
    occupancy: 85,
    recurring: "daily",
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    departureLocation: "New York Central Station",
    arrivalLocation: "Boston Main Terminal",
    price: "$45.00",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-20T14:45:00Z",
  },
  {
    id: "SCH-1002",
    routeId: "RT-1002",
    routeName: "Boston to New York",
    departureTime: "2023-06-01T14:00:00Z",
    arrivalTime: "2023-06-01T18:30:00Z",
    busId: "BUS-002",
    busType: "Standard",
    driverId: "DRV-002",
    driverName: "Jane Smith",
    status: "active",
    occupancy: 75,
    recurring: "daily",
    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    departureLocation: "Boston Main Terminal",
    arrivalLocation: "New York Central Station",
    price: "$45.00",
    createdAt: "2023-05-15T11:15:00Z",
    updatedAt: "2023-05-20T15:30:00Z",
  },
  {
    id: "SCH-1003",
    routeId: "RT-1003",
    routeName: "New York to Washington DC",
    departureTime: "2023-06-02T09:00:00Z",
    arrivalTime: "2023-06-02T14:30:00Z",
    busId: "BUS-003",
    busType: "Economy",
    driverId: "DRV-003",
    driverName: "Robert Johnson",
    status: "cancelled",
    occupancy: 0,
    recurring: "weekly",
    days: ["saturday", "sunday"],
    departureLocation: "New York South Terminal",
    arrivalLocation: "Washington Union Station",
    price: "$55.00",
    createdAt: "2023-05-16T09:45:00Z",
    updatedAt: "2023-05-21T10:20:00Z",
  },
  {
    id: "SCH-1004",
    routeId: "RT-1004",
    routeName: "Washington DC to New York",
    departureTime: "2023-06-02T15:00:00Z",
    arrivalTime: "2023-06-02T20:30:00Z",
    busId: "BUS-004",
    busType: "Luxury",
    driverId: "DRV-004",
    driverName: "Sarah Williams",
    status: "delayed",
    occupancy: 90,
    recurring: "weekly",
    days: ["saturday", "sunday"],
    departureLocation: "Washington Union Station",
    arrivalLocation: "New York South Terminal",
    price: "$55.00",
    createdAt: "2023-05-16T10:30:00Z",
    updatedAt: "2023-05-21T11:15:00Z",
  },
  {
    id: "SCH-1005",
    routeId: "RT-1005",
    routeName: "New York to Philadelphia",
    departureTime: "2023-06-03T10:00:00Z",
    arrivalTime: "2023-06-03T12:30:00Z",
    busId: "BUS-005",
    busType: "Standard",
    driverId: "DRV-005",
    driverName: "Michael Brown",
    status: "active",
    occupancy: 65,
    recurring: "daily",
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    departureLocation: "New York West Terminal",
    arrivalLocation: "Philadelphia Bus Station",
    price: "$35.00",
    createdAt: "2023-05-17T14:20:00Z",
    updatedAt: "2023-05-22T09:10:00Z",
  },
  {
    id: "SCH-1006",
    routeId: "RT-1006",
    routeName: "Philadelphia to New York",
    departureTime: "2023-06-03T14:00:00Z",
    arrivalTime: "2023-06-03T16:30:00Z",
    busId: "BUS-006",
    busType: "Standard",
    driverId: "DRV-006",
    driverName: "Emily Davis",
    status: "active",
    occupancy: 80,
    recurring: "daily",
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    departureLocation: "Philadelphia Bus Station",
    arrivalLocation: "New York West Terminal",
    price: "$35.00",
    createdAt: "2023-05-17T15:05:00Z",
    updatedAt: "2023-05-22T10:00:00Z",
  },
  {
    id: "SCH-1007",
    routeId: "RT-1007",
    routeName: "Boston to Washington DC",
    departureTime: "2023-06-04T07:30:00Z",
    arrivalTime: "2023-06-04T15:00:00Z",
    busId: "BUS-007",
    busType: "Luxury",
    driverId: "DRV-007",
    driverName: "David Wilson",
    status: "active",
    occupancy: 70,
    recurring: "weekly",
    days: ["tuesday", "thursday", "saturday"],
    departureLocation: "Boston North Station",
    arrivalLocation: "Washington Central Terminal",
    price: "$65.00",
    createdAt: "2023-05-18T11:30:00Z",
    updatedAt: "2023-05-23T13:45:00Z",
  },
  {
    id: "SCH-1008",
    routeId: "RT-1008",
    routeName: "Washington DC to Boston",
    departureTime: "2023-06-04T16:30:00Z",
    arrivalTime: "2023-06-05T00:00:00Z",
    busId: "BUS-008",
    busType: "Luxury",
    driverId: "DRV-008",
    driverName: "Lisa Martinez",
    status: "active",
    occupancy: 75,
    recurring: "weekly",
    days: ["tuesday", "thursday", "saturday"],
    departureLocation: "Washington Central Terminal",
    arrivalLocation: "Boston North Station",
    price: "$65.00",
    createdAt: "2023-05-18T12:15:00Z",
    updatedAt: "2023-05-23T14:30:00Z",
  },
]

// Mock data for routes
const mockRoutes = [
  { id: "RT-1001", name: "New York to Boston" },
  { id: "RT-1002", name: "Boston to New York" },
  { id: "RT-1003", name: "New York to Washington DC" },
  { id: "RT-1004", name: "Washington DC to New York" },
  { id: "RT-1005", name: "New York to Philadelphia" },
  { id: "RT-1006", name: "Philadelphia to New York" },
  { id: "RT-1007", name: "Boston to Washington DC" },
  { id: "RT-1008", name: "Washington DC to Boston" },
]

// Mock data for buses
const mockBuses = [
  { id: "BUS-001", name: "Mercedes-Benz Tourismo", type: "Luxury", capacity: 52 },
  { id: "BUS-002", name: "Volvo 9700", type: "Standard", capacity: 48 },
  { id: "BUS-003", name: "MAN Lion's Coach", type: "Economy", capacity: 50 },
  { id: "BUS-004", name: "Scania Touring", type: "Luxury", capacity: 54 },
  { id: "BUS-005", name: "Neoplan Cityliner", type: "Standard", capacity: 46 },
  { id: "BUS-006", name: "Setra ComfortClass", type: "Standard", capacity: 49 },
  { id: "BUS-007", name: "Van Hool Astromega", type: "Luxury", capacity: 56 },
  { id: "BUS-008", name: "Irizar i8", type: "Luxury", capacity: 52 },
]

// Mock data for drivers
const mockDrivers = [
  { id: "DRV-001", name: "John Doe" },
  { id: "DRV-002", name: "Jane Smith" },
  { id: "DRV-003", name: "Robert Johnson" },
  { id: "DRV-004", name: "Sarah Williams" },
  { id: "DRV-005", name: "Michael Brown" },
  { id: "DRV-006", name: "Emily Davis" },
  { id: "DRV-007", name: "David Wilson" },
  { id: "DRV-008", name: "Lisa Martinez" },
]

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    delayed: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  }

  return (
    <Badge variant="outline" className={cn(statusStyles[status as keyof typeof statusStyles])}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

// Generate schedules for the current month based on recurring patterns
const generateMonthlySchedules = (date: Date) => {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  const days = eachDayOfInterval({ start, end })

  const monthlySchedules = days.flatMap((day) => {
    const dayOfWeek = format(day, "EEEE").toLowerCase()

    return mockSchedules
      .filter((schedule) => {
        if (schedule.recurring === "daily") {
          return schedule.days.includes(dayOfWeek)
        } else if (schedule.recurring === "weekly") {
          return schedule.days.includes(dayOfWeek)
        }
        return false
      })
      .map((schedule) => {
        const departureDate = parseISO(schedule.departureTime)
        const arrivalDate = parseISO(schedule.arrivalTime)

        const newDepartureTime = new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate(),
          departureDate.getHours(),
          departureDate.getMinutes(),
        )

        const newArrivalTime = new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate(),
          arrivalDate.getHours(),
          arrivalDate.getMinutes(),
        )

        return {
          ...schedule,
          id: `${schedule.id}-${format(day, "yyyy-MM-dd")}`,
          departureTime: newDepartureTime.toISOString(),
          arrivalTime: newArrivalTime.toISOString(),
          date: day,
        }
      })
  })

  return monthlySchedules
}

export default function SchedulePageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State
  const [view, setView] = useState("month")
  const [calendarView, setCalendarView] = useState("month")
  const [date, setDate] = useState<Date>(new Date())
  const [schedules, setSchedules] = useState<any[]>([])
  const [filteredSchedules, setFilteredSchedules] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [routeFilter, setRouteFilter] = useState("all")
  const [busFilter, setBusFilter] = useState("all")
  const [driverFilter, setDriverFilter] = useState("all")
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [isConflictDialogOpen, setIsConflictDialogOpen] = useState(false)
  const [conflictingSchedules, setConflictingSchedules] = useState<any[]>([])
  const [sortBy, setSortBy] = useState("departureTime")
  const [sortOrder, setSortOrder] = useState("asc")

  // Generate schedules for the current month
  useEffect(() => {
    const monthlySchedules = generateMonthlySchedules(date)
    setSchedules(monthlySchedules)
    setFilteredSchedules(monthlySchedules)
  }, [date])

  // Apply filters
  useEffect(() => {
    let filtered = schedules

    if (searchTerm) {
      filtered = filtered.filter(
        (schedule) =>
          schedule.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          schedule.departureLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          schedule.arrivalLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          schedule.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          schedule.busId.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((schedule) => schedule.status === statusFilter)
    }

    if (routeFilter !== "all") {
      filtered = filtered.filter((schedule) => schedule.routeId === routeFilter)
    }

    if (busFilter !== "all") {
      filtered = filtered.filter((schedule) => schedule.busId === busFilter)
    }

    if (driverFilter !== "all") {
      filtered = filtered.filter((schedule) => schedule.driverId === driverFilter)
    }

    // Sort schedules
    filtered = [...filtered].sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return sortOrder === "asc" ? (aValue > bValue ? 1 : -1) : aValue > bValue ? -1 : 1
    })

    setFilteredSchedules(filtered)
  }, [schedules, searchTerm, statusFilter, routeFilter, busFilter, driverFilter, sortBy, sortOrder])

  // Handle month navigation
  const handlePreviousMonth = () => {
    setDate((prevDate) => subMonths(prevDate, 1))
  }

  const handleNextMonth = () => {
    setDate((prevDate) => addMonths(prevDate, 1))
  }

  // Handle week navigation
  const handlePreviousWeek = () => {
    setDate((prevDate) => subWeeks(prevDate, 1))
  }

  const handleNextWeek = () => {
    setDate((prevDate) => addWeeks(prevDate, 1))
  }

  // Reset to today
  const handleToday = () => {
    setDate(new Date())
  }

  // Handle schedule selection
  const handleScheduleSelect = (schedule: any) => {
    setSelectedSchedule(schedule)
  }

  // Handle schedule deletion
  const handleDeleteSchedule = () => {
    // In a real app, you would call an API to delete the schedule
    console.log(`Deleting schedule ${selectedSchedule.id}`)

    // Remove the schedule from the list
    const updatedSchedules = schedules.filter((schedule) => schedule.id !== selectedSchedule.id)
    setSchedules(updatedSchedules)
    setFilteredSchedules(updatedSchedules)
    setSelectedSchedule(null)
    setIsDeleteDialogOpen(false)
  }

  // Handle export
  const handleExport = () => {
    // In a real app, you would generate a CSV or JSON file
    const dataStr = JSON.stringify(filteredSchedules, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `schedules-export-${format(new Date(), "yyyy-MM-dd")}.json`

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
        const importedSchedules = JSON.parse(e.target?.result as string)

        // Check for conflicts
        const conflicts = importedSchedules.filter((importedSchedule: any) => {
          return schedules.some((existingSchedule) => {
            const importedDeparture = new Date(importedSchedule.departureTime)
            const importedArrival = new Date(importedSchedule.arrivalTime)
            const existingDeparture = new Date(existingSchedule.departureTime)
            const existingArrival = new Date(existingSchedule.arrivalTime)

            // Check if the same bus is scheduled at overlapping times
            if (importedSchedule.busId === existingSchedule.busId) {
              return (
                (importedDeparture >= existingDeparture && importedDeparture <= existingArrival) ||
                (importedArrival >= existingDeparture && importedArrival <= existingArrival) ||
                (importedDeparture <= existingDeparture && importedArrival >= existingArrival)
              )
            }

            // Check if the same driver is scheduled at overlapping times
            if (importedSchedule.driverId === existingSchedule.driverId) {
              return (
                (importedDeparture >= existingDeparture && importedDeparture <= existingArrival) ||
                (importedArrival >= existingDeparture && importedArrival <= existingArrival) ||
                (importedDeparture <= existingDeparture && importedArrival >= existingArrival)
              )
            }

            return false
          })
        })

        if (conflicts.length > 0) {
          setConflictingSchedules(conflicts)
          setIsConflictDialogOpen(true)
        } else {
          // Merge imported schedules with existing ones
          const mergedSchedules = [...schedules, ...importedSchedules]
          setSchedules(mergedSchedules)
          setFilteredSchedules(mergedSchedules)
        }
      } catch (error) {
        console.error("Error parsing imported schedules:", error)
      }
    }
    reader.readAsText(file)

    setIsImportDialogOpen(false)
  }

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setRouteFilter("all")
    setBusFilter("all")
    setDriverFilter("all")
  }

  // Calendar days based on view
  const calendarDays = useMemo(() => {
    if (calendarView === "month") {
      return eachDayOfInterval({
        start: startOfMonth(date),
        end: endOfMonth(date),
      })
    } else if (calendarView === "week") {
      return eachDayOfInterval({
        start: startOfWeek(date),
        end: endOfWeek(date),
      })
    }
    return [date]
  }, [date, calendarView])

  // Get schedules for a specific day
  const getSchedulesForDay = (day: Date) => {
    return filteredSchedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.departureTime)
      return isSameDay(scheduleDate, day)
    })
  }

  // Render month view
  const renderMonthView = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous Month
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
          <h2 className="text-xl font-semibold">{format(date, "MMMM yyyy")}</h2>
        </div>
        <Button variant="outline" size="sm" onClick={handleNextMonth}>
          Next Month
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-medium py-2">
            {day}
          </div>
        ))}

        {Array.from({ length: startOfMonth(date).getDay() }).map((_, index) => (
          <div key={`empty-start-${index}`} className="min-h-[100px] p-1 border rounded-md bg-muted/20"></div>
        ))}

        {calendarDays.map((day) => {
          const daySchedules = getSchedulesForDay(day)
          const isCurrentMonth = isSameMonth(day, date)

          return (
            <div
              key={day.toString()}
              className={cn(
                "min-h-[100px] p-1 border rounded-md",
                !isCurrentMonth && "bg-muted/20",
                isToday(day) && "border-primary",
              )}
            >
              <div className={cn("text-right p-1 font-medium", !isCurrentMonth && "text-muted-foreground")}>
                {format(day, "d")}
              </div>
              <ScrollArea className="h-[80px]">
                {daySchedules.length > 0 ? (
                  <div className="space-y-1">
                    {daySchedules.map((schedule) => (
                      <div
                        key={schedule.id}
                        className={cn(
                          "text-xs p-1 rounded cursor-pointer",
                          schedule.status === "active" && "bg-green-100 dark:bg-green-900",
                          schedule.status === "cancelled" && "bg-red-100 dark:bg-red-900",
                          schedule.status === "delayed" && "bg-yellow-100 dark:bg-yellow-900",
                          schedule.status === "completed" && "bg-blue-100 dark:bg-blue-900",
                          selectedSchedule?.id === schedule.id && "ring-2 ring-primary",
                        )}
                        onClick={() => handleScheduleSelect(schedule)}
                      >
                        <div className="font-medium truncate">{format(new Date(schedule.departureTime), "HH:mm")}</div>
                        <div className="truncate">{schedule.routeName}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground text-center pt-2">No schedules</div>
                )}
              </ScrollArea>
            </div>
          )
        })}

        {Array.from({ length: 6 - endOfMonth(date).getDay() }).map((_, index) => (
          <div key={`empty-end-${index}`} className="min-h-[100px] p-1 border rounded-md bg-muted/20"></div>
        ))}
      </div>
    </div>
  )

  // Render week view
  const renderWeekView = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={handlePreviousWeek}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous Week
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
          <h2 className="text-xl font-semibold">
            {format(startOfWeek(date), "MMM d")} - {format(endOfWeek(date), "MMM d, yyyy")}
          </h2>
        </div>
        <Button variant="outline" size="sm" onClick={handleNextWeek}>
          Next Week
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day) => (
          <div key={day.toString()} className="text-center">
            <p className="text-sm font-medium">{format(day, "EEE")}</p>
            <p
              className={cn(
                "text-sm rounded-full w-8 h-8 flex items-center justify-center mx-auto",
                isToday(day) && "bg-primary text-primary-foreground",
              )}
            >
              {format(day, "d")}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day) => {
          const daySchedules = getSchedulesForDay(day)
          return (
            <div key={day.toString()} className="min-h-[400px] border rounded-md p-1 text-sm overflow-auto">
              {daySchedules.length > 0 ? (
                <div className="space-y-2">
                  {daySchedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className={cn(
                        "p-2 rounded cursor-pointer",
                        schedule.status === "active" && "bg-green-100 dark:bg-green-900",
                        schedule.status === "cancelled" && "bg-red-100 dark:bg-red-900",
                        schedule.status === "delayed" && "bg-yellow-100 dark:bg-yellow-900",
                        schedule.status === "completed" && "bg-blue-100 dark:bg-blue-900",
                        selectedSchedule?.id === schedule.id && "ring-2 ring-primary",
                      )}
                      onClick={() => handleScheduleSelect(schedule)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{format(new Date(schedule.departureTime), "HH:mm")}</span>
                        <StatusBadge status={schedule.status} />
                      </div>
                      <div className="font-medium truncate">{schedule.routeName}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Bus className="h-3 w-3" />
                        <span>{schedule.busId}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{schedule.driverName}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>No schedules</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )

  // Render day view
  const renderDayView = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDate((prev) => new Date(prev.setDate(prev.getDate() - 1)))}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous Day
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleToday}>
            Today
          </Button>
          <h2 className="text-xl font-semibold">{format(date, "EEEE, MMMM d, yyyy")}</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDate((prev) => new Date(prev.setDate(prev.getDate() + 1)))}
        >
          Next Day
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="border rounded-md p-4">
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-2">
            {Array.from({ length: 24 }).map((_, hour) => (
              <div key={hour} className="col-span-1 text-center text-sm font-medium">
                {hour}:00
              </div>
            ))}
          </div>

          <div className="relative min-h-[600px] border-t border-l">
            {/* Time indicators */}
            {Array.from({ length: 24 }).map((_, hour) => (
              <div
                key={hour}
                className="absolute border-t border-muted-foreground/20 w-full"
                style={{ top: `${(hour / 24) * 100}%` }}
              >
                <span className="absolute -top-2.5 -left-16 text-xs text-muted-foreground">{hour}:00</span>
              </div>
            ))}

            {/* Schedules */}
            {getSchedulesForDay(date).map((schedule) => {
              const departureTime = new Date(schedule.departureTime)
              const arrivalTime = new Date(schedule.arrivalTime)

              const startHour = departureTime.getHours() + departureTime.getMinutes() / 60
              const endHour = arrivalTime.getHours() + arrivalTime.getMinutes() / 60

              const top = (startHour / 24) * 100
              const height = ((endHour - startHour) / 24) * 100

              return (
                <div
                  key={schedule.id}
                  className={cn(
                    "absolute left-0 right-0 mx-4 p-2 rounded-md cursor-pointer",
                    schedule.status === "active" && "bg-green-100 dark:bg-green-900",
                    schedule.status === "cancelled" && "bg-red-100 dark:bg-red-900",
                    schedule.status === "delayed" && "bg-yellow-100 dark:bg-yellow-900",
                    schedule.status === "completed" && "bg-blue-100 dark:bg-blue-900",
                    selectedSchedule?.id === schedule.id && "ring-2 ring-primary",
                  )}
                  style={{ top: `${top}%`, height: `${height}%` }}
                  onClick={() => handleScheduleSelect(schedule)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{format(departureTime, "HH:mm")}</span>
                    <StatusBadge status={schedule.status} />
                  </div>
                  <div className="font-medium truncate">{schedule.routeName}</div>
                  <div className="flex items-center gap-1 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>
                      {format(departureTime, "HH:mm")} - {format(arrivalTime, "HH:mm")}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

  // Render list view
  const renderListView = () => (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search schedules..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={routeFilter} onValueChange={setRouteFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Route" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Routes</SelectItem>
              {mockRoutes.map((route) => (
                <SelectItem key={route.id} value={route.id}>
                  {route.name}
                </SelectItem>
              ))}
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
              <TableHead className="w-[180px]">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => {
                    setSortBy("routeName")
                    setSortOrder(sortBy === "routeName" && sortOrder === "asc" ? "desc" : "asc")
                  }}
                >
                  Route
                  {sortBy === "routeName" && (
                    <ArrowUp className={cn("h-4 w-4", sortOrder === "desc" && "rotate-180")} />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => {
                    setSortBy("departureTime")
                    setSortOrder(sortBy === "departureTime" && sortOrder === "asc" ? "desc" : "asc")
                  }}
                >
                  Departure
                  {sortBy === "departureTime" && (
                    <ArrowUp className={cn("h-4 w-4", sortOrder === "desc" && "rotate-180")} />
                  )}
                </div>
              </TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Bus</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Occupancy</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSchedules.length > 0 ? (
              filteredSchedules.map((schedule) => (
                <TableRow
                  key={schedule.id}
                  className={cn(selectedSchedule?.id === schedule.id && "bg-muted")}
                  onClick={() => handleScheduleSelect(schedule)}
                >
                  <TableCell className="font-medium">{schedule.routeName}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{format(new Date(schedule.departureTime), "MMM d, yyyy")}</span>
                      <span className="text-muted-foreground">{format(new Date(schedule.departureTime), "HH:mm")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{format(new Date(schedule.arrivalTime), "MMM d, yyyy")}</span>
                      <span className="text-muted-foreground">{format(new Date(schedule.arrivalTime), "HH:mm")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{schedule.busId}</span>
                      <span className="text-xs text-muted-foreground">{schedule.busType}</span>
                    </div>
                  </TableCell>
                  <TableCell>{schedule.driverName}</TableCell>
                  <TableCell>
                    <StatusBadge status={schedule.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className={cn(
                            "h-2.5 rounded-full",
                            schedule.occupancy > 80
                              ? "bg-green-600"
                              : schedule.occupancy > 50
                                ? "bg-yellow-400"
                                : "bg-red-500",
                          )}
                          style={{ width: `${schedule.occupancy}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{schedule.occupancy}%</span>
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
                        <DropdownMenuItem asChild>
                          <Link href={`/agency/schedule/${schedule.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/agency/schedule/${schedule.id}/edit`}>Edit Schedule</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedSchedule(schedule)
                            setIsDeleteDialogOpen(true)
                          }}
                          className="text-red-600"
                        >
                          Delete Schedule
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No schedules found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Schedule Management</h2>
          <p className="text-muted-foreground">Manage your bus schedules and timetables</p>
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
            <Link href="/agency/schedule/create">
              <Plus className="mr-2 h-4 w-4" />
              Add Schedule
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="calendar" value={view} onValueChange={setView} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          {view === "calendar" && (
            <div className="flex items-center gap-2">
              <Select value={calendarView} onValueChange={setCalendarView}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              {calendarView === "month" && renderMonthView()}
              {calendarView === "week" && renderWeekView()}
              {calendarView === "day" && renderDayView()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-6">{renderListView()}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedSchedule && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Schedule Details</CardTitle>
                <CardDescription>Viewing details for selected schedule</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedSchedule(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{selectedSchedule.routeName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge status={selectedSchedule.status} />
                    <p className="text-sm text-muted-foreground">ID: {selectedSchedule.id.split("-")[0]}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Departure</p>
                      <p className="text-sm text-muted-foreground">{selectedSchedule.departureLocation}</p>
                      <p className="text-sm">{format(new Date(selectedSchedule.departureTime), "MMMM d, yyyy")}</p>
                      <p className="text-sm font-medium">{format(new Date(selectedSchedule.departureTime), "HH:mm")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Arrival</p>
                      <p className="text-sm text-muted-foreground">{selectedSchedule.arrivalLocation}</p>
                      <p className="text-sm">{format(new Date(selectedSchedule.arrivalTime), "MMMM d, yyyy")}</p>
                      <p className="text-sm font-medium">{format(new Date(selectedSchedule.arrivalTime), "HH:mm")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Bus className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Bus</p>
                    <p className="text-sm">{selectedSchedule.busId}</p>
                    <p className="text-sm text-muted-foreground">{selectedSchedule.busType}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Driver</p>
                    <p className="text-sm">{selectedSchedule.driverName}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium">Price</p>
                  <p className="text-sm">{selectedSchedule.price}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-medium">Recurrence</p>
                  <p className="text-sm capitalize">{selectedSchedule.recurring}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedSchedule.days.map((day: string) => (
                      <Badge key={day} variant="outline" className="capitalize">
                        {day.slice(0, 3)}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium">Occupancy</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-1">
                    <div
                      className={cn(
                        "h-2.5 rounded-full",
                        selectedSchedule.occupancy > 80
                          ? "bg-green-600"
                          : selectedSchedule.occupancy > 50
                            ? "bg-yellow-400"
                            : "bg-red-500",
                      )}
                      style={{ width: `${selectedSchedule.occupancy}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right mt-1">{selectedSchedule.occupancy}%</p>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Created: {format(parseISO(selectedSchedule.createdAt), "MMMM d, yyyy HH:mm")}</p>
                  <p>Last Updated: {format(parseISO(selectedSchedule.updatedAt), "MMMM d, yyyy HH:mm")}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <Link href={`/agency/schedule/${selectedSchedule.id.split("-")[0]}`}>View Full Details</Link>
            </Button>
            <Button asChild>
              <Link href={`/agency/schedule/${selectedSchedule.id.split("-")[0]}/edit`}>Edit Schedule</Link>
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
              This will permanently delete this schedule. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSchedule} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Schedules</DialogTitle>
            <DialogDescription>Export your schedules to a JSON file that can be imported later.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <p>
                {filteredSchedules.length} {filteredSchedules.length === 1 ? "schedule" : "schedules"} will be exported
              </p>
            </div>
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                The exported file will contain all schedules matching your current filters. You can import this file
                later to restore these schedules.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export Schedules
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Schedules</DialogTitle>
            <DialogDescription>Import schedules from a previously exported JSON file.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                Select a JSON file containing schedules to import. The system will check for conflicts with existing
                schedules before importing.
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

      {/* Conflict Dialog */}
      <Dialog open={isConflictDialogOpen} onOpenChange={setIsConflictDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Conflicts Detected</DialogTitle>
            <DialogDescription>The following schedules have conflicts with existing schedules.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="max-h-[300px] overflow-y-auto">
              {conflictingSchedules.map((schedule) => (
                <div key={schedule.id} className="border-b py-2">
                  <p className="font-medium">{schedule.routeName}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(schedule.departureTime), "MMM d, yyyy HH:mm")} -{" "}
                    {format(new Date(schedule.arrivalTime), "MMM d, yyyy HH:mm")}
                  </p>
                  <p className="text-sm text-red-500">
                    Conflict: Same {schedule.busId === selectedSchedule?.busId ? "bus" : "driver"} is already scheduled
                  </p>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConflictDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
