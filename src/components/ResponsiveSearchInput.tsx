"use client";

import { InputHTMLAttributes, useEffect, useState } from "react";

type ResponsiveSearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  desktopPlaceholder: string;
  mobilePlaceholder: string;
};

export function ResponsiveSearchInput({
  desktopPlaceholder,
  mobilePlaceholder,
  ...props
}: ResponsiveSearchInputProps) {
  const [placeholder, setPlaceholder] = useState(mobilePlaceholder);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const updatePlaceholder = () => {
      setPlaceholder(media.matches ? desktopPlaceholder : mobilePlaceholder);
    };

    updatePlaceholder();
    media.addEventListener("change", updatePlaceholder);

    return () => {
      media.removeEventListener("change", updatePlaceholder);
    };
  }, [desktopPlaceholder, mobilePlaceholder]);

  return <input {...props} placeholder={placeholder} />;
}
