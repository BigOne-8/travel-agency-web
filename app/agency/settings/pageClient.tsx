"use client"

import type React from "react"

import { useState } from "react"
import {
  User,
  Building,
  Bell,
  Shield,
  CreditCard,
  Users,
  HelpCircle,
  Moon,
  Sun,
  Laptop,
  Check,
  Upload,
  Save,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function SettingsClient() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("profile")

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "John Doe",
    email: "john.doe@expresslines.com",
    phone: "+1 (555) 123-4567",
    role: "Branch Manager",
    bio: "Experienced branch manager with over 10 years in the transportation industry.",
  })

  // Agency form state
  const [agencyForm, setAgencyForm] = useState({
    name: "Express Lines",
    email: "info@expresslines.com",
    phone: "+1 (555) 987-6543",
    address: "123 Main St, New York, NY 10001",
    website: "www.expresslines.com",
    taxId: "12-3456789",
    businessType: "corporation",
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newBookingAlert: true,
    bookingCancellationAlert: true,
    paymentReceivedAlert: true,
    systemUpdates: true,
    marketingEmails: false,
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: "30",
  })

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "pm-1",
      type: "credit_card",
      brand: "Visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2025,
      isDefault: true,
    },
    {
      id: "pm-2",
      type: "credit_card",
      brand: "Mastercard",
      last4: "5555",
      expMonth: 8,
      expYear: 2024,
      isDefault: false,
    },
  ])

  // Team members
  const [teamMembers, setTeamMembers] = useState([
    {
      id: "user-1",
      name: "John Doe",
      email: "john.doe@expresslines.com",
      role: "Admin",
      avatar: "/placeholder.svg?height=40&width=40&text=JD",
    },
    {
      id: "user-2",
      name: "Alice Smith",
      email: "alice.smith@expresslines.com",
      role: "Accountant",
      avatar: "/placeholder.svg?height=40&width=40&text=AS",
    },
    {
      id: "user-3",
      name: "Bob Johnson",
      email: "bob.johnson@expresslines.com",
      role: "Driver",
      avatar: "/placeholder.svg?height=40&width=40&text=BJ",
    },
    {
      id: "user-4",
      name: "Carol Williams",
      email: "carol.williams@expresslines.com",
      role: "Customer Service",
      avatar: "/placeholder.svg?height=40&width=40&text=CW",
    },
  ])

  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle agency form changes
  const handleAgencyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAgencyForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle notification toggle
  const handleNotificationToggle = (key: string) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  // Handle security toggle
  const handleSecurityToggle = (key: string) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  // Handle payment method default change
  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      })),
    )
  }

  // Handle payment method removal
  const handleRemovePayment = (id: string) => {
    setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id))
  }

  // Get card icon based on brand
  const getCardIcon = (brand: string) => {
    return <CreditCard className="h-4 w-4" />
  }

  return (
    <div className="flex flex-col space-y-8 p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <Tabs
          defaultValue="profile"
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col lg:flex-row lg:space-x-12 space-y-8 lg:space-y-0 w-full"
        >
          <aside className="lg:w-1/5">
            <TabsList className="flex flex-col items-start justify-start h-full space-y-1">
              <TabsTrigger value="profile" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="agency" className="w-full justify-start">
                <Building className="mr-2 h-4 w-4" />
                Agency
              </TabsTrigger>
              <TabsTrigger value="notifications" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="billing" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="team" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Team
              </TabsTrigger>
              <TabsTrigger value="appearance" className="w-full justify-start">
                {theme === "dark" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                Appearance
              </TabsTrigger>
              <TabsTrigger value="help" className="w-full justify-start">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </TabsTrigger>
            </TabsList>
          </aside>

          <div className="flex-1 lg:max-w-2xl">
            <TabsContent value="profile" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">This is how others will see you on the platform.</p>
              </div>
              <Separator />
              <div className="space-y-8">
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96&text=JD" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Change
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={profileForm.name} onChange={handleProfileChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" value={profileForm.phone} onChange={handleProfileChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" name="role" value={profileForm.role} onChange={handleProfileChange} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" name="bio" rows={4} value={profileForm.bio} onChange={handleProfileChange} />
                    </div>
                  </div>
                </div>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="agency" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Agency Information</h3>
                <p className="text-sm text-muted-foreground">Update your agency details and business information.</p>
              </div>
              <Separator />
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="agency-name">Agency Name</Label>
                    <Input id="agency-name" name="name" value={agencyForm.name} onChange={handleAgencyChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agency-email">Business Email</Label>
                    <Input
                      id="agency-email"
                      name="email"
                      type="email"
                      value={agencyForm.email}
                      onChange={handleAgencyChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agency-phone">Business Phone</Label>
                    <Input id="agency-phone" name="phone" value={agencyForm.phone} onChange={handleAgencyChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agency-website">Website</Label>
                    <Input
                      id="agency-website"
                      name="website"
                      value={agencyForm.website}
                      onChange={handleAgencyChange}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="agency-address">Business Address</Label>
                    <Textarea
                      id="agency-address"
                      name="address"
                      value={agencyForm.address}
                      onChange={handleAgencyChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agency-tax-id">Tax ID / EIN</Label>
                    <Input id="agency-tax-id" name="taxId" value={agencyForm.taxId} onChange={handleAgencyChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agency-business-type">Business Type</Label>
                    <Select
                      value={agencyForm.businessType}
                      onValueChange={(value) => setAgencyForm((prev) => ({ ...prev, businessType: value }))}
                    >
                      <SelectTrigger id="agency-business-type">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="nonprofit">Non-profit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">Configure how you receive notifications and alerts.</p>
              </div>
              <Separator />
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium">Notification Channels</h4>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={() => handleNotificationToggle("pushNotifications")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={() => handleNotificationToggle("smsNotifications")}
                      />
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium">Notification Types</h4>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="new-booking-alert">New Booking Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified when a new booking is made</p>
                      </div>
                      <Switch
                        id="new-booking-alert"
                        checked={notificationSettings.newBookingAlert}
                        onCheckedChange={() => handleNotificationToggle("newBookingAlert")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="booking-cancellation-alert">Booking Cancellation Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified when a booking is cancelled</p>
                      </div>
                      <Switch
                        id="booking-cancellation-alert"
                        checked={notificationSettings.bookingCancellationAlert}
                        onCheckedChange={() => handleNotificationToggle("bookingCancellationAlert")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="payment-received-alert">Payment Received Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified when a payment is received</p>
                      </div>
                      <Switch
                        id="payment-received-alert"
                        checked={notificationSettings.paymentReceivedAlert}
                        onCheckedChange={() => handleNotificationToggle("paymentReceivedAlert")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="system-updates">System Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about system updates and maintenance
                        </p>
                      </div>
                      <Switch
                        id="system-updates"
                        checked={notificationSettings.systemUpdates}
                        onCheckedChange={() => handleNotificationToggle("systemUpdates")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketing-emails">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                      </div>
                      <Switch
                        id="marketing-emails"
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                      />
                    </div>
                  </div>
                </div>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Security Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your account security and authentication methods.
                </p>
              </div>
              <Separator />
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium">Password</h4>
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch
                        id="two-factor-auth"
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={() => handleSecurityToggle("twoFactorAuth")}
                      />
                    </div>
                    {securitySettings.twoFactorAuth && (
                      <div className="rounded-md border p-4">
                        <p className="text-sm">
                          Two-factor authentication is enabled. You will be asked to enter a code from your
                          authenticator app when you sign in.
                        </p>
                        <Button variant="outline" className="mt-4">
                          Configure 2FA
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium">Login Notifications</h4>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="login-notifications">Login Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when someone logs into your account
                        </p>
                      </div>
                      <Switch
                        id="login-notifications"
                        checked={securitySettings.loginNotifications}
                        onCheckedChange={() => handleSecurityToggle("loginNotifications")}
                      />
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium">Session Management</h4>
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Select
                        value={securitySettings.sessionTimeout}
                        onValueChange={(value) => setSecuritySettings((prev) => ({ ...prev, sessionTimeout: value }))}
                      >
                        <SelectTrigger id="session-timeout">
                          <SelectValue placeholder="Select timeout duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="240">4 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button>Sign Out All Other Sessions</Button>
                  </div>
                </div>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Security Settings
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Billing & Payments</h3>
                <p className="text-sm text-muted-foreground">Manage your payment methods and billing information.</p>
              </div>
              <Separator />
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium">Payment Methods</h4>
                  <div className="mt-4 space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center space-x-4">
                          {getCardIcon(method.brand)}
                          <div>
                            <p className="text-sm font-medium">
                              {method.brand} •••• {method.last4}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Expires {method.expMonth}/{method.expYear}
                            </p>
                          </div>
                          {method.isDefault && (
                            <Badge variant="outline" className="ml-2">
                              Default
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {!method.isDefault && (
                            <Button variant="ghost" size="sm" onClick={() => handleSetDefaultPayment(method.id)}>
                              Set as Default
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => handleRemovePayment(method.id)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline">Add Payment Method</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium">Billing Information</h4>
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="billing-name">Name on Card</Label>
                        <Input id="billing-name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-email">Billing Email</Label>
                        <Input id="billing-email" type="email" defaultValue="billing@expresslines.com" />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="billing-address">Billing Address</Label>
                        <Textarea id="billing-address" defaultValue="123 Main St, New York, NY 10001" />
                      </div>
                    </div>
                    <Button>Update Billing Information</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium">Subscription</h4>
                  <div className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Business Plan</CardTitle>
                        <CardDescription>$99/month, billed monthly</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">Your subscription renews on May 15, 2023</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">Change Plan</Button>
                        <Button variant="destructive">Cancel Subscription</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Team Management</h3>
                <p className="text-sm text-muted-foreground">Manage your team members and their access permissions.</p>
              </div>
              <Separator />
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Team Members</h4>
                  <Button size="sm">Invite Member</Button>
                </div>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                        <Badge variant="outline">{member.role}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        {member.id !== "user-1" && (
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium">Roles & Permissions</h4>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Admin</p>
                          <p className="text-xs text-muted-foreground">Full access to all settings and features</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit Permissions
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Accountant</p>
                          <p className="text-xs text-muted-foreground">Access to financial reports and billing</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit Permissions
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Driver</p>
                          <p className="text-xs text-muted-foreground">Access to schedules and trip information</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit Permissions
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Customer Service</p>
                          <p className="text-xs text-muted-foreground">Access to bookings and customer information</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit Permissions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Appearance</h3>
                <p className="text-sm text-muted-foreground">Customize the appearance of the application.</p>
              </div>
              <Separator />
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium">Theme</h4>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div
                      className={cn(
                        "flex cursor-pointer flex-col items-center justify-between rounded-md border-2 p-4",
                        theme === "light" ? "border-primary" : "border-muted",
                      )}
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-6 w-6" />
                      <div className="mt-2 text-center">
                        <p className="text-sm font-medium">Light</p>
                      </div>
                      {theme === "light" && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <div
                      className={cn(
                        "flex cursor-pointer flex-col items-center justify-between rounded-md border-2 p-4",
                        theme === "dark" ? "border-primary" : "border-muted",
                      )}
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-6 w-6" />
                      <div className="mt-2 text-center">
                        <p className="text-sm font-medium">Dark</p>
                      </div>
                      {theme === "dark" && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <div
                      className={cn(
                        "flex cursor-pointer flex-col items-center justify-between rounded-md border-2 p-4",
                        theme === "system" ? "border-primary" : "border-muted",
                      )}
                      onClick={() => setTheme("system")}
                    >
                      <Laptop className="h-6 w-6" />
                      <div className="mt-2 text-center">
                        <p className="text-sm font-medium">System</p>
                      </div>
                      {theme === "system" && <Check className="h-4 w-4 text-primary" />}
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium">Display Density</h4>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="density-comfortable" name="density" defaultChecked />
                      <Label htmlFor="density-comfortable">Comfortable</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="density-compact" name="density" />
                      <Label htmlFor="density-compact">Compact</Label>
                    </div>
                  </div>
                </div>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="help" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Help & Support</h3>
                <p className="text-sm text-muted-foreground">Get help with using the platform and contact support.</p>
              </div>
              <Separator />
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium">Documentation</h4>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>User Guide</CardTitle>
                        <CardDescription>Learn how to use the platform</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View Guide
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>API Documentation</CardTitle>
                        <CardDescription>Technical documentation for developers</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View Docs
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>FAQs</CardTitle>
                        <CardDescription>Frequently asked questions</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View FAQs
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Video Tutorials</CardTitle>
                        <CardDescription>Learn through video guides</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Watch Videos
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium">Contact Support</h4>
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="support-name">Name</Label>
                        <Input id="support-name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="support-email">Email</Label>
                        <Input id="support-email" type="email" defaultValue="john.doe@expresslines.com" />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="support-subject">Subject</Label>
                        <Input id="support-subject" />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="support-message">Message</Label>
                        <Textarea id="support-message" rows={4} />
                      </div>
                    </div>
                    <Button>Send Message</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
