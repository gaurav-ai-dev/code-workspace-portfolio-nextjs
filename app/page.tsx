import { Layout } from "@/components/Layout";
import { AboutPreview } from "@/components/AboutPreview";

const AboutPage = () => {
  return (
    <Layout activeFile="about.js">
      <AboutPreview />
    </Layout>
  );
};

export default AboutPage;
