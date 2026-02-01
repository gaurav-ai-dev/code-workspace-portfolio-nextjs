"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, BookOpen, TrendingUp, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { useRouter } from "next/navigation";

export const BlogPreview = () => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const played = sessionStorage.getItem("blogPlayed");
    if (!played) {
      sessionStorage.setItem("blogPlayed", "true");
      setHasPlayed(false);
    } else {
      setHasPlayed(true);
    }
  }, []);

  const blogStats = [
    { icon: BookOpen, label: "Total Posts", value: "25+", color: "text-blue-400" },
    { icon: TrendingUp, label: "Monthly Readers", value: "15K+", color: "text-purple-400" },
    { icon: Clock, label: "Avg Read Time", value: "7 min", color: "text-cyan-400" }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as any }
    }
  };

  return (
    <motion.div
      variants={container}
      initial={hasPlayed ? "show" : "hidden"}
      animate="show"
      className="min-h-full p-4 sm:p-8 relative"
    >
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <motion.div variants={item} className="mb-8">
          <h1 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Blog & Insights
            </span>
          </h1>
          <p className="text- text-lg">Sharing knowledge and experiences from the dev trenches</p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item}>
          <div className="grid grid-cols-3 gap-4">
            {blogStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <div className="glow-card-wrapper h-full">
                  <div className="glow-card-inner p-4 sm:p-6 text-center">
                    <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 ${stat.color}`} />
                    <div className="text-xl sm:text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                    <p className="text-xs sm:text-sm text-white">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Posts */}
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold mb-4 text-foreground/90">Featured Posts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {blogPosts.filter(post => post.featured).map((post) => (
              <motion.div
                key={post.id}
                variants={item}
                className="group cursor-pointer"
                onClick={() => router.push(`/blog/${post.slug}`)}
              >
                <div className="glow-card-wrapper h-full">
                  <div className="glow-card-inner p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-white flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="text-xs text-white flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-white leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          // variant="secondary"
                          className="text-xs bg-muted/60 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all duration-300">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Posts */}
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold mb-4 text-foreground/90">Recent Posts</h2>
          <div className="space-y-4">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <motion.div
                key={post.id}
                variants={item}
                className="group cursor-pointer"
                onClick={() => router.push(`/blog/${post.slug}`)}
              >
                <div className="glow-card-wrapper">
                  <div className="glow-card-inner p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="text-xs border-border/50">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-white">{post.date}</span>
                        <span className="text-xs text-white">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-sm text-white line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center text-primary text-sm font-medium shrink-0">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={item}>
          <div className="glow-card-wrapper">
            <div className="glow-card-inner p-8 text-center">
              <h3 className="text-xl font-bold mb-2 gradient-text">Want more content?</h3>
              <p className="text-white mb-4">New posts every week on web development, architecture, and best practices.</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["React", "Node.js", "TypeScript", "DevOps"].map((topic) => (
                  <Badge
                    key={topic}
                    // variant="secondary"
                    className="bg-muted/60 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-colors cursor-pointer"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
