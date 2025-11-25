"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Briefcase, DollarSign, TrendingUp, Activity, BarChart3 } from "lucide-react"

const analyticsData = {
  overview: [
    { label: "Total Users", value: "12,847", change: "+8.2%", icon: Users },
    { label: "Active Jobs", value: "342", change: "+15.3%", icon: Briefcase },
    { label: "Revenue", value: "$89,420", change: "+22.1%", icon: DollarSign },
    { label: "Completion Rate", value: "94.2%", change: "+2.4%", icon: TrendingUp },
  ],
  userGrowth: [
    { month: "Jan", users: 8200 },
    { month: "Feb", users: 8900 },
    { month: "Mar", users: 9400 },
    { month: "Apr", users: 10200 },
    { month: "May", users: 11500 },
    { month: "Jun", users: 12847 },
  ],
  topCategories: [
    { name: "Chatbot Development", jobs: 89, revenue: "$24,500" },
    { name: "Model Training", jobs: 67, revenue: "$31,200" },
    { name: "Content AI", jobs: 54, revenue: "$15,800" },
    { name: "Voice AI", jobs: 42, revenue: "$18,900" },
    { name: "Analytics", jobs: 38, revenue: "$12,400" },
  ],
  recentActivity: [
    { action: "New user registered", user: "Chris Brown", time: "2 min ago" },
    { action: "Job completed", user: "Sarah Chen", time: "15 min ago" },
    { action: "Payment received", user: "Mike Johnson", time: "32 min ago" },
    { action: "New job posted", user: "Emily Davis", time: "1 hour ago" },
    { action: "Tutorial published", user: "Alex Rivera", time: "2 hours ago" },
  ],
}

export default function AdminAnalyticsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading || !user || user.role !== "admin") {
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
            <h1 className="text-2xl font-bold">Platform Analytics</h1>
            <p className="text-muted-foreground">Monitor platform performance and user engagement</p>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {analyticsData.overview.map((stat) => (
              <Card key={stat.label} className="border-border/50 bg-card/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-success">{stat.change} from last month</p>
                    </div>
                    <stat.icon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  User Growth
                </CardTitle>
                <CardDescription>Monthly user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[200px] items-end justify-between gap-2">
                  {analyticsData.userGrowth.map((data) => {
                    const maxUsers = Math.max(...analyticsData.userGrowth.map((d) => d.users))
                    const height = (data.users / maxUsers) * 100
                    return (
                      <div key={data.month} className="flex flex-1 flex-col items-center gap-2">
                        <div className="relative w-full">
                          <div
                            className="w-full rounded-t bg-primary/20 transition-all hover:bg-primary/30"
                            style={{ height: `${height * 1.6}px` }}
                          />
                          <div
                            className="absolute bottom-0 w-full rounded-t bg-primary"
                            style={{ height: `${height * 0.8}px` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{data.month}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Top Categories
                </CardTitle>
                <CardDescription>Jobs and revenue by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topCategories.map((category, index) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                          {index + 1}
                        </span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{category.revenue}</p>
                        <p className="text-sm text-muted-foreground">{category.jobs} jobs</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest platform events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/20 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">by {activity.user}</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
