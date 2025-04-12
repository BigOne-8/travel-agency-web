"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Calendar,
  Download,
  Edit,
  FileText,
  LineChart,
  Loader2,
  PieChart,
  RefreshCw,
  Settings,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { generateReport, getApiKey, hasApiKey, saveApiKey, generatePDF } from "@/lib/openrouter"
import dynamic from "next/dynamic"

// Dynamically import the MarkdownRenderer with no SSR
const DynamicMarkdownRenderer = dynamic(
  () => import("@/components/markdown-renderer").then((mod) => mod.MarkdownRenderer),
  {
    ssr: false,
    loading: () => (
      <div className="p-4 border rounded-md">
        <p className="text-muted-foreground">Loading markdown preview...</p>
      </div>
    ),
  },
)

// Mock data for charts and reports
const revenueData = [
  { month: "Jan", revenue: 15420.5 },
  { month: "Feb", revenue: 16850.75 },
  { month: "Mar", revenue: 18200.25 },
  { month: "Apr", revenue: 17650.0 },
  { month: "May", revenue: 19300.5 },
  { month: "Jun", revenue: 21450.75 },
  { month: "Jul", revenue: 23100.25 },
  { month: "Aug", revenue: 24389.5 },
]

const routePopularityData = [
  { route: "New York to Boston", bookings: 245 },
  { route: "Los Angeles to San Francisco", bookings: 198 },
  { route: "Chicago to Detroit", bookings: 156 },
  { route: "Miami to Orlando", bookings: 142 },
  { route: "Seattle to Portland", bookings: 128 },
]

const busUtilizationData = [
  { busId: "BUS-001", utilization: 92 },
  { busId: "BUS-002", utilization: 87 },
  { busId: "BUS-003", utilization: 78 },
  { busId: "BUS-004", utilization: 85 },
  { busId: "BUS-005", utilization: 76 },
]

const mockBusinessData = {
  revenue: {
    total: 156362.5,
    monthly: revenueData,
    growth: "+12.5%",
  },
  bookings: {
    total: 1284,
    growth: "+8.2%",
    conversionRate: "68.5%",
  },
  routes: {
    total: 32,
    popular: routePopularityData,
    averageOccupancy: "83.4%",
  },
  fleet: {
    total: 24,
    active: 21,
    maintenance: 2,
    inactive: 1,
    utilization: busUtilizationData,
  },
  customers: {
    total: 3942,
    new: 342,
    returning: 3600,
    satisfaction: "4.7/5",
  },
}

export default function ReportsClient() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedReport, setGeneratedReport] = useState("")
  const [editedReport, setEditedReport] = useState("")
  const [reportType, setReportType] = useState<"daily" | "weekly" | "monthly">("daily")
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPdfGenerating, setIsPdfGenerating] = useState(false)

  const reportPreviewRef = useRef<HTMLDivElement>(null)

  // Check if API key exists on component mount
  useEffect(() => {
    const key = getApiKey()
    if (key) {
      setApiKey(key)
    } else {
      setApiKeyDialogOpen(true)
    }
  }, [])

  // Handle API key submission
  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      saveApiKey(apiKey.trim())
      setApiKeyDialogOpen(false)
    }
  }

  // Generate report based on type
  const handleGenerateReport = async () => {
    setError(null)
    setIsGenerating(true)
    try {
      const key = getApiKey()
      if (!key) {
        setApiKeyDialogOpen(true)
        setIsGenerating(false)
        return
      }

      const additionalPrompt = `Please analyze the ${reportType} data and provide insights on revenue trends, popular routes, and fleet utilization. Include recommendations for improving business performance.`

      const report = await generateReport(additionalPrompt, key, reportType, mockBusinessData)
      setGeneratedReport(report)
      setEditedReport(report)
      setIsGenerating(false)

      // Automatically open the preview dialog after generation
      setShowPreviewDialog(true)
    } catch (err) {
      console.error("Error generating report:", err)
      setError(err instanceof Error ? err.message : "Failed to generate report")
      setIsGenerating(false)
    }
  }

  // Handle report download as markdown
  const handleDownloadMarkdown = () => {
    const reportText = editedReport || generatedReport
    if (!reportText) return

    const blob = new Blob([reportText], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${reportType}_report_${new Date().toISOString().split("T")[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Handle report download as PDF
  const handleDownloadPDF = async () => {
    try {
      setIsPdfGenerating(true)
      await generatePDF(
        editedReport || generatedReport,
        `${reportType}_report_${new Date().toISOString().split("T")[0]}`,
      )
      setIsPdfGenerating(false)
    } catch (error) {
      console.error("Error generating PDF:", error)
      setError("Failed to generate PDF. Please try again.")
      setIsPdfGenerating(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">AI-Powered Reports</h1>
          <p className="text-muted-foreground">
            Generate comprehensive reports with insights and recommendations for your business.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant={reportType === "daily" ? "default" : "outline"}
              onClick={() => setReportType("daily")}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Daily Report
            </Button>
            <Button
              variant={reportType === "weekly" ? "default" : "outline"}
              onClick={() => setReportType("weekly")}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Weekly Report
            </Button>
            <Button
              variant={reportType === "monthly" ? "default" : "outline"}
              onClick={() => setReportType("monthly")}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Monthly Report
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleGenerateReport}
              disabled={isGenerating || !hasApiKey()}
              className="flex items-center gap-2"
            >
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Generate Report
            </Button>
            {generatedReport && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowPreviewDialog(true)}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Preview
                </Button>
              </>
            )}
            <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>OpenRouter API Key</DialogTitle>
                  <DialogDescription>
                    Enter your OpenRouter API key to use the AI-powered report generation feature.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input
                      id="api-key"
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your OpenRouter API key"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleApiKeySubmit}>Save API Key</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="fleet">Fleet</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${mockBusinessData.revenue.total.toLocaleString()}</div>
                  <p className="text-xs text-green-500">{mockBusinessData.revenue.growth} from last period</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockBusinessData.bookings.total.toLocaleString()}</div>
                  <p className="text-xs text-green-500">{mockBusinessData.bookings.growth} from last period</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockBusinessData.customers.satisfaction}</div>
                  <p className="text-xs text-green-500">+0.2 from last period</p>
                </CardContent>
              </Card>
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
                    <p className="text-sm">Total Revenue: ${mockBusinessData.revenue.total.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Route Popularity</CardTitle>
                  <CardDescription>Top routes by booking volume</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <PieChart className="h-16 w-16 mx-auto mb-2" />
                    <p>Route popularity chart would appear here</p>
                    <div className="mt-4 space-y-2">
                      {routePopularityData.slice(0, 3).map((route, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{route.route}</span>
                          <span className="font-medium">{route.bookings} bookings</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Detailed breakdown of revenue sources and trends</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16 mx-auto mb-2" />
                  <p>Revenue analysis chart would appear here</p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Total Revenue</div>
                      <div className="text-xl font-bold">${mockBusinessData.revenue.total.toLocaleString()}</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Growth</div>
                      <div className="text-xl font-bold text-green-500">{mockBusinessData.revenue.growth}</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Avg. Ticket Price</div>
                      <div className="text-xl font-bold">$19.00</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Revenue per Route</div>
                      <div className="text-xl font-bold">$762.17</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Route Performance</CardTitle>
                <CardDescription>Analysis of route popularity and profitability</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <PieChart className="h-16 w-16 mx-auto mb-2" />
                  <p>Route performance chart would appear here</p>
                  <div className="mt-4 space-y-3">
                    {routePopularityData.map((route, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-full max-w-md">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{route.route}</span>
                            <span className="text-sm font-medium">{route.bookings} bookings</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${(route.bookings / 245) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fleet" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Utilization</CardTitle>
                <CardDescription>Analysis of bus utilization and performance</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16 mx-auto mb-2" />
                  <p>Fleet utilization chart would appear here</p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Total Buses</div>
                      <div className="text-xl font-bold">{mockBusinessData.fleet.total}</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Active Buses</div>
                      <div className="text-xl font-bold">{mockBusinessData.fleet.active}</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">In Maintenance</div>
                      <div className="text-xl font-bold">{mockBusinessData.fleet.maintenance}</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Inactive</div>
                      <div className="text-xl font-bold">{mockBusinessData.fleet.inactive}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {isGenerating ? (
          <Card>
            <CardHeader>
              <CardTitle>Generating {reportType} Report</CardTitle>
              <CardDescription>Please wait while we analyze your data and generate insights...</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
              <p className="text-center text-muted-foreground">
                Our AI is analyzing your business data and creating a comprehensive report with insights and
                recommendations.
              </p>
            </CardContent>
          </Card>
        ) : null}

        {/* Report Preview Dialog */}
        <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>{reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report Preview</DialogTitle>
              <DialogDescription>Review your AI-generated report before downloading or editing.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <ScrollArea className="h-[60vh] pr-4">
                <div ref={reportPreviewRef} className="bg-white p-8 rounded-lg">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-center mb-2">
                      {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Business Report
                    </h1>
                    <p className="text-center text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
                    <hr className="my-4" />
                  </div>
                  <DynamicMarkdownRenderer content={editedReport} />
                </div>
              </ScrollArea>
            </div>
            <DialogFooter className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditDialog(true)
                  setShowPreviewDialog(false)
                }}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Report
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleDownloadMarkdown} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Markdown
                </Button>
                <Button onClick={handleDownloadPDF} disabled={isPdfGenerating} className="flex items-center gap-2">
                  {isPdfGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                  Download PDF
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Report Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle>Edit Report</DialogTitle>
              <DialogDescription>Make any changes to the generated report before downloading.</DialogDescription>
            </DialogHeader>
            <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-editor">Edit Markdown</Label>
                <Textarea
                  id="report-editor"
                  value={editedReport}
                  onChange={(e) => setEditedReport(e.target.value)}
                  className="h-[60vh] font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="border rounded-md p-4 h-[60vh] overflow-auto">
                  <DynamicMarkdownRenderer content={editedReport} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditedReport(generatedReport)} className="mr-auto">
                Reset
              </Button>
              <Button
                onClick={() => {
                  setShowEditDialog(false)
                  setShowPreviewDialog(true)
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
