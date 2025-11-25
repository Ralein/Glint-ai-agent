import { Briefcase, Users, BookOpen, Bot, MessageSquare, Shield } from "lucide-react"

const features = [
  {
    icon: Briefcase,
    title: "AI Job Marketplace",
    description:
      "Post AI projects, find developers, or apply to build innovative solutions. Connect talent with opportunity.",
    color: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
  },
  {
    icon: Users,
    title: "Community Network",
    description: "Share projects, exchange ideas, and engage in technical discussions with AI enthusiasts worldwide.",
    color: "from-secondary/20 to-secondary/5",
    iconBg: "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground",
  },
  {
    icon: BookOpen,
    title: "Learning Hub",
    description: "Access tutorials, guides, and resources to master AI development from beginner to advanced.",
    color: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground",
  },
  {
    icon: Bot,
    title: "AI Agent Builder",
    description: "Design, test, and deploy intelligent chatbots and agents with our built-in visual tools.",
    color: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Chat",
    description: "Seamless in-app communication for collaboration between users and developers on projects.",
    color: "from-secondary/20 to-secondary/5",
    iconBg: "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Secure authentication with personalized dashboards for admins, developers, and users.",
    color: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative border-t border-border/40 py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-card/50 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            Platform Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Everything you need to succeed in AI
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            From learning to earning, our platform bridges the gap with tools designed for the modern AI creator.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              <div className="relative">
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${feature.iconBg}`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
