"use client"
import { motion } from "framer-motion";
import { Code2, Database, Cloud, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";

const ANIMATION_KEY = "skillsPlayed";

export const SkillsPreview = () => {
  const [hasPlayed, setHasPlayed] = React.useState(true); // default: no animation on first SSR paint

  React.useEffect(() => {
    // runs only in browser
    const played = sessionStorage.getItem(ANIMATION_KEY);

    if (played) {
      setHasPlayed(true);
    } else {
      setHasPlayed(false);
      sessionStorage.setItem(ANIMATION_KEY, "true");
    }
  }, []);


  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Code2,
      color: "text-[hsl(290,80%,75%)]",
      bgColor: "from-purple-500/10 to-purple-500/5",
      glowColor: "group-hover:shadow-[0_0_30px_hsl(290,80%,75%,0.3)]",
      skills: [
        "React", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS",
        "CSS3", "Sass", "Redux", "Context API", "Zustand",
        "Vite", "Webpack", "Styled Components"
      ]
    },
    {
      title: "Backend Development",
      icon: Database,
      color: "text-[hsl(100,80%,70%)]",
      bgColor: "from-green-500/10 to-green-500/5",
      glowColor: "group-hover:shadow-[0_0_30px_hsl(100,80%,70%,0.3)]",
      skills: [
        "Node.js", "Express.js", "MongoDB", "PostgreSQL",
        "Redis", "JWT", "OAuth", "Passport.js",
        "RESTful API", "GraphQL"
      ]
    },
    {
      title: "DevOps & Cloud",
      icon: Cloud,
      color: "text-[hsl(200,80%,70%)]",
      bgColor: "from-blue-500/10 to-blue-500/5",
      glowColor: "group-hover:shadow-[0_0_30px_hsl(200,80%,70%,0.3)]",
      skills: [
        "AWS (EC2, S3, Lambda)", "Heroku", "Vercel",
        "Docker", "Kubernetes", "GitHub Actions",
        "Jenkins", "Git", "GitHub", "GitLab"
      ]
    },
    {
      title: "Tools & Practices",
      icon: Wrench,
      color: "text-[hsl(45,90%,70%)]",
      bgColor: "from-yellow-500/10 to-yellow-500/5",
      glowColor: "group-hover:shadow-[0_0_30px_hsl(45,90%,70%,0.3)]",
      skills: [
        "Agile/Scrum", "Test-driven Development",
        "Microservices Architecture", "Performance Optimization",
        "SEO Best Practices"
      ]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as any
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 relative min-h-full">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-purple-400 bg-clip-text text-transparent mb-3">
            Skills & Expertise
          </h2>
          <p className="text-white text-base sm:text-lg">
            A comprehensive toolkit built over 5+ years of hands-on development
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={item}
              className="group"
            >
              <div className="glow-card-wrapper h-full">
                <div className={`glow-card-inner p-6 bg-gradient-to-br ${category.bgColor}`}>
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-card/40 backdrop-blur-sm rounded-xl -z-10" />

                  {/* Category Header */}
                  <div className="relative flex items-center gap-3 mb-5">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm">
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills */}
                  <div className="relative flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: !hasPlayed ? skillIndex * 0.02 : 0,
                          duration: 0.3
                        }}
                      >
                        <Badge
                          variant="secondary"
                          className="px-3 py-1.5 bg-muted/60 hover:bg-muted backdrop-blur-sm text-foreground border border-border/50 hover:border-primary/40 transition-colors"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-white italic">
            Always learning and exploring new technologies • Current focus: AI/ML integration in web apps
          </p>
        </motion.div>
      </div>
    </div>
  );
};
