"use client"

import { useState } from "react"
import {
  AlertCircle,
  BarChart3,
  Bus,
  Calendar,
  CreditCard,
  Download,
  FileText,
  Filter,
  MapPin,
  Plus,
  Settings2,
  TrendingUp,
  AlertTriangle,
  Bell,
  Moon,
  Sun,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AgencyLayout } from "@/components/agency/layout"

export default function AgencyDashboardPageClient() {
  const [timeFilter, setTimeFilter] = useState("weekly")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <AgencyLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">Welcome back, Express Lines. Here's your business overview.</p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="ml-2 hidden md:inline">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
              <span className="ml-2 hidden md:inline">Notifications</span>
              <Badge variant="secondary" className="ml-2">
                3
              </Badge>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Quick Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Bus className="mr-2 h-4 w-4" />
                  Add New Bus
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MapPin className="mr-2 h-4 w-4" />
                  Add New Route
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="space-y-2">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Maintenance Required</AlertTitle>
            <AlertDescription>BUS-003 requires immediate maintenance. Schedule service today.</AlertDescription>
          </Alert>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Low Seat Availability</AlertTitle>
            <AlertDescription>NY to Boston route (8:00 AM) is 90% booked for tomorrow.</AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-4">
            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                    +20.1% from last month
                  </div>
                  <Progress value={85} className="mt-2" />
                  <p className="mt-1 text-xs text-muted-foreground">85% of monthly goal</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,350</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                    +10.5% from last month
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <Badge variant="secondary">2,100 Confirmed</Badge>
                    <Badge variant="outline">250 Pending</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Buses</CardTitle>
                  <Bus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12/15</div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-xs">
                      <Badge variant="success" className="mr-2 h-2 w-2 rounded-full p-0" />
                      <span className="flex-1">Active</span>
                      <span>12</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Badge variant="destructive" className="mr-2 h-2 w-2 rounded-full p-0" />
                      <span className="flex-1">Maintenance</span>
                      <span>2</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Badge variant="secondary" className="mr-2 h-2 w-2 rounded-full p-0" />
                      <span className="flex-1">Inactive</span>
                      <span>1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                  <Settings2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78.2%</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                    +5.1% from last month
                  </div>
                  <Progress value={78} className="mt-2" />
                  <div className="mt-1 text-xs text-muted-foreground">Target: 80%</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Revenue Chart */}
              <Card className="col-span-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Revenue Overview</CardTitle>
                      <CardDescription>Compare revenue across different periods</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>By Route</DropdownMenuItem>
                        <DropdownMenuItem>By Bus Type</DropdownMenuItem>
                        <DropdownMenuItem>By Ticket Class</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[240px] w-full bg-muted/20 rounded-md flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted" />
                    <span className="ml-2 text-muted-foreground">Revenue chart visualization</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Bookings */}
              <Card className="col-span-3">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Bookings</CardTitle>
                      <CardDescription>You have 12 new bookings today</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[240px]">
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Booking #{1000 + i}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-muted-foreground">
                                New York to Boston • {i === 1 ? "Just now" : `${i} hour${i > 1 ? "s" : ""} ago`}
                              </p>
                              <Badge variant={i === 1 ? "outline" : "secondary"}>
                                {i === 1 ? "Pending" : "Confirmed"}
                              </Badge>
                            </div>
                          </div>
                          <div className="ml-auto font-medium">+$45.00</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Popular Routes */}
              <Card className="col-span-4">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Popular Routes</CardTitle>
                      <CardDescription>Top performing routes this month</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      Route Analysis
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { route: "New York - Boston", revenue: "$12,234", growth: "+12.3%", occupancy: 92 },
                      { route: "New York - Washington DC", revenue: "$10,340", growth: "+6.1%", occupancy: 85 },
                      { route: "Boston - Philadelphia", revenue: "$8,543", growth: "+4.5%", occupancy: 78 },
                      { route: "Washington DC - Boston", revenue: "$7,890", growth: "+2.2%", occupancy: 72 },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none">{item.route}</p>
                            <span className="text-sm text-green-500">{item.growth}</span>
                          </div>
                          <Progress value={item.occupancy} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Revenue: {item.revenue}</span>
                            <span>Occupancy: {item.occupancy}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Bus Maintenance */}
              <Card className="col-span-3">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Bus Maintenance</CardTitle>
                      <CardDescription>Upcoming maintenance schedule</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[240px]">
                    <div className="space-y-4">
                      {[
                        { id: "BUS-001", status: "Active", maintenance: "In 15 days", health: 92 },
                        { id: "BUS-002", status: "Active", maintenance: "In 8 days", health: 87 },
                        { id: "BUS-003", status: "Maintenance", maintenance: "Today", health: 45 },
                        { id: "BUS-004", status: "Active", maintenance: "In 22 days", health: 78 },
                      ].map((bus) => (
                        <div key={bus.id} className="flex items-center gap-4">
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium leading-none">{bus.id}</p>
                              <Badge
                                variant={
                                  bus.status === "Active"
                                    ? "success"
                                    : bus.status === "Maintenance"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {bus.status}
                              </Badge>
                            </div>
                            <Progress value={bus.health} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Health: {bus.health}%</span>
                              <span>Next Service: {bus.maintenance}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-medium">Analytics Content</h3>
              <p className="text-muted-foreground">Detailed analytics will be displayed here.</p>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-medium">Reports Content</h3>
              <p className="text-muted-foreground">Your reports will be displayed here.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AgencyLayout>
  )
}
