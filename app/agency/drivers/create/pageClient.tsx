"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AgencyLayout } from "@/components/agency/layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

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

export default function CreateDriverClient() {
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([])

  const toggleCertification = (cert: string) => {
    setSelectedCertifications((prev) => {
      if (prev.includes(cert)) {
        return prev.filter((c) => c !== cert)
      } else {
        return [...prev, cert]
      }
    })
  }

  return (
    <AgencyLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center gap-4">
          <Link href="/agency/drivers">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Add New Driver</h2>
        </div>

        <form>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Enter the driver's personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="driver-name">Full Name</Label>
                    <Input id="driver-name" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver-email">Email Address</Label>
                    <Input id="driver-email" type="email" placeholder="Enter email address" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="driver-phone">Phone Number</Label>
                    <Input id="driver-phone" type="tel" placeholder="Enter phone number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver-address">Address</Label>
                    <Input id="driver-address" placeholder="Enter address" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="driver-dob">Date of Birth</Label>
                    <Input id="driver-dob" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver-emergency-contact">Emergency Contact</Label>
                    <Input id="driver-emergency-contact" placeholder="Enter emergency contact" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>License Information</CardTitle>
                <CardDescription>Enter the driver's license details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="driver-license-number">License Number</Label>
                    <Input id="driver-license-number" placeholder="Enter license number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driver-license-expiry">License Expiry Date</Label>
                    <Input id="driver-license-expiry" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="driver-license-class">License Class</Label>
                  <Select>
                    <SelectTrigger id="driver-license-class">
                      <SelectValue placeholder="Select license class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commercial-a">Commercial Class A</SelectItem>
                      <SelectItem value="commercial-b">Commercial Class B</SelectItem>
                      <SelectItem value="commercial-c">Commercial Class C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>Select the driver's certifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {certifications.map((cert) => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Checkbox
                        id={`cert-${cert}`}
                        checked={selectedCertifications.includes(cert)}
                        onCheckedChange={() => toggleCertification(cert)}
                      />
                      <Label htmlFor={`cert-${cert}`}>{cert}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Add any additional notes or information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="driver-notes">Notes</Label>
                  <Textarea
                    id="driver-notes"
                    placeholder="Enter any notes about the driver"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 flex justify-end gap-4">
              <Button variant="outline" asChild>
                <Link href="/agency/drivers">Cancel</Link>
              </Button>
              <Button type="submit">Create Driver</Button>
            </div>
          </div>
        </form>
      </div>
    </AgencyLayout>
  )
}
