export type OpenGraphMetadata = {
  title?: string;
  description?: string;
  image?: string;
};

const DEFAULT_TIMEOUT_MS = 3500;

export function normalizePhone(input: string) {
  const digits = input.replace(/[^\d]/g, "");

  if (!digits) {
    return "";
  }

  if (digits.startsWith("972")) {
    return digits;
  }

  if (digits.startsWith("0")) {
    return `972${digits.slice(1)}`;
  }

  return digits;
}

export function extractPhoneFromWhatsappUrl(input: string) {
  const value = input.trim();

  if (!value) {
    return "";
  }

  if (/^\+?[\d\s().-]+$/.test(value)) {
    return normalizePhone(value);
  }

  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    const host = url.hostname.replace(/^www\./, "");
    const isWhatsappHost =
      host === "wa.me" ||
      host === "whatsapp.com" ||
      host === "api.whatsapp.com";

    if (!isWhatsappHost) {
      return "";
    }

    const phoneParam = url.searchParams.get("phone");
    if (phoneParam) {
      return normalizePhone(phoneParam);
    }

    const segments = url.pathname.split("/").filter(Boolean);
    const phoneSegment = segments[0] === "c" ? segments[1] : segments[0];

    return phoneSegment ? normalizePhone(phoneSegment) : "";
  } catch {
    return "";
  }
}

export function createCatalogUrl(phone: string) {
  const normalizedPhone = normalizePhone(phone);
  return normalizedPhone ? `https://wa.me/c/${normalizedPhone}` : "";
}

export function createChatUrl(phone: string, message?: string) {
  const normalizedPhone = normalizePhone(phone);

  if (!normalizedPhone) {
    return "";
  }

  const url = new URL(`https://wa.me/${normalizedPhone}`);

  if (message) {
    url.searchParams.set("text", message);
  }

  return url.toString();
}

export function normalizeCatalogUrl(input: string) {
  const phone = extractPhoneFromWhatsappUrl(input);

  if (phone) {
    return createCatalogUrl(phone);
  }

  return input.trim();
}

function readMeta(html: string, name: string) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(
      `<meta[^>]+property=["']${escapedName}["'][^>]+content=["']([^"']+)["'][^>]*>`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${escapedName}["'][^>]*>`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+name=["']${escapedName}["'][^>]+content=["']([^"']+)["'][^>]*>`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${escapedName}["'][^>]*>`,
      "i",
    ),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);

    if (match?.[1]) {
      return match[1].trim();
    }
  }

  return undefined;
}

export async function fetchOpenGraphMetadata(
  input: string,
): Promise<OpenGraphMetadata | null> {
  try {
    const url = new URL(input);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "user-agent":
          "WaShop metadata check; contact hello@navines.com; non-aggressive single request",
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      return null;
    }

    const html = await response.text();
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);

    return {
      title: readMeta(html, "og:title") ?? titleMatch?.[1]?.trim(),
      description:
        readMeta(html, "og:description") ?? readMeta(html, "description"),
      image: readMeta(html, "og:image"),
    };
  } catch {
    return null;
  }
}
