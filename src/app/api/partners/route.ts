import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site";

type PartnerSubmission = {
  fullName?: string;
  email?: string;
  area?: string;
  helpWith?: string;
  about?: string;
  relevantLink?: string;
  confirmEmail?: string;
};

type PartnerData = {
  fullName: string;
  email: string;
  area: string;
  helpWith: string;
  about: string;
  relevantLink: string;
};

const successMessage =
  "הפרטים נשלחו בהצלחה. צוות וואשופ יעבור על הפנייה, ואם זה יתאים לשלב הנוכחי — נחזור אליכם בהמשך.";

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

function validateSubmission(payload: PartnerSubmission) {
  const data: PartnerData = {
    fullName: asText(payload.fullName),
    email: asText(payload.email),
    area: asText(payload.area),
    helpWith: asText(payload.helpWith),
    about: asText(payload.about),
    relevantLink: asText(payload.relevantLink),
  };

  if (!data.email) {
    return { error: "יש למלא כתובת אימייל." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { error: "כתובת האימייל אינה תקינה." };
  }

  return { data };
}

function createEmailBody(data: PartnerData) {
  const rows = [
    ["אימייל", data.email],
    ["שם מלא", data.fullName || "לא נמסר"],
    ["עיר או אזור", data.area || "לא נמסר"],
    ["במה תרצו לעזור", data.helpWith || "לא נמסר"],
    ["ספרו לנו קצת עליכם", data.about || "לא נמסר"],
    ["קישור רלוונטי", data.relevantLink || "לא נמסר"],
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
    html: `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.7;color:#18181b"><h1>פנייה חדשה לתוכנית שותפים של וואשופ</h1><table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:720px">${htmlRows}</table></div>`,
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
  const payload = (await request.json().catch(() => null)) as
    | PartnerSubmission
    | null;

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

  const subject = `[WaShop] פנייה חדשה לתוכנית שותפים - ${validated.data.email}`;
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
