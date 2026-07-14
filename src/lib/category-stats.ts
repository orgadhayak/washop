import { categories } from "@/data/categories";
import { approvedShops, type Shop } from "@/data/shops";

export function getApprovedShopsForCategory(categorySlug: string): Shop[] {
  return approvedShops.filter((shop) => shop.categories.includes(categorySlug));
}

export function getApprovedStoreCountForCategory(categorySlug: string) {
  return getApprovedShopsForCategory(categorySlug).length;
}

export function getApprovedStoreCountByCategory() {
  return categories.reduce<Record<string, number>>((counts, category) => {
    counts[category.slug] = getApprovedStoreCountForCategory(category.slug);
    return counts;
  }, {});
}

export function getActiveCategoriesWithCounts() {
  const counts = getApprovedStoreCountByCategory();

  return categories
    .map((category) => ({
      ...category,
      approvedStoreCount: counts[category.slug] ?? 0,
    }))
    .filter((category) => category.approvedStoreCount > 0);
}

export function getCategoryLastModified(categorySlug: string) {
  const shops = getApprovedShopsForCategory(categorySlug);
  const timestamps = shops
    .map((shop) => new Date(shop.updatedAt).getTime())
    .filter((timestamp) => Number.isFinite(timestamp));

  if (!timestamps.length) {
    return undefined;
  }

  return new Date(Math.max(...timestamps));
}
