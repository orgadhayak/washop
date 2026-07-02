import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

const defaultFromEmail = "WaShop <onboarding@resend.dev>";

export class EmailConfigurationError extends Error {
  userMessage = "שליחת הטופס לא זמינה כרגע. חסר מפתח שליחת מייל בשרת.";
}

export class EmailDeliveryError extends Error {
  userMessage = "אירעה שגיאה בשליחת הטופס. נסו שוב מאוחר יותר.";
}

type SendSiteEmailArgs = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export async function sendSiteEmail({
  subject,
  text,
  html,
  replyTo,
}: SendSiteEmailArgs) {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new EmailConfigurationError("RESEND_API_KEY is missing");
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL?.trim() || defaultFromEmail;

  try {
    const result = await resend.emails.send({
      from,
      to: siteConfig.supportEmail,
      subject,
      text,
      html,
      ...(replyTo ? { replyTo } : {}),
    });

    if (result.error) {
      console.error("Resend email failed", result.error);
      throw new EmailDeliveryError("Resend returned an email error");
    }
  } catch (error) {
    if (error instanceof EmailDeliveryError) {
      throw error;
    }

    console.error("Resend email failed", error);
    throw new EmailDeliveryError("Resend request failed");
  }
}
