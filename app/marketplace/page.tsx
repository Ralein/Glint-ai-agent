"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { JobCard } from "@/components/marketplace/job-card"
import { JobFilters } from "@/components/marketplace/job-filters"
import { PostJobDialog } from "@/components/marketplace/post-job-dialog"
import { useAuth } from "@/lib/auth-context"
import { mockJobs } from "@/lib/mock-data"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function MarketplacePage() {
  const { user } = useAuth()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All Categories")
  const [budgetType, setBudgetType] = useState("all")
  const [refreshKey, setRefreshKey] = useState(0)

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "All Categories" || job.category === category
    const matchesBudgetType = budgetType === "all" || job.budgetType === budgetType

    return matchesSearch && matchesCategory && matchesBudgetType
  })

  // If user is logged in, show dashboard layout
  if (user) {
    return (
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="ml-64 flex-1">
          <DashboardHeader />
          <main className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{user.role === "developer" ? "Find Work" : "AI Marketplace"}</h1>
                <p className="text-muted-foreground">
                  {user.role === "developer"
                    ? "Browse available projects and apply"
                    : "Post jobs and find AI developers"}
                </p>
              </div>
              {user.role === "user" && <PostJobDialog onJobPosted={() => setRefreshKey((k) => k + 1)} />}
            </div>

            <JobFilters
              search={search}
              onSearchChange={setSearch}
              category={category}
              onCategoryChange={setCategory}
              budgetType={budgetType}
              onBudgetTypeChange={setBudgetType}
            />

            <div className="mt-6 grid gap-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <div className="rounded-xl border border-border/50 bg-card/50 p-12 text-center">
                  <p className="text-muted-foreground">No jobs found matching your criteria</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    )
  }

  // Public marketplace view
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Marketplace</h1>
          <p className="mt-2 text-muted-foreground">
            Browse AI projects and opportunities. Sign in to post jobs or apply.
          </p>
        </div>

        <JobFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          budgetType={budgetType}
          onBudgetTypeChange={setBudgetType}
        />

        <div className="mt-6 grid gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="rounded-xl border border-border/50 bg-card/50 p-12 text-center">
              <p className="text-muted-foreground">No jobs found matching your criteria</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
