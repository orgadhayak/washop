export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
};

export const categories = [
  {
    id: "technology-gadgets",
    slug: "technology-gadgets",
    name: "טכנולוגיה וגאדג׳טים",
    description: "חנויות שמציגות מוצרי טכנולוגיה, אביזרים וגאדג׳טים בקטלוג וואטסאפ.",
  },
  {
    id: "hair-barbers",
    slug: "hair-barbers",
    name: "מספרות וטיפוח שיער",
    description: "מספרות, מוצרי שיער, טיפולים והזמנות דרך וואטסאפ.",
  },
  {
    id: "courses-training",
    slug: "courses-training",
    name: "קורסים והכשרות",
    description: "קורסים, סדנאות ותוכן מקצועי שנמכרים או מנוהלים דרך וואטסאפ.",
  },
  {
    id: "fashion-shoes",
    slug: "fashion-shoes",
    name: "אופנה והנעלה",
    description: "ביגוד, נעליים, פריטי סטייל וקטלוגים שמתעדכנים במהירות.",
  },
  {
    id: "beauty-care",
    slug: "beauty-care",
    name: "יופי וטיפוח",
    description: "מוצרי טיפוח, קוסמטיקה, טיפולי יופי ושירותים משלימים.",
  },
  {
    id: "food-bakery-catering",
    slug: "food-bakery-catering",
    name: "אוכל, מאפים וקייטרינג",
    description: "אוכל ביתי, מגשי אירוח, מאפים וקייטרינג בהזמנה ישירה.",
  },
  {
    id: "gifts-events",
    slug: "gifts-events",
    name: "מתנות ואירועים",
    description: "מארזים, מתנות, הפקות קטנות ושירותים לאירועים.",
  },
  {
    id: "babies-kids",
    slug: "babies-kids",
    name: "תינוקות וילדים",
    description: "מוצרים, מתנות ושירותים למשפחות, ילדים ותינוקות.",
  },
  {
    id: "home-design",
    slug: "home-design",
    name: "לבית ולעיצוב",
    description: "פריטים לבית, עיצוב, טקסטיל ואקססוריז דרך קטלוג וואטסאפ.",
  },
  {
    id: "jewelry-accessories",
    slug: "jewelry-accessories",
    name: "תכשיטים ואקססוריז",
    description: "תכשיטים, אקססוריז, פריטים בעבודת יד וקולקציות מתחלפות.",
  },
  {
    id: "local-services",
    slug: "local-services",
    name: "שירותים מקומיים",
    description: "נותני שירות ישראלים שמקבלים פניות והזמנות דרך וואטסאפ.",
  },
  {
    id: "arab-sector-shops",
    slug: "arab-sector-shops",
    name: "חנויות מהמגזר הערבי",
    description: "חנויות ועסקים ישראליים מהמגזר הערבי שפועלים דרך וואטסאפ.",
  },
] satisfies Category[];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
