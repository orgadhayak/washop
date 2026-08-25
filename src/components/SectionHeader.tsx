type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  headingLevel?: "h1" | "h2";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  headingLevel = "h2",
}: SectionHeaderProps) {
  const Heading = headingLevel;

  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="text-sm font-black tracking-normal text-emerald-700">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="mt-2 text-3xl font-black leading-tight text-zinc-950 sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-zinc-600">{description}</p>
      ) : null}
    </div>
  );
}
