"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data for routes, buses, and drivers
const mockRoutes = [
  { id: "1", name: "New York to Boston" },
  { id: "2", name: "Boston to New York" },
  { id: "3", name: "New York to Washington DC" },
  { id: "4", name: "Washington DC to New York" },
  { id: "5", name: "New York to Philadelphia" },
]

const mockBuses = [
  { id: "BUS-001", name: "Mercedes-Benz Tourismo (52 seats)" },
  { id: "BUS-002", name: "Volvo 9700 (48 seats)" },
  { id: "BUS-003", name: "MAN Lion's Coach (50 seats)" },
  { id: "BUS-004", name: "Scania Touring (54 seats)" },
  { id: "BUS-005", name: "Neoplan Cityliner (46 seats)" },
]

const mockDrivers = [
  { id: "DRV-001", name: "John Doe" },
  { id: "DRV-002", name: "Jane Smith" },
  { id: "DRV-003", name: "Robert Johnson" },
  { id: "DRV-004", name: "Sarah Williams" },
  { id: "DRV-005", name: "Michael Brown" },
]

// Days of the week
const daysOfWeek = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
]

// Form schema
const formSchema = z.object({
  routeId: z.string({
    required_error: "Please select a route",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
  departureTime: z.string({
    required_error: "Please enter a departure time",
  }),
  arrivalTime: z.string({
    required_error: "Please enter an arrival time",
  }),
  busId: z.string({
    required_error: "Please select a bus",
  }),
  driverId: z.string({
    required_error: "Please select a driver",
  }),
  price: z.string({
    required_error: "Please enter a price",
  }),
  status: z.string().default("active"),
  recurring: z.boolean().default(false),
  recurrenceType: z.string().optional(),
  days: z.array(z.string()).optional(),
  notes: z.string().optional(),
})

export default function CreateScheduleClient() {
  const router = useRouter()
  const [isRecurring, setIsRecurring] = useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "active",
      recurring: false,
      days: [],
    },
  })

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, you would call an API to create the schedule
    console.log("Form values:", values)

    // Redirect to schedules page
    router.push("/agency/schedule")
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/agency/schedule">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create New Schedule</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Information</CardTitle>
              <CardDescription>Enter the basic information for this schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="routeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Route</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a route" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockRoutes.map((route) => (
                          <SelectItem key={route.id} value={route.id}>
                            {route.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the route for this schedule</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Select the date for this schedule</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="departureTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departure Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="arrivalTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Arrival Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="busId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bus</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a bus" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockBuses.map((bus) => (
                            <SelectItem key={bus.id} value={bus.id}>
                              {bus.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="driverId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a driver" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockDrivers.map((driver) => (
                            <SelectItem key={driver.id} value={driver.id}>
                              {driver.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5">$</span>
                        <Input type="text" className="pl-6" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>Enter the ticket price for this schedule</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="delayed">Delayed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recurrence</CardTitle>
              <CardDescription>Set up recurring schedules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="recurring"
                  checked={isRecurring}
                  onCheckedChange={(checked) => {
                    setIsRecurring(checked)
                    form.setValue("recurring", checked)
                  }}
                />
                <Label htmlFor="recurring">This is a recurring schedule</Label>
              </div>

              {isRecurring && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="recurrenceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recurrence Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select recurrence type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label>Days of Week</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                      {daysOfWeek.map((day) => (
                        <div key={day.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={day.id}
                            onCheckedChange={(checked) => {
                              const currentDays = form.getValues("days") || []
                              if (checked) {
                                form.setValue("days", [...currentDays, day.id])
                              } else {
                                form.setValue(
                                  "days",
                                  currentDays.filter((d) => d !== day.id),
                                )
                              }
                            }}
                          />
                          <Label htmlFor={day.id}>{day.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Add any additional notes or information</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional notes or information about this schedule"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href="/agency/schedule">Cancel</Link>
              </Button>
              <Button type="submit">Create Schedule</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}
