import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site";
import {
  extractPhoneFromWhatsappUrl,
  normalizeCatalogUrl,
  normalizePhone,
} from "@/lib/whatsapp";

type StoreSubmission = {
  storeName?: string;
  contactName?: string;
  phone?: string;
  catalogUrl?: string;
  email?: string;
  city?: string;
  description?: string;
  optionalLink?: string;
  legalConfirmed?: boolean;
  confirmEmail?: string;
};

const successMessage =
  "הפרטים נשלחו בהצלחה. הבקשה ממתינה לבדיקה, אימות ואישור של צוות וואשופ. אם חסרים פרטים או שאין לכם עדיין קטלוג וואטסאפ, נחזור אליכם וננסה לעזור בהכוונה ראשונית.";

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function validateSubmission(payload: StoreSubmission) {
  const storeName = asText(payload.storeName);
  const contactName = asText(payload.contactName);
  const rawPhone = asText(payload.phone);
  const phone = rawPhone ? normalizePhone(rawPhone) : "";
  const catalogUrl = asText(payload.catalogUrl);
  const catalogPhone = catalogUrl ? extractPhoneFromWhatsappUrl(catalogUrl) : "";
  const email = asText(payload.email);
  const city = asText(payload.city);
  const description = asText(payload.description);

  if (!email) {
    return { error: "יש למלא כתובת אימייל." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "כתובת האימייל אינה תקינה." };
  }

  if (rawPhone && !/^\d{9,15}$/.test(phone)) {
    return { error: "מספר הוואטסאפ אינו תקין." };
  }

  if (catalogUrl && !catalogPhone && !/^\+?[\d\s().-]+$/.test(catalogUrl)) {
    return { error: "קישור הקטלוג צריך להיות wa.me/c, wa.me או מספר טלפון." };
  }

  if (!payload.legalConfirmed) {
    return {
      error:
        "יש לאשר שהפרטים שנשלחו נכונים ועומדים בתנאי הפרסום של וואשופ.",
    };
  }

  return {
    data: {
      storeName,
      contactName,
      phone: rawPhone,
      catalogUrl: catalogUrl ? normalizeCatalogUrl(catalogUrl) : "",
      email,
      city,
      description,
      optionalLink: asText(payload.optionalLink),
      legalConfirmed: true,
    },
  };
}

function createEmailBody(data: NonNullable<ReturnType<typeof validateSubmission>["data"]>) {
  const rows = [
    ["שם החנות", data.storeName || "לא נמסר"],
    ["שם איש קשר", data.contactName || "לא נמסר"],
    ["מספר וואטסאפ", data.phone || "לא נשלח מספר טלפון"],
    ["קישור לקטלוג וואטסאפ", data.catalogUrl || "לא נשלח קישור לקטלוג"],
    ["אימייל", data.email],
    ["עיר", data.city || "לא נמסרה"],
    ["ספרו לנו על החנות ומה חשוב שנדע", data.description || "לא נכתב פירוט נוסף"],
    ["קישור אופציונלי", data.optionalLink || "לא נמסר"],
    ["אישור תנאי פרסום וחוקיות", data.legalConfirmed ? "כן" : "לא"],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="right" style="padding:8px;border-bottom:1px solid #e5e7eb">${escapeHtml(
          label,
        )}</th><td align="right" style="padding:8px;border-bottom:1px solid #e5e7eb">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join("");

  return {
    text,
    html: `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.7;color:#18181b"><h1>פנייה חדשה מהאתר לוואשופ</h1><table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:720px">${htmlRows}</table></div>`,
  };
}

async function sendEmail(
  subject: string,
  body: { text: string; html: string },
) {
  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? `washop.co.il <${siteConfig.supportEmail}>`,
      to: siteConfig.supportEmail,
      subject,
      text: body.text,
      html: body.html,
    });

    return;
  }

  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  ) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: siteConfig.supportEmail,
      subject,
      text: body.text,
      html: body.html,
    });

    return;
  }

  throw new Error(
    "לא הוגדרה שליחת מייל. יש להגדיר RESEND_API_KEY או SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS.",
  );
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => null)) as StoreSubmission | null;

  if (!payload) {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  if (asText(payload.confirmEmail)) {
    return NextResponse.json({
      message: successMessage,
    });
  }

  const validated = validateSubmission(payload);

  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const subject = `[WaShop] פנייה חדשה מהאתר - ${validated.data.email}`;
  const body = createEmailBody(validated.data);

  try {
    await sendEmail(subject, body);

    return NextResponse.json({
      message: successMessage,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "אירעה שגיאה בשליחת המייל. נסו שוב מאוחר יותר.",
      },
      { status: 503 },
    );
  }
}
