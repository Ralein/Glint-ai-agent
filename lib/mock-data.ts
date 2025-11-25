export interface Job {
  id: string
  title: string
  description: string
  budget: string
  budgetType: "fixed" | "hourly"
  category: string
  skills: string[]
  postedBy: {
    id: string
    name: string
    avatar?: string
  }
  postedAt: Date
  deadline: Date
  status: "open" | "in-progress" | "completed" | "cancelled"
  applicants: number
  applications?: Application[]
}

export interface Application {
  id: string
  jobId: string
  developerId: string
  developerName: string
  coverLetter: string
  proposedBudget: string
  estimatedDuration: string
  status: "pending" | "accepted" | "rejected"
  appliedAt: Date
}

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Build a Customer Support Chatbot",
    description:
      "We need an AI-powered chatbot that can handle customer inquiries, provide product information, and escalate complex issues to human agents. The chatbot should integrate with our existing CRM and support ticket system.",
    budget: "$2,500",
    budgetType: "fixed",
    category: "Chatbot Development",
    skills: ["LangChain", "OpenAI API", "Python", "REST APIs"],
    postedBy: { id: "3", name: "John User" },
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    status: "open",
    applicants: 12,
  },
  {
    id: "2",
    title: "LLM Fine-tuning for Legal Documents",
    description:
      "Looking for an expert to fine-tune an open-source LLM on our proprietary legal document dataset. Must have experience with legal NLP and ensure compliance with data privacy regulations.",
    budget: "$150/hr",
    budgetType: "hourly",
    category: "Model Training",
    skills: ["PyTorch", "Transformers", "NLP", "Legal AI"],
    postedBy: { id: "4", name: "LegalTech Inc." },
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: "open",
    applicants: 8,
  },
  {
    id: "3",
    title: "AI-Powered Content Generator",
    description:
      "Build a content generation tool that creates SEO-optimized blog posts, social media content, and marketing copy. Should include tone adjustment and multi-language support.",
    budget: "$3,000",
    budgetType: "fixed",
    category: "Content AI",
    skills: ["OpenAI API", "Next.js", "TypeScript", "SEO"],
    postedBy: { id: "5", name: "Marketing Pro" },
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    status: "open",
    applicants: 15,
  },
  {
    id: "4",
    title: "Voice Assistant Integration",
    description:
      "Integrate AI voice capabilities into our mobile app. Need speech-to-text, natural language understanding, and text-to-speech features with low latency.",
    budget: "$4,500",
    budgetType: "fixed",
    category: "Voice AI",
    skills: ["Whisper API", "React Native", "WebSockets", "Audio Processing"],
    postedBy: { id: "6", name: "AppVentures" },
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
    status: "in-progress",
    applicants: 6,
  },
  {
    id: "5",
    title: "Sentiment Analysis Dashboard",
    description:
      "Create a real-time sentiment analysis dashboard for monitoring brand mentions across social media. Should include visualizations and alert system for negative sentiment spikes.",
    budget: "$80/hr",
    budgetType: "hourly",
    category: "Analytics",
    skills: ["Python", "NLP", "React", "Data Visualization"],
    postedBy: { id: "7", name: "BrandWatch Corp" },
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    status: "open",
    applicants: 10,
  },
]

export interface Post {
  id: string
  author: {
    id: string
    name: string
    role: "user" | "developer" | "admin"
    avatar?: string
  }
  content: string
  tags: string[]
  likes: number
  comments: Comment[]
  createdAt: Date
  isLiked?: boolean
}

export interface Comment {
  id: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  content: string
  createdAt: Date
}

export const mockPosts: Post[] = [
  {
    id: "1",
    author: { id: "2", name: "Sarah Chen", role: "developer" },
    content:
      "Just finished building my first AI agent with LangChain and it's incredible! The ability to chain together different LLM calls with custom tools opens up so many possibilities. Here's what I learned:\n\n1. Start simple - don't overcomplicate your agent architecture\n2. Use memory wisely - conversation history matters\n3. Error handling is crucial for production\n\nWho else is building with LangChain? Would love to connect!",
    tags: ["LangChain", "AI Agents", "Python"],
    likes: 234,
    comments: [
      {
        id: "c1",
        author: { id: "5", name: "Mike Johnson" },
        content: "Great insights! Memory management was a challenge for me too.",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "c2",
        author: { id: "6", name: "Emily Davis" },
        content: "Would love to see a tutorial on this!",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
    ],
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: "2",
    author: { id: "5", name: "Mike Johnson", role: "developer" },
    content:
      "GPT-4 vs Claude 3: After using both extensively for code generation, here's my honest take:\n\n• GPT-4: Better at creative problem-solving and explaining complex concepts\n• Claude 3: More reliable for following specific instructions and formatting\n\nBoth have their strengths. What's your experience?",
    tags: ["GPT-4", "Claude", "Comparison"],
    likes: 189,
    comments: [
      {
        id: "c3",
        author: { id: "2", name: "Sarah Chen" },
        content: "I've found Claude better for longer context windows!",
        createdAt: new Date(Date.now() - 30 * 60 * 60 * 1000),
      },
    ],
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: "3",
    author: { id: "6", name: "Emily Davis", role: "user" },
    content:
      "Looking for recommendations! We need to build a document Q&A system for our legal team. Should we:\n\n1. Use RAG with vector databases\n2. Fine-tune a model on our documents\n3. Use a combination approach\n\nBudget is around $5k for development. Any developers interested in discussing?",
    tags: ["RAG", "Document AI", "Legal Tech"],
    likes: 156,
    comments: [],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    author: { id: "7", name: "Alex Rivera", role: "developer" },
    content:
      "Pro tip: When working with OpenAI's API, always implement exponential backoff for rate limits. Here's a simple pattern I use:\n\n```python\nimport time\nfrom openai import RateLimitError\n\ndef call_with_retry(func, max_retries=3):\n    for i in range(max_retries):\n        try:\n            return func()\n        except RateLimitError:\n            time.sleep(2 ** i)\n    raise Exception('Max retries exceeded')\n```\n\nSaved me so many headaches in production!",
    tags: ["OpenAI", "Python", "Best Practices"],
    likes: 312,
    comments: [
      {
        id: "c4",
        author: { id: "2", name: "Sarah Chen" },
        content: "This is gold! Adding to my utils folder right now.",
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      },
    ],
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
  },
]

export interface Tutorial {
  id: string
  title: string
  description: string
  author: {
    id: string
    name: string
  }
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: string
  lessons: number
  enrolled: number
  rating: number
  image: string
  tags: string[]
  createdAt: Date
}

export const mockTutorials: Tutorial[] = [
  {
    id: "1",
    title: "Introduction to LangChain",
    description:
      "Learn the fundamentals of building AI applications with LangChain. Cover chains, agents, memory, and integrations.",
    author: { id: "2", name: "Sarah Chen" },
    category: "AI Frameworks",
    difficulty: "beginner",
    duration: "4 hours",
    lessons: 12,
    enrolled: 2834,
    rating: 4.9,
    image: "/langchain-ai-framework-tutorial.jpg",
    tags: ["LangChain", "Python", "AI Agents"],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Fine-tuning LLMs with PyTorch",
    description: "Master the art of fine-tuning large language models. Learn PEFT, LoRA, and QLoRA techniques.",
    author: { id: "7", name: "Alex Rivera" },
    category: "Model Training",
    difficulty: "advanced",
    duration: "8 hours",
    lessons: 20,
    enrolled: 1256,
    rating: 4.8,
    image: "/pytorch-llm-fine-tuning-neural-network.jpg",
    tags: ["PyTorch", "Fine-tuning", "LoRA"],
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Building RAG Applications",
    description:
      "Create powerful retrieval-augmented generation systems. Learn vector databases, embeddings, and search strategies.",
    author: { id: "5", name: "Mike Johnson" },
    category: "RAG Systems",
    difficulty: "intermediate",
    duration: "6 hours",
    lessons: 15,
    enrolled: 3421,
    rating: 4.7,
    image: "/rag-retrieval-augmented-generation-system-diagram.jpg",
    tags: ["RAG", "Vector DB", "Embeddings"],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    title: "Prompt Engineering Masterclass",
    description: "Learn advanced prompt engineering techniques to get the best results from any LLM.",
    author: { id: "2", name: "Sarah Chen" },
    category: "Prompt Engineering",
    difficulty: "intermediate",
    duration: "3 hours",
    lessons: 10,
    enrolled: 5678,
    rating: 4.9,
    image: "/prompt-engineering-ai-text-generation.jpg",
    tags: ["Prompts", "GPT-4", "Claude"],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    title: "OpenAI API Complete Guide",
    description: "From basics to advanced: learn to use the OpenAI API for text, images, audio, and more.",
    author: { id: "6", name: "Emily Davis" },
    category: "APIs",
    difficulty: "beginner",
    duration: "5 hours",
    lessons: 18,
    enrolled: 4521,
    rating: 4.6,
    image: "/openai-api-integration-coding.jpg",
    tags: ["OpenAI", "API", "GPT"],
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
  },
  {
    id: "6",
    title: "Building AI Chatbots",
    description: "Create production-ready chatbots with conversation memory, context handling, and integrations.",
    author: { id: "7", name: "Alex Rivera" },
    category: "Chatbots",
    difficulty: "intermediate",
    duration: "7 hours",
    lessons: 16,
    enrolled: 2987,
    rating: 4.8,
    image: "/ai-chatbot-interface.png",
    tags: ["Chatbots", "NLP", "Conversational AI"],
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
  },
]

export const categories = [
  "All Categories",
  "Chatbot Development",
  "Model Training",
  "Content AI",
  "Voice AI",
  "Analytics",
  "Computer Vision",
  "NLP",
  "Automation",
  "AI Frameworks",
  "RAG Systems",
  "Prompt Engineering",
  "APIs",
  "Chatbots",
]

export const skillsList = [
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "LangChain",
  "OpenAI API",
  "PyTorch",
  "TensorFlow",
  "NLP",
  "Computer Vision",
  "REST APIs",
  "GraphQL",
  "AWS",
  "Docker",
]

export const trendingTags = [
  "LangChain",
  "GPT-4",
  "RAG",
  "Fine-tuning",
  "Prompt Engineering",
  "Claude",
  "AI Agents",
  "Vector DB",
]

export const tutorialCategories = [
  "All Categories",
  "AI Frameworks",
  "Model Training",
  "RAG Systems",
  "Prompt Engineering",
  "APIs",
  "Chatbots",
]
