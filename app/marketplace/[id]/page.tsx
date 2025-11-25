"use client"

import type React from "react"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"
import { mockJobs } from "@/lib/mock-data"
import { ArrowLeft, Calendar, DollarSign, Users, Clock, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { user } = useAuth()
  const router = useRouter()
  const [applyOpen, setApplyOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applied, setApplied] = useState(false)
  const [coverLetter, setCoverLetter] = useState("")
  const [proposedBudget, setProposedBudget] = useState("")
  const [duration, setDuration] = useState("")

  const job = mockJobs.find((j) => j.id === id)

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Job not found</h1>
          <Link href="/marketplace">
            <Button className="mt-4">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    )
  }

  const postedAgo = Math.floor((Date.now() - job.postedAt.getTime()) / (1000 * 60 * 60 * 24))
  const daysLeft = Math.floor((job.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setApplyOpen(false)
    setApplied(true)
  }

  const content = (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/marketplace">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">{job.title}</CardTitle>
                  <CardDescription className="mt-1">
                    Posted by {job.postedBy.name} · {postedAgo === 0 ? "Today" : `${postedAgo} days ago`}
                  </CardDescription>
                </div>
                <Badge variant={job.status === "open" ? "default" : "secondary"} className="text-sm">
                  {job.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2 font-semibold">Description</h3>
                <p className="leading-relaxed text-muted-foreground">{job.description}</p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="font-semibold">{job.budget}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Deadline</p>
                  <p className="font-semibold">{daysLeft} days left</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Applicants</p>
                  <p className="font-semibold">{job.applicants} developers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-semibold">{job.category}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {user?.role === "developer" && job.status === "open" && (
            <Card className="border-border/50 bg-card/50">
              <CardContent className="pt-6">
                {applied ? (
                  <div className="flex flex-col items-center gap-2 text-center">
                    <CheckCircle className="h-8 w-8 text-success" />
                    <p className="font-semibold">Application Submitted!</p>
                    <p className="text-sm text-muted-foreground">You'll be notified when the client responds.</p>
                  </div>
                ) : (
                  <Dialog open={applyOpen} onOpenChange={setApplyOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">Apply for this Job</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Submit Application</DialogTitle>
                        <DialogDescription>Tell the client why you're the right fit for this project</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleApply} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="coverLetter">Cover Letter</Label>
                          <Textarea
                            id="coverLetter"
                            placeholder="Introduce yourself and explain why you're a good fit..."
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            rows={4}
                            required
                          />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="proposedBudget">Your Rate/Quote</Label>
                            <Input
                              id="proposedBudget"
                              placeholder="e.g., $2,000"
                              value={proposedBudget}
                              onChange={(e) => setProposedBudget(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="duration">Est. Duration</Label>
                            <Input
                              id="duration"
                              placeholder="e.g., 2 weeks"
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setApplyOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                              </>
                            ) : (
                              "Submit Application"
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          )}

          {!user && (
            <Card className="border-border/50 bg-card/50">
              <CardContent className="pt-6 text-center">
                <p className="mb-4 text-sm text-muted-foreground">Sign in to apply for this job</p>
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
