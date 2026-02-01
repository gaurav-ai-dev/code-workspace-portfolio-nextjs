import { Layout } from "@/components/Layout";
import { BlogPreview } from "@/components/BlogPreview";

const BlogPage = () => {
  return (
    <Layout activeFile="blog.js">
      <BlogPreview />
    </Layout>
  );
};

export default BlogPage;
