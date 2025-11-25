"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { useAuth } from "@/lib/auth-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Send, User } from "lucide-react"

const mockConversations = [
  {
    id: "1",
    user: { name: "Sarah Chen", role: "Developer" },
    lastMessage: "Sounds good! I'll start working on the chatbot integration tomorrow.",
    unread: 2,
    time: "2 min ago",
  },
  {
    id: "2",
    user: { name: "John User", role: "Client" },
    lastMessage: "Can you provide an estimate for the project?",
    unread: 0,
    time: "1 hour ago",
  },
  {
    id: "3",
    user: { name: "Mike Johnson", role: "Developer" },
    lastMessage: "Thanks for the feedback on the RAG implementation!",
    unread: 0,
    time: "3 hours ago",
  },
]

const mockMessages = [
  { id: 1, sender: "other", content: "Hi! I saw your job posting for the chatbot project.", time: "10:30 AM" },
  {
    id: 2,
    sender: "me",
    content: "Hello Sarah! Thanks for reaching out. Can you tell me more about your experience?",
    time: "10:32 AM",
  },
  {
    id: 3,
    sender: "other",
    content: "I've built several chatbots using LangChain and OpenAI. My portfolio is on my profile.",
    time: "10:35 AM",
  },
  {
    id: 4,
    sender: "me",
    content: "Great, I'll take a look. What's your estimated timeline for this project?",
    time: "10:38 AM",
  },
  {
    id: 5,
    sender: "other",
    content: "I can complete it in about 2 weeks. I'll also include documentation and testing.",
    time: "10:40 AM",
  },
  { id: 6, sender: "me", content: "That works for us. Let's discuss the technical requirements.", time: "10:42 AM" },
  {
    id: 7,
    sender: "other",
    content: "Sounds good! I'll start working on the chatbot integration tomorrow.",
    time: "10:45 AM",
  },
]

export default function MessagesPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [selectedChat, setSelectedChat] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const handleSend = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      setNewMessage("")
    }
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="ml-64 flex-1">
        <DashboardHeader />
        <main className="flex h-[calc(100vh-4rem)]">
          {/* Conversations List */}
          <div className="w-80 border-r border-border bg-card/30">
            <div className="border-b border-border p-4">
              <h2 className="mb-3 text-lg font-semibold">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-background/50 pl-9"
                />
              </div>
            </div>
            <div className="overflow-y-auto">
              {mockConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedChat(conv)}
                  className={`cursor-pointer border-b border-border/50 p-4 transition-colors hover:bg-secondary/30 ${
                    selectedChat.id === conv.id ? "bg-secondary/50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{conv.user.name}</p>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{conv.user.role}</p>
                      <p className="mt-1 truncate text-sm text-muted-foreground">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && <Badge className="shrink-0">{conv.unread}</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex flex-1 flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-border bg-card/30 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{selectedChat.user.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedChat.user.role}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`mt-1 text-xs ${
                          message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-border bg-card/30 p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="bg-background/50"
                />
                <Button onClick={handleSend} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
