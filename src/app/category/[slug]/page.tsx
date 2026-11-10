import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalyticsPageView } from "@/components/AnalyticsPageView";
import { ShopCard } from "@/components/ShopCard";
import { categories, getCategoryBySlug, type Category } from "@/data/categories";
import {
  getApprovedShopsForCategory,
  getApprovedStoreCountForCategory,
} from "@/lib/category-stats";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

type CategoryEditorialContent = {
  heading: string;
  description: string;
  sectionHeading: string;
  sections: Array<{ title: string; text: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedLinks?: Array<{ label: string; href: string }>;
};

type JsonLdRecord = Record<string, unknown>;

const categoryEditorialContent: Record<string, CategoryEditorialContent> = {
  "hair-barbers": {
    heading: "מספרות וטיפוח שיער – בירור ותיאום בוואטסאפ",
    description: "מחפשים מספרה בפתח תקווה? הכירו את רוולושיין סטודיו, עסק שמציג שירותי מספרה וטיפוח שיער בקטלוג וואטסאפ. פנו ישירות לבירור השירות, מחיר ותור פנוי.",
    sectionHeading: "מה כדאי להכין לפני שפונים למספרה?",
    sections: [
      { title: "מגדירים את השירות", text: "ציינו איזה שירות אתם מחפשים ומה תרצו לברר לפני ההגעה. בקשו מהמספרה לאשר שהיא מציעה את השירות ולפרט מה הוא כולל. תיאור קצר וממוקד עוזר לקבל תשובה שמתייחסת לבקשה שלכם ולא למחיר כללי בלבד." },
      { title: "מתאמים מועד ומיקום", text: "שלחו יום ושעה מועדפים, שאלו כמה זמן צפוי להימשך השירות ובקשו כתובת מדויקת. העיר שמופיעה בכרטיס עוזרת למצוא עסק באזור, אך אינה מחליפה הוראות הגעה ואישור תור מהמספרה עצמה." },
      { title: "מסכמים לפני שמגיעים", text: "בררו מחיר משוער ומה עשוי לשנות אותו, תנאי ביטול או שינוי מועד ואופן התשלום. אם אתם מחפשים רק מוצר לרכישה, אפשר לעבור לקטגוריית מוצרי השיער ולבקש מידע על הפריט במקום לתאם שירות במספרה." },
    ],
    faqs: [
      { question: "איזו מספרה בפתח תקווה מופיעה בוואשופ?", answer: "רוולושיין סטודיו מופיע באתר כעסק בפתח תקווה בתחום המספרות וטיפוח השיער. אפשר לפתוח את הכרטיס ולפנות ישירות לבירור שירותים ותורים." },
      { question: "האם הודעה דרך האתר קובעת תור אוטומטית?", answer: "לא. קישור הוואטסאפ פותח פנייה לעסק. התור נקבע רק לאחר תיאום ואישור מול המספרה." },
    ],
    relatedLinks: [
      { label: "מוצרי טיפוח שיער לרכישה", href: "/category/hair-care-products" },
      { label: "קורסים והכשרות בתחום הספרות", href: "/category/courses-training" },
      { label: "לכרטיס רוולושיין סטודיו", href: "/shop/revolution-studio" },
    ],
  },
  "barber-equipment-accessories": {
    heading: "ציוד ואביזרים לספרים בקטלוג וואטסאפ",
    description: "גלו ציוד ואביזרים לספרים דרך רוולושיין סטודיו בפתח תקווה. פתחו את הקטלוג ובררו ישירות דגם, התאמה לעבודה, מחיר, זמינות ותנאי משלוח.",
    sectionHeading: "איך בודקים ציוד למספרה לפני הזמנה?",
    sections: [
      { title: "דגם וייעוד", text: "ציינו את סוג האביזר או כלי העבודה, שם היצרן והדגם אם ידועים לכם. בקשו מפרט או תמונה ברורה ובדקו אם הפריט מתאים לסוג העבודה שלכם. אין להסיק שציוד מסוים קיים במלאי רק מפני שהעסק מציג את התחום בקטלוג." },
      { title: "מה כלול בערכה", text: "בררו אילו חלקים נלווים כלולים ומה נמכר בנפרד. אם הפריט מתחבר לציוד שכבר ברשותכם, מסרו את הדגם המדויק ובקשו אישור התאמה. לפני רכישה כדאי לקרוא גם את הוראות התפעול והתחזוקה של היצרן." },
      { title: "שירות, אחריות ואספקה", text: "שאלו מי נותן שירות למוצר, אילו תנאי אחריות מוצעים ומה עושים אם מגיע פריט שגוי. סיכמו מחיר סופי, כמות, אופן קבלה ומועד אספקה. הזמנה לעסק או למספרה נסגרת ישירות עם המוכר, ללא תשלום דרך וואשופ." },
    ],
    faqs: [
      { question: "איפה אפשר לברר על ציוד לספרים בפתח תקווה?", answer: "כרטיס רוולושיין סטודיו מציג גם ציוד ומוצרים לספרים. אפשר לפנות דרך הקטלוג ולשאול על הפריט המדויק, זמינותו ואפשרויות קבלה." },
      { question: "האם יש באתר מחירון של ציוד למספרות?", answer: "לא. וואשופ מציגה את העסק ואת דרכי הפנייה אליו. את הדגמים, המחירון, המלאי ותנאי השירות יש לבדוק אצל המוכר." },
    ],
    relatedLinks: [
      { label: "מוצרי שיער ומוצרי טיפוח", href: "/category/hair-care-products" },
      { label: "קורסים והכשרות", href: "/category/courses-training" },
      { label: "מדריך לבירור מוצרים בוואטסאפ", href: "/blog/hair-products-whatsapp-buying-guide" },
    ],
  },
  "courses-training": {
    heading: "קורסים והכשרות בספרות ובתספורות",
    description: "מתעניינים בקורס ספרות או תספורות? רוולושיין סטודיו בפתח תקווה מציג קורסים והכשרות בתחום. פנו בוואטסאפ לבירור תוכן הלימוד, דרישות קבלה ומועדי פתיחה.",
    sectionHeading: "מה שואלים לפני שבוחרים קורס ספרות?",
    sections: [
      { title: "רמה ותוכנית לימודים", text: "ספרו אם אתם מתחילים או בעלי ניסיון, ובקשו תוכנית לימודים מפורטת. בדקו אילו נושאים נלמדים, מה היחס בין הסבר לתרגול ומי מלמד בפועל. שם הקורס לבדו אינו מפרט את היקף ההכשרה." },
      { title: "מסגרת וציוד", text: "בררו מיקום, מספר מפגשים, שעות לימוד וגודל קבוצה. שאלו איזה ציוד נדרש, מה מסופק במקום ואילו רכישות נלוות עשויות להידרש. זמינות של מחזור חדש ומקומות פנויים מאושרת רק על ידי העסק." },
      { title: "עלות ותנאי הרשמה", text: "בקשו עלות מלאה, הסדרי תשלום ותנאי ביטול בכתב. אם מוצעת תעודה, בררו מי מנפיק אותה ומה היא מעידה. הופעה בוואשופ אינה אישור להסמכה, הכרה מקצועית או הבטחה לעבודה לאחר הלימודים." },
    ],
    faqs: [
      { question: "אילו קורסים מוצגים כרגע בקטגוריה?", answer: "העסק שמופיע בקטגוריה הוא רוולושיין סטודיו, שמתאר קורסים והכשרות בתחום הספרות והתספורות. את שמות הקורסים, התכנים והמועדים העדכניים יש לברר מולו." },
      { question: "האם נרשמים לקורס דרך וואשופ?", answer: "לא. וואשופ מפנה לעסק. בירור התאמה, הרשמה, תשלום וקבלת מסמכי הקורס נעשים ישירות מול נותן ההכשרה." },
    ],
    relatedLinks: [
      { label: "רוולושיין סטודיו – פרטי העסק", href: "/shop/revolution-studio" },
      { label: "ציוד ואביזרים לספרים", href: "/category/barber-equipment-accessories" },
      { label: "מספרות וטיפוח שיער", href: "/category/hair-barbers" },
    ],
  },
  "hair-care-products": {
    heading: "מוצרי שיער ומוצרי טיפוח לשיער בקטלוג וואטסאפ",
    description:
      "מחפשים חנות למוצרי שיער? גלו את קטלוג רוולושיין סטודיו בפתח תקווה, עסק שנבדק בוואשופ ומציג מוצרי טיפוח שיער ואביזרים. בררו ישירות מוצרים, מחיר, מלאי ומשלוח.",
    sectionHeading: "איך מוצאים מוצרי שיער שמתאימים להזמנה?",
    sections: [
      {
        title: "מזהים את המוצר המדויק",
        text: "כדאי לשלוח למוכר שם מלא, מותג, נפח או צילום אריזה של המוצר שאתם מחפשים. בקשו תמונה עדכנית ותיאור של השימוש המיועד. גם מוצרים מאותה סדרה עשויים להגיע בגרסאות שונות, ולכן שם כללי כמו מוצרי טיפוח לשיער אינו מספיק להזמנה מדויקת.",
      },
      {
        title: "מבדילים בין שימוש ביתי למקצועי",
        text: "אם אתם מחפשים מוצרי שיער מקצועיים למספרה, ציינו זאת מראש ושאלו למי מיועד המוצר ומהן הוראות היצרן. הופעה בקטלוג אינה מעידה שכל מוצר מתאים לשימוש עצמאי. ציוד ואביזרים לספרים מופיעים גם בקטגוריה נפרדת באתר.",
      },
      {
        title: "מאשרים מחיר ומלאי בשיחה",
        text: "לפני התשלום בקשו אישור שהפריט והנפח הרצויים זמינים, מה המחיר הכולל ואיך מקבלים את ההזמנה. בררו עלות משלוח, זמן אספקה ואפשרות איסוף אם העסק מציע אותה. המלאי והמחירים נקבעים אצל העסק ואינם מתעדכנים בזמן אמת בוואשופ.",
      },
    ],
    faqs: [
      {
        question: "איפה מוצאים חנות למוצרי שיער דרך וואשופ?",
        answer: "אפשר לפתוח את כרטיס רוולושיין סטודיו בפתח תקווה ולעבור לקטלוג הוואטסאפ או לשיחה עם העסק. הכרטיס מציג מוצרי טיפוח שיער ואביזרים, ואת המותגים והפריטים הזמינים יש לבדוק ישירות מול העסק.",
      },
      {
        question: "האם אפשר להזמין מוצרי שיער במשלוח?",
        answer: "בכרטיס העסק מופיעה אפשרות למשלוחים לכל הארץ. לפני הזמנה יש לאשר מול המוכר את הכתובת, זמינות הפריט, עלות המשלוח וזמן האספקה להזמנה המסוימת.",
      },
      {
        question: "האם וואשופ מוכרת או ממליצה על מוצר שיער מסוים?",
        answer: "וואשופ היא אינדקס עסקים ואינה מוכרת את המוצרים או קובעת התאמה אישית. המידע על המוצר, הוראות השימוש, המחיר והתשלום נמסרים ישירות על ידי העסק.",
      },
    ],
    relatedLinks: [
      { label: "מה לבדוק לפני הזמנת מוצרי שיער", href: "/blog/hair-products-whatsapp-buying-guide" },
      { label: "ציוד ואביזרים לספרים", href: "/category/barber-equipment-accessories" },
      { label: "מספרות וטיפוח שיער", href: "/category/hair-barbers" },
    ],
  },
  "beauty-care": {
    heading: "יופי וטיפוח: עסקים וקטלוגים לפנייה בוואטסאפ",
    description:
      "גלו עסקי יופי וטיפוח שנבדקו בוואשופ. רוולושיין סטודיו בפתח תקווה מציג שירותי מספרה, מוצרי טיפוח שיער ואביזרים, עם קטלוג ופנייה ישירה לבירור פרטים ותיאום.",
    sectionHeading: "מחפשים מוצר טיפוח או שירות? כך מתחילים",
    sections: [
      {
        title: "רכישת מוצר טיפוח",
        text: "אם אתם מחפשים מוצר, התחילו מהקטלוג ובקשו פרטי מוצר מדויקים, נפח, מחיר וזמינות. למוצרי שיער יש בוואשופ קטגוריה ייעודית שמרכזת את העסקים הרלוונטיים ואת הבדיקות שכדאי לעשות לפני הזמנה.",
      },
      {
        title: "תיאום שירות במספרה",
        text: "לפנייה לגבי שירות, ציינו מה תרצו לתאם, מועד מועדף ומיקום. בקשו מהעסק להסביר מה כולל השירות, מה משכו ומה המחיר. שליחת הודעה אינה אישור תור עד שמתקבל סיכום מהעסק.",
      },
      {
        title: "בודקים מה העסק מציע בפועל",
        text: "זהו אינדקס שמתעדכן בהדרגה, ולא כל תחום בעולם היופי מיוצג בו. בדקו את תיאור העסק ואת הקטלוג לפני הפנייה. אישור העסק בוואשופ אינו אישור לזמינות מוצר או שירות מסוים ואינו מחליף בירור ישיר.",
      },
    ],
    faqs: [
      {
        question: "אילו שירותי טיפוח אפשר למצוא כרגע בקטגוריה?",
        answer: "בקטגוריה מופיע רוולושיין סטודיו בפתח תקווה, עם שירותי מספרה, מוצרי טיפוח שיער ואביזרים. את השירותים הזמינים, המחירים והתורים יש לאשר מול העסק.",
      },
      {
        question: "איך עוברים מחיפוש חנות לשיחה עם העסק?",
        answer: "פותחים את כרטיס העסק ולוחצים על הקטלוג או על שליחת הודעה. מומלץ לציין אם מדובר במוצר לרכישה או בשירות שרוצים לתאם כדי שהעסק יוכל לענות בצורה ממוקדת.",
      },
      {
        question: "האם משלמים או קובעים תור דרך וואשופ?",
        answer: "לא. וואשופ מאפשרת גילוי ופנייה ישירה. תשלום, הזמנה, תור, משלוח ותנאי השירות מסוכמים עם העסק עצמו.",
      },
    ],
    relatedLinks: [
      { label: "חנויות למוצרי שיער", href: "/category/hair-care-products" },
      { label: "מספרות וטיפוח שיער", href: "/category/hair-barbers" },
      { label: "מדריך להזמנת מוצרי שיער בוואטסאפ", href: "/blog/hair-products-whatsapp-buying-guide" },
    ],
  },
  "fashion-shoes": {
    heading: "כפכפי עיסוי ונעלי נוחות לנשים ולגברים",
    description:
      "גלו חנויות וואטסאפ מאושרות לכפכפי עיסוי, נעלי נוחות והנעלה לשימוש יומיומי. אפשר לפתוח את הקטלוג, לבדוק דגמים ומידות ולברר ישירות עם בית העסק מחיר, מלאי, משלוח והחזרה.",
    sectionHeading: "איך בוחרים כפכפים ונעלי נוחות דרך קטלוג וואטסאפ?",
    sections: [
      {
        title: "מידה והתאמה",
        text:
          "בקשו מבית העסק טבלת מידות או אורך פנימי, ציינו את המידה הרגילה שלכם ובררו אם הדגם צר, רחב או מתאים לשימוש מסוים. התאמה ונוחות הן אישיות, ולכן חשוב לוודא את הפרטים לפני ההזמנה.",
      },
      {
        title: "דגם, חומר ומלאי",
        text:
          "בדקו תמונות עדכניות, צבעים, חומר, מבנה הסוליה והמלאי במידה המבוקשת. אם המטרה היא הליכה, בית או שימוש יומיומי, הסבירו זאת למוכר ובקשו מידע מדויק על הדגם.",
      },
      {
        title: "משלוח והחזרה",
        text:
          "לפני תשלום בררו מה המחיר הסופי, איך מתבצע המשלוח, תוך כמה זמן הוא צפוי להגיע ומהי מדיניות החלפה או החזרה במקרה שהמידה אינה מתאימה.",
      },
    ],
    faqs: [
      {
        question: "איפה אפשר למצוא כפכפי עיסוי בוואטסאפ?",
        answer:
          "בקטגוריה הזו מופיעות חנויות שאושרו בוואשופ ומציגות כפכפי עיסוי או נעלי נוחות בקטלוג וואטסאפ. פותחים את כרטיס החנות ועוברים ישירות לקטלוג או לשיחה עם בית העסק.",
      },
      {
        question: "איך בוחרים מידה לנעלי נוחות או לכפכפים?",
        answer:
          "מומלץ לבקש טבלת מידות או אורך פנימי לדגם ולברר אם קיימת התאמה מיוחדת. המידה, ההתאמה והנוחות נבדקות ישירות מול בית העסק לפני ההזמנה.",
      },
      {
        question: "האם וואשופ מבטיחה שכפכף מסוים יהיה נוח?",
        answer:
          "לא. וואשופ היא אינדקס גילוי ואינה היצרן או המוכר. יש לבדוק ישירות מול בית העסק את מאפייני המוצר, ההתאמה, המחיר, המשלוח ומדיניות ההחזרה.",
      },
    ],
  },
  "software-digital": {
    heading: "שירותי תוכנה ודיגיטל לעסקים",
    description:
      "מצאו שירותי תוכנה ודיגיטל לעסק, בדקו את תחומי העבודה בכרטיס נותן השירות ופנו ישירות בוואטסאפ. מדריך קצר לבירור רישוי, התאמה, עלויות ותמיכה לפני הזמנה.",
    sectionHeading: "איך בוחרים פתרון תוכנה שמתאים לעבודה בעסק?",
    sections: [
      {
        title: "מתחילים מהמשימה שצריך לפתור",
        text:
          "תארו תהליך אחד שגוזל זמן: העתקת הזמנות, חיפוש מידע, הפקת דוח או טיפול בפניות. ציינו באילו מערכות עובדים היום, מי ישתמש בפתרון ומה נחשב לתוצאה מוצלחת. כך אפשר לברר אם מספיק כלי קיים, נדרשת התאמה או שכדאי לבחון פיתוח ייעודי.",
      },
      {
        title: "קניית תוכנה, מנוי או פיתוח מותאם",
        text:
          "לפני קניית תוכנה בררו מה מקבלים בפועל: רישיון שימוש, מנוי תקופתי, עבודת התקנה או פיתוח. בקשו פירוט של מספר משתמשים, הגבלות שימוש, תוספים, תחזוקה והדרכה. מחיר ההקמה לבדו אינו מתאר את עלות השימוש לאורך זמן.",
      },
      {
        title: "בודקים התאמה עם דוגמה קטנה",
        text:
          "בקשו לראות איך הספק מבצע משימה שמוכרת לכם, בעזרת נתוני דוגמה שאינם רגישים. בדקו כיצד מזינים מידע, מתקנים טעות ומייצאים את התוצאה. אם דרוש חיבור למערכת קיימת, בקשו אישור מפורש לתאימות ולגבולות החיבור; הופעה בקטגוריה אינה מעידה על תמיכה בכל מערכת.",
      },
      {
        title: "שומרים אפשרות להמשיך גם בהמשך",
        text:
          "סכמו איך מקבלים גישה לחשבונות, כיצד מגבים ומייצאים את המידע, מי מטפל בתקלה ומה קורה בסיום ההתקשרות. בכרטיס נביא נס ישראל באתר מפורטים שירותי תוכנה ודיגיטל; את זמינות השירות, ההצעה וההתאמה לעסק שלכם מבררים ישירות מול הספק.",
      },
    ],
    faqs: [
      {
        question: "מה לברר לפני קניית תוכנה לעסק?",
        answer:
          "בררו את סוג הרישיון או המנוי, מספר המשתמשים, העלויות החוזרות, התאמה למערכות קיימות, אפשרות ייצוא מידע ותנאי התמיכה. בקשו הדגמה של תהליך עבודה רלוונטי לפני החלטה.",
      },
      {
        question: "האם נותני השירות תומכים בכל מערכת עסקית?",
        answer:
          "אין להסיק זאת מהופעה בקטגוריה. יש לציין את שם המערכת והצורך המדויק ולבקש מהספק לבדוק תאימות, הרשאות, היקף עבודה ועלויות לפני שמתחילים.",
      },
      {
        question: "האם רוכשים את התוכנה דרך וואשופ?",
        answer:
          "לא. וואשופ מאפשרת לגלות נותני שירות ולפנות אליהם. ההצעה, הרכישה, הרישוי, ההתקנה והתמיכה נקבעים ישירות מול בית העסק.",
      },
    ],
    relatedLinks: [
      { label: "נביא נס ישראל – שירותי תוכנה ודיגיטל", href: "/shop/navines" },
      { label: "פיתוח ווב ואפליקציות", href: "/category/app-development" },
      { label: "תמיכה טכנית לעסקים", href: "/category/technical-services-businesses" },
      { label: "ניהול שירות לקוחות בוואטסאפ", href: "/blog/sherut-lakohot-bewhatsapp-laasakim" },
    ],
  },
  "app-development": {
    heading: "פיתוח ווב ואפליקציות לעסקים",
    description:
      "גלו נותני שירות מאושרים לפיתוח ווב, אפליקציות וכלים דיגיטליים לעסקים. אפשר לקרוא על השירות, לפתוח את קטלוג הוואטסאפ ולברר ישירות התאמה, היקף עבודה ולוחות זמנים.",
    sectionHeading: "איך בוחנים נותן שירות לפיתוח אפליקציות?",
    sections: [
      {
        title: "מה אפשר למצוא בקטגוריה?",
        text:
          "הקטגוריה מרכזת עסקים שמציעים פיתוח אפליקציות, פיתוח ווב, פורטלים וכלים דיגיטליים. וואשופ עוזרת לגלות את נותן השירות ולפתוח שיחה ישירה, אך אינה מבצעת את הפרויקט ואינה צד בהתקשרות.",
      },
      {
        title: "מה להכין לפני הפנייה?",
        text:
          "כדאי להכין מטרה עסקית, קהל יעד, תהליכים מרכזיים, פלטפורמה רצויה, תקציב משוער ולוח זמנים. מסמך קצר וברור עוזר לספק להבין אם הפרויקט מתאים לו.",
      },
      {
        title: "מה חשוב לברר?",
        text:
          "בררו מה כלול באפיון, בעיצוב, בפיתוח, בבדיקות ובתחזוקה, למי שייכים הקוד והתוכן, איך מתומחרים שינויים ומה כולל השירות לאחר העלייה לאוויר.",
      },
      {
        title: "פיתוח ווב, אתר תדמית או אפליקציה?",
        text:
          "אם המטרה היא להציג עסק ולקבל פניות, התחילו בבירור בניית אתר. אם המשתמש צריך להתחבר, לעדכן מידע, להזמין שירות או לנהל תהליך, תארו את הפעולות לספק פיתוח ווב. אל תבחרו פלטפורמה רק לפי שמה: בקשו להסביר איך הפתרון יעבוד בדפדפן ובטלפון ומה יידרש לתחזוקתו.",
      },
      {
        title: "נוסח קצר לבקשת הצעה בוואטסאפ",
        text:
          "אפשר להתחיל כך: ״שלום, אנחנו עסק בתחום ___. המשתמשים שלנו הם ___ והם צריכים לבצע ___. כיום אנחנו עובדים עם ___. לגרסה הראשונה נחוצים שלושת התהליכים ___. האם זה מתאים לתחום העבודה שלכם, ומה דרוש כדי לקבל הצעת מחיר?״ אין צורך לשלוח סיסמאות או נתוני לקוחות כדי להסביר את הרעיון.",
      },
      {
        title: "משווים הצעות לפי אותה גרסה ראשונה",
        text:
          "שלחו לכל ספק את אותם תהליכים ובקשו פירוט של תוצרים, אבני דרך, מספר סבבי תיקונים ועלויות שוטפות. הגדירו דוגמת קבלה: משתמש נרשם, מבצע פעולה ומקבל תוצאה צפויה. כך אפשר לבדוק את המסירה מול צורך ממשי, ולא רק מול רשימת מסכים או שעות עבודה.",
      },
    ],
    faqs: [
      {
        question: "מה כולל פיתוח ווב או אפליקציה לעסק?",
        answer:
          "היקף העבודה יכול לכלול אפיון, עיצוב, פיתוח, חיבור למערכות, בדיקות ותחזוקה. צריך לסכם מול נותן השירות מה כלול בפרויקט, מי אחראי על כל שלב ומה נמסר בסיום.",
      },
      {
        question: "איך בוחרים נותן שירות לפיתוח אפליקציות?",
        answer:
          "מתחילים מתיאור ברור של המטרה, המשתמשים והפלטפורמה, ואז בודקים ניסיון רלוונטי, תהליך עבודה, לוחות זמנים, בעלות על הקוד ותמיכה לאחר ההשקה.",
      },
      {
        question: "האם וואשופ מבצעת פיתוח אפליקציות או פיתוח ווב?",
        answer:
          "לא. וואשופ היא אינדקס לגילוי עסקים ונותני שירות. הפנייה, ההצעה, המחיר, הפיתוח והתמיכה נסגרים ישירות מול העסק שמופיע בכרטיס.",
      },
      {
        question: "איך מקבלים הצעת מחיר לשירותי פיתוח ווב?",
        answer:
          "שלחו מטרה, קהל משתמשים, תהליכים מרכזיים, מערכות שצריך לחבר ותאריך יעד. בקשו הפרדה בין אפיון, עיצוב, פיתוח, בדיקות ותחזוקה, כדי שתוכלו להשוות הצעות על אותו היקף.",
      },
    ],
    relatedLinks: [
      { label: "נביא נס ישראל – כרטיס נותן השירות", href: "/shop/navines" },
      { label: "בניית אתרים ופורטלי ווב", href: "/category/website-building" },
      { label: "בחירת שירותי תוכנה ודיגיטל", href: "/category/software-digital" },
      { label: "תמיכה ותחזוקה לעסקים", href: "/category/technical-services-businesses" },
    ],
  },
  "website-building": {
    heading: "בניית אתרים ופורטלי ווב לעסקים",
    description:
      "גלו נותני שירות מאושרים לבניית אתרים, פורטלי ווב, דפי נחיתה ונוכחות דיגיטלית לעסקים. אפשר לבדוק את תחומי העבודה ולפנות ישירות בוואטסאפ כדי לברר התאמה לפרויקט.",
    sectionHeading: "מה חשוב לבדוק לפני שבונים אתר לעסק?",
    sections: [
      {
        title: "סוג האתר והמטרה",
        text:
          "הגדירו אם נדרש אתר תדמית, דף נחיתה, קטלוג, חנות או מערכת מותאמת. מטרה ברורה עוזרת לקבל הצעה שמתאימה לצורך ולא רק רשימת תכונות כללית.",
      },
      {
        title: "תוכן, עיצוב ותחזוקה",
        text:
          "בררו מי אחראי על כתיבה, תמונות, עיצוב, אחסון, דומיין, נגישות ועדכונים. חשוב להבין מראש אילו משימות כלולות ואילו שירותים יתומחרו בנפרד.",
      },
      {
        title: "בעלות ותמיכה אחרי ההשקה",
        text:
          "שאלו למי שייכים הקוד, החשבונות והתוכן, איך מקבלים גישה למערכות ומה כוללת התמיכה לאחר העלייה לאוויר. הסיכומים נעשים ישירות מול נותן השירות.",
      },
      {
        title: "יצירת פורטל ווב מתחילה בתפקידים ובפעולות",
        text:
          "לפני בקשת הצעה לפורטל, הגדירו מי נכנס אליו ומה כל סוג משתמש יכול לראות ולעשות. לדוגמה, בתרחיש של אזור לקוחות אפשר לבקש צפייה בפניות ועדכון פרטי קשר, ובצד העסק טיפול בפניות. זו דוגמת אפיון בלבד; יש לברר מול הספק אילו יכולות הוא יכול לספק ומה עלותן.",
      },
      {
        title: "מה לשלוח לספק כדי לקבל הצעה מדויקת?",
        text:
          "הכינו רשימת עמודים, שפות, טפסים וחיבורים נדרשים, וציינו אם יש אתר פעיל. אם מחליפים אתר קיים, צרפו רשימת כתובות חשובות ובקשו תוכנית לשמירת התוכן, הכתובות והפניות הלקוחות. כדאי להפריד בין דרישות שחייבות להיכלל בהשקה לבין הרחבות עתידיות.",
      },
      {
        title: "בדיקה לפני העלייה לאוויר",
        text:
          "עברו על האתר בטלפון ובמחשב: האם אפשר לקרוא, לנווט, לפתוח קטלוג ולשלוח פנייה? בדקו שהטפסים מגיעים ליעד הנכון, שהקישורים תקינים ושהצוות יודע לעדכן תוכן. בקשו גם סיכום מסירה עם גישה לדומיין, לאחסון ולגיבויים הרלוונטיים לעסק.",
      },
    ],
    faqs: [
      {
        question: "איזה סוג אתר מתאים לעסק?",
        answer:
          "אפשר לבחור באתר תדמית, דף נחיתה, קטלוג, חנות או מערכת מותאמת לפי המטרה, כמות התוכן, תהליך המכירה והתחזוקה שהעסק צריך.",
      },
      {
        question: "מה חשוב לסכם לפני בניית אתר?",
        answer:
          "כדאי לסכם מי אחראי על תוכן, עיצוב, דומיין, אחסון, נגישות, עדכונים, גישה לחשבונות, בעלות על הקוד ותמיכה לאחר העלייה לאוויר.",
      },
      {
        question: "מה כוללת בניית פורטל ווב לעסק?",
        answer:
          "בניית פורטל ווב יכולה לכלול אזורים למשתמשים, תוכן או שירותים דינמיים, חיבור למערכות, הרשאות ותחזוקה. חשוב להגדיר מראש את המשתמשים, התהליכים והאחריות על המערכת.",
      },
      {
        question: "האם וואשופ בונה אתרים?",
        answer:
          "לא. וואשופ מאפשרת לגלות נותני שירות מאושרים ולפתוח איתם שיחה ישירה. תנאי הפרויקט והאחריות נקבעים מול נותן השירות.",
      },
      {
        question: "איך מבקשים לשפר אתר קיים בלי לאבד תוכן?",
        answer:
          "מציינים מראש שיש אתר פעיל, מוסרים לספק את הכתובות והתהליכים החשובים ומבקשים גיבוי, בדיקה בעותק נפרד ותוכנית פרסום. מסכמים במפורש אילו תכנים וכתובות צריכים להישמר.",
      },
    ],
    relatedLinks: [
      { label: "נביא נס ישראל – בניית אתרים ושירותים דיגיטליים", href: "/shop/navines" },
      { label: "פיתוח ווב ואפליקציות לעסקים", href: "/category/app-development" },
      { label: "קטלוג וואטסאפ או אתר חנות?", href: "/blog/hanut-virtualit-bewhatsapp" },
      { label: "תמיכה טכנית באתר קיים", href: "/category/technical-services-businesses" },
    ],
  },
  "technical-services-businesses": {
    heading: "תמיכה טכנית ופתרון תקלות דיגיטליות לעסקים",
    description:
      "גלו נותני שירות מאושרים לתמיכה טכנית, פתרון תקלות ותחזוקת כלים דיגיטליים לעסקים. אפשר להסביר את הצורך ולברר ישירות התאמה, זמינות, היקף טיפול ועלות.",
    sectionHeading: "איך פונים נכון לקבלת שירות טכני לעסק?",
    sections: [
      {
        title: "מתארים את הבעיה במדויק",
        text:
          "כתבו מה לא עובד, מתי התקלה התחילה, באיזו מערכת מדובר ומה כבר נוסה. אין לשלוח סיסמאות או מידע רגיש בצ׳אט לפני שמוודאים מול מי עובדים ואיך יישמר המידע.",
      },
      {
        title: "מבררים היקף וזמינות",
        text:
          "בדקו אם השירות ניתן מרחוק או בבית העסק, מה זמן התגובה המשוער, מה כלול באבחון ומה דורש אישור נוסף לפני ביצוע או חיוב.",
      },
      {
        title: "מסכמים אחריות והמשך טיפול",
        text:
          "לפני שמתחילים כדאי לסכם עלות, לוח זמנים, גיבוי, אחריות על השינוי ומה קורה אם נדרש טיפול נוסף. וואשופ אינה ספקית התמיכה ואינה צד בשירות.",
      },
    ],
    faqs: [
      {
        question: "איך פונים לקבלת שירות טכני לעסק?",
        answer:
          "מתארים את התקלה או הצורך, מציינים את המערכת והדחיפות, ולא שולחים סיסמאות או מידע רגיש לפני שמוודאים מול מי עובדים ואיך המידע נשמר.",
      },
      {
        question: "מה כוללת תמיכה טכנית לעסק?",
        answer:
          "תמיכה טכנית יכולה לכלול אבחון תקלות, תחזוקת אתר או מערכת, תיקוני קוד, גיבויים וחיבור לספקים. חשוב לסכם מול נותן השירות את היקף הטיפול, זמן התגובה והאחריות.",
      },
      {
        question: "מה לבדוק לפני שמזמינים תמיכה טכנית?",
        answer:
          "בדקו זמן תגובה, היקף האבחון, עלות, גיבוי, אחריות ומה קורה אם נדרש טיפול נוסף או שינוי במערכת.",
      },
      {
        question: "האם וואשופ מספקת תמיכה טכנית לעסקים?",
        answer:
          "לא. וואשופ היא אינדקס גילוי בלבד. השירות, האבחון, המחיר והאחריות ניתנים ישירות על ידי העסק או נותן השירות שבכרטיס.",
      },
    ],
  },
};

function getCategoryHeading(category: Category) {
  return categoryEditorialContent[category.slug]?.heading ?? category.name;
}

function getCategoryDescription(category: Category, approvedStoreCount: number) {
  if (categoryEditorialContent[category.slug]) {
    return categoryEditorialContent[category.slug].description;
  }

  if (approvedStoreCount > 0) {
    return `${category.description} בקטגוריה הזו מופיעות רק חנויות ועסקים שאושרו ידנית בוואשופ, כדי שתוכלו לפתוח קטלוג, לבדוק פרטים ולפנות ישירות למוכר.`;
  }

  return category.description;
}

function createCategoryJsonLd(category: Category, shops: ReturnType<typeof getApprovedShopsForCategory>) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "וואשופ",
        item: siteConfig.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "חנויות וואטסאפ",
        item: absoluteUrl("/shops"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: absoluteUrl(`/category/${category.slug}`),
      },
    ],
  };

  if (!shops.length) {
    return [breadcrumbList];
  }

  const categoryUrl = absoluteUrl(`/category/${category.slug}`);
  const jsonLd: JsonLdRecord[] = [
    breadcrumbList,
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: getCategoryHeading(category),
      description: getCategoryDescription(category, shops.length),
      url: categoryUrl,
      inLanguage: "he-IL",
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.domain,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `חנויות וואטסאפ בקטגוריית ${category.name}`,
      itemListElement: shops.map((shop, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/shop/${shop.slug}`),
        name: shop.name,
      })),
    },
  ];

  if (categoryEditorialContent[category.slug]?.faqs.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: categoryEditorialContent[category.slug].faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return jsonLd;
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  const approvedStoreCount = getApprovedStoreCountForCategory(category.slug);
  const titleBySlug: Record<string, string> = {
    "hair-barbers": "מספרות וטיפוח שיער בפתח תקווה – פנייה בוואטסאפ | וואשופ",
    "barber-equipment-accessories": "ציוד ואביזרים לספרים – קטלוג ופנייה בוואטסאפ | וואשופ",
    "courses-training": "קורס ספרות ותספורות – בירור הכשרות בפתח תקווה | וואשופ",
    "hair-care-products": "מוצרי שיער ומוצרי טיפוח לשיער בוואטסאפ | וואשופ",
    "beauty-care": "יופי וטיפוח – עסקים, מוצרי שיער ושירותים | וואשופ",
    "fashion-shoes": "כפכפי עיסוי ונעלי נוחות לנשים ולגברים בוואשופ",
    "app-development": "פיתוח ווב ואפליקציות לעסקים דרך וואטסאפ בוואשופ",
    "software-digital": "שירותי תוכנה ודיגיטל לעסקים – בחירה ופנייה לספק | וואשופ",
    "website-building": "בניית אתרים ופורטלי ווב לעסקים דרך וואטסאפ בוואשופ",
    "technical-services-businesses": "תמיכה טכנית ופתרון תקלות דיגיטליות לעסקים דרך וואטסאפ בוואשופ",
  };
  const title =
    titleBySlug[category.slug] ?? `${category.name} חנויות וואטסאפ מאושרות בוואשופ`;
  const description = getCategoryDescription(category, approvedStoreCount);

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/category/${category.slug}`,
    },
    robots:
      approvedStoreCount > 0
        ? { index: true, follow: true }
        : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: `/category/${category.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const shops = getApprovedShopsForCategory(category.slug);
  const approvedStoreCount = shops.length;
  const heading = getCategoryHeading(category);
  const description = getCategoryDescription(category, approvedStoreCount);
  const jsonLd = createCategoryJsonLd(category, shops);
  const editorialContent = categoryEditorialContent[category.slug];

  return (
    <div className="py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnalyticsPageView
        eventName="category_view"
        properties={{
          route: `/category/${category.slug}`,
          category_slug: category.slug,
          approved_store_count: approvedStoreCount,
          locale: "he",
        }}
      />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="פירורי לחם"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm font-bold text-zinc-500"
        >
          <Link href="/" className="hover:text-emerald-700">
            וואשופ
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/shops" className="hover:text-emerald-700">
            חנויות וואטסאפ
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-zinc-800">{category.name}</span>
        </nav>

        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black tracking-normal text-emerald-700">
            קטגוריה
          </p>
          <h1 className="mt-2 text-3xl font-black leading-tight text-zinc-950 sm:text-5xl">
            {heading}
          </h1>
          <p className="mt-4 text-lg leading-8 text-zinc-600">{description}</p>
          {approvedStoreCount > 0 ? (
            <p className="mx-auto mt-4 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800 ring-1 ring-emerald-200">
              {approvedStoreCount} חנויות ונותני שירות מאושרים בקטגוריה
            </p>
          ) : null}
        </div>

        <div className="mt-8">
          {shops.length ? (
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
              {shops.map((shop) => (
                <ShopCard
                  key={shop.id}
                  shop={shop}
                  surface="category"
                  categorySlug={category.slug}
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-3xl rounded-lg border border-dashed border-emerald-300 bg-white p-8 text-center shadow-sm">
              <h2 className="text-2xl font-black text-zinc-950">
                עדיין אין חנויות בקטגוריה הזו
              </h2>
              <p className="mt-3 leading-7 text-zinc-600">
                יש לכם חנות וואטסאפ מתאימה? שלחו אותה לבדיקה. וואשופ בודקת
                חנויות ידנית כדי לשמור על קטלוגים איכותיים, ברורים וחוקיים.
              </p>
              <Link
                href="/add-store"
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 text-sm font-black text-white transition hover:bg-emerald-700"
              >
                שליחת חנות לבדיקה
              </Link>
            </div>
          )}
        </div>

        {shops.length ? (
          <div className="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-zinc-950">
                איך להשתמש בקטגוריה הזו?
              </h2>
              <p className="mt-4 leading-8 text-zinc-700">
                פתחו את כרטיס העסק, עברו לקטלוג הוואטסאפ או שלחו הודעה ישירה,
                ובדקו מול המוכר מחיר, זמינות, תשלום, משלוח, החזרות ואחריות לפני
                רכישה או הזמנה. וואשופ היא ספריית גילוי ובדיקה ידנית, לא צד
                בעסקה ולא ספק השירות עצמו.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/shops"
                  className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
                >
                  חזרה לכל החנויות
                </Link>
                <Link
                  href="/add-store"
                  className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-black text-emerald-700 transition hover:bg-emerald-50"
                >
                  הגשת חנות מתאימה
                </Link>
              </div>
            </section>

            <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
              <h2 className="text-2xl font-black text-zinc-950">
                מה חשוב לבדוק מול העסק?
              </h2>
              <ul className="mt-4 space-y-2 text-sm font-bold leading-7 text-zinc-700">
                <li>מה בדיוק כלול במוצר או בשירות.</li>
                <li>מה המחיר הסופי ותנאי התשלום.</li>
                <li>מה זמינות המלאי או זמני העבודה.</li>
                <li>איך מתבצעים משלוח, ביטול, החזרה או המשך שירות.</li>
              </ul>
            </section>
          </div>
        ) : null}

        {editorialContent && shops.length ? (
          <section className="mx-auto mt-8 max-w-6xl rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
            <h2 className="text-3xl font-black text-zinc-950">
              {editorialContent.sectionHeading}
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {editorialContent.sections.map((section) => (
                <div key={section.title} className="rounded-lg bg-emerald-50 p-5">
                  <h3 className="text-xl font-black text-zinc-950">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-sm font-bold leading-7 text-zinc-700">
                    {section.text}
                  </p>
                </div>
              ))}
            </div>
            {editorialContent.relatedLinks?.length ? (
              <nav aria-label="מדריכים וקטגוריות קשורים" className="mt-6 flex flex-wrap gap-3">
                {editorialContent.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-emerald-200 px-4 py-3 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            ) : null}
          </section>
        ) : null}

        {editorialContent?.faqs.length && shops.length ? (
          <section className="mx-auto mt-8 max-w-6xl rounded-xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
            <h2 className="text-3xl font-black text-zinc-950">שאלות נפוצות בקטגוריה</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {editorialContent.faqs.map((faq) => (
                <div key={faq.question} className="rounded-lg border border-emerald-200 bg-white p-5">
                  <h3 className="text-lg font-black text-zinc-950">{faq.question}</h3>
                  <p className="mt-3 text-sm font-bold leading-7 text-zinc-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
