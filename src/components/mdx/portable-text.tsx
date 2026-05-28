import { PortableText, type PortableTextBlock } from "@portabletext/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const components = {
  block: {
    h2: ({ children, value }: { children?: React.ReactNode; value?: { _key: string } }) => (
      <h2 id={value?._key} className="mt-10 mb-4 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground border-b border-border/50 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 mb-3 scroll-mt-24 text-lg font-semibold text-foreground">{children}</h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="my-4 leading-relaxed text-foreground/85">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-2 border-accent-blue/30 pl-4 italic text-muted-foreground">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => (
      <Link href={value?.href ?? "#"} className="text-accent-blue underline underline-offset-4 hover:text-accent-blue/80">
        {children}
      </Link>
    ),
    code: ({ children }: { children?: React.ReactNode }) => (
      <code className="rounded-md bg-muted/50 px-1.5 py-0.5 font-mono text-[13px] text-foreground/85">{children}</code>
    ),
  },
  types: {
    image: ({ value }: { value: { asset?: { url?: string }; alt?: string } }) => (
      <span className="my-8 block overflow-hidden rounded-xl border border-border/50">
        <img src={value?.asset?.url} alt={value?.alt ?? ""} className="w-full" loading="lazy" />
      </span>
    ),
    code: ({ value }: { value: { language?: string; code?: string } }) => (
      <pre className="my-6 overflow-x-auto rounded-xl border border-border bg-card p-5 font-mono text-[13px] leading-relaxed text-foreground/85">
        {value?.language && (
          <div className="mb-3 text-[10px] text-muted-foreground/40 uppercase tracking-wider">{value.language}</div>
        )}
        <code>{value?.code}</code>
      </pre>
    ),
  },
};

export function PortableTextContent({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components as any} />;
}
