"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { PostCard } from "@/components/community/post-card"
import { CreatePost } from "@/components/community/create-post"
import { TrendingSidebar } from "@/components/community/trending-sidebar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/lib/auth-context"
import { mockPosts, type Post } from "@/lib/mock-data"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CommunityPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [activeTab, setActiveTab] = useState("trending")

  const handleNewPost = (content: string, tags: string[]) => {
    if (!user) return
    const newPost: Post = {
      id: Date.now().toString(),
      author: { id: user.id, name: user.name, role: user.role },
      content,
      tags,
      likes: 0,
      comments: [],
      createdAt: new Date(),
    }
    setPosts([newPost, ...posts])
  }

  const sortedPosts =
    activeTab === "trending"
      ? [...posts].sort((a, b) => b.likes - a.likes)
      : [...posts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  const content = (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        {user && <CreatePost onPost={handleNewPost} />}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="latest">Latest</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <TrendingSidebar />
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
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Community</h1>
              <p className="text-muted-foreground">Connect with AI enthusiasts, share knowledge, and learn together</p>
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
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="mt-2 text-muted-foreground">Join the conversation. Sign in to post and interact.</p>
        </div>
        {content}
      </main>
      <Footer />
    </div>
  )
}
