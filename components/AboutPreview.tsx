"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github, Linkedin, Mail, MapPin, Briefcase, Code2, Users, Instagram } from "lucide-react";


const avatarImages = [
  "/images/1.webp",
  "/images/2.webp",
  "/images/3.webp",
];


export const AboutPreview = () => {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [counts, setCounts] = useState({ years: 0, projects: 0, clients: 0, repos: 0 });

  useEffect(() => {
    const id = setInterval(() => {
      setAvatarIndex((prev) => (prev + 1) % avatarImages.length);
    }, 3000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const played = sessionStorage.getItem("aboutPlayed");
    if (!played) {
      sessionStorage.setItem("aboutPlayed", "true");
      setHasPlayed(false);

      // Animate counters
      const targets = { years: 5, projects: 50, clients: 30, repos: 100 };
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setCounts({
          years: Math.floor(targets.years * progress),
          projects: Math.floor(targets.projects * progress),
          clients: Math.floor(targets.clients * progress),
          repos: Math.floor(targets.repos * progress)
        });

        if (step >= steps) {
          setCounts(targets);
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    } else {
      setHasPlayed(true);
      setCounts({ years: 5, projects: 50, clients: 30, repos: 100 });
    }
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as any } }
  };

  const stats = [
    { icon: Briefcase, label: "Years Experience", value: counts.years, color: "text-blue-400", glow: "hover:shadow-[0_0_30px_hsl(207,100%,50%,0.4)]" },
    { icon: Code2, label: "Projects Completed", value: counts.projects, color: "text-purple-400", glow: "hover:shadow-[0_0_30px_hsl(270,90%,60%,0.4)]" },
    { icon: Users, label: "Happy Clients", value: counts.clients, color: "text-cyan-400", glow: "hover:shadow-[0_0_30px_hsl(180,80%,50%,0.4)]" },
    { icon: Github, label: "GitHub Repos", value: counts.repos, color: "text-green-400", glow: "hover:shadow-[0_0_30px_hsl(100,80%,50%,0.4)]" }
  ];

  const skills = ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"];

  return (
    <motion.div
      variants={container}
      initial={hasPlayed ? "show" : "hidden"}
      animate="show"
      className="min-h-full p-4 sm:p-8 relative"
    >
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Hero Section */}
        <motion.div variants={item}>
          <div className="glow-card-wrapper">
            <div className="glow-card-inner p-8 sm:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Soft static glow ring */}
                  <div className="absolute inset-0 -m-1.5 rounded-full bg-gradient-to-r from-primary/40 via-purple-500/30 to-cyan-500/40 blur-md opacity-60" />

                  <Avatar className="w-32 h-32 sm:w-40 sm:h-40 ring-2 ring-primary/20 ring-offset-4 ring-offset-background relative z-10 overflow-hidden">
                    <motion.img
                      key={avatarImages[avatarIndex]} // important for animation on change
                      src={avatarImages[avatarIndex]}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      // initial={{ opacity: 0 }}
                      // animate={{ opacity: 1 }}
                      // exit={{ opacity: 0 }}
                      // transition={{ duration: 0.5, ease: "easeOut" }}
                    />

                  </Avatar>

                </motion.div>

                <div className="flex-1 text-center md:text-left space-y-5">
                  <div>
                    <motion.h1
                      className="text-4xl sm:text-5xl font-bold mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <span className="bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Gaurav Garg
                      </span>
                    </motion.h1>
                    <motion.p
                      className="text-xl text-white mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      Full Stack & AI Developer
                    </motion.p>
                    <motion.p
                      className="text-sm text-white flex items-center justify-center md:justify-start gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <MapPin className="w-4 h-4 text-primary" />
                      Jaipur, India
                    </motion.p>
                  </div>

                  <motion.p
                    className="text-white leading-relaxed max-w-2xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    Passionate developer with 5+ years of experience building modern web applications.
                    Specialized in React, TypeScript, and cloud architecture. Love turning complex problems
                    into elegant solutions.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-3 justify-center md:justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    <Button
                      onClick={() => window.open("https://github.com/gaurav-ai-dev")}
                      variant="default"
                      size="sm"
                      className="hover-lift bg-gradient-to-r from-primary to-blue-600 hover:shadow-[0_0_30px_hsl(207,100%,50%,0.5)]"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button
                      onClick={() => window.open("https://www.linkedin.com/in/gaurav-garg-full-stack-dev/")}
                      variant="outline"
                      size="sm"
                      className="hover-lift border-primary/30 hover:border-primary/60 hover:bg-primary/10"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button
                      onClick={() => window.open("https://www.instagram.com/_gaurav_ai/")}
                      variant="outline"
                      size="sm"
                      className="hover-lift border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-500/10"
                    >
                      <Instagram className="w-4 h-4 mr-2" />
                      Instagram
                    </Button>
                    <Button
                      onClick={() => window.location.href = "mailto:ggarg1308@gmail.com"}
                      variant="outline"
                      size="sm"
                      className="hover-lift border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </motion.div>

                  <motion.div
                    className="flex flex-wrap gap-2 justify-center md:justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.05 }}
                      >
                        <Badge variant="secondary" className="bg-muted/60 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-colors">
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={item}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
              >
                <div className="glow-card-wrapper h-full">
                  <div className="glow-card-inner p-6 text-center">
                    <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                    <motion.div className="text-3xl font-bold gradient-text mb-1">
                      {stat.value}+
                    </motion.div>
                    <p className="text-sm text-white">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* About Me Section */}
        <motion.div variants={item}>
          <div className="glow-card-wrapper">
            <div className="glow-card-inner p-8">
              <h2 className="text-2xl font-bold mb-4 gradient-text">About Me</h2>
              <div className="space-y-4 text-white leading-relaxed">
                <p>
                  I'm a passionate full-stack developer with a love for creating beautiful, functional web applications.
                  My journey in tech started 5 years ago, and since then, I've worked on diverse projects ranging from
                  e-commerce platforms to real-time collaboration tools.
                </p>
                <p>
                  I specialize in modern JavaScript frameworks, particularly React and Node.js, and I'm always
                  exploring new technologies to stay at the cutting edge of web development. I believe in writing
                  clean, maintainable code and creating user experiences that delight.
                </p>
                <p>
                  When I'm not coding, you'll find me contributing to open-source projects, writing technical blogs,
                  or mentoring junior developers. I'm always open to interesting projects and collaboration opportunities.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
