"use client";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { getPostBySlug } from "@/data/blogPosts";
import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

type Post = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
};

export default function BlogPostClient ({post, slug}: {post: Post; slug: string})  {
  const router = useRouter();
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const played = sessionStorage.getItem(`blogPost-${slug}-played`);
    if (!played) {
      sessionStorage.setItem(`blogPost-${slug}-played`, "true");
      setHasPlayed(false);
    } else {
      setHasPlayed(true);
    }
  }, [slug]);

  if (!post) {
    return (
      <Layout activeFile="blog.js">
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
      </Layout>
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
    <Layout activeFile="blog.js">
      <motion.div
        variants={container}
        initial={hasPlayed ? "show" : "hidden"}
        animate="show"
        className="min-h-full p-4 sm:p-8 relative"
      >
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back button */}
          <motion.div variants={item} className="mb-8">
            <button
              onClick={() => router.push("/blog")}
              className="flex items-center gap-2 text-white hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </button>
          </motion.div>

          {/* Header */}
          <motion.div variants={item} className="mb-8">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Badge className="bg-primary/20 text-primary border-primary/30">
                {post.category}
              </Badge>
              <span className="text-sm text-white flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="text-sm text-white flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>

            <p className="text-lg text-white leading-relaxed mb-6">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-sm bg-muted/60 backdrop-blur-sm border border-border/50"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Author */}
          <motion.div variants={item} className="mb-8">
            <div className="glow-card-wrapper">
              <div className="glow-card-inner p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Written by Gaurav Garg</p>
                  <p className="text-sm text-white">Full Stack & AI Developer</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={item}>
            <div className="glow-card-wrapper">
              <div className="glow-card-inner p-6 sm:p-8 lg:p-10">
                <article className="prose prose-invert max-w-none">
                  {renderContent(post.content)}
                </article>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={item} className="mt-8">
            <div className="glow-card-wrapper">
              <div className="glow-card-inner p-6 text-center">
                <p className="text-white mb-4">Enjoyed this article?</p>
                <button
                  onClick={() => router.push("/blog")}
                  className="px-6 py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg hover:bg-primary/30 transition-colors"
                >
                  Read More Articles
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

