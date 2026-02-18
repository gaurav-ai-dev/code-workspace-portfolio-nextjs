import { ProjectsPreview } from "@/components/ProjectsPreview";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Work | Real-World Next.js & Full-Stack Work – Gaurav Garg",
  description: "Browse my projects showcasing Next.js, React, and full-stack development. From fast UI to secure backends, see how I build modern web products that drive results for businesses.",
  alternates: {
    canonical: "https://www.gauravai.in/work"
  },
  openGraph: {
    title: "Work | Real-World Next.js & Full-Stack Work – Gaurav",
    description: "Browse my projects showcasing Next.js, React, and full-stack development. From fast UI to secure backends, see how I build modern web products that drive results for businesses.",
    url: "https://www.gauravai.in/work",
    images: ["images/home.webp"]
  },
  keywords: ["Next.js Projects", "Full Stack Projects", "React Portfolio Projects", "Web Application Case Studies", "Custom Web App Development"]

};

const ProjectsPage = () => {
  return (
    // <Layout activeFile="work.js">
      <ProjectsPreview />
    // </Layout>
  );
};

export default ProjectsPage;
