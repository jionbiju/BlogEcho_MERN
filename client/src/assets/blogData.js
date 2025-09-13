import img1 from './img1.jpg';
import img2 from './img2.webp';
import img3 from './img3.avif';
import img4 from './img4.jpg';
import img5 from './img5.png';
import img6 from './img6.svg';
import img7 from './img7.webp';
import img8 from './img8.webp';
import img9 from './img9.png';
import img10 from './img10.jpg';
import img11 from './img11.jpg';
import img12 from './img12.webp';


const blogData = [
 
  {
    id: 1,
    title: "The Future of Web Development in 2025",
    slug: "future-web-development-2025",
    excerpt: "Exploring the latest trends, frameworks, and technologies that will revolutionize web development in the coming years.",
    content: "Web development continues to evolve at breakneck speed. From AI-powered development tools to new JavaScript frameworks, the landscape is changing rapidly. React Server Components are gaining traction, while new meta-frameworks like Next.js 15 are pushing the boundaries of what's possible...",
    category: "Technology",
    author: {
      name: "Alex Chen",
      avatar: "https://via.placeholder.com/50x50/3b82f6/ffffff?text=AC",
      role: "Full Stack Developer"
    },
    publishDate: "2024-12-15",
    readTime: "8 min read",
    image: img1,
    tags: ["React", "JavaScript", "Web Development", "Future Tech"],
    views: 2540,
    likes: 189
  },
  {
    id: 2,
    title: "Mastering React Server Components",
    slug: "mastering-react-server-components",
    excerpt: "A comprehensive guide to understanding and implementing React Server Components in your applications.",
    content: "React Server Components represent a paradigm shift in how we build React applications. They allow us to render components on the server, reducing bundle size and improving performance...",
    category: "Technology",
    author: {
      name: "Sarah Johnson",
      avatar: "https://via.placeholder.com/50x50/8b5cf6/ffffff?text=SJ",
      role: "Senior React Developer"
    },
    publishDate: "2024-12-10",
    readTime: "12 min read",
    image: img2,
    tags: ["React", "Server Components", "Performance", "Tutorial"],
    views: 1832,
    likes: 156
  },
  {
    id: 3,
    title: "AI-Powered Code Generation: Tools and Techniques",
    slug: "ai-powered-code-generation",
    excerpt: "Discover how AI tools like GitHub Copilot and ChatGPT are transforming the way developers write code.",
    content: "The integration of AI into software development is no longer science fiction. Tools like GitHub Copilot, ChatGPT, and Cursor IDE are revolutionizing how we approach coding challenges...",
    category: "Technology",
    author: {
      name: "Michael Rodriguez",
      avatar: "https://via.placeholder.com/50x50/10b981/ffffff?text=MR",
      role: "AI Engineering Lead"
    },
    publishDate: "2024-12-08",
    readTime: "10 min read",
    image: img3 ,
    tags: ["AI", "Machine Learning", "Developer Tools", "Automation"],
    views: 3210,
    likes: 267
  },

  // Business Category
  {
    id: 4,
    title: "Building a Tech Startup in 2025: Essential Guide",
    slug: "building-tech-startup-2025",
    excerpt: "Key strategies, funding options, and market insights for launching a successful technology startup in today's competitive landscape.",
    content: "Starting a tech company in 2025 requires more than just a great idea. With increased competition and evolving market conditions, founders need to be strategic about product development, funding, and scaling...",
    category: "Business",
    author: {
      name: "Emily Zhang",
      avatar: "https://via.placeholder.com/50x50/ef4444/ffffff?text=EZ",
      role: "Startup Advisor"
    },
    publishDate: "2024-12-12",
    readTime: "15 min read",
    image: img4,
    tags: ["Startup", "Entrepreneurship", "Funding", "Business Strategy"],
    views: 1945,
    likes: 203
  },
  {
    id: 5,
    title: "Remote Team Management: Best Practices",
    slug: "remote-team-management-best-practices",
    excerpt: "Proven strategies for managing distributed teams, maintaining productivity, and fostering company culture in remote work environments.",
    content: "The shift to remote work has fundamentally changed how we manage teams. Successful remote management requires new skills, tools, and approaches to communication, collaboration, and culture building...",
    category: "Business",
    author: {
      name: "David Park",
      avatar: "https://via.placeholder.com/50x50/06b6d4/ffffff?text=DP",
      role: "Operations Director"
    },
    publishDate: "2024-12-06",
    readTime: "11 min read",
    image: img5,
    tags: ["Remote Work", "Management", "Team Building", "Productivity"],
    views: 1567,
    likes: 134
  },
  {
    id: 6,
    title: "The Economics of SaaS: Pricing Strategies That Work",
    slug: "saas-pricing-strategies",
    excerpt: "Analyzing successful SaaS pricing models and how to optimize your subscription business for maximum growth and retention.",
    content: "Pricing is one of the most critical decisions for SaaS companies. The right pricing strategy can make or break your business, affecting everything from customer acquisition to long-term retention...",
    category: "Business",
    author: {
      name: "Lisa Thompson",
      avatar: "https://via.placeholder.com/50x50/8b5cf6/ffffff?text=LT",
      role: "SaaS Consultant"
    },
    publishDate: "2024-12-04",
    readTime: "9 min read",
    image: img6,
    tags: ["SaaS", "Pricing", "Business Model", "Revenue"],
    views: 2103,
    likes: 178
  },

  // Lifestyle Category
  {
    id: 7,
    title: "Digital Minimalism: Living Intentionally in a Connected World",
    slug: "digital-minimalism-guide",
    excerpt: "Practical strategies for reducing digital clutter, improving focus, and creating a healthier relationship with technology.",
    content: "In our hyper-connected world, digital minimalism has emerged as a powerful philosophy for reclaiming our attention and living more intentionally. It's not about rejecting technology, but using it purposefully...",
    category: "Lifestyle",
    author: {
      name: "Maya Patel",
      avatar: "https://via.placeholder.com/50x50/10b981/ffffff?text=MP",
      role: "Wellness Coach"
    },
    publishDate: "2024-12-11",
    readTime: "7 min read",
    image: img7,
    tags: ["Minimalism", "Digital Wellness", "Productivity", "Mindfulness"],
    views: 1876,
    likes: 245
  },
  {
    id: 8,
    title: "The Developer's Guide to Work-Life Balance",
    slug: "developer-work-life-balance",
    excerpt: "How software developers can maintain mental health, prevent burnout, and create sustainable career practices.",
    content: "The tech industry's demanding pace can lead to burnout and poor work-life balance. As developers, we need to be intentional about creating boundaries and maintaining our well-being...",
    category: "Lifestyle",
    author: {
      name: "James Wilson",
      avatar: "https://via.placeholder.com/50x50/f59e0b/ffffff?text=JW",
      role: "Senior Developer"
    },
    publishDate: "2024-12-07",
    readTime: "6 min read",
    image: img8,
    tags: ["Work-Life Balance", "Mental Health", "Developer Life", "Wellness"],
    views: 2234,
    likes: 298
  },
  {
    id: 9,
    title: "Building Healthy Habits for Creative Professionals",
    slug: "healthy-habits-creative-professionals",
    excerpt: "Essential habits and routines that boost creativity, energy, and long-term success in creative careers.",
    content: "Creative work requires mental clarity, sustained energy, and inspiration. Building the right habits can dramatically improve both your creative output and personal well-being...",
    category: "Lifestyle",
    author: {
      name: "Sophie Martin",
      avatar: "https://via.placeholder.com/50x50/ec4899/ffffff?text=SM",
      role: "Creative Director"
    },
    publishDate: "2024-12-03",
    readTime: "8 min read",
    image: img9,
    tags: ["Creativity", "Habits", "Health", "Productivity"],
    views: 1654,
    likes: 187
  },

  // Travel Category
  {
    id: 10,
    title: "Digital Nomad Destinations for 2025",
    slug: "digital-nomad-destinations-2025",
    excerpt: "Top cities and countries offering the best infrastructure, community, and lifestyle for remote workers and digital nomads.",
    content: "The digital nomad lifestyle continues to grow in popularity. From Lisbon to Medellín, these destinations offer the perfect blend of affordability, connectivity, and community for remote workers...",
    category: "Travel",
    author: {
      name: "Carlos Rivera",
      avatar: "https://via.placeholder.com/50x50/06b6d4/ffffff?text=CR",
      role: "Travel Blogger"
    },
    publishDate: "2024-12-09",
    readTime: "12 min read",
    image: img10,
    tags: ["Digital Nomad", "Remote Work", "Travel", "Lifestyle"],
    views: 2876,
    likes: 312
  },
  {
    id: 11,
    title: "Sustainable Travel: Eco-Friendly Adventures",
    slug: "sustainable-travel-guide",
    excerpt: "How to explore the world responsibly while minimizing your environmental impact and supporting local communities.",
    content: "Sustainable travel is about making conscious choices that reduce our environmental footprint while still experiencing the beauty and diversity of our planet...",
    category: "Travel",
    author: {
      name: "Emma Thompson",
      avatar: "https://via.placeholder.com/50x50/10b981/ffffff?text=ET",
      role: "Sustainable Travel Advocate"
    },
    publishDate: "2024-12-05",
    readTime: "9 min read",
    image: img11,
    tags: ["Sustainable Travel", "Environment", "Eco-friendly", "Responsible Tourism"],
    views: 1432,
    likes: 156
  },
  {
    id: 12,
    title: "Photography Tips for Travel Bloggers",
    slug: "photography-tips-travel-bloggers",
    excerpt: "Essential techniques and equipment recommendations for capturing stunning travel photos that tell compelling stories.",
    content: "Great travel photography goes beyond pretty pictures—it tells stories, captures emotions, and shares experiences. Whether you're using a smartphone or professional camera...",
    category: "Travel",
    author: {
      name: "Ryan Foster",
      avatar: "https://via.placeholder.com/50x50/8b5cf6/ffffff?text=RF",
      role: "Travel Photographer"
    },
    publishDate: "2024-12-01",
    readTime: "10 min read",
    image: img12,
    tags: ["Photography", "Travel", "Blogging", "Visual Storytelling"],
    views: 1789,
    likes: 201
  }
];

export default blogData;