import Link from "next/link"
import { Sparkles, Github, Twitter } from "lucide-react"

const footerLinks = {
  Platform: [
    { name: "Marketplace", href: "/marketplace" },
    { name: "Community", href: "/community" },
    { name: "Learning Hub", href: "/learn" },
    { name: "AI Tools", href: "/tools" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  Legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Security", href: "/security" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="bg-gradient-to-b from-background to-card/50">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold tracking-tight">GlintAI</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                The all-in-one platform for AI developers and enthusiasts to connect, learn, and build together.
              </p>
              <div className="mt-6 flex gap-4">
                <Link
                  href="#"
                  className="rounded-lg border border-border/50 p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Twitter className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="rounded-lg border border-border/50 p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="mb-4 text-sm font-semibold">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border/50 bg-card/30 px-6 py-4 backdrop-blur-sm md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} GlintAI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/security" className="text-sm text-muted-foreground hover:text-foreground">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
