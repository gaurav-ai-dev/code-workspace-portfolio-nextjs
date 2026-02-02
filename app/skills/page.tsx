import { Layout } from "@/components/Layout";
import { SkillsPreview } from "@/components/SkillsPreview";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Skills | Next.js, React, Node.js & Full-Stack Development – Gaurav Garg",
  description: "Explore my full-stack skill set across Next.js, React, TypeScript, Node.js, databases, and cloud. I build production-ready web apps with clean UI, strong performance, and scalable architecture.",
  alternates: {
    canonical: "https://www.gauravai.in/skills"
  },
  openGraph: {
    title: "Skills | Next.js, React, Node.js & Full-Stack Development – Gaurav",
    description: "Explore my full-stack skill set across Next.js, React, TypeScript, Node.js, databases, and cloud. I build production-ready web apps with clean UI, strong performance, and scalable architecture.",
    url: "https://www.gauravai.in/skills",
    images: ["images/home.webp"]
  },
  keywords: ["Next.js Skills", "React TypeScript Developer", "Node.js Backend Developer", "Full Stack Tech Stack", "Scalable Web App Development"]

};


const SkillsPage = () => {
  return (
    <Layout activeFile="skills.js">
      <SkillsPreview />
    </Layout>
  );
};

export default SkillsPage;
