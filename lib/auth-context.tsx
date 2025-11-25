"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "user" | "developer" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  bio?: string
  skills?: string[]
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers: Record<string, User & { password: string }> = {
  "admin@glintai.com": {
    id: "1",
    email: "admin@glintai.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    createdAt: new Date(),
  },
  "dev@glintai.com": {
    id: "2",
    email: "dev@glintai.com",
    password: "dev123",
    name: "Sarah Developer",
    role: "developer",
    bio: "Full-stack AI developer specializing in LLMs and chatbots",
    skills: ["Python", "LangChain", "OpenAI", "React"],
    createdAt: new Date(),
  },
  "user@glintai.com": {
    id: "3",
    email: "user@glintai.com",
    password: "user123",
    name: "John User",
    role: "user",
    createdAt: new Date(),
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("glintai_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockUser = mockUsers[email.toLowerCase()]
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser
      setUser(userWithoutPassword)
      localStorage.setItem("glintai_user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    throw new Error("Invalid email or password")
  }

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (mockUsers[email.toLowerCase()]) {
      setIsLoading(false)
      throw new Error("Email already exists")
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      createdAt: new Date(),
    }

    setUser(newUser)
    localStorage.setItem("glintai_user", JSON.stringify(newUser))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("glintai_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
