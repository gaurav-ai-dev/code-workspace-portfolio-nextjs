"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, User, Mail } from "lucide-react";
import { getPostBySlug } from "@/data/blogPosts";
import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";

type Post = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
};

export default function BlogPostClient({ slug }: { slug: string }) {
  const router = useRouter();
  const post = slug ? getPostBySlug(slug) : undefined;

  // Get related posts (same category, excluding current)
  const relatedPosts = post
    ? blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3)
    : [];


  if (!post) {
    return (
      // <Layout activeFile="blog.js">
        <div className="min-h-full flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <button
              onClick={() => router.push("/blog")}
              className="text-primary hover:underline flex items-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>
          </div>
        </div>
      // </Layout>
    );
  }

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

  // Parse markdown-like content to JSX
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeContent: string[] = [];
    let codeLanguage = '';
    let listItems: string[] = [];
    let inTable = false;
    let tableRows: string[][] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-2 text-white mb-6 ml-4">
            {listItems.map((item, i) => (
              <li key={i} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  {tableRows[0].map((cell, i) => (
                    <th key={i} className="text-left p-3 text-foreground font-semibold">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(2).map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    {row.map((cell, j) => (
                      <td key={j} className="p-3 text-white">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((line, index) => {
      // Code block handling
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          flushList();
          flushTable();
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim();
          codeContent = [];
        } else {
          elements.push(
            <div key={`code-${index}`} className="mb-6">
              <div className="bg-editor-sidebar/80 rounded-lg border border-border overflow-hidden">
                {codeLanguage && (
                  <div className="px-4 py-2 border-b border-border text-xs text-white bg-muted/30">
                    {codeLanguage}
                  </div>
                )}
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm text-foreground/90 font-mono">
                    {codeContent.join('\n')}
                  </code>
                </pre>
              </div>
            </div>
          );
          inCodeBlock = false;
          codeLanguage = '';
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      // Table handling
      if (line.startsWith('|')) {
        flushList();
        inTable = true;
        const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
        tableRows.push(cells);
        return;
      } else if (inTable) {
        flushTable();
      }

      // Headings
      if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-bold mt-10 mb-4 text-foreground">
            {line.slice(3)}
          </h2>
        );
        return;
      }

      if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl font-semibold mt-8 mb-3 text-foreground/90">
            {line.slice(4)}
          </h3>
        );
        return;
      }

      // List items
      if (line.match(/^[\d]+\.\s/) || line.startsWith('- ')) {
        const content = line.replace(/^[\d]+\.\s/, '').replace(/^-\s/, '');
        listItems.push(content);
        return;
      }

      // Regular paragraph
      if (line.trim()) {
        flushList();
        // Handle inline code
        const formattedLine = line.replace(/`([^`]+)`/g, '<code class="bg-muted/60 px-1.5 py-0.5 rounded text-sm text-primary font-mono">$1</code>');
        // Handle bold
        const withBold = formattedLine.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');

        elements.push(
          <p
            key={`p-${index}`}
            className="text-white leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: withBold }}
          />
        );
      }
    });

    flushList();
    flushTable();

    return elements;
  };

  return (
    // <Layout activeFile="blog.js">
      <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        {/* Header */}
        <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              <Link
                href="/"
                className="text-lg font-bold text-gray-900 hover:text-gray-600 transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Gaurav Garg
              </Link>
            </div>
          </div>
        </header>

        <motion.main
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Hero Section */}
          <motion.div variants={item} className="border-b border-gray-100">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
              {/* Category & Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full font-semibold text-xs uppercase tracking-wide">
                  {post.category}
                </span>
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
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-[1.15]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {post.excerpt}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Gaurav Garg
                  </p>
                  <p className="text-sm text-gray-500">Full Stack & AI Developer</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div variants={item}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.article variants={item} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {renderContent(post.content)}
          </motion.article>

          {/* Mid-Content CTA */}
          <motion.div variants={item} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 sm:p-10 text-center border border-gray-200">
              <h3
                className="text-2xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Need a developer for your product?
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                I help businesses build scalable web applications and bring ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-sm"
                >
                  Contact Me
                </Link>
                <Link
                  href="/projects"
                  className="px-8 py-3.5 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-white transition-colors"
                >
                  View Projects
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div variants={item} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-4 font-medium">Tagged with:</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section variants={item} className="border-t border-gray-100 bg-gray-50">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2
                  className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10 text-center"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                    >
                      {/* Thumbnail */}
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                        <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                          <span className="px-2.5 py-1 bg-gray-100 rounded-full text-gray-600 font-medium">
                            {relatedPost.category}
                          </span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                        <h3
                          className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {relatedPost.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.section>
          )}
        </motion.main>

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-white">
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
        </footer>
      </div>
    // </Layout>
  );
};

