import { createCatalogUrl } from "@/lib/whatsapp";

export type ShopStatus = "approved" | "pending";

export type Shop = {
  id: string;
  slug: string;
  name: string;
  description: string;
  catalogUrl: string;
  phone: string;
  city: string;
  shipsNationwide: boolean;
  categories: string[];
  tags: string[];
  badges: string[];
  image?: string;
  status: ShopStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export const shops = [
  {
    id: "tech-whatsapp-store",
    slug: "tech-whatsapp-store",
    name: "חנות טכנולוגיה בוואטסאפ",
    description:
      "חנות טכנולוגיה שמציגה מוצרים דרך קטלוג וואטסאפ. הפרטים הראשוניים יושלמו לאחר בדיקה ידנית של WaShop.",
    catalogUrl: createCatalogUrl("972548180200"),
    phone: "972548180200",
    city: "ישראל",
    shipsNationwide: true,
    categories: ["technology-gadgets"],
    tags: ["טכנולוגיה", "גאדג׳טים", "קטלוג וואטסאפ", "ישראל", "חנויות WhatsApp"],
    badges: ["קטלוג וואטסאפ פעיל", "פנייה ישירה למוכר", "חנות ישראלית"],
    status: "approved",
    featured: true,
    createdAt: "2026-06-30",
    updatedAt: "2026-06-30",
  },
  {
    id: "barber-courses-whatsapp",
    slug: "barber-courses-whatsapp",
    name: "מספרה וקורסים בוואטסאפ",
    description:
      "עסק שמציג שירותי מספרה ותוכן/קורסים דרך קטלוג וואטסאפ. הפרטים הראשוניים יושלמו לאחר בדיקה ידנית של WaShop.",
    catalogUrl: createCatalogUrl("972538771200"),
    phone: "972538771200",
    city: "ישראל",
    shipsNationwide: false,
    categories: ["hair-barbers", "beauty-care", "courses-training"],
    tags: ["מספרה", "קורסים", "טיפוח", "קטלוג וואטסאפ", "ישראל", "חנויות ווטסאפ"],
    badges: ["קטלוג וואטסאפ פעיל", "פנייה ישירה למוכר", "מתאים למספר קטגוריות"],
    status: "approved",
    featured: true,
    createdAt: "2026-06-30",
    updatedAt: "2026-06-30",
  },
] satisfies Shop[];

export const approvedShops = shops.filter((shop) => shop.status === "approved");
export const featuredShops = approvedShops.filter((shop) => shop.featured);

export function getShopBySlug(slug: string) {
  return shops.find((shop) => shop.slug === slug);
}

export function getShopsByCategory(categorySlug: string) {
  return approvedShops.filter((shop) => shop.categories.includes(categorySlug));
}
