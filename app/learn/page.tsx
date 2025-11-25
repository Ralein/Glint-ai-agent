"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { TutorialCard } from "@/components/learn/tutorial-card"
import { TutorialFilters } from "@/components/learn/tutorial-filters"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { mockTutorials } from "@/lib/mock-data"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Award, TrendingUp } from "lucide-react"

export default function LearnPage() {
  const { user } = useAuth()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All Categories")
  const [difficulty, setDifficulty] = useState("all")

  const filteredTutorials = mockTutorials.filter((tutorial) => {
    const matchesSearch =
      tutorial.title.toLowerCase().includes(search.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "All Categories" || tutorial.category === category
    const matchesDifficulty = difficulty === "all" || tutorial.difficulty === difficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const stats = [
    { label: "Total Courses", value: "50+", icon: BookOpen },
    { label: "Active Learners", value: "12,000+", icon: Users },
    { label: "Certificates Issued", value: "5,000+", icon: Award },
    { label: "Hours of Content", value: "200+", icon: TrendingUp },
  ]

  const content = (
    <>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50 bg-card/50">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TutorialFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
      />

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTutorials.length > 0 ? (
          filteredTutorials.map((tutorial) => <TutorialCard key={tutorial.id} tutorial={tutorial} />)
        ) : (
          <div className="col-span-full rounded-xl border border-border/50 bg-card/50 p-12 text-center">
            <p className="text-muted-foreground">No tutorials found matching your criteria</p>
          </div>
        )}
      </div>
    </>
  )

  if (user) {
    return (
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="ml-64 flex-1">
          <DashboardHeader />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Learning Hub</h1>
              <p className="text-muted-foreground">
                Master AI development with tutorials, guides, and hands-on projects
              </p>
            </div>
            {content}
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Learning Hub</h1>
          <p className="mt-2 text-muted-foreground">
            Master AI development with tutorials, guides, and hands-on projects
          </p>
        </div>
        {content}
      </main>
      <Footer />
    </div>
  )
}
