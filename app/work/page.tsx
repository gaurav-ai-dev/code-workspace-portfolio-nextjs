import { Layout } from "@/components/Layout";
import { ProjectsPreview } from "@/components/ProjectsPreview";

const ProjectsPage = () => {
  return (
    <Layout activeFile="projects.js">
      <ProjectsPreview />
    </Layout>
  );
};

export default ProjectsPage;
