import { Layout } from "@/components/LayoutShell";
import { BlogPreview } from "@/components/BlogPreview";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Blog | Next.js, React & Web Development Insights – Gaurav Garg",
  description: "Read practical tutorials and insights on Next.js, React, performance, UI engineering, and full-stack development. Helpful content for teams building modern, scalable web products.",
  alternates: {
    canonical: "https://www.gauravai.in/blog"
  },
  openGraph: {
    title: "Blog | Next.js, React & Web Development Insights – Gaurav Garg",
    description: "Read practical tutorials and insights on Next.js, React, performance, UI engineering, and full-stack development. Helpful content for teams building modern, scalable web products.",
    url: "https://www.gauravai.in/blog",
    images: ["images/home.webp"]
  },
  keywords: ["Next.js Blog", "React Development Blog", "Web Performance Tips", "Full Stack Development Articles", "SEO for Next.js"]

};


const BlogPage = () => {
  return (
    // <Layout activeFile="blog.js">
      <BlogPreview />
    // </Layout>
  );
};

export default BlogPage;
