"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, FileText, MessageSquare, Sparkles, ArrowRight, Wrench, Zap } from "lucide-react"

const tools = [
  {
    id: "chatbot-builder",
    title: "AI Chatbot Builder",
    description:
      "Design, test, and deploy intelligent chatbots with our visual builder. Connect to multiple LLM providers.",
    icon: Bot,
    status: "available",
    features: ["Visual Flow Builder", "Multi-LLM Support", "Custom Training", "Analytics Dashboard"],
  },
  {
    id: "form-builder",
    title: "Intelligent Form Builder",
    description:
      "Create AI-powered forms that adapt to user inputs. Perfect for surveys, applications, and data collection.",
    icon: FileText,
    status: "available",
    features: ["Dynamic Questions", "AI Validation", "Response Analysis", "Export Options"],
  },
  {
    id: "prompt-studio",
    title: "Prompt Engineering Studio",
    description: "Craft, test, and optimize prompts for any LLM. Compare responses across different models.",
    icon: MessageSquare,
    status: "beta",
    features: ["Multi-Model Testing", "Version Control", "Performance Metrics", "Templates Library"],
  },
  {
    id: "agent-builder",
    title: "AI Agent Builder",
    description: "Build autonomous AI agents that can perform complex tasks. Coming soon with tool integration.",
    icon: Sparkles,
    status: "coming-soon",
    features: ["Tool Integration", "Memory Systems", "Task Planning", "Human-in-the-Loop"],
  },
]

const statusColors = {
  available: "bg-success/10 text-success border-success/20",
  beta: "bg-primary/10 text-primary border-primary/20",
  "coming-soon": "bg-muted text-muted-foreground border-muted",
}

export default function ToolsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

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

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="ml-64 flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">AI Tools</h1>
            <p className="text-muted-foreground">Build and deploy AI-powered solutions with our integrated tools</p>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-sm text-muted-foreground">Available Tools</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Your Projects</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50">
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">API Calls Today</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {tools.map((tool) => (
              <Card
                key={tool.id}
                className="group border-border/50 bg-card/50 transition-all hover:border-primary/30 hover:bg-card"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <Badge className={statusColors[tool.status as keyof typeof statusColors]}>
                      {tool.status === "coming-soon" ? "Coming Soon" : tool.status}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2" disabled={tool.status === "coming-soon"}>
                    {tool.status === "coming-soon" ? "Coming Soon" : "Open Tool"}
                    {tool.status !== "coming-soon" && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
