import type { Metadata } from "next";
import "./globals.css"
import { LayoutShell } from "@/components/LayoutShell";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Providers from "@/components/Providers";


export const metadata: Metadata = {
  title: "Next.js & Full-Stack Developer | Scalable Web Apps & Modern UI – Gaurav Garg",
  description: "I’m Gaurav, a Next.js & Full-Stack Developer building fast, scalable, and SEO-friendly web applications. I help startups and businesses turn ideas into high-performance digital products. Available for freelance and remote projects.",
  alternates: {
    canonical: "https://www.gauravai.in/"
  },
  openGraph: {
    title: "Next.js & Full-Stack Developer | Scalable Web Apps & Modern UI – Gaurav Garg",
    description: "I’m Gaurav, a Next.js & Full-Stack Developer building fast, scalable, and SEO-friendly web applications. I help startups and businesses turn ideas into high-performance digital products. Available for freelance and remote projects.",
    url: "https://www.gauravai.in/",
    images: ["images/home.webp"]
  },
  keywords: ["Next.js Developer", "Full Stack Developer", "React Developer", "Web Application Developer", "Freelance Next.js Developer"]

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {/* <LayoutShell> */}
        <Providers>
          {children}
        </Providers>
        {/* </LayoutShell> */}
      </body>
    </html>
  );
}
