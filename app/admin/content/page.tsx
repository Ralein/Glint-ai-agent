"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, FileText, BookOpen, MessageSquare, Flag } from "lucide-react"

const mockContent = {
  jobs: [
    {
      id: 1,
      title: "Build a Customer Support Chatbot",
      author: "John User",
      status: "approved",
      reports: 0,
      date: "2024-05-20",
    },
    {
      id: 2,
      title: "LLM Fine-tuning Project",
      author: "LegalTech Inc.",
      status: "approved",
      reports: 0,
      date: "2024-05-18",
    },
    { id: 3, title: "Suspicious Job Listing", author: "Anonymous", status: "flagged", reports: 3, date: "2024-05-22" },
  ],
  tutorials: [
    {
      id: 1,
      title: "Introduction to LangChain",
      author: "Sarah Chen",
      status: "published",
      views: 2834,
      date: "2024-04-15",
    },
    { id: 2, title: "Fine-tuning LLMs", author: "Alex Rivera", status: "published", views: 1256, date: "2024-04-01" },
    { id: 3, title: "Building RAG Systems", author: "Mike Johnson", status: "draft", views: 0, date: "2024-05-21" },
  ],
  posts: [
    {
      id: 1,
      title: "Just finished my first AI agent!",
      author: "Sarah Chen",
      status: "approved",
      likes: 234,
      date: "2024-05-20",
    },
    {
      id: 2,
      title: "GPT-4 vs Claude 3 comparison",
      author: "Mike Johnson",
      status: "approved",
      likes: 189,
      date: "2024-05-19",
    },
    {
      id: 3,
      title: "Reported post content",
      author: "Anonymous",
      status: "under-review",
      likes: 12,
      date: "2024-05-22",
    },
  ],
}

const statusColors = {
  approved: "bg-success/10 text-success border-success/20",
  published: "bg-success/10 text-success border-success/20",
  flagged: "bg-destructive/10 text-destructive border-destructive/20",
  draft: "bg-muted text-muted-foreground border-muted",
  "under-review": "bg-warning/10 text-warning border-warning/20",
}

export default function AdminContentPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("jobs")

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

  const stats = [
    { label: "Total Jobs", value: mockContent.jobs.length, icon: FileText },
    { label: "Tutorials", value: mockContent.tutorials.length, icon: BookOpen },
    { label: "Community Posts", value: mockContent.posts.length, icon: MessageSquare },
    { label: "Flagged Content", value: 2, icon: Flag },
  ]

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="ml-64 flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Content Moderation</h1>
            <p className="text-muted-foreground">Review and moderate platform content</p>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-border/50 bg-card/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>Content Review</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search content..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-[250px] bg-background/50 pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 bg-secondary/50">
                  <TabsTrigger value="jobs">Jobs</TabsTrigger>
                  <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                  <TabsTrigger value="posts">Community Posts</TabsTrigger>
                </TabsList>

                <TabsContent value="jobs">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reports</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockContent.jobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.title}</TableCell>
                          <TableCell>{job.author}</TableCell>
                          <TableCell>
                            <Badge className={statusColors[job.status as keyof typeof statusColors]}>
                              {job.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {job.reports > 0 ? <span className="text-destructive">{job.reports}</span> : job.reports}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{job.date}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Approve</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="tutorials">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockContent.tutorials.map((tutorial) => (
                        <TableRow key={tutorial.id}>
                          <TableCell className="font-medium">{tutorial.title}</TableCell>
                          <TableCell>{tutorial.author}</TableCell>
                          <TableCell>
                            <Badge className={statusColors[tutorial.status as keyof typeof statusColors]}>
                              {tutorial.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{tutorial.views.toLocaleString()}</TableCell>
                          <TableCell className="text-muted-foreground">{tutorial.date}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View</DropdownMenuItem>
                                <DropdownMenuItem>Publish</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Unpublish</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="posts">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Content</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Likes</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockContent.posts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium max-w-[300px] truncate">{post.title}</TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>
                            <Badge className={statusColors[post.status as keyof typeof statusColors]}>
                              {post.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{post.likes}</TableCell>
                          <TableCell className="text-muted-foreground">{post.date}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View</DropdownMenuItem>
                                <DropdownMenuItem>Approve</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
