"use client"

import { use, useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { mockTutorials } from "@/lib/mock-data"
import { ArrowLeft, Clock, Users, Star, BookOpen, PlayCircle, CheckCircle, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const mockLessons = [
  { id: 1, title: "Introduction and Setup", duration: "15 min", completed: true, free: true },
  { id: 2, title: "Core Concepts", duration: "25 min", completed: true, free: true },
  { id: 3, title: "Building Your First Chain", duration: "30 min", completed: false, free: false },
  { id: 4, title: "Working with Memory", duration: "20 min", completed: false, free: false },
  { id: 5, title: "Creating Custom Tools", duration: "35 min", completed: false, free: false },
  { id: 6, title: "Agent Development", duration: "40 min", completed: false, free: false },
  { id: 7, title: "Production Best Practices", duration: "25 min", completed: false, free: false },
  { id: 8, title: "Final Project", duration: "60 min", completed: false, free: false },
]

export default function TutorialDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { user } = useAuth()
  const [enrolled, setEnrolled] = useState(false)

  const tutorial = mockTutorials.find((t) => t.id === id)

  if (!tutorial) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Tutorial not found</h1>
          <Link href="/learn">
            <Button className="mt-4">Back to Learning Hub</Button>
          </Link>
        </div>
      </div>
    )
  }

  const completedLessons = mockLessons.filter((l) => l.completed).length
  const progress = (completedLessons / mockLessons.length) * 100

  const content = (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/learn">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image src={tutorial.image || "/placeholder.svg"} alt={tutorial.title} fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-background/50">
              <Button size="lg" className="gap-2">
                <PlayCircle className="h-5 w-5" /> Preview Course
              </Button>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="secondary">{tutorial.category}</Badge>
              <Badge variant="outline">{tutorial.difficulty}</Badge>
            </div>
            <h1 className="text-2xl font-bold">{tutorial.title}</h1>
            <p className="mt-2 text-muted-foreground">by {tutorial.author.name}</p>
          </div>

          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle>About this course</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">{tutorial.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tutorial.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Course Content</CardTitle>
              <span className="text-sm text-muted-foreground">
                {mockLessons.length} lessons · {tutorial.duration}
              </span>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockLessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center justify-between rounded-lg border border-border/50 p-3 ${
                      lesson.completed ? "bg-primary/5" : "bg-secondary/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-medium">
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : lesson.free || enrolled ? (
                          index + 1
                        ) : (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </span>
                      <div>
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                      </div>
                    </div>
                    {lesson.free && !enrolled && (
                      <Badge variant="secondary" className="text-xs">
                        Free Preview
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-border/50 bg-card/50">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{tutorial.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lessons</p>
                  <p className="font-semibold">{tutorial.lessons} lessons</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Enrolled</p>
                  <p className="font-semibold">{tutorial.enrolled.toLocaleString()} students</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="font-semibold">{tutorial.rating} / 5.0</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {user ? (
            <Card className="border-border/50 bg-card/50">
              <CardContent className="pt-6">
                {enrolled ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Your progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                    <Button className="w-full">Continue Learning</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-center text-lg font-semibold">Free</p>
                    <Button className="w-full" onClick={() => setEnrolled(true)}>
                      Enroll Now
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Get lifetime access to all course materials
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/50 bg-card/50">
              <CardContent className="pt-6 text-center">
                <p className="mb-4 text-sm text-muted-foreground">Sign in to enroll in this course</p>
                <Link href="/login">
                  <Button className="w-full">Sign In</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )

  if (user) {
    return (
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="ml-64 flex-1">
          <DashboardHeader />
          <main className="p-6">{content}</main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-24 pb-12">{content}</main>
      <Footer />
    </div>
  )
}
