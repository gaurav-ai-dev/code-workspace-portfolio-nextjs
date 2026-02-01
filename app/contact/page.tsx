import { Layout } from "@/components/Layout";
import { ContactPreview } from "@/components/ContactPreview";

const ContactPage = () => {
  return (
    <Layout activeFile="contact.js">
      <ContactPreview />
    </Layout>
  );
};

export default ContactPage;
