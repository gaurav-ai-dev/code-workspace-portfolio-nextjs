export const portfolioContent = {
  "about.js": `// about.js - Personal Introduction
// Hi, I'm Gaurav 👋
// Welcome to my world of code.

const developer = {
  name: "Gaurav",
  title: "Full-Stack MERN Developer",
  location: "San Francisco, CA",
  status: "Open to opportunities 🚀",
  
  bio: \`
    Passionate MERN stack developer with 5+ years of experience
    building scalable, high-performance web applications.
    
    I specialize in crafting elegant solutions to complex problems
    and staying at the cutting edge of web technologies.
    
    My mission: Transform ideas into impactful digital experiences.
  \`,
  
  interests: [
    "🛠️ Building developer tools",
    "🌐 Open source contributions",
    "🏗️ System architecture & design patterns",
    "⚡ Performance optimization",
    "🤖 AI/ML integration in web apps",
    "📱 Mobile-first responsive design"
  ],
  
  education: {
    degree: "B.S. Computer Science",
    university: "Tech University",
    year: 2018,
    achievements: [
      "Dean's List (4 years)",
      "CS Department Award",
      "Published research on web performance"
    ]
  },
  
  values: [
    "Clean, maintainable code",
    "User-centric design",
    "Continuous learning",
    "Collaboration & mentorship"
  ]
};

export default developer;

/* 
 * Fun facts about me:
 * - Contributed to 50+ open source projects
 * - Mentored 20+ junior developers
 * - Coffee enthusiast ☕
 * - Believe in code reviews as love letters
 */`,

  "skills.js": `// skills.js - Technical Skills & Expertise

const skills = {
  frontend: {
    core: ["React", "TypeScript", "JavaScript (ES6+)"],
    styling: ["Tailwind CSS", "CSS3", "Sass", "Styled Components"],
    stateManagement: ["Redux", "Context API", "Zustand"],
    tools: ["Vite", "Webpack", "npm", "yarn"]
  },
  
  backend: {
    runtime: ["Node.js", "Express.js"],
    databases: ["MongoDB", "PostgreSQL", "Redis"],
    authentication: ["JWT", "OAuth", "Passport.js"],
    api: ["RESTful API", "GraphQL"]
  },
  
  devOps: {
    cloud: ["AWS (EC2, S3, Lambda)", "Heroku", "Vercel"],
    containerization: ["Docker", "Kubernetes"],
    ci_cd: ["GitHub Actions", "Jenkins"],
    version_control: ["Git", "GitHub", "GitLab"]
  },
  
  additional: [
    "Agile/Scrum methodology",
    "Test-driven development",
    "Microservices architecture",
    "Performance optimization",
    "SEO best practices"
  ]
};

export default skills;

/* 
  Always learning and exploring new technologies!
  Current focus: AI/ML integration in web apps
*/`,

  "projects.js": `// projects.js - Featured Projects

const projects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    tech_stack: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    features: [
      "User authentication & authorization",
      "Product catalog with search/filters",
      "Shopping cart & checkout",
      "Payment processing with Stripe",
      "Admin dashboard for inventory management"
    ],
    links: {
      github: "https://github.com/gaurav-ai-dev/ecommerce-platform",
      live: "https://ecommerce-demo.vercel.app"
    },
    highlight: "Improved checkout conversion rate by 35% with optimized UX",
    metrics: {
      users: "10K+ active users",
      performance: "98% Lighthouse score",
      impact: "Processing $100K+ monthly transactions"
    }
  },
  
  {
    id: 2,
    name: "Task Management App",
    description: "Real-time collaborative project management tool",
    tech_stack: ["React", "Express.js", "PostgreSQL", "Socket.io", "Redis"],
    features: [
      "Real-time collaboration with WebSocket",
      "Drag-and-drop Kanban interface",
      "Team workspaces & role management",
      "File attachments & cloud storage",
      "Activity timeline & notifications"
    ],
    links: {
      github: "https://github.com/gaurav-ai-dev/task-manager",
      live: "https://taskapp-demo.vercel.app"
    },
    highlight: "Reduced server costs by 40% through Redis caching optimization",
    metrics: {
      teams: "500+ teams using it",
      uptime: "99.9% uptime",
      impact: "Managing 50K+ tasks daily"
    }
  },
  
  {
    id: 3,
    name: "Social Media Analytics Dashboard",
    description: "Multi-platform analytics and automation tool",
    tech_stack: ["React", "Node.js", "MongoDB", "Chart.js", "Bull Queue"],
    features: [
      "Multi-platform data integration (Twitter, Instagram, Facebook)",
      "Real-time analytics with custom metrics",
      "Automated report generation",
      "Scheduled post management",
      "Sentiment analysis using NLP"
    ],
    links: {
      github: "https://github.com/gaurav-ai-dev/social-dashboard",
      live: "https://social-analytics-demo.vercel.app"
    },
    highlight: "Processes 1M+ social media posts daily with 99.5% accuracy",
    metrics: {
      api_calls: "1M+ API calls/day",
      data_processed: "5TB+ data processed monthly",
      impact: "Saved clients 100+ hours/week on manual reporting"
    }
  }
];

export default projects;

// More projects: github.com/gaurav-ai-dev | Portfolio: gaurav-ai-dev.`,

  "experience.js": `// experience.js - Professional Experience

const workExperience = [
  {
    id: 1,
    company: "Tech Innovations Inc.",
    position: "Senior Full-Stack Developer",
    duration: "2021 - Present",
    location: "San Francisco, CA",
    type: "Full-time",
    responsibilities: [
      "Lead development of core product features",
      "Architect scalable microservices infrastructure",
      "Mentor junior developers and conduct code reviews",
      "Optimize application performance (50% improvement)",
      "Collaborate with cross-functional teams"
    ],
    technologies: [
      "React", "Node.js", "MongoDB", "AWS", "Docker", "Kubernetes"
    ],
    achievements: [
      "Reduced API response time by 60%",
      "Implemented CI/CD pipeline reducing deployment time by 80%",
      "Led team of 5 developers on major product overhaul"
    ]
  },
  
  {
    id: 2,
    company: "Digital Solutions LLC",
    position: "Full-Stack Developer",
    duration: "2019 - 2021",
    location: "Remote",
    type: "Full-time",
    responsibilities: [
      "Developed and maintained client web applications",
      "Built RESTful APIs and database schemas",
      "Implemented responsive UI components",
      "Participated in agile ceremonies and sprint planning"
    ],
    technologies: [
      "React", "Express", "PostgreSQL", "Redux", "Jest"
    ],
    achievements: [
      "Delivered 15+ client projects on time",
      "Improved test coverage from 40% to 85%",
      "Created reusable component library"
    ]
  },
  
  {
    id: 3,
    company: "StartUp Ventures",
    position: "Junior Developer",
    duration: "2018 - 2019",
    location: "San Francisco, CA",
    type: "Full-time",
    responsibilities: [
      "Assisted in frontend development",
      "Fixed bugs and wrote unit tests",
      "Collaborated with design team on UI/UX",
      "Participated in code reviews"
    ],
    technologies: [
      "JavaScript", "HTML/CSS", "React", "Git"
    ],
    achievements: [
      "Contributed to 3 major product releases",
      "Reduced bug count by 40%"
    ]
  }
];

export default workExperience;`,

  "contact.js": `// contact.js - Get In Touch

const contactInfo = {
  email: "ggarg1308@gmail.com",
  phone: "+91 (852) 968-1236",
  location: "San Francisco, CA",
  
  social: {
    github: "https://github.com/gaurav-ai-dev",
    linkedin: "https://linkedin.com/in/gaurav-garg-full-stack-dev/",
    instagram: "https://www.instagram.com/_gaurav_ai/",
    portfolio: "https://gauravai-nine.vercel.app/"
  },
  
  availability: {
    status: "open_to_opportunities",
    preferred_roles: [
      "Senior Full-Stack Developer",
      "Lead Developer",
      "Technical Architect"
    ],
    work_type: ["Remote", "Hybrid", "On-site"],
    notice_period: "2 weeks"
  }
};

// Contact form handler
const sendMessage = async (messageData) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageData)
    });
    
    if (response.ok) {
      return { success: true, message: 'Message sent successfully!' };
    }
  } catch (error) {
    return { success: false, message: 'Failed to send message' };
  }
};

export { contactInfo, sendMessage };

/* 
  Feel free to reach out! I'm always interested in
  discussing new projects and opportunities.
*/`,

  "blog.js": `// blog.js - Technical Blog & Insights
// Sharing knowledge and experiences from the dev trenches

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    date: "2024-01-15",
    category: "React",
    readTime: "8 min read",
    excerpt: \`
      Lessons learned from scaling a React app to 
      handle 1M+ daily active users. Covering code 
      splitting, memoization, and state management.
    \`,
    tags: ["React", "Performance", "Architecture"],
    featured: true
  },
  
  {
    id: 2,
    title: "MongoDB vs PostgreSQL: When to Use Which",
    date: "2024-01-08",
    category: "Database",
    readTime: "6 min read",
    excerpt: \`
      A practical comparison based on real project 
      experiences. Understanding trade-offs between 
      flexibility and ACID compliance.
    \`,
    tags: ["MongoDB", "PostgreSQL", "Backend"],
    featured: true
  },
  
  {
    id: 3,
    title: "Mastering TypeScript Generics",
    date: "2023-12-20",
    category: "TypeScript",
    readTime: "10 min read",
    excerpt: \`
      Deep dive into TypeScript generics with practical 
      examples. From basic usage to advanced patterns 
      like conditional types and mapped types.
    \`,
    tags: ["TypeScript", "JavaScript", "Types"],
    featured: false
  },
  
  {
    id: 4,
    title: "Optimizing Node.js API Performance",
    date: "2023-12-10",
    category: "Backend",
    readTime: "7 min read",
    excerpt: \`
      Techniques that helped reduce our API response 
      time by 60%. Covering caching strategies, 
      database optimization, and async patterns.
    \`,
    tags: ["Node.js", "Performance", "API"],
    featured: false
  },
  
  {
    id: 5,
    title: "Docker for Frontend Developers",
    date: "2023-11-28",
    category: "DevOps",
    readTime: "5 min read",
    excerpt: \`
      A beginner-friendly guide to containerizing 
      React applications. Setting up development 
      environments that work everywhere.
    \`,
    tags: ["Docker", "DevOps", "React"],
    featured: false
  }
];

const blogStats = {
  totalPosts: 25,
  totalReaders: "15K+",
  avgReadTime: "7 min",
  topCategories: ["React", "Node.js", "TypeScript", "DevOps"]
};

export { blogPosts, blogStats };

/* 
  Writing helps me learn and share knowledge.
  New posts every week! Subscribe for updates.
*/`
};
