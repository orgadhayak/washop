import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { categories } from "@/data/categories";
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
  shipsNationwide?: boolean;
  categories?: string[];
  description?: string;
  fitReason?: string;
  optionalLink?: string;
  confirmEmail?: string;
};

const allowedCategories = new Set(categories.map((category) => category.slug));

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
  const phone = normalizePhone(asText(payload.phone));
  const catalogUrl = asText(payload.catalogUrl);
  const catalogPhone = extractPhoneFromWhatsappUrl(catalogUrl);
  const email = asText(payload.email);
  const city = asText(payload.city);
  const description = asText(payload.description);
  const fitReason = asText(payload.fitReason);
  const selectedCategories = Array.isArray(payload.categories)
    ? payload.categories.filter((category) => allowedCategories.has(category))
    : [];

  if (!storeName || !contactName || !phone || !catalogUrl || !email || !city) {
    return { error: "יש למלא את כל שדות החובה." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "כתובת האימייל אינה תקינה." };
  }

  if (!/^\d{9,15}$/.test(phone)) {
    return { error: "מספר הוואטסאפ אינו תקין." };
  }

  if (!catalogPhone && !/^\+?[\d\s().-]+$/.test(catalogUrl)) {
    return { error: "קישור הקטלוג צריך להיות wa.me/c, wa.me או מספר טלפון." };
  }

  if (!selectedCategories.length) {
    return { error: "יש לבחור לפחות קטגוריה אחת." };
  }

  if (!description || !fitReason) {
    return { error: "יש למלא תיאור קצר והסבר התאמה לוואשופ." };
  }

  return {
    data: {
      storeName,
      contactName,
      phone,
      catalogUrl: normalizeCatalogUrl(catalogUrl),
      email,
      city,
      shipsNationwide: Boolean(payload.shipsNationwide),
      categories: selectedCategories,
      description,
      fitReason,
      optionalLink: asText(payload.optionalLink),
    },
  };
}

function createEmailBody(data: NonNullable<ReturnType<typeof validateSubmission>["data"]>) {
  const categoryNames = data.categories
    .map((slug) => categories.find((category) => category.slug === slug)?.name ?? slug)
    .join(", ");

  const rows = [
    ["שם החנות", data.storeName],
    ["שם איש קשר", data.contactName],
    ["מספר וואטסאפ", data.phone],
    ["קישור לקטלוג וואטסאפ", data.catalogUrl],
    ["אימייל", data.email],
    ["עיר", data.city],
    ["קטגוריות", categoryNames],
    ["תיאור קצר", data.description],
    ["למה החנות מתאימה לוואשופ", data.fitReason],
    ["קישור אופציונלי", data.optionalLink || "לא נמסר"],
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
    html: `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.7;color:#18181b"><h1>בקשת הצטרפות חדשה לוואשופ</h1><table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:720px">${htmlRows}</table></div>`,
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
      message:
        "הבקשה התקבלה. תודה! נבדוק את החנות ונחזור אליכם אם היא מתאימה לפרסום בוואשופ.",
    });
  }

  const validated = validateSubmission(payload);

  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const subject = `[וואשופ] בקשת הצטרפות חדשה: ${validated.data.storeName}`;
  const body = createEmailBody(validated.data);

  try {
    await sendEmail(subject, body);

    return NextResponse.json({
      message:
        "הבקשה התקבלה. תודה! נבדוק את החנות ונחזור אליכם אם היא מתאימה לפרסום בוואשופ.",
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
