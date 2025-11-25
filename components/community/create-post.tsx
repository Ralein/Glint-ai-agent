"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { Send, X, Hash } from "lucide-react"

interface CreatePostProps {
  onPost: (content: string, tags: string[]) => void
}

export function CreatePost({ onPost }: CreatePostProps) {
  const { user } = useAuth()
  const [content, setContent] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])

  if (!user) return null

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSubmit = () => {
    if (content.trim()) {
      onPost(content, tags)
      setContent("")
      setTags([])
    }
  }

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Share with the community</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="What's on your mind? Share insights, ask questions, or showcase your projects..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] bg-background/50"
        />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              #{tag}
              <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Add tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              className="bg-background/50 pl-9"
            />
          </div>
          <Button variant="outline" onClick={handleAddTag} disabled={!tagInput.trim()}>
            Add
          </Button>
        </div>
      </CardContent>
      <CardFooter className="justify-end border-t border-border/50 pt-4">
        <Button onClick={handleSubmit} disabled={!content.trim()} className="gap-2">
          <Send className="h-4 w-4" /> Post
        </Button>
      </CardFooter>
    </Card>
  )
}
