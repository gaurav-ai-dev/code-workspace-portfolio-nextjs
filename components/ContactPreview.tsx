"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Twitter, Mail, Send, MapPin, Clock, CheckCircle2 } from "lucide-react";

export const ContactPreview = () => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const played = sessionStorage.getItem("contactPlayed");
    if (!played) {
      sessionStorage.setItem("contactPlayed", "true");
      setHasPlayed(false);
    } else {
      setHasPlayed(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as any
      }
    }
  };

  const socials = [
    { 
      icon: Github, 
      label: "GitHub", 
      url: "https://github.com/gaurav-ai-dev", 
      color: "hover:text-primary",
      gradient: "from-blue-500/20 to-cyan-500/20" 
    },
    { 
      icon: Linkedin, 
      label: "LinkedIn", 
      url: "https://www.linkedin.com/in/gaurav-garg-full-stack-dev/", 
      color: "hover:text-blue-400",
      gradient: "from-blue-400/20 to-blue-600/20"
    },
    { 
      icon: Twitter, 
      label: "Twitter", 
      url: "#", 
      color: "hover:text-cyan-400",
      gradient: "from-cyan-400/20 to-cyan-600/20"
    },
    { 
      icon: Mail, 
      label: "Email", 
      url: "mailto:ggarg1308@gmail.com", 
      color: "hover:text-purple-400",
      gradient: "from-purple-400/20 to-purple-600/20"
    }
  ];

  return (
    <motion.div
      variants={container}
      initial={hasPlayed ? "show" : "hidden"}
      animate="show"
      className="min-h-full p-4 sm:p-8 relative"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div variants={item} className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Get In Touch</h1>
          <p className="text-white">
            Have a project in mind? Let's work together to create something amazing.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={item}>
            <div className="glow-card-wrapper h-full">
              <div className="glow-card-inner p-8 h-full">
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                
                <form className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your Name"
                      className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div>
                    <Input
                      placeholder="Subject"
                      className="bg-background/50 border-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      rows={6}
                      className="bg-background/50 border-primary/20 focus:border-primary transition-colors resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full hover-lift"
                    size="lg"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="space-y-6">
            <div className="glow-card-wrapper">
              <div className="glow-card-inner p-8">
                <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>
                <p className="text-white mb-6 leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities
                  to be part of your vision. Feel free to reach out through any of these platforms.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border/40 hover:border-primary/40 transition-colors group"
                    >
                      <social.icon className="w-5 h-5 text-white group-hover:text-primary transition-colors" />
                      <span className="text-sm font-medium">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="glow-card-wrapper">
              <div className="glow-card-inner p-8">
                <h3 className="text-xl font-bold mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-white">Email</p>
                    <p className="font-medium">ggarg1308@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-white">Location</p>
                    <p className="font-medium">Jaipur, India</p>
                  </div>
                  <div>
                    <p className="text-white">Availability</p>
                    <p className="font-medium text-green-500">Open for opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
