import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { shops } from "@/data/shops";
import {
  getActiveCategoriesWithCounts,
  getCategoryLastModified,
} from "@/lib/category-stats";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  { route: "", priority: 1, lastModified: "2026-08-28" },
  { route: "/global", priority: 0.8, lastModified: "2026-09-02" },
  { route: "/shops", priority: 0.7, lastModified: "2026-08-28" },
  { route: "/add-store", priority: 0.7 },
  { route: "/about", priority: 0.7 },
  { route: "/contact", priority: 0.7 },
  { route: "/blog", priority: 0.7, lastModified: "2026-08-28" },
  { route: "/partners", priority: 0.7 },
  { route: "/privacy", priority: 0.7 },
  { route: "/terms", priority: 0.7 },
  { route: "/accessibility", priority: 0.7 },
];

const shopTemplateLastModified = new Date("2026-08-28");

export default function sitemap(): MetadataRoute.Sitemap {
  const activeCategories = getActiveCategoriesWithCounts();

  return [
    ...staticRoutes.map(({ route, priority, lastModified }) => ({
      url: `${siteConfig.domain}${route}`,
      ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
      changeFrequency: "weekly" as const,
      priority,
    })),
    ...activeCategories.map((category) => ({
      url: `${siteConfig.domain}/category/${category.slug}`,
      lastModified: getCategoryLastModified(category.slug),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...shops
      .filter((shop) => shop.status === "approved")
      .map((shop) => ({
      url: `${siteConfig.domain}/shop/${shop.slug}`,
      lastModified: new Date(
        Math.max(new Date(shop.updatedAt).getTime(), shopTemplateLastModified.getTime()),
      ),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.domain}/blog/${post.slug}`,
      lastModified: new Date(post.modifiedAt ?? post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
