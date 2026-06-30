"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

type FormState = {
  storeName: string;
  contactName: string;
  phone: string;
  catalogUrl: string;
  email: string;
  city: string;
  description: string;
  optionalLink: string;
  legalConfirmed: boolean;
  confirmEmail: string;
};

const successMessage =
  "הבקשה נשלחה בהצלחה וממתינה לבדיקה, אימות ואישור של צוות וואשופ. אם החנות תתאים לרמת האיכות והאמינות הנדרשת, ניצור איתכם קשר.";

const initialState: FormState = {
  storeName: "",
  contactName: "",
  phone: "",
  catalogUrl: "",
  email: "",
  city: "",
  description: "",
  optionalLink: "",
  legalConfirmed: false,
  confirmEmail: "",
};

export function SubmitStoreForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/add-store", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "לא הצלחנו לשלוח את הטופס.");
      }

      setStatus("success");
      setMessage(result.message ?? successMessage);
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "אירעה שגיאה בשליחה.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="hidden" aria-hidden="true">
        <label>
          אימייל לאימות
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.confirmEmail}
            onChange={(event) => updateField("confirmEmail", event.target.value)}
          />
        </label>
      </div>

      <div className="rounded-lg bg-emerald-50 p-4 text-sm font-bold leading-7 text-emerald-900">
        אין צורך לבחור קטגוריות. צוות וואשופ יעבור על החנות, יבין לאן היא
        מתאימה וישייך אותה לקטגוריות הנכונות לאחר בדיקה.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          label="קישור לקטלוג וואטסאפ"
          value={form.catalogUrl}
          onChange={(value) => updateField("catalogUrl", value)}
          dir="ltr"
          required
        />
        <TextInput
          label="מספר וואטסאפ / טלפון"
          value={form.phone}
          onChange={(value) => updateField("phone", value)}
          inputMode="tel"
          required
        />
        <TextInput
          label="שם החנות"
          value={form.storeName}
          onChange={(value) => updateField("storeName", value)}
        />
        <TextInput
          label="שם איש קשר"
          value={form.contactName}
          onChange={(value) => updateField("contactName", value)}
        />
        <TextInput
          label="עיר"
          value={form.city}
          onChange={(value) => updateField("city", value)}
        />
        <TextInput
          label="אימייל"
          value={form.email}
          onChange={(value) => updateField("email", value)}
          inputMode="email"
          dir="ltr"
        />
      </div>

      <TextArea
        label="ספרו לנו על החנות ומה חשוב שנדע"
        value={form.description}
        onChange={(value) => updateField("description", value)}
        required
      />

      <TextInput
        label="קישור נוסף אם יש: אינסטגרם / אתר / פייסבוק"
        value={form.optionalLink}
        onChange={(value) => updateField("optionalLink", value)}
        dir="ltr"
      />

      <label className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm font-bold leading-7 text-zinc-800">
        <input
          type="checkbox"
          checked={form.legalConfirmed}
          required
          onChange={(event) => updateField("legalConfirmed", event.target.checked)}
          className="mt-1 size-4 shrink-0 accent-emerald-600"
        />
        <span>
          אני מאשר/ת שהחנות עוסקת במוצרים או שירותים חוקיים בלבד, ושקראתי את{" "}
          <Link href="/seller-rules" className="text-emerald-700 underline">
            תנאי הפרסום בוואשופ
          </Link>
          .
        </span>
      </label>

      {message ? (
        <div
          className={`rounded-lg p-4 text-sm font-bold ${
            status === "success"
              ? "bg-emerald-50 text-emerald-800"
              : "bg-red-50 text-red-700"
          }`}
          role="status"
        >
          {message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 text-base font-black text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
        ) : status === "success" ? (
          <CheckCircle2 className="size-5" aria-hidden="true" />
        ) : (
          <Send className="size-5" aria-hidden="true" />
        )}
        שליחת חנות לבדיקה
      </button>
    </form>
  );
}

type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  inputMode?: "email" | "tel" | "text";
  dir?: "rtl" | "ltr";
};

function TextInput({
  label,
  value,
  onChange,
  required,
  inputMode = "text",
  dir = "rtl",
}: TextInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-black text-zinc-950">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        inputMode={inputMode}
        dir={dir}
        className="mt-2 h-12 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 text-zinc-950 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </label>
  );
}

type TextAreaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

function TextArea({ label, value, onChange, required }: TextAreaProps) {
  return (
    <label className="block">
      <span className="text-sm font-black text-zinc-950">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        rows={6}
        className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </label>
  );
}
