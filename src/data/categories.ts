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
    description: "חנויות וואטסאפ עם גאדג׳טים, אביזרים ומוצרי טכנולוגיה.",
  },
  {
    id: "phones-accessories",
    slug: "phones-accessories",
    name: "טלפונים ואביזרים",
    description: "טלפונים, כיסויים, מטענים ואביזרים שנמכרים דרך קטלוג וואטסאפ.",
  },
  {
    id: "computers-office",
    slug: "computers-office",
    name: "מחשבים וציוד משרדי",
    description: "מחשבים, ציוד עבודה, אביזרי משרד ופתרונות לעסק ולבית.",
  },
  {
    id: "website-building",
    slug: "website-building",
    name: "בניית אתרים",
    description: "בניית אתרים, דפי נחיתה ופתרונות נוכחות דיגיטלית לעסקים.",
  },
  {
    id: "ai-tools",
    slug: "ai-tools",
    name: "כלים ובינה מלאכותית",
    description: "כלים מבוססי בינה מלאכותית, אוטומציות ופתרונות חכמים לעסק.",
  },
  {
    id: "software-digital",
    slug: "software-digital",
    name: "תוכנה ודיגיטל",
    description: "שירותי תוכנה, דיגיטל, מערכות וכלים טכנולוגיים לעסקים.",
  },
  {
    id: "app-development",
    slug: "app-development",
    name: "אפליקציות ופיתוח",
    description: "פיתוח אפליקציות, מערכות וכלים מותאמים לצרכים עסקיים.",
  },
  {
    id: "technical-services-businesses",
    slug: "technical-services-businesses",
    name: "שירותים טכניים לעסקים",
    description: "טיפול בתקלות טכניות, תמיכה וכלים דיגיטליים לעסקים.",
  },
  {
    id: "electronics-electricity",
    slug: "electronics-electricity",
    name: "חשמל ואלקטרוניקה",
    description: "מוצרי חשמל, אלקטרוניקה ואביזרים שימושיים לבית ולעסק.",
  },
  {
    id: "hair-barbers",
    slug: "hair-barbers",
    name: "מספרות וטיפוח שיער",
    description: "מספרות, מוצרי שיער, טיפולים ותיאום ישיר דרך וואטסאפ.",
  },
  {
    id: "beauty-care",
    slug: "beauty-care",
    name: "יופי וטיפוח",
    description: "מוצרי טיפוח, קוסמטיקה, טיפולי יופי ושירותים משלימים.",
  },
  {
    id: "cosmetics-perfumes",
    slug: "cosmetics-perfumes",
    name: "קוסמטיקה ובשמים",
    description: "בשמים, מוצרי קוסמטיקה וטיפוח אישי בקטלוג וואטסאפ.",
  },
  {
    id: "hair-care-products",
    slug: "hair-care-products",
    name: "מוצרי טיפוח שיער",
    description: "מוצרי טיפוח שיער, חומרים מקצועיים ופתרונות לשיער.",
  },
  {
    id: "barber-equipment-accessories",
    slug: "barber-equipment-accessories",
    name: "ציוד ואביזרים לספרים",
    description: "ציוד לספרים, אביזרים מקצועיים ומוצרים לעבודה במספרה.",
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
    id: "kids-baby-clothes",
    slug: "kids-baby-clothes",
    name: "בגדי ילדים ותינוקות",
    description: "בגדים, סטים ומתנות לילדים ולתינוקות בהזמנה ישירה.",
  },
  {
    id: "food-bakery-catering",
    slug: "food-bakery-catering",
    name: "אוכל, מאפים וקייטרינג",
    description: "אוכל ביתי, מגשי אירוח, מאפים וקייטרינג בהזמנה ישירה.",
  },
  {
    id: "sweets-chocolate",
    slug: "sweets-chocolate",
    name: "מתוקים ושוקולדים",
    description: "מארזי מתוקים, שוקולדים, קינוחים והפתעות מתוקות.",
  },
  {
    id: "gifts-events",
    slug: "gifts-events",
    name: "מתנות ואירועים",
    description: "מארזים, מתנות, הפקות קטנות ושירותים לאירועים.",
  },
  {
    id: "personalized-prints-gifts",
    slug: "personalized-prints-gifts",
    name: "הדפסות ומתנות אישיות",
    description: "הדפסות אישיות, בלוקי זכוכית, מארזים ומתנות בעיצוב אישי דרך קטלוג וואטסאפ.",
  },
  {
    id: "flowers-event-design",
    slug: "flowers-event-design",
    name: "פרחים ועיצוב אירועים",
    description: "פרחים, עיצוב שולחנות, קישוטים ושירותים לאירועים.",
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
    id: "kitchen-homeware",
    slug: "kitchen-homeware",
    name: "כלי בית ומטבח",
    description: "כלי מטבח, פתרונות אחסון, פריטים לבית ואביזרים שימושיים.",
  },
  {
    id: "furniture-interior",
    slug: "furniture-interior",
    name: "ריהוט ועיצוב פנים",
    description: "ריהוט, פריטי עיצוב, אקססוריז ופתרונות לבית.",
  },
  {
    id: "jewelry-accessories",
    slug: "jewelry-accessories",
    name: "תכשיטים ואקססוריז",
    description: "תכשיטים, אקססוריז, פריטים בעבודת יד וקולקציות מתחלפות.",
  },
  {
    id: "cars-accessories",
    slug: "cars-accessories",
    name: "רכבים ואביזרי רכב",
    description: "אביזרי רכב, פתרונות ניקיון, נוחות ושדרוגים לרכב.",
  },
  {
    id: "sports-fitness",
    slug: "sports-fitness",
    name: "ספורט וכושר",
    description: "ציוד ספורט, אביזרי אימון, תוכניות כושר ומוצרים משלימים.",
  },
  {
    id: "health-lifestyle",
    slug: "health-lifestyle",
    name: "בריאות ואורח חיים",
    description: "מוצרים ושירותים שמקדמים שגרה בריאה ונוחה יותר.",
  },
  {
    id: "pets-supplies",
    slug: "pets-supplies",
    name: "בעלי חיים וציוד לחיות",
    description: "מזון, צעצועים, אביזרים ושירותים לבעלי חיים.",
  },
  {
    id: "books-crafts-study",
    slug: "books-crafts-study",
    name: "ספרים, יצירה וציוד לימודי",
    description: "ספרים, חומרי יצירה, משחקי למידה וציוד לתלמידים.",
  },
  {
    id: "local-services",
    slug: "local-services",
    name: "שירותים מקומיים",
    description: "נותני שירות ישראלים שמקבלים פניות והזמנות דרך וואטסאפ.",
  },
  {
    id: "arab-sector-businesses",
    slug: "arab-sector-businesses",
    name: "עסקים מהמגזר הערבי",
    description: "עסקים ישראליים מהמגזר הערבי שפועלים דרך וואטסאפ.",
  },
  {
    id: "judaica-shabbat",
    slug: "judaica-shabbat",
    name: "יודאיקה ומוצרי שבת",
    description: "יודאיקה, מתנות, מוצרי שבת ופריטים לבית היהודי.",
  },
  {
    id: "weddings-events",
    slug: "weddings-events",
    name: "חתונות ואירועים",
    description: "ספקים, מוצרים ושירותים לחתונות, שמחות ואירועים.",
  },
  {
    id: "cleaning-maintenance",
    slug: "cleaning-maintenance",
    name: "ניקיון ותחזוקה",
    description: "מוצרי ניקיון, תחזוקה ושירותים לבית ולעסק.",
  },
  {
    id: "construction-renovation",
    slug: "construction-renovation",
    name: "בנייה ושיפוצים",
    description: "בעלי מקצוע, ציוד, חומרים ושירותים לעבודות בית ושיפוץ.",
  },
  {
    id: "tourism-israel",
    slug: "tourism-israel",
    name: "תיירות ונופש בישראל",
    description: "חוויות, אירוח, טיולים ושירותי נופש בישראל.",
  },
] satisfies Category[];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
