"use client"

import { useState } from "react"
import {
  BarChart3,
  DollarSign,
  Download,
  LineChart,
  MapPin,
  PieChart,
  TicketIcon,
  TrendingUp,
  Users,
  Bus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data for analytics
const overviewStats = [
  {
    title: "Total Revenue",
    value: "$24,389.50",
    change: "+12.5%",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Total Bookings",
    value: "1,284",
    change: "+8.2%",
    icon: TicketIcon,
    trend: "up",
  },
  {
    title: "Active Routes",
    value: "32",
    change: "+3.1%",
    icon: MapPin,
    trend: "up",
  },
  {
    title: "Total Passengers",
    value: "3,942",
    change: "+15.3%",
    icon: Users,
    trend: "up",
  },
]

const popularRoutes = [
  {
    route: "New York to Boston",
    bookings: 245,
    revenue: 12350.75,
    occupancyRate: 92,
  },
  {
    route: "Los Angeles to San Francisco",
    bookings: 198,
    revenue: 9950.25,
    occupancyRate: 87,
  },
  {
    route: "Chicago to Detroit",
    bookings: 156,
    revenue: 7800.5,
    occupancyRate: 83,
  },
  {
    route: "Miami to Orlando",
    bookings: 142,
    revenue: 7100.0,
    occupancyRate: 79,
  },
  {
    route: "Seattle to Portland",
    bookings: 128,
    revenue: 6400.0,
    occupancyRate: 76,
  },
]

const busPerformance = [
  {
    busId: "BUS-001",
    model: "Volvo 9700",
    trips: 42,
    revenue: 8450.25,
    maintenanceCost: 1200.0,
    status: "active",
  },
  {
    busId: "BUS-002",
    model: "Mercedes-Benz Tourismo",
    trips: 38,
    revenue: 7600.5,
    maintenanceCost: 950.0,
    status: "active",
  },
  {
    busId: "BUS-003",
    model: "MAN Lion's Coach",
    trips: 35,
    revenue: 7000.0,
    maintenanceCost: 1100.0,
    status: "maintenance",
  },
  {
    busId: "BUS-004",
    model: "Scania Touring",
    trips: 32,
    revenue: 6400.0,
    maintenanceCost: 850.0,
    status: "active",
  },
  {
    busId: "BUS-005",
    model: "Neoplan Cityliner",
    trips: 30,
    revenue: 6000.0,
    maintenanceCost: 1050.0,
    status: "inactive",
  },
]

const monthlyRevenue = [
  { month: "Jan", revenue: 15420.5 },
  { month: "Feb", revenue: 16850.75 },
  { month: "Mar", revenue: 18200.25 },
  { month: "Apr", revenue: 17650.0 },
  { month: "May", revenue: 19300.5 },
  { month: "Jun", revenue: 21450.75 },
  { month: "Jul", revenue: 23100.25 },
  { month: "Aug", revenue: 24389.5 },
  { month: "Sep", revenue: 0 },
  { month: "Oct", revenue: 0 },
  { month: "Nov", revenue: 0 },
  { month: "Dec", revenue: 0 },
]

export default function AnalyticsClient() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive analytics and insights for your bus operations.</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 90 days</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">vs. previous period</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="fleet">Fleet</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {overviewStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p
                      className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"} flex items-center`}
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change} from last period
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue for the current year</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="h-16 w-16 mx-auto mb-2" />
                    <p>Revenue chart visualization would appear here</p>
                    <p className="text-sm">Total Revenue: $156,362.50</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Booking Distribution</CardTitle>
                  <CardDescription>Bookings by route category</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <PieChart className="h-16 w-16 mx-auto mb-2" />
                    <p>Booking distribution chart would appear here</p>
                    <p className="text-sm">Total Bookings: 1,284</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Routes</CardTitle>
                <CardDescription>Routes with the highest bookings and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route</TableHead>
                      <TableHead className="text-right">Bookings</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Occupancy Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {popularRoutes.map((route, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{route.route}</TableCell>
                        <TableCell className="text-right">{route.bookings}</TableCell>
                        <TableCell className="text-right">${route.revenue.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{route.occupancyRate}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-16 w-16 mx-auto mb-2" />
                    <p>Monthly revenue chart would appear here</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Revenue by Payment Method</CardTitle>
                  <CardDescription>Distribution across payment types</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <PieChart className="h-16 w-16 mx-auto mb-2" />
                    <p>Payment method distribution chart would appear here</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue breakdown by month</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Bookings</TableHead>
                      <TableHead className="text-right">Avg. Ticket Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyRevenue.slice(0, 8).map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.month}</TableCell>
                        <TableCell className="text-right">${item.revenue.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{Math.round(item.revenue / 20)}</TableCell>
                        <TableCell className="text-right">
                          ${(item.revenue / Math.round(item.revenue / 20)).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <TicketIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,284</div>
                  <p className="text-xs text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8.2% from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Booking Conversion Rate</CardTitle>
                  <TicketIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68.5%</div>
                  <p className="text-xs text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2.3% from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Booking Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$19.00</div>
                  <p className="text-xs text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +4.1% from last period
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Booking Trends</CardTitle>
                  <CardDescription>Daily booking patterns</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <LineChart className="h-16 w-16 mx-auto mb-2" />
                    <p>Booking trends chart would appear here</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Booking Status</CardTitle>
                  <CardDescription>Distribution by booking status</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <PieChart className="h-16 w-16 mx-auto mb-2" />
                    <p>Booking status distribution chart would appear here</p>
                    <div className="flex justify-center gap-4 mt-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Confirmed (78%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-sm">Pending (15%)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-sm">Cancelled (7%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="routes" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32</div>
                  <p className="text-xs text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +3.1% from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Route Occupancy</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">83.4%</div>
                  <p className="text-xs text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5.2% from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Route Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$762.17</div>
                  <p className="text-xs text-green-500 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +9.3% from last period
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Route Performance</CardTitle>
                <CardDescription>Detailed metrics for all routes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route</TableHead>
                      <TableHead className="text-right">Bookings</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Occupancy Rate</TableHead>
                      <TableHead className="text-right">Avg. Ticket Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {popularRoutes.map((route, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{route.route}</TableCell>
                        <TableCell className="text-right">{route.bookings}</TableCell>
                        <TableCell className="text-right">${route.revenue.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{route.occupancyRate}%</TableCell>
                        <TableCell className="text-right">${(route.revenue / route.bookings).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fleet" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Buses</CardTitle>
                  <Bus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Buses</CardTitle>
                  <Bus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">21</div>
                  <div className="text-xs text-muted-foreground">87.5% of fleet</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
                  <Bus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-xs text-muted-foreground">8.3% of fleet</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Inactive</CardTitle>
                  <Bus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1</div>
                  <div className="text-xs text-muted-foreground">4.2% of fleet</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Bus Performance</CardTitle>
                <CardDescription>Performance metrics for each bus in the fleet</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bus ID</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead className="text-right">Trips</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Maintenance Cost</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {busPerformance.map((bus, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{bus.busId}</TableCell>
                        <TableCell>{bus.model}</TableCell>
                        <TableCell className="text-right">{bus.trips}</TableCell>
                        <TableCell className="text-right">${bus.revenue.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${bus.maintenanceCost.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              bus.status === "active"
                                ? "bg-green-500"
                                : bus.status === "maintenance"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }
                          >
                            {bus.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
