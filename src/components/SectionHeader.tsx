type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  headingLevel?: "h1" | "h2";
  tone?: "default" | "inverse";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  headingLevel = "h2",
  tone = "default",
}: SectionHeaderProps) {
  const Heading = headingLevel;
  const inverse = tone === "inverse";

  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className={`text-sm font-black tracking-normal ${inverse ? "text-white/85" : "text-emerald-700"}`}>
          {eyebrow}
        </p>
      ) : null}
      <Heading className={`mt-2 text-3xl font-black leading-tight sm:text-4xl ${inverse ? "text-white" : "text-zinc-950"}`}>
        {title}
      </Heading>
      {description ? (
        <p className={`mt-4 text-lg leading-8 ${inverse ? "text-white/90" : "text-zinc-600"}`}>{description}</p>
      ) : null}
    </div>
  );
}
