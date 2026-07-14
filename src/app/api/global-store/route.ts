import { NextRequest, NextResponse } from "next/server";
import {
  EmailConfigurationError,
  EmailDeliveryError,
  sendSiteEmail,
} from "@/lib/email";

type GlobalStoreSubmission = {
  storeName?: string;
  country?: string;
  cityRegion?: string;
  whatsappNumber?: string;
  catalogUrl?: string;
  categories?: string;
  shortDescription?: string;
  shippingCoverage?: string;
  languages?: string;
  contactName?: string;
  contactEmail?: string;
  website?: string;
  confirmAccuracy?: boolean;
  confirmManualReview?: boolean;
  confirmGlobalPlacement?: boolean;
  confirmEmail?: string;
};

const successMessage =
  "Thanks. Your WaShop Global submission was sent and is waiting for manual review.";

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

function validateSubmission(payload: GlobalStoreSubmission) {
  const data = {
    storeName: asText(payload.storeName),
    country: asText(payload.country),
    cityRegion: asText(payload.cityRegion),
    whatsappNumber: asText(payload.whatsappNumber),
    catalogUrl: asText(payload.catalogUrl),
    categories: asText(payload.categories),
    shortDescription: asText(payload.shortDescription),
    shippingCoverage: asText(payload.shippingCoverage),
    languages: asText(payload.languages),
    contactName: asText(payload.contactName),
    contactEmail: asText(payload.contactEmail),
    website: asText(payload.website),
    confirmAccuracy: Boolean(payload.confirmAccuracy),
    confirmManualReview: Boolean(payload.confirmManualReview),
    confirmGlobalPlacement: Boolean(payload.confirmGlobalPlacement),
  };

  if (!data.storeName) {
    return { error: "Please enter the store name." };
  }

  if (!data.country) {
    return { error: "Please enter the country." };
  }

  if (!data.whatsappNumber) {
    return { error: "Please enter a WhatsApp number with country code." };
  }

  if (!data.shortDescription) {
    return { error: "Please add a short store description." };
  }

  if (!data.contactName) {
    return { error: "Please enter a seller or contact name." };
  }

  if (!data.contactEmail) {
    return { error: "Please enter a contact email." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail)) {
    return { error: "Please enter a valid contact email." };
  }

  if (
    !data.confirmAccuracy ||
    !data.confirmManualReview ||
    !data.confirmGlobalPlacement
  ) {
    return {
      error:
        "Please confirm the accuracy, manual review and WaShop placement statements.",
    };
  }

  return { data };
}

function createEmailBody(data: NonNullable<ReturnType<typeof validateSubmission>["data"]>) {
  const missing = "Not provided";
  const submittedAt = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Jerusalem",
  }).format(new Date());
  const rows = [
    ["Source page", "/global"],
    ["Store name", data.storeName],
    ["Country", data.country],
    ["City / region", data.cityRegion || missing],
    ["WhatsApp number", data.whatsappNumber],
    ["WhatsApp catalog URL", data.catalogUrl || missing],
    ["Categories", data.categories || missing],
    ["Short store description", data.shortDescription],
    ["Shipping coverage", data.shippingCoverage || missing],
    ["Languages supported", data.languages || missing],
    ["Seller / contact name", data.contactName],
    ["Contact email", data.contactEmail],
    ["Website / social link", data.website || missing],
    ["Information accuracy confirmed", data.confirmAccuracy ? "Yes" : "No"],
    ["Manual review understood", data.confirmManualReview ? "Yes" : "No"],
    ["Local/global placement understood", data.confirmGlobalPlacement ? "Yes" : "No"],
    ["Submitted at", submittedAt],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px;border-bottom:1px solid #e5e7eb">${escapeHtml(
          label,
        )}</th><td align="left" style="padding:8px;border-bottom:1px solid #e5e7eb">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join("");

  return {
    text,
    html: `<div dir="ltr" style="font-family:Arial,sans-serif;line-height:1.7;color:#18181b"><h1>WaShop Global store submission</h1><table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:720px">${htmlRows}</table></div>`,
  };
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => null)) as
    | GlobalStoreSubmission
    | null;

  if (!payload) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (asText(payload.confirmEmail)) {
    return NextResponse.json({ success: true, message: successMessage });
  }

  const validated = validateSubmission(payload);

  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const body = createEmailBody(validated.data);

  try {
    await sendSiteEmail({
      subject: `[WaShop Global] New store submission - ${validated.data.storeName}`,
      text: body.text,
      html: body.html,
      replyTo: validated.data.contactEmail,
    });

    return NextResponse.json({ success: true, message: successMessage });
  } catch (error) {
    const isKnownEmailError =
      error instanceof EmailConfigurationError || error instanceof EmailDeliveryError;

    if (!isKnownEmailError) {
      console.error("Unexpected global store email error", error);
    }

    return NextResponse.json(
      {
        error: isKnownEmailError
          ? error.userMessage
          : "We could not send the submission. Please try again later.",
      },
      { status: 503 },
    );
  }
}
