"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stats-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Users, BookOpen, Bot, TrendingUp, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

// Mock data for recent activity
const recentJobs = [
  { id: 1, title: "Build a Customer Support Chatbot", budget: "$2,500", status: "open", applicants: 12 },
  { id: 2, title: "LLM Fine-tuning for Legal Documents", budget: "$5,000", status: "in-progress", applicants: 8 },
  { id: 3, title: "AI-Powered Content Generator", budget: "$3,000", status: "open", applicants: 15 },
]

const recentCommunityPosts = [
  { id: 1, title: "Best practices for prompt engineering in 2024", author: "Sarah Chen", likes: 234 },
  { id: 2, title: "How I built an AI agent with LangChain", author: "Mike Johnson", likes: 189 },
  { id: 3, title: "GPT-4 vs Claude 3: My experience", author: "Emily Davis", likes: 156 },
]

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) return null

  const stats =
    user.role === "developer"
      ? [
          { title: "Active Projects", value: "4", change: "+2", trend: "up" as const, icon: Briefcase },
          { title: "Total Earnings", value: "$12,450", change: "+18%", trend: "up" as const, icon: TrendingUp },
          { title: "Profile Views", value: "1,234", change: "+12%", trend: "up" as const, icon: Users },
          { title: "Completed Jobs", value: "23", change: "+5", trend: "up" as const, icon: Clock },
        ]
      : user.role === "admin"
        ? [
            { title: "Total Users", value: "12,847", change: "+8%", trend: "up" as const, icon: Users },
            { title: "Active Jobs", value: "342", change: "+15%", trend: "up" as const, icon: Briefcase },
            { title: "Revenue", value: "$89,420", change: "+22%", trend: "up" as const, icon: TrendingUp },
            { title: "Community Posts", value: "1,567", change: "+9%", trend: "up" as const, icon: BookOpen },
          ]
        : [
            { title: "My Projects", value: "3", change: "+1", trend: "up" as const, icon: Briefcase },
            { title: "Total Spent", value: "$4,200", change: "+$800", trend: "up" as const, icon: TrendingUp },
            { title: "Saved Developers", value: "12", change: "+3", trend: "up" as const, icon: Users },
            { title: "Courses Completed", value: "5", change: "+2", trend: "up" as const, icon: BookOpen },
          ]

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="ml-64 flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Welcome back, {user.name.split(" ")[0]}</h1>
            <p className="text-muted-foreground">
              {user.role === "developer"
                ? "Here's what's happening with your projects"
                : user.role === "admin"
                  ? "Platform overview and analytics"
                  : "Manage your AI projects and discover new opportunities"}
            </p>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/50 bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Jobs</CardTitle>
                  <CardDescription>Latest opportunities in the marketplace</CardDescription>
                </div>
                <Link href="/marketplace">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View all <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/20 p-4"
                    >
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-muted-foreground">{job.applicants} applicants</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{job.budget}</p>
                        <Badge variant={job.status === "open" ? "default" : "secondary"} className="mt-1">
                          {job.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Community Highlights</CardTitle>
                  <CardDescription>Trending posts and discussions</CardDescription>
                </div>
                <Link href="/community">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View all <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCommunityPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/20 p-4"
                    >
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground">by {post.author}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        {post.likes}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {user.role === "developer" && (
            <div className="mt-6">
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Get started with these common tasks</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <Link href="/marketplace">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Briefcase className="h-4 w-4" /> Find Work
                    </Button>
                  </Link>
                  <Link href="/tools">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Bot className="h-4 w-4" /> AI Agent Builder
                    </Button>
                  </Link>
                  <Link href="/community">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Users className="h-4 w-4" /> Join Discussion
                    </Button>
                  </Link>
                  <Link href="/learn">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <BookOpen className="h-4 w-4" /> Browse Tutorials
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
