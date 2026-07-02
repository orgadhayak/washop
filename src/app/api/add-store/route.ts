import { NextRequest, NextResponse } from "next/server";
import {
  EmailConfigurationError,
  EmailDeliveryError,
  sendSiteEmail,
} from "@/lib/email";
import { normalizePhone } from "@/lib/whatsapp";

type StoreSubmission = {
  storeName?: string;
  contactName?: string;
  phone?: string;
  email?: string;
  city?: string;
  catalogUrl?: string;
  additionalLink?: string;
  description?: string;
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
  const email = asText(payload.email);
  const city = asText(payload.city);
  const catalogUrl = asText(payload.catalogUrl);
  const additionalLink = asText(payload.additionalLink);
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
      email,
      city,
      catalogUrl,
      additionalLink,
      description,
      legalConfirmed: true,
    },
  };
}

function createEmailBody(data: NonNullable<ReturnType<typeof validateSubmission>["data"]>) {
  const missing = "לא נמסר";
  const submittedAt = new Intl.DateTimeFormat("he-IL", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Jerusalem",
  }).format(new Date());
  const rows = [
    ["אימייל", data.email],
    ["שם חנות", data.storeName || missing],
    ["שם איש קשר", data.contactName || missing],
    ["עיר", data.city || missing],
    ["מספר וואטסאפ / טלפון", data.phone || missing],
    ["קישור לקטלוג", data.catalogUrl || missing],
    ["קישור נוסף", data.additionalLink || missing],
    ["פירוט חופשי", data.description || missing],
    ["אישור תנאי פרסום", data.legalConfirmed ? "כן" : "לא"],
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
    html: `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.7;color:#18181b"><h1>פנייה חדשה מהאתר לוואשופ</h1><table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:720px">${htmlRows}</table></div>`,
  };
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
      console.error("Unexpected add-store email error", error);
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
