"use client"

import { useState, useEffect, useRef } from "react"
import {
  Search,
  Bell,
  MoreVertical,
  Send,
  Paperclip,
  Phone,
  Video,
  Info,
  Check,
  CheckCheck,
  Clock,
  Plus,
  MessageSquare,
} from "lucide-react"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

// Types
interface User {
  id: string
  name: string
  role: string
  avatar: string
  status: "online" | "offline" | "away" | "busy"
  lastSeen?: Date
}

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: Date
  status: "sent" | "delivered" | "read" | "pending"
  attachments?: {
    id: string
    type: "image" | "document" | "audio"
    url: string
    name: string
  }[]
}

interface Conversation {
  id: string
  participants: User[]
  lastMessage?: Message
  unreadCount: number
  pinned: boolean
}

interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
  read: boolean
  type: "message" | "system" | "alert"
  senderId?: string
}

// Mock data
const currentUser: User = {
  id: "user-1",
  name: "John Doe",
  role: "Branch Manager",
  avatar: "/placeholder.svg?height=40&width=40&text=JD",
  status: "online",
}

const users: User[] = [
  {
    id: "user-2",
    name: "Alice Smith",
    role: "Accountant",
    avatar: "/placeholder.svg?height=40&width=40&text=AS",
    status: "online",
  },
  {
    id: "user-3",
    name: "Bob Johnson",
    role: "Driver",
    avatar: "/placeholder.svg?height=40&width=40&text=BJ",
    status: "offline",
    lastSeen: new Date(Date.now() - 3600000),
  },
  {
    id: "user-4",
    name: "Carol Williams",
    role: "Branch Accountant",
    avatar: "/placeholder.svg?height=40&width=40&text=CW",
    status: "away",
  },
  {
    id: "user-5",
    name: "David Brown",
    role: "Driver",
    avatar: "/placeholder.svg?height=40&width=40&text=DB",
    status: "busy",
  },
  {
    id: "user-6",
    name: "Eva Davis",
    role: "Customer Service",
    avatar: "/placeholder.svg?height=40&width=40&text=ED",
    status: "online",
  },
  {
    id: "user-7",
    name: "Frank Miller",
    role: "Maintenance",
    avatar: "/placeholder.svg?height=40&width=40&text=FM",
    status: "offline",
    lastSeen: new Date(Date.now() - 86400000),
  },
]

const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    participants: [currentUser, users[0]],
    lastMessage: {
      id: "msg-1",
      senderId: "user-2",
      text: "Can you review the monthly financial report?",
      timestamp: new Date(Date.now() - 1800000),
      status: "read",
    },
    unreadCount: 0,
    pinned: true,
  },
  {
    id: "conv-2",
    participants: [currentUser, users[1]],
    lastMessage: {
      id: "msg-2",
      senderId: "user-3",
      text: "I'll be 10 minutes late for my shift tomorrow",
      timestamp: new Date(Date.now() - 3600000),
      status: "delivered",
    },
    unreadCount: 2,
    pinned: false,
  },
  {
    id: "conv-3",
    participants: [currentUser, users[2]],
    lastMessage: {
      id: "msg-3",
      senderId: "user-1",
      text: "Please prepare the quarterly tax documents",
      timestamp: new Date(Date.now() - 86400000),
      status: "read",
    },
    unreadCount: 0,
    pinned: false,
  },
  {
    id: "conv-4",
    participants: [currentUser, users[3]],
    lastMessage: {
      id: "msg-4",
      senderId: "user-5",
      text: "The bus needs maintenance, can we schedule it?",
      timestamp: new Date(Date.now() - 172800000),
      status: "read",
    },
    unreadCount: 0,
    pinned: false,
  },
  {
    id: "conv-5",
    participants: [currentUser, users[4]],
    lastMessage: {
      id: "msg-5",
      senderId: "user-1",
      text: "How are the customer satisfaction ratings this week?",
      timestamp: new Date(Date.now() - 259200000),
      status: "read",
    },
    unreadCount: 0,
    pinned: false,
  },
]

const mockGroupConversations: Conversation[] = [
  {
    id: "group-1",
    participants: [currentUser, users[0], users[1], users[2]],
    lastMessage: {
      id: "gmsg-1",
      senderId: "user-2",
      text: "Team meeting at 3pm tomorrow",
      timestamp: new Date(Date.now() - 7200000),
      status: "read",
    },
    unreadCount: 0,
    pinned: true,
  },
  {
    id: "group-2",
    participants: [currentUser, users[3], users[4], users[5]],
    lastMessage: {
      id: "gmsg-2",
      senderId: "user-5",
      text: "Updates on the new route planning",
      timestamp: new Date(Date.now() - 172800000),
      status: "delivered",
    },
    unreadCount: 5,
    pinned: false,
  },
]

// Generate more mock messages for better scrolling demonstration
const generateMockMessages = (conversationId: string, count: number): Message[] => {
  const messages: Message[] = []
  const senderIds = ["user-1", "user-2", "user-3"]

  for (let i = 0; i < count; i++) {
    const senderId = senderIds[i % senderIds.length]
    messages.push({
      id: `${conversationId}-msg-${i}`,
      senderId,
      text: `This is message #${i + 1} in the conversation. ${i % 3 === 0 ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit." : "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."}`,
      timestamp: new Date(Date.now() - (count - i) * 300000),
      status: "read",
    })
  }

  return messages
}

const mockMessages: Record<string, Message[]> = {
  "conv-1": generateMockMessages("conv-1", 20),
  "conv-2": generateMockMessages("conv-2", 15),
  "group-1": generateMockMessages("group-1", 25),
  "group-2": generateMockMessages("group-2", 18),
  "conv-3": [
    {
      id: "c3-msg-1",
      senderId: "user-1",
      text: "Hi Carol, do you have the quarterly tax documents ready?",
      timestamp: new Date(Date.now() - 172800000),
      status: "read",
    },
    {
      id: "c3-msg-2",
      senderId: "user-4",
      text: "I'm working on them now. Should be ready by tomorrow.",
      timestamp: new Date(Date.now() - 172700000),
      status: "read",
    },
    {
      id: "c3-msg-3",
      senderId: "user-1",
      text: "Great, thanks!",
      timestamp: new Date(Date.now() - 172600000),
      status: "read",
    },
    {
      id: "c3-msg-4",
      senderId: "user-1",
      text: "Please prepare the quarterly tax documents",
      timestamp: new Date(Date.now() - 86400000),
      status: "read",
    },
  ],
  "conv-4": [
    {
      id: "c4-msg-1",
      senderId: "user-5",
      text: "The bus needs maintenance, can we schedule it?",
      timestamp: new Date(Date.now() - 172800000),
      status: "read",
    },
  ],
  "conv-5": [
    {
      id: "c5-msg-1",
      senderId: "user-1",
      text: "How are the customer satisfaction ratings this week?",
      timestamp: new Date(Date.now() - 259200000),
      status: "read",
    },
  ],
}

const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    title: "New Message",
    message: "Alice Smith sent you a message",
    timestamp: new Date(Date.now() - 1800000),
    read: false,
    type: "message",
    senderId: "user-2",
  },
  {
    id: "notif-2",
    title: "System Maintenance",
    message: "The system will be down for maintenance tonight from 2am to 4am",
    timestamp: new Date(Date.now() - 86400000),
    read: false,
    type: "system",
  },
  {
    id: "notif-3",
    title: "Trip Alert",
    message: "Trip #1234 is delayed by 30 minutes",
    timestamp: new Date(Date.now() - 172800000),
    read: true,
    type: "alert",
  },
  {
    id: "notif-4",
    title: "New Booking",
    message: "10 new bookings have been made for tomorrow's trips",
    timestamp: new Date(Date.now() - 259200000),
    read: true,
    type: "system",
  },
]

export default function MessagesClient() {
  const [activeTab, setActiveTab] = useState("direct")
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [groupConversations, setGroupConversations] = useState<Conversation[]>(mockGroupConversations)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [showNotifications, setShowNotifications] = useState(false)
  const [isCreatingNewChat, setIsCreatingNewChat] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [groupName, setGroupName] = useState("")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conv) => {
    const otherParticipant = conv.participants.find((p) => p.id !== currentUser.id)
    return otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const filteredGroupConversations = groupConversations.filter((conv) => {
    return conv.participants.some(
      (p) => p.id !== currentUser.id && p.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  })

  // Load messages when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      const conversationMessages = mockMessages[selectedConversation.id] || []
      setMessages(conversationMessages)

      // Mark conversation as read
      if (selectedConversation.unreadCount > 0) {
        setConversations((prevConversations) =>
          prevConversations.map((conv) => (conv.id === selectedConversation.id ? { ...conv, unreadCount: 0 } : conv)),
        )

        setGroupConversations((prevConversations) =>
          prevConversations.map((conv) => (conv.id === selectedConversation.id ? { ...conv, unreadCount: 0 } : conv)),
        )
      }
    }
  }, [selectedConversation])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }, [messages])

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const newMsg: Message = {
      id: `new-msg-${Date.now()}`,
      senderId: currentUser.id,
      text: newMessage,
      timestamp: new Date(),
      status: "sent",
    }

    // Add to messages
    setMessages((prev) => [...prev, newMsg])

    // Update conversation last message
    const updateConversation = (convs: Conversation[]) =>
      convs.map((conv) => (conv.id === selectedConversation.id ? { ...conv, lastMessage: newMsg } : conv))

    if (selectedConversation.id.startsWith("group")) {
      setGroupConversations(updateConversation)
    } else {
      setConversations(updateConversation)
    }

    // Clear input
    setNewMessage("")

    // Simulate message delivery after 1 second
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMsg.id ? { ...msg, status: "delivered" } : msg)))
    }, 1000)
  }

  // Handle creating a new conversation
  const handleCreateConversation = () => {
    if (selectedUsers.length === 0) return

    const newConvId = `conv-${Date.now()}`

    if (selectedUsers.length === 1) {
      // Direct conversation
      const newConversation: Conversation = {
        id: newConvId,
        participants: [currentUser, selectedUsers[0]],
        unreadCount: 0,
        pinned: false,
      }

      setConversations((prev) => [newConversation, ...prev])
      setSelectedConversation(newConversation)
      setActiveTab("direct")
    } else {
      // Group conversation
      const newGroupConversation: Conversation = {
        id: `group-${Date.now()}`,
        participants: [currentUser, ...selectedUsers],
        unreadCount: 0,
        pinned: false,
      }

      setGroupConversations((prev) => [newGroupConversation, ...prev])
      setSelectedConversation(newGroupConversation)
      setActiveTab("groups")
    }

    // Reset
    setSelectedUsers([])
    setGroupName("")
    setIsCreatingNewChat(false)
  }

  // Handle marking all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  // Get conversation name
  const getConversationName = (conversation: Conversation) => {
    if (conversation.id.startsWith("group")) {
      // For group conversations, list all participants except current user
      return conversation.participants
        .filter((p) => p.id !== currentUser.id)
        .map((p) => p.name)
        .join(", ")
    } else {
      // For direct conversations, show the other participant's name
      const otherParticipant = conversation.participants.find((p) => p.id !== currentUser.id)
      return otherParticipant?.name || "Unknown"
    }
  }

  // Get conversation avatar
  const getConversationAvatar = (conversation: Conversation) => {
    if (conversation.id.startsWith("group")) {
      // For group conversations, return a placeholder
      return "/placeholder.svg?height=40&width=40&text=G"
    } else {
      // For direct conversations, show the other participant's avatar
      const otherParticipant = conversation.participants.find((p) => p.id !== currentUser.id)
      return otherParticipant?.avatar || "/placeholder.svg?height=40&width=40"
    }
  }

  // Format timestamp
  const formatMessageTime = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return format(date, "h:mm a")
    } else if (diffInDays === 1) {
      return "Yesterday"
    } else if (diffInDays < 7) {
      return format(date, "EEEE")
    } else {
      return format(date, "MMM d")
    }
  }

  // Get status icon
  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <Check className="h-3 w-3 text-muted-foreground" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      case "pending":
        return <Clock className="h-3 w-3 text-muted-foreground" />
      default:
        return null
    }
  }

  // Get user status color
  const getUserStatusColor = (status: User["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-full max-w-xs border-r bg-background">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <div className="flex items-center gap-2">
              <Popover open={showNotifications} onOpenChange={setShowNotifications}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.some((n) => !n.read) && (
                      <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="flex items-center justify-between border-b p-3">
                    <h3 className="font-medium">Notifications</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllNotificationsAsRead}
                      disabled={!notifications.some((n) => !n.read)}
                    >
                      Mark all as read
                    </Button>
                  </div>
                  <ScrollArea className="h-80">
                    {notifications.length === 0 ? (
                      <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
                        No notifications
                      </div>
                    ) : (
                      <div className="divide-y">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={cn(
                              "flex items-start gap-3 p-3 hover:bg-muted/50",
                              !notification.read && "bg-muted/30",
                            )}
                          >
                            <div
                              className={cn(
                                "mt-0.5 h-2 w-2 rounded-full",
                                notification.read ? "bg-transparent" : "bg-blue-500",
                              )}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{notification.title}</p>
                                <span className="text-xs text-muted-foreground">
                                  {formatMessageTime(notification.timestamp)}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <Dialog open={isCreatingNewChat} onOpenChange={setIsCreatingNewChat}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>New Conversation</DialogTitle>
                    <DialogDescription>Select users to start a new conversation</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Select Users</p>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {users.map((user) => (
                          <div
                            key={user.id}
                            className={cn(
                              "flex items-center gap-2 rounded-md border p-2 cursor-pointer",
                              selectedUsers.some((u) => u.id === user.id) && "border-primary bg-primary/10",
                            )}
                            onClick={() => {
                              if (selectedUsers.some((u) => u.id === user.id)) {
                                setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id))
                              } else {
                                setSelectedUsers([...selectedUsers, user])
                              }
                            }}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.role}</p>
                            </div>
                            {selectedUsers.some((u) => u.id === user.id) && <Check className="h-4 w-4 text-primary" />}
                          </div>
                        ))}
                      </div>
                    </div>
                    {selectedUsers.length > 1 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Group Name (Optional)</p>
                        <Input
                          placeholder="Enter group name"
                          value={groupName}
                          onChange={(e) => setGroupName(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedUsers([])
                        setGroupName("")
                        setIsCreatingNewChat(false)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateConversation} disabled={selectedUsers.length === 0}>
                      Create
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Tabs defaultValue="direct" value={activeTab} onValueChange={setActiveTab}>
            <div className="px-4">
              <TabsList className="w-full">
                <TabsTrigger value="direct" className="flex-1">
                  Direct
                </TabsTrigger>
                <TabsTrigger value="groups" className="flex-1">
                  Groups
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="direct" className="mt-0">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-1 p-2">
                  {filteredConversations.length === 0 ? (
                    <div className="flex h-20 items-center justify-center text-center text-sm text-muted-foreground">
                      {searchQuery ? "No conversations found" : "No conversations yet"}
                    </div>
                  ) : (
                    filteredConversations.map((conversation) => {
                      const otherParticipant = conversation.participants.find((p) => p.id !== currentUser.id)

                      return (
                        <div
                          key={conversation.id}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-lg p-2",
                            selectedConversation?.id === conversation.id ? "bg-muted" : "hover:bg-muted/50",
                            conversation.pinned && "border-l-4 border-primary",
                          )}
                          onClick={() => setSelectedConversation(conversation)}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={otherParticipant?.avatar} alt={otherParticipant?.name} />
                              <AvatarFallback>{otherParticipant?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span
                              className={cn(
                                "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background",
                                getUserStatusColor(otherParticipant?.status || "offline"),
                              )}
                            />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <div className="flex items-center justify-between">
                              <p className="truncate font-medium">{otherParticipant?.name}</p>
                              {conversation.lastMessage && (
                                <span className="text-xs text-muted-foreground">
                                  {formatMessageTime(conversation.lastMessage.timestamp)}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {conversation.lastMessage && (
                                <>
                                  {conversation.lastMessage.senderId === currentUser.id && (
                                    <span className="flex items-center">
                                      {getStatusIcon(conversation.lastMessage.status)}
                                    </span>
                                  )}
                                  <p className="truncate text-sm text-muted-foreground">
                                    {conversation.lastMessage.text}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                          {conversation.unreadCount > 0 && (
                            <Badge variant="default" className="ml-auto">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="groups" className="mt-0">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="space-y-1 p-2">
                  {filteredGroupConversations.length === 0 ? (
                    <div className="flex h-20 items-center justify-center text-center text-sm text-muted-foreground">
                      {searchQuery ? "No group conversations found" : "No group conversations yet"}
                    </div>
                  ) : (
                    filteredGroupConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg p-2",
                          selectedConversation?.id === conversation.id ? "bg-muted" : "hover:bg-muted/50",
                          conversation.pinned && "border-l-4 border-primary",
                        )}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40&text=G" alt="Group" />
                          <AvatarFallback>G</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center justify-between">
                            <p className="truncate font-medium">{getConversationName(conversation)}</p>
                            {conversation.lastMessage && (
                              <span className="text-xs text-muted-foreground">
                                {formatMessageTime(conversation.lastMessage.timestamp)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {conversation.lastMessage && (
                              <>
                                {conversation.lastMessage.senderId === currentUser.id && (
                                  <span className="flex items-center">
                                    {getStatusIcon(conversation.lastMessage.status)}
                                  </span>
                                )}
                                <p className="truncate text-sm text-muted-foreground">
                                  {conversation.lastMessage.text}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="default" className="ml-auto">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="flex flex-1 flex-col">
            {/* Chat Header */}
            <div className="flex h-14 items-center justify-between border-b px-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={getConversationAvatar(selectedConversation)}
                    alt={getConversationName(selectedConversation)}
                  />
                  <AvatarFallback>{getConversationName(selectedConversation).charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{getConversationName(selectedConversation)}</h3>
                  {!selectedConversation.id.startsWith("group") && (
                    <p className="text-xs text-muted-foreground">
                      {selectedConversation.participants.find((p) => p.id !== currentUser.id)?.role}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Info className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View profile</DropdownMenuItem>
                    <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                    <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">Delete conversation</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-10rem)]" ref={scrollAreaRef} type="always">
                <div className="space-y-4 p-4">
                  {messages.map((message, index) => {
                    const isCurrentUser = message.senderId === currentUser.id
                    const sender = selectedConversation.participants.find((p) => p.id === message.senderId)

                    // Check if we should show the sender name (for group chats)
                    const showSender = selectedConversation.id.startsWith("group") && !isCurrentUser

                    // Check if we should show the avatar (first message from this sender in a sequence)
                    const prevMessage = index > 0 ? messages[index - 1] : null
                    const showAvatar = !prevMessage || prevMessage.senderId !== message.senderId

                    return (
                      <div key={message.id} className={cn("flex items-end gap-2", isCurrentUser && "flex-row-reverse")}>
                        {showAvatar ? (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={sender?.avatar} alt={sender?.name} />
                            <AvatarFallback>{sender?.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="w-8" />
                        )}
                        <div className={cn("max-w-[70%] space-y-1", isCurrentUser && "items-end")}>
                          {showSender && showAvatar && <p className="text-xs font-medium">{sender?.name}</p>}
                          <div
                            className={cn(
                              "rounded-lg px-3 py-2",
                              isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted",
                            )}
                          >
                            <p>{message.text}</p>
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 space-y-2">
                                {message.attachments.map((attachment) => (
                                  <div
                                    key={attachment.id}
                                    className="flex items-center gap-2 rounded-md bg-background/50 p-2"
                                  >
                                    <Paperclip className="h-4 w-4" />
                                    <span className="text-sm">{attachment.name}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className={cn("flex items-center gap-1", isCurrentUser && "justify-end")}>
                            <span className="text-xs text-muted-foreground">
                              {formatMessageTime(message.timestamp)}
                            </span>
                            {isCurrentUser && (
                              <span className="flex items-center">{getStatusIcon(message.status)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
            <div className="mb-4 rounded-full bg-muted p-6">
              <MessageSquare className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Your Messages</h3>
            <p className="mt-2 text-sm text-muted-foreground">Select a conversation or start a new one</p>
            <Button className="mt-4" onClick={() => setIsCreatingNewChat(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Conversation
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
