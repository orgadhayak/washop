import { NextRequest, NextResponse } from "next/server";
import {
  EmailConfigurationError,
  EmailDeliveryError,
  sendSiteEmail,
} from "@/lib/email";

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
  const submittedAt = new Intl.DateTimeFormat("he-IL", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Jerusalem",
  }).format(new Date());
  const rows = [
    ["אימייל", data.email],
    ["שם מלא", data.fullName || "לא נמסר"],
    ["עיר או אזור", data.area || "לא נמסר"],
    ["במה תרצו לעזור", data.helpWith || "לא נמסר"],
    ["ספרו לנו קצת עליכם", data.about || "לא נמסר"],
    ["קישור רלוונטי", data.relevantLink || "לא נמסר"],
    ["תאריך ושעה", submittedAt],
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
    await sendSiteEmail({
      subject,
      text: body.text,
      html: body.html,
      replyTo: validated.data.email,
    });

    return NextResponse.json({
      success: true,
      message: successMessage,
    });
  } catch (error) {
    const isKnownEmailError =
      error instanceof EmailConfigurationError || error instanceof EmailDeliveryError;

    if (!isKnownEmailError) {
      console.error("Unexpected partners email error", error);
    }

    return NextResponse.json(
      {
        error: isKnownEmailError
          ? error.userMessage
          : "אירעה שגיאה בשליחת הטופס. נסו שוב מאוחר יותר.",
      },
      { status: 503 },
    );
  }
}
