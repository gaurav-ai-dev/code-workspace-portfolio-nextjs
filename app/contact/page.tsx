import { Layout } from "@/components/Layout";
import { ContactPreview } from "@/components/ContactPreview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Hire Next.js & Full-Stack Developer – Gaurav Garg",
  description: "Want to build a fast, scalable website or web app? Contact Gaurav to discuss your project. Available for freelance, remote, and startup builds using Next.js, React, and modern backend tech.",
  alternates: {
    canonical: "https://www.gauravai.in/contact"
  },
  openGraph: {
    title: "Contact | Hire Next.js & Full-Stack Developer – Gaurav Garg",
    description: "Want to build a fast, scalable website or web app? Contact Gaurav to discuss your project. Available for freelance, remote, and startup builds using Next.js, React, and modern backend tech.",
    url: "https://www.gauravai.in/contact",
    images: ["images/home.webp"]
  },
  keywords: ["Hire Next.js Developer", "Contact Full Stack Developer", "Freelance React Developer ", "Web App Development Services", "Next.js Developer for Hire"]

};


const ContactPage = () => {
  return (
    <Layout activeFile="contact.js">
      <ContactPreview />
    </Layout>
  );
};

export default ContactPage;
