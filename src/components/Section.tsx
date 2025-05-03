import { ComponentProps } from "react";

type SectionProps = ComponentProps<"section">;

function Section({ children }: SectionProps) {
  return <section className="mx-auto max-w-5xl px-5 py-10">{children}</section>;
}

export { Section };
