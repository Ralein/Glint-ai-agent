import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, BookOpen } from "lucide-react"
import type { Tutorial } from "@/lib/mock-data"
import Link from "next/link"
import Image from "next/image"

interface TutorialCardProps {
  tutorial: Tutorial
}

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-500 border-green-500/20",
  intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  advanced: "bg-red-500/10 text-red-500 border-red-500/20",
}

export function TutorialCard({ tutorial }: TutorialCardProps) {
  return (
    <Card className="group overflow-hidden border-border/50 bg-card/50 transition-all hover:border-primary/30 hover:bg-card">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={tutorial.image || "/placeholder.svg"}
          alt={tutorial.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <Badge className={`absolute top-3 right-3 ${difficultyColors[tutorial.difficulty]}`}>
          {tutorial.difficulty}
        </Badge>
      </div>
      <CardContent className="pt-4">
        <p className="mb-1 text-sm text-muted-foreground">{tutorial.category}</p>
        <Link href={`/learn/${tutorial.id}`}>
          <h3 className="font-semibold leading-tight transition-colors group-hover:text-primary">{tutorial.title}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{tutorial.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tutorial.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border/50 pt-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {tutorial.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {tutorial.lessons}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            {tutorial.rating}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
