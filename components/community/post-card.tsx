"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, Code, User } from "lucide-react"
import type { Post } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { user } = useAuth()
  const [liked, setLiked] = useState(post.isLiked || false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(post.comments)

  const timeAgo = getTimeAgo(post.createdAt)

  const handleLike = () => {
    if (!user) return
    setLiked(!liked)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  const handleComment = () => {
    if (!user || !newComment.trim()) return
    const comment = {
      id: Date.now().toString(),
      author: { id: user.id, name: user.name },
      content: newComment,
      createdAt: new Date(),
    }
    setComments([...comments, comment])
    setNewComment("")
  }

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            {post.author.role === "developer" ? (
              <Code className="h-5 w-5 text-primary" />
            ) : (
              <User className="h-5 w-5 text-primary" />
            )}
          </div>
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {post.author.role.charAt(0).toUpperCase() + post.author.role.slice(1)} · {timeAgo}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="whitespace-pre-wrap leading-relaxed">{post.content}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t border-border/50 pt-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 ${liked ? "text-red-500" : ""}`}
              onClick={handleLike}
              disabled={!user}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              {likeCount}
            </Button>
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => setShowComments(!showComments)}>
              <MessageCircle className="h-4 w-4" />
              {comments.length}
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </div>

        {showComments && (
          <div className="w-full space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 rounded-lg bg-secondary/30 p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium">
                  {comment.author.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{comment.author.name}</span>{" "}
                    <span className="text-muted-foreground">· {getTimeAgo(comment.createdAt)}</span>
                  </p>
                  <p className="mt-1 text-sm">{comment.content}</p>
                </div>
              </div>
            ))}

            {user && (
              <div className="flex gap-2">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[60px] bg-background/50"
                />
                <Button onClick={handleComment} disabled={!newComment.trim()}>
                  Post
                </Button>
              </div>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
