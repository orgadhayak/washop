import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { shops } from "@/data/shops";
import {
  getActiveCategoriesWithCounts,
  getCategoryLastModified,
} from "@/lib/category-stats";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "",
  "/global",
  "/shops",
  "/add-store",
  "/about",
  "/contact",
  "/blog",
  "/partners",
  "/privacy",
  "/terms",
  "/seller-rules",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const activeCategories = getActiveCategoriesWithCounts();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.domain}${route}`,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
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
      lastModified: new Date(shop.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.domain}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
