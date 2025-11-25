import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users } from "lucide-react"
import { trendingTags } from "@/lib/mock-data"

const topContributors = [
  { name: "Sarah Chen", posts: 45, role: "Developer" },
  { name: "Alex Rivera", posts: 38, role: "Developer" },
  { name: "Mike Johnson", posts: 32, role: "Developer" },
  { name: "Emily Davis", posts: 28, role: "User" },
]

export function TrendingSidebar() {
  return (
    <div className="space-y-4">
      <Card className="border-border/50 bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-primary" />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topContributors.map((contributor, index) => (
              <div key={contributor.name} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{contributor.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {contributor.posts} posts · {contributor.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
