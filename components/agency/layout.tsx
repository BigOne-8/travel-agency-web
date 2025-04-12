"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Bus,
  Calendar,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageSquare,
  Settings,
  TicketIcon,
  Users,
  UserCircle,
  MoreHorizontal,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

interface AgencyLayoutProps {
  children: React.ReactNode
}

export function AgencyLayout({ children }: AgencyLayoutProps) {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/agency/dashboard",
      active: pathname === "/agency/dashboard",
    },
    {
      label: "Trips",
      icon: TicketIcon,
      href: "/agency/trips",
      active: pathname === "/agency/trips" || pathname.startsWith("/agency/trips/"),
    },
    {
      label: "Buses",
      icon: Bus,
      href: "/agency/buses",
      active: pathname === "/agency/buses",
    },
    {
      label: "Routes",
      icon: MapPin,
      href: "/agency/routes",
      active: pathname === "/agency/routes",
    },
    {
      label: "Schedule",
      icon: Calendar,
      href: "/agency/schedule",
      active: pathname === "/agency/schedule",
    },
    {
      label: "Drivers",
      icon: Users,
      href: "/agency/drivers",
      active: pathname === "/agency/drivers",
    },
    {
      label: "Bookings",
      icon: CreditCard,
      href: "/agency/bookings",
      active: pathname === "/agency/bookings",
    },
    {
      label: "Reports",
      icon: FileText,
      href: "/agency/reports",
      active: pathname === "/agency/reports",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/agency/analytics",
      active: pathname === "/agency/analytics",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      href: "/agency/messages",
      active: pathname === "/agency/messages",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/agency/settings",
      active: pathname === "/agency/settings",
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        {/* Mobile Navigation */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 lg:hidden">
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </svg>
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M15 5h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
                    <rect width="6" height="10" x="9" y="3" rx="1" />
                  </svg>
                  <span>BusBooking</span>
                </Link>
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center gap-4 px-2 py-1 rounded-lg",
                      route.active ? "text-primary bg-muted" : "text-muted-foreground",
                    )}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M15 5h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
              <rect width="6" height="10" x="9" y="3" rx="1" />
            </svg>
            <span>BusBooking</span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback>EL</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Express Lines</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex flex-1">
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <Link href="/" className="flex items-center gap-2 px-4 py-2">
                <Bus className="h-6 w-6" />
                <span className="font-semibold group-data-[collapsible=icon]:hidden">BusBooking</span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {routes.map((route) => (
                  <SidebarMenuItem key={route.href}>
                    <SidebarMenuButton asChild isActive={route.active} tooltip={route.label}>
                      <Link href={route.href}>
                        <route.icon className="h-4 w-4" />
                        <span>{route.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <div className="p-4">
                <div className="flex items-center gap-2 rounded-lg border p-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40&text=EL" alt="Express Lines" />
                    <AvatarFallback>EL</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-medium">Express Lines</span>
                    <span className="text-xs text-muted-foreground">Agency Admin</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto h-8 w-8 group-data-[collapsible=icon]:ml-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="flex h-16 items-center gap-4 border-b bg-background px-6">
              <SidebarTrigger />
              <div className="font-semibold">Dashboard</div>
            </div>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
