"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

type FormState = {
  storeName: string;
  country: string;
  cityRegion: string;
  whatsappNumber: string;
  catalogUrl: string;
  categories: string;
  shortDescription: string;
  shippingCoverage: string;
  languages: string;
  contactName: string;
  contactEmail: string;
  website: string;
  confirmAccuracy: boolean;
  confirmManualReview: boolean;
  confirmGlobalPlacement: boolean;
  confirmEmail: string;
};

const initialState: FormState = {
  storeName: "",
  country: "",
  cityRegion: "",
  whatsappNumber: "",
  catalogUrl: "",
  categories: "",
  shortDescription: "",
  shippingCoverage: "",
  languages: "",
  contactName: "",
  contactEmail: "",
  website: "",
  confirmAccuracy: false,
  confirmManualReview: false,
  confirmGlobalPlacement: false,
  confirmEmail: "",
};

const successMessage =
  "Thanks. Your WaShop Global submission was sent and is waiting for manual review.";

export function GlobalStoreForm() {
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
      const response = await fetch("/api/global-store", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "We could not send the submission.");
      }

      setStatus("success");
      setMessage(result.message ?? successMessage);
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending the form.",
      );
    }
  }

  return (
    <form
      id="apply"
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="hidden" aria-hidden="true">
        <label>
          Confirmation email
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.confirmEmail}
            onChange={(event) => updateField("confirmEmail", event.target.value)}
          />
        </label>
      </div>

      <div className="rounded-lg bg-emerald-50 p-4 text-sm font-bold leading-7 text-emerald-900">
        Applications are reviewed manually. Submission does not guarantee approval,
        placement or sales.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput
          label="Store name"
          value={form.storeName}
          onChange={(value) => updateField("storeName", value)}
          required
        />
        <TextInput
          label="Country"
          value={form.country}
          onChange={(value) => updateField("country", value)}
          required
        />
        <TextInput
          label="City / region"
          value={form.cityRegion}
          onChange={(value) => updateField("cityRegion", value)}
        />
        <TextInput
          label="WhatsApp number with country code"
          value={form.whatsappNumber}
          onChange={(value) => updateField("whatsappNumber", value)}
          inputMode="tel"
          required
        />
        <TextInput
          label="WhatsApp catalog URL"
          value={form.catalogUrl}
          onChange={(value) => updateField("catalogUrl", value)}
          dir="ltr"
        />
        <TextInput
          label="Categories"
          value={form.categories}
          onChange={(value) => updateField("categories", value)}
          placeholder="Fashion, gifts, beauty, services..."
        />
        <TextInput
          label="Shipping coverage"
          value={form.shippingCoverage}
          onChange={(value) => updateField("shippingCoverage", value)}
          placeholder="Local only, domestic, selected countries..."
        />
        <TextInput
          label="Languages supported"
          value={form.languages}
          onChange={(value) => updateField("languages", value)}
          placeholder="Hebrew, English, Arabic..."
        />
        <TextInput
          label="Seller / contact name"
          value={form.contactName}
          onChange={(value) => updateField("contactName", value)}
          required
        />
        <TextInput
          label="Contact email"
          value={form.contactEmail}
          onChange={(value) => updateField("contactEmail", value)}
          type="email"
          inputMode="email"
          dir="ltr"
          required
        />
        <TextInput
          label="Optional website / social link"
          value={form.website}
          onChange={(value) => updateField("website", value)}
          dir="ltr"
        />
      </div>

      <TextArea
        label="Short store description"
        value={form.shortDescription}
        onChange={(value) => updateField("shortDescription", value)}
        required
      />

      <Checkbox
        checked={form.confirmAccuracy}
        onChange={(value) => updateField("confirmAccuracy", value)}
        label="I confirm that the information submitted is accurate."
      />
      <Checkbox
        checked={form.confirmManualReview}
        onChange={(value) => updateField("confirmManualReview", value)}
        label="I understand that WaShop reviews stores manually and approval is not guaranteed."
      />
      <Checkbox
        checked={form.confirmGlobalPlacement}
        onChange={(value) => updateField("confirmGlobalPlacement", value)}
        label="I understand that an approved store may be shown on WaShop local and global pages."
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
        Submit store for review
      </button>
    </form>
  );
}

type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: "email" | "text" | "url";
  inputMode?: "email" | "tel" | "text";
  dir?: "rtl" | "ltr";
  placeholder?: string;
};

function TextInput({
  label,
  value,
  onChange,
  required,
  type = "text",
  inputMode = "text",
  dir = "ltr",
  placeholder,
}: TextInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-black text-zinc-950">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        inputMode={inputMode}
        dir={dir}
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
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
        rows={5}
        className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-950 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </label>
  );
}

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm font-bold leading-7 text-zinc-800">
      <input
        type="checkbox"
        checked={checked}
        required
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 size-4 shrink-0 accent-emerald-600"
      />
      <span>{label}</span>
    </label>
  );
}
