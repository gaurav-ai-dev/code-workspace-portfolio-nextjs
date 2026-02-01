import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogPosts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gauravai.in";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticRoutes = [
        "",
        "/about",
        "/skills",
        "/projects",
        "/experience",
        "/contact",
        "/blog",
    ];

    const blogRoutes: MetadataRoute.Sitemap = blogPosts
        .filter((p: any) => p?.slug)
        .map((p: any) => ({
            url: `${siteUrl}/blog/${p.slug}`,
            lastModified: p?.updatedAt ? new Date(p.updatedAt) : now,
            changeFrequency: "weekly",
            priority: 0.7,
        }));

    const staticSitemap: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
        url: `${siteUrl}${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: path === "" ? 1 : 0.8,
    }));

    return [...staticSitemap, ...blogRoutes];
}
