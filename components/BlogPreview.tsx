"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, BookOpen, TrendingUp, ArrowRight, Mail } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const BlogPreview = () => {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      {/* <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-semibold text-gray-900 hover:text-gray-600 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Gaurav Garg
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Portfolio
              </Link>
              <Link href="/projects" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Projects
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header> */}

      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        {/* Page Header */}
        <motion.div variants={item} className="text-center mb-16">
          <h1
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Thoughts, tutorials, and insights on web development, architecture, and building products that scale.
          </p>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.section variants={item} className="mb-16">
            <h2
              className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="h-full bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
                    {/* Featured Image Placeholder */}
                    <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More */}
                      <span className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                        Read article
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Separator */}
        <motion.div variants={item} className="border-t border-gray-200 my-12" />

        {/* Recent Posts */}
        <motion.section variants={item} className="mb-16">
          <h2
            className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Recent Posts
          </h2>
          <div className="space-y-0 divide-y divide-gray-100">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="flex flex-col sm:flex-row gap-6 py-8 hover:bg-gray-50/50 -mx-4 px-4 rounded-xl transition-colors">
                  {/* Thumbnail */}
                  <div className="sm:w-56 sm:h-36 aspect-video sm:aspect-auto flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-500 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden sm:flex items-center">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section variants={item} className="mb-16">
          <div className="bg-gray-900 rounded-3xl p-8 sm:p-12 text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Want to build something like this?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
              I help startups and businesses build scalable web applications. Let's discuss your next project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Hire Me
              </Link>
              <a
                href="mailto:contact@gauravgarg.dev"
                className="px-8 py-3.5 border border-gray-700 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Book a Call
              </a>
            </div>
          </div>
        </motion.section>
      </motion.main>

      {/* Footer */}
      {/* <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3
                className="font-bold text-gray-900 mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Gaurav Garg
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Full Stack & AI Developer building products that scale.
              </p>
            </div>
            <div>
              <h3
                className="font-bold text-gray-900 mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Links
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3
                className="font-bold text-gray-900 mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Contact
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  contact@gauravgarg.dev
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Gaurav Garg. All rights reserved.
          </div>
        </div>
      </footer> */}
    </div>
  );
};
