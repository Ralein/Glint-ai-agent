import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, Calendar } from "lucide-react"
import type { Job } from "@/lib/mock-data"
import Link from "next/link"

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const postedAgo = Math.floor((Date.now() - job.postedAt.getTime()) / (1000 * 60 * 60 * 24))
  const daysLeft = Math.floor((job.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <Card className="group border-border/50 bg-card/50 transition-all hover:border-primary/30 hover:bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/marketplace/${job.id}`}>
              <h3 className="font-semibold leading-tight transition-colors group-hover:text-primary">{job.title}</h3>
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              Posted by {job.postedBy.name} · {postedAgo === 0 ? "Today" : `${postedAgo}d ago`}
            </p>
          </div>
          <Badge variant={job.status === "open" ? "default" : "secondary"}>{job.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{job.description}</p>
        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border/50 pt-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            {job.budget}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {job.applicants}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {daysLeft}d left
          </span>
        </div>
        <Link href={`/marketplace/${job.id}`}>
          <Button size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
