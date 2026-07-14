export type ShopStatus = "approved" | "pending";
export type InternationalShippingStatus = "ask_seller" | "not_available" | "confirmed";

export type Shop = {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  shortDescription?: string;
  cardDescription?: string;
  featuredDescription?: string;
  searchAliases?: string[];
  metaTitle?: string;
  metaDescription?: string;
  catalogUrl: string;
  phone: string;
  city: string;
  cityEn?: string;
  countryCode?: string;
  countryNameEn?: string;
  shipsNationwide: boolean;
  globalVisible?: boolean;
  internationalShippingStatus?: InternationalShippingStatus;
  languages?: string[];
  categories: string[];
  tags: string[];
  badges: string[];
  washopRating: number;
  hasWashopBenefit: boolean;
  benefitLabel?: string;
  benefitText?: string;
  image?: string;
  status: ShopStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export const shops = [
  {
    id: "navines",
    slug: "navines",
    name: "נביא נס ישראל",
    nameEn: "Navines Israel",
    description:
      "נביא נס ישראל היא עסק ישראלי בתחום התוכנה והדיגיטל. דרך קטלוג הוואטסאפ ניתן להתרשם משירותים כמו בניית אתרים, פיתוח כלים לעסקים, פתרונות בינה מלאכותית, טיפול בתקלות טכניות, פיתוח אפליקציות ושירותים דיגיטליים נוספים. החנות מתאימה לבעלי עסקים שרוצים פתרון טכנולוגי ישיר, ברור ונגיש דרך וואטסאפ.",
    descriptionEn:
      "Navines Israel provides software and digital services through a WhatsApp catalog, including website building, AI tools, app development, technical support and digital solutions for businesses.",
    searchAliases: ["נביא נס", "נביא נס ישראל", "Navines", "Navines Israel"],
    catalogUrl: "https://wa.me/c/972548180200",
    phone: "972548180200",
    city: "פתח תקווה",
    cityEn: "Petah Tikva",
    countryCode: "IL",
    countryNameEn: "Israel",
    shipsNationwide: true,
    globalVisible: true,
    internationalShippingStatus: "ask_seller",
    languages: ["Hebrew"],
    categories: [
      "website-building",
      "ai-tools",
      "software-digital",
      "app-development",
      "technical-services-businesses",
      "local-services",
    ],
    tags: [
      "בניית אתרים",
      "נביא נס ישראל",
      "בינה מלאכותית",
      "תוכנה",
      "דיגיטל",
      "אפליקציות",
      "טיפול בתקלות",
      "תקלות טכניות",
      "פתרונות לעסקים",
      "קטלוג וואטסאפ",
      "חנות ישראלית",
    ],
    badges: ["קטלוג וואטסאפ פעיל", "פנייה ישירה למוכר", "חנות ישראלית"],
    washopRating: 5,
    hasWashopBenefit: true,
    benefitLabel: "הטבת וואשופ פעילה",
    benefitText: "בקשו את ההטבה כשאתם פונים דרך וואשופ",
    status: "approved",
    featured: true,
    createdAt: "2026-06-30",
    updatedAt: "2026-06-30",
  },
  {
    id: "revolution-studio",
    slug: "revolution-studio",
    name: "רוולושיין סטודיו",
    nameEn: "Revolution Studio",
    description:
      "רוולושיין סטודיו הוא עסק ישראלי בתחום המספרות וטיפוח השיער. דרך קטלוג הוואטסאפ אפשר למצוא שירותי מספרה, מוצרים ואביזרים הקשורים לטיפוח שיער, ציוד ומוצרים לספרים, וגם קורסים והכשרות למי שרוצה ללמוד את תחום הספרות והתספורות.",
    descriptionEn:
      "Revolution Studio is an Israeli hair and grooming business with salon services, hair-care products, barber accessories and training courses available through a WhatsApp catalog.",
    catalogUrl: "https://wa.me/c/972538771200",
    phone: "972538771200",
    city: "פתח תקווה",
    cityEn: "Petah Tikva",
    countryCode: "IL",
    countryNameEn: "Israel",
    shipsNationwide: true,
    globalVisible: true,
    internationalShippingStatus: "ask_seller",
    languages: ["Hebrew"],
    categories: [
      "hair-barbers",
      "beauty-care",
      "courses-training",
      "hair-care-products",
      "barber-equipment-accessories",
    ],
    tags: [
      "מספרה",
      "טיפוח שיער",
      "מוצרי טיפוח",
      "אביזרים לספרים",
      "ציוד לספרים",
      "קורסים",
      "לימוד תספורות",
      "קטלוג וואטסאפ",
      "חנות ישראלית",
    ],
    badges: ["קטלוג וואטסאפ פעיל", "פנייה ישירה למוכר", "מתאים למספר קטגוריות"],
    washopRating: 5,
    hasWashopBenefit: true,
    benefitLabel: "הטבת וואשופ פעילה",
    benefitText: "בקשו את ההטבה כשאתם פונים דרך וואשופ",
    status: "approved",
    featured: true,
    createdAt: "2026-06-30",
    updatedAt: "2026-06-30",
  },
  {
    id: "liel-gifts-and-blocks",
    slug: "liel-gifts-and-blocks",
    name: "ליאל מארזים מתנות והדפסות",
    nameEn: "Liel Gift Boxes and Printing",
    description:
      "ליאל מארזים מתנות והדפסות היא חנות מתנות בוואטסאפ, עם מארזי מתנה בעיצוב אישי, הדפסות, בלוקי זכוכית, כוסות, מחזיקים, סידורים ומוצרים מודפסים בהתאמה אישית.",
    descriptionEn:
      "Liel Gift Boxes and Printing offers personalized gifts, printed products, glass blocks, cups, holders and custom gift boxes through a WhatsApp catalog.",
    shortDescription: "מארזי מתנה בעיצוב אישי",
    cardDescription:
      "מארזי מתנה בעיצוב אישי, הדפסות ומוצרים מיוחדים דרך קטלוג וואטסאפ.",
    featuredDescription:
      "מתנות אישיות עם טאץ׳ חם ויצירתי: מארזים, מזכרות, בלוקי זכוכית, כוסות ומוצרים מודפסים שמרגישים אישיים באמת.",
    searchAliases: [
      "ליאל",
      "Liel",
      "gifts",
      "blocks",
    ],
    metaTitle: "ליאל מארזים מתנות והדפסות | חנות וואטסאפ ביהוד | וואשופ",
    metaDescription:
      "מארזי מתנה בעיצוב אישי, הדפסות ומוצרים מיוחדים דרך קטלוג וואטסאפ. ליאל מארזים מתנות והדפסות ביהוד — נבדקת ידנית על ידי וואשופ.",
    catalogUrl: "https://wa.me/c/972538262133",
    phone: "972538262133",
    city: "יהוד",
    cityEn: "Yehud",
    countryCode: "IL",
    countryNameEn: "Israel",
    shipsNationwide: true,
    globalVisible: true,
    internationalShippingStatus: "ask_seller",
    languages: ["Hebrew"],
    categories: [
      "gifts-events",
      "personalized-prints-gifts",
      "judaica-shabbat",
      "home-design",
    ],
    tags: [
      "ליאל",
      "מארזי מתנה",
      "מתנות בעיצוב אישי",
      "הדפסה אישית",
      "בלוקי זכוכית",
      "כוסות",
      "מחזיקים",
      "מתנות לאירועים",
      "יהוד",
      "קטלוג וואטסאפ",
      "חנות ישראלית",
    ],
    badges: ["קטלוג וואטסאפ פעיל", "מאומת על ידי וואשופ", "נבדק ידנית"],
    washopRating: 5,
    hasWashopBenefit: true,
    benefitLabel: "הטבת וואשופ פעילה",
    benefitText: "בקשו את ההטבה כשאתם פונים דרך וואשופ",
    status: "approved",
    featured: true,
    createdAt: "2026-07-02",
    updatedAt: "2026-07-02",
  },
  {
    id: "bumpers",
    slug: "bumpers",
    name: "באמפרס",
    nameEn: "Bumpers",
    description:
      "באמפרס היא חנות ישראלית מראשון לציון המתמחה בכפכפי עיסוי ונעלי נוחות לנשים, גברים ונוער. המותג מציע קולקציות של כפכפים בעיצוב יומיומי, עם דגש על נוחות, התאמה לכף הרגל וחוויית שימוש פשוטה ונעימה.",
    descriptionEn:
      "Bumpers is an Israeli comfort-footwear store from Rishon LeZion, focused on massage flip-flops, everyday comfort shoes and collections for women, men and youth.",
    shortDescription: "כפכפי עיסוי ונעלי נוחות מראשון לציון",
    cardDescription:
      "כפכפי עיסוי, נעלי נוחות וקולקציות לגברים, נשים ונוער דרך קטלוג וואטסאפ.",
    featuredDescription:
      "מותג הנעלה לנוחות יומיומית עם כפכפי עיסוי ונעלי נוחות לגברים ולנשים, מתאים להליכה, לשגרה ולמי שמחפש שימוש פרקטי ונעים.",
    searchAliases: [
      "Bumpers",
      "bumpers massage",
      "כפכפים",
      "כפכפי עיסוי",
      "נעלי נוחות",
      "כפכפים לנשים",
      "כפכפים לגברים",
      "ראשון לציון",
    ],
    metaTitle: "באמפרס כפכפי עיסוי ונעלי נוחות מראשון לציון",
    metaDescription:
      "באמפרס היא חנות וואטסאפ מראשון לציון לכפכפי עיסוי, נעלי נוחות וקולקציות לנשים, גברים ונוער. צפו בקטלוג, בדקו דגמים ומידות ופנו ישירות לבית העסק דרך וואשופ.",
    catalogUrl: "https://wa.me/c/972548222116",
    phone: "972548222116",
    city: "ראשון לציון",
    cityEn: "Rishon LeZion",
    countryCode: "IL",
    countryNameEn: "Israel",
    shipsNationwide: true,
    globalVisible: true,
    internationalShippingStatus: "ask_seller",
    languages: ["Hebrew"],
    categories: [
      "fashion-shoes",
      "health-lifestyle",
      "sports-fitness",
    ],
    tags: [
      "באמפרס",
      "Bumpers",
      "כפכפים",
      "כפכפי עיסוי",
      "נעלי נוחות",
      "כפכפים לנשים",
      "כפכפים לגברים",
      "הנעלה",
      "ראשון לציון",
      "קטלוג וואטסאפ",
      "חנות ישראלית",
    ],
    badges: ["קטלוג וואטסאפ פעיל", "מאומת על ידי וואשופ", "נבדק ידנית"],
    washopRating: 5,
    hasWashopBenefit: true,
    benefitLabel: "הטבת וואשופ פעילה",
    benefitText: "בקשו את ההטבה כשאתם פונים דרך וואשופ",
    status: "approved",
    featured: true,
    createdAt: "2026-07-05",
    updatedAt: "2026-07-05",
  },
] satisfies Shop[];

export const approvedShops = shops.filter((shop) => shop.status === "approved");
export const featuredShops = approvedShops.filter((shop) => shop.featured);
export const approvedGlobalShops = approvedShops.filter((shop) => shop.globalVisible);

export function getShopBySlug(slug: string) {
  return shops.find((shop) => shop.slug === slug);
}

export function getShopsByCategory(categorySlug: string) {
  return approvedShops.filter((shop) => shop.categories.includes(categorySlug));
}
