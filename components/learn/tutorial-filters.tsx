"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { tutorialCategories } from "@/lib/mock-data"

interface TutorialFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  difficulty: string
  onDifficultyChange: (value: string) => void
}

export function TutorialFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  difficulty,
  onDifficultyChange,
}: TutorialFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/50 bg-card/50 p-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tutorials..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-background/50 pl-10"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px] bg-background/50">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {tutorialCategories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={difficulty} onValueChange={onDifficultyChange}>
          <SelectTrigger className="w-[150px] bg-background/50">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
