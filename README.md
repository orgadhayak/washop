# washop.co.il

אתר Next.js בעברית מלאה לגילוי חנויות ישראליות שמוכרות דרך קטלוג וואטסאפ או הודעות וואטסאפ.

## הרצה מקומית

```bash
npm install
npm run dev
```

האתר יעלה בכתובת `http://localhost:3000`.

## בדיקות לפני פריסה

```bash
npm run lint
npm run build
```

## משתני סביבה

טופס הוספת חנות שולח מייל ל-`hello@navines.com`.

אפשרות 1, Resend:

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL="washop.co.il <hello@navines.com>"
```

אפשרות 2, SMTP:

```bash
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM="washop.co.il <hello@navines.com>"
```

אם לא מוגדר Resend או SMTP, הטופס יחזיר שגיאת שרת ברורה ולא יפיל את האתר.

## הוספת חנות ידנית

1. פותחים את `src/data/shops.ts`.
2. מוסיפים אובייקט חדש למערך `shops`.
3. משתמשים ב-slug ייחודי, `status: "approved"` רק אחרי בדיקה ידנית, ובמערך `categories` עם slugs מתוך `src/data/categories.ts`.
4. אם לחנות יש קטלוג וואטסאפ, אפשר ליצור URL עם `createCatalogUrl("972...")`.

## פריסה ב-Vercel

1. מעלים את הריפו ל-GitHub.
2. ב-Vercel יוצרים Project חדש מהריפו.
3. מוודאים שפקודת הבילד היא `npm run build`.
4. מגדירים את משתני הסביבה של Resend או SMTP.
5. מחברים את הדומיין `washop.co.il`.

## מבנה מרכזי

- `src/app` - עמודי App Router ו-API route.
- `src/components` - Header, Footer, כרטיסי חנות, טופס, חיפוש וסינון.
- `src/data/categories.ts` - קטגוריות סטטיות.
- `src/data/shops.ts` - חנויות סטטיות.
- `src/lib/whatsapp.ts` - נרמול קישורי וואטסאפ ויצירת קישורי קטלוג/שיחה.
