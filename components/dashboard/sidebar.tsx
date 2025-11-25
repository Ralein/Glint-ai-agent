"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import {
  Sparkles,
  LayoutDashboard,
  Briefcase,
  Users,
  BookOpen,
  Bot,
  MessageSquare,
  Settings,
  LogOut,
  Shield,
  User,
  Code,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = {
  user: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/marketplace", label: "Marketplace", icon: Briefcase },
    { href: "/community", label: "Community", icon: Users },
    { href: "/learn", label: "Learning Hub", icon: BookOpen },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/settings", label: "Settings", icon: Settings },
  ],
  developer: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/marketplace", label: "Find Work", icon: Briefcase },
    { href: "/tools", label: "AI Tools", icon: Bot },
    { href: "/community", label: "Community", icon: Users },
    { href: "/learn", label: "Learning Hub", icon: BookOpen },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/settings", label: "Settings", icon: Settings },
  ],
  admin: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/users", label: "Manage Users", icon: Users },
    { href: "/admin/content", label: "Content", icon: BookOpen },
    { href: "/admin/analytics", label: "Analytics", icon: Shield },
    { href: "/marketplace", label: "Marketplace", icon: Briefcase },
    { href: "/settings", label: "Settings", icon: Settings },
  ],
}

const roleIcons = {
  user: User,
  developer: Code,
  admin: Shield,
}

const roleLabels = {
  user: "User",
  developer: "Developer",
  admin: "Admin",
}

export function DashboardSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  if (!user) return null

  const items = navItems[user.role]
  const RoleIcon = roleIcons[user.role]

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Sparkles className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && <span className="font-semibold tracking-tight">GlintAI</span>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-sidebar-foreground/60"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className={cn("mb-3 flex items-center", collapsed ? "justify-center" : "justify-end")}>
          <ThemeToggle className="text-sidebar-foreground/70" />
        </div>
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sidebar-accent">
            <RoleIcon className="h-5 w-5 text-sidebar-primary" />
          </div>
          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-sidebar-foreground/60">{roleLabels[user.role]}</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "mt-3 w-full justify-start text-sidebar-foreground/70 hover:text-destructive",
            collapsed && "justify-center px-0",
          )}
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Sign out</span>}
        </Button>
      </div>
    </aside>
  )
}
