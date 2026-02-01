"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

export const ExperiencePreview = () => {
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const played = sessionStorage.getItem("experiencePlayed");
    if (!played) {
      sessionStorage.setItem("experiencePlayed", "true");
      setHasPlayed(false);
    } else {
      setHasPlayed(true);
    }
  }, []);

  const experiences = [
    {
      company: "Tech Corp",
      role: "Senior Full Stack Developer",
      period: "2022 - Present",
      description: "Leading development of cloud-based solutions and mentoring junior developers.",
      achievements: [
        "Architected and deployed microservices handling 1M+ requests/day",
        "Reduced deployment time by 60% through CI/CD optimization",
        "Led team of 5 developers on multiple projects"
      ],
      tech: ["React", "Node.js", "AWS", "Docker", "PostgreSQL"],
      color: "from-blue-500/20 to-cyan-500/20",
      glowColor: "hover:shadow-[0_0_40px_hsl(207,100%,50%,0.4)]"
    },
    {
      company: "StartUp Inc",
      role: "Full Stack Developer",
      period: "2020 - 2022",
      description: "Built and maintained web applications for various clients.",
      achievements: [
        "Developed 15+ client projects from concept to deployment",
        "Implemented real-time features using WebSocket",
        "Improved application performance by 40%"
      ],
      tech: ["React", "Express", "MongoDB", "Redis"],
      color: "from-purple-500/20 to-pink-500/20",
      glowColor: "hover:shadow-[0_0_40px_hsl(270,90%,60%,0.4)]"
    },
    {
      company: "Digital Agency",
      role: "Frontend Developer",
      period: "2019 - 2020",
      description: "Created responsive web interfaces and interactive user experiences.",
      achievements: [
        "Built 20+ responsive landing pages and web apps",
        "Collaborated with designers to implement pixel-perfect UIs",
        "Introduced modern build tools and workflows"
      ],
      tech: ["JavaScript", "Vue.js", "SASS", "Webpack"],
      color: "from-green-500/20 to-emerald-500/20",
      glowColor: "hover:shadow-[0_0_40px_hsl(100,80%,50%,0.4)]"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -40 },
    show: { 
      opacity: 1, 
      x: 0,
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
      <div className="max-w-5xl mx-auto">
        <motion.div variants={item} className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Work Experience</h1>
          <p className="text-white">My professional journey in tech</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

          <div className="space-y-6">
            {experiences.map((exp) => (
              <motion.div
                key={exp.company}
                variants={item}
                className="relative group"
              >
                {/* Timeline node */}
                <div className="absolute left-6 top-8 w-5 h-5 rounded-full bg-primary ring-4 ring-primary/20 ring-offset-4 ring-offset-background hidden md:block" />

                <div className="glow-card-wrapper md:ml-20">
                  <div className="glow-card-inner p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>

                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="text-xl font-bold">{exp.role}</h3>
                              <p className="text-primary font-medium">{exp.company}</p>
                            </div>
                            <Badge variant="outline" className="shrink-0">
                              {exp.period}
                            </Badge>
                          </div>
                          <p className="text-sm text-white">{exp.description}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Key Achievements:</h4>
                          <ul className="space-y-1.5">
                            {exp.achievements.map((achievement) => (
                              <li key={achievement} className="text-sm text-white flex items-start">
                                <span className="text-primary mr-2 shrink-0">▸</span>
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                          {exp.tech.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
