"use client"

import { Suspense, lazy } from 'react'
import { ArrowRight, Play, Zap, Shield, Users } from "lucide-react"
import { Button } from '@/components/ui/button'

const Spline = lazy(() => import('@splinetool/react-spline'))

const Spotlight = ({ className = '' }) => {
  return (
    <svg
      className={`animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      style={{
        animation: 'spotlight 2s ease 0.2s 1 forwards'
      }}
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill="rgb(147, 51, 234)"
          fillOpacity="0.21"
          className="dark:hidden"
        />
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill="rgb(168, 85, 247)"
          fillOpacity="0.21"
          className="hidden dark:block"
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-black dark:text-white">
      <style>{`
        @keyframes spotlight {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-purple-400/30 blur-[150px] dark:bg-purple-600/20" />
        <div className="absolute top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-purple-300/25 blur-[120px] dark:bg-purple-400/15" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-purple-200/20 blur-[100px] dark:bg-purple-500/10" />
      </div>

      {/* Grid pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[size:4rem_4rem] bg-[linear-gradient(to_right,rgba(139,92,246,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.2)_1px,transparent_1px)] opacity-[0.03] dark:bg-[linear-gradient(to_right,rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.1)_1px,transparent_1px)] dark:opacity-[0.05]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-300 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 backdrop-blur-sm dark:border-purple-500/30 dark:bg-purple-600/10 dark:text-purple-400">
              <span className="flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2 w-2 animate-ping rounded-full bg-purple-600 opacity-75 dark:bg-purple-500" />
                <span className="relative h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-500" />
              </span>
              Now in public beta — Join 10,000+ creators
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Where AI creators{" "}
              <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-purple-500 dark:to-purple-400">
                connect, learn,
              </span>{" "}
              and build together
            </h1>

            <p className="text-base leading-relaxed text-gray-600 md:text-lg lg:text-xl dark:text-gray-400 max-w-xl mx-auto lg:mx-0">
              The all-in-one platform for AI developers and enthusiasts. Find projects, hire talent, share knowledge, and
              master AI development with our community.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 pt-2">
              <Button
                size="lg"
                className="gap-2 shadow-lg shadow-purple-400/25 transition-shadow hover:shadow-xl hover:shadow-purple-400/30 dark:shadow-purple-600/25 dark:hover:shadow-purple-600/30"
              >
                Start Building <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 bg-white/50 backdrop-blur-sm dark:bg-black/50"
              >
                <Play className="h-4 w-4" /> Watch Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600 dark:text-gray-400 pt-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                <span>AI-powered matching</span>
              </div>
              <div className="hidden h-4 w-px bg-purple-300/50 sm:block dark:bg-purple-500/30" />
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                <span>Secure payments</span>
              </div>
              <div className="hidden h-4 w-px bg-purple-300/50 sm:block dark:bg-purple-500/30" />
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600 dark:text-purple-500" />
                <span>Global community</span>
              </div>
            </div>

            <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-6 backdrop-blur-sm dark:border-purple-500/20 dark:bg-purple-950/30">
              <span className="text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Trusted by teams at
              </span>
              <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-12 gap-y-4">
                {["OpenAI", "Anthropic", "Google", "Meta", "Microsoft"].map((company) => (
                  <span
                    key={company}
                    className="text-base font-semibold text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right content - 3D Scene */}
          <div className="relative h-[500px] lg:h-[650px] rounded-2xl border border-purple-200 bg-white/50 backdrop-blur-sm overflow-hidden dark:border-purple-500/20 dark:bg-black/50">
            <Spotlight
              className="-top-40 left-0 md:left-40 md:-top-20"
            />
            
            <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
              <Suspense 
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full border-4 border-purple-300 border-t-purple-600 animate-spin dark:border-purple-500/30 dark:border-t-purple-500" />
                  </div>
                }
              >
                <Spline
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}