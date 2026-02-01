"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";

export const ProjectsPreview = () => {
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const played = sessionStorage.getItem("projectsPlayed");
    if (!played) {
      sessionStorage.setItem("projectsPlayed", "true");
      setHasPlayed(false);
    } else {
      setHasPlayed(true);
    }
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with real-time inventory management and payment processing.",
      image: "/projects/himaaksh.webp",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      github: "#",
      demo: "#",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates and team collaboration features.",
      image: "/placeholder.svg",
      tech: ["React", "Firebase", "TypeScript", "Tailwind"],
      github: "#",
      demo: "#",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "AI Content Generator",
      description: "AI-powered content generation tool using GPT-4 API for marketing and blog content.",
      image: "/placeholder.svg",
      tech: ["Next.js", "OpenAI", "Prisma", "AWS"],
      github: "#",
      demo: "#",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather dashboard with forecasts, maps, and historical data visualization.",
      image: "/placeholder.svg",
      tech: ["Vue.js", "Chart.js", "Weather API", "Docker"],
      github: "#",
      demo: "#",
      gradient: "from-orange-500/20 to-yellow-500/20"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as any
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial={hasPlayed ? "show" : "hidden"}
      animate="show"
      className="min-h-full p-4 sm:p-8 relative"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div variants={item} className="mb-8">
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h1>
          <p className="text-white text-lg">Showcasing my recent work and innovative solutions</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={item}
              className="group"
            >
              <div className="glow-card-wrapper h-full">
                <div className="glow-card-inner overflow-hidden">
                  {/* Project Image - Clean, no overlay */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs bg-muted/60 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-border/50 hover:border-primary/40 hover:bg-primary/5"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
