"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

type FormState = {
  fullName: string;
  email: string;
  area: string;
  helpWith: string;
  about: string;
  relevantLink: string;
  confirmEmail: string;
};

const successMessage =
  "הפרטים נשלחו בהצלחה. צוות וואשופ יעבור על הפנייה, ואם זה יתאים לשלב הנוכחי — נחזור אליכם בהמשך.";

const initialState: FormState = {
  fullName: "",
  email: "",
  area: "",
  helpWith: "",
  about: "",
  relevantLink: "",
  confirmEmail: "",
};

export function PartnersForm() {
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
      const response = await fetch("/api/partners", {
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
        מייל הוא שדה החובה היחיד. שאר הפרטים עוזרים לנו להבין אם יש התאמה
        לשלב הנוכחי של הפרויקט.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          label="שם מלא"
          value={form.fullName}
          onChange={(value) => updateField("fullName", value)}
        />
        <TextInput
          label="אימייל"
          value={form.email}
          onChange={(value) => updateField("email", value)}
          inputMode="email"
          dir="ltr"
          required
        />
        <TextInput
          label="עיר או אזור"
          value={form.area}
          onChange={(value) => updateField("area", value)}
        />
        <TextInput
          label="קישור רלוונטי אם יש"
          value={form.relevantLink}
          onChange={(value) => updateField("relevantLink", value)}
          dir="ltr"
        />
      </div>

      <TextArea
        label="במה תרצו לעזור"
        value={form.helpWith}
        onChange={(value) => updateField("helpWith", value)}
        rows={4}
      />

      <TextArea
        label="ספרו לנו קצת עליכם"
        value={form.about}
        onChange={(value) => updateField("about", value)}
        rows={5}
      />

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
        שליחת פרטים לוואשופ
      </button>
    </form>
  );
}

type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  inputMode?: "email" | "text";
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
  rows: number;
};

function TextArea({ label, value, onChange, rows }: TextAreaProps) {
  return (
    <label className="block">
      <span className="text-sm font-black text-zinc-950">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </label>
  );
}
