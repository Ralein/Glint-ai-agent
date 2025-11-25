import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const benefits = ["Free to get started", "No credit card required", "Join 10,000+ creators"]

export function CTASection() {
  return (
    <section className="relative border-t border-border/40 py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-secondary/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border/50 bg-card/50 p-8 text-center backdrop-blur-sm md:p-12">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Get Started Today
          </div>

          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-balance">
            Ready to join the AI revolution?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Start collaborating with thousands of AI creators today. Whether you're learning, building, or hiring.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="gap-2 shadow-lg shadow-primary/25">
                Create Free Account <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button size="lg" variant="outline" className="bg-background/50">
                Browse Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
