import { Layout } from "@/components/Layout";
import { ExperiencePreview } from "@/components/ExperiencePreview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | Next.js & Full-Stack Developer – Gaurav Garg",
  description: "See my professional experience building modern web applications with Next.js, React, and backend systems. I focus on performance, clean architecture, and delivering business-ready solutions.",
  alternates: {
    canonical: "https://www.gauravai.in/experience"
  },
  openGraph: {
    title: "Experience | Next.js & Full-Stack Developer – Gaurav Garg",
    description: "See my professional experience building modern web applications with Next.js, React, and backend systems. I focus on performance, clean architecture, and delivering business-ready solutions.",
    url: "https://www.gauravai.in/experience",
    images: ["images/home.webp"]
  },
  keywords: ["Full Stack Developer Experience", "Next.js Developer Experience", "React Developer Experience", "Web Development Experience", "Software Engineer Portfolio"]

};

const ExperiencePage = () => {
  return (
    <Layout activeFile="experience.js">
      <ExperiencePreview />
    </Layout>
  );
};


export default ExperiencePage;
