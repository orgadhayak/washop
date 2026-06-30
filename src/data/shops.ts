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
  washopRating: number;
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
    name: "נביא נס",
    description:
      "נביא נס הוא עסק ישראלי שמציג מוצרי טכנולוגיה, גאדג׳טים, טלפונים ואביזרי אלקטרוניקה דרך קטלוג וואטסאפ נפרד.",
    catalogUrl: "https://wa.me/c/972548180200",
    phone: "972548180200",
    city: "פתח תקווה",
    shipsNationwide: false,
    categories: ["technology-gadgets", "phones-accessories", "electronics-electricity"],
    tags: ["טכנולוגיה", "גאדג׳טים", "קטלוג וואטסאפ", "חנות ישראלית"],
    badges: ["קטלוג וואטסאפ פעיל", "פנייה ישירה למוכר", "חנות ישראלית"],
    washopRating: 5,
    status: "approved",
    featured: true,
    createdAt: "2026-06-30",
    updatedAt: "2026-06-30",
  },
  {
    id: "barber-courses-whatsapp",
    slug: "barber-courses-whatsapp",
    name: "רוולושיין סטודיו",
    description:
      "רוולושיין סטודיו הוא עסק בתחום מספרות, טיפוח שיער וקורסים, עם קטלוג וואטסאפ נפרד ופנייה ישירה לעסק.",
    catalogUrl: "https://wa.me/c/972538771200",
    phone: "972538771200",
    city: "פתח תקווה",
    shipsNationwide: false,
    categories: ["hair-barbers", "beauty-care", "courses-training"],
    tags: ["מספרה", "טיפוח שיער", "קורסים", "קטלוג וואטסאפ", "חנות ישראלית"],
    badges: ["קטלוג וואטסאפ פעיל", "פנייה ישירה למוכר", "מתאים למספר קטגוריות"],
    washopRating: 5,
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
