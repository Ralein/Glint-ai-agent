import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Zap, Shield, Users } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-primary/20 blur-[150px]" />
        <div className="absolute top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-secondary/15 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-primary" />
            </span>
            Now in public beta — Join 10,000+ creators
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl text-balance">
            Where AI creators{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              connect, learn,
            </span>{" "}
            and build together
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl text-pretty">
            The all-in-one platform for AI developers and enthusiasts. Find projects, hire talent, share knowledge, and
            master AI development with our community.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button
                size="lg"
                className="gap-2 shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30"
              >
                Start Building <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/learn">
              <Button size="lg" variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm">
                <Play className="h-4 w-4" /> Watch Demo
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>AI-powered matching</span>
            </div>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Secure payments</span>
            </div>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Global community</span>
            </div>
          </div>

          <div className="mt-20 rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Trusted by teams at
            </span>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
              {["OpenAI", "Anthropic", "Google", "Meta", "Microsoft"].map((company) => (
                <span
                  key={company}
                  className="text-base font-semibold text-muted-foreground/80 transition-colors hover:text-foreground"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
