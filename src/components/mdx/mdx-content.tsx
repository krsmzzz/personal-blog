import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import rehypeSlug from "rehype-slug";
import { cn } from "@/lib/utils";

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("mt-12 mb-6 scroll-mt-24 text-3xl font-semibold tracking-tight text-foreground", className)} {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("mt-10 mb-4 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground border-b border-border/50 pb-2", className)} {...props} />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("mt-8 mb-3 scroll-mt-24 text-lg font-semibold text-foreground", className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("my-4 leading-relaxed text-foreground/85", className)} {...props} />
  ),
  a: ({ className, href, children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("text-accent-blue underline underline-offset-4 transition-colors hover:text-accent-blue/80", className)}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className={cn("text-accent-blue underline underline-offset-4 transition-colors hover:text-accent-blue/80", className)}
        {...rest}
      >
        {children}
      </Link>
    );
  },
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-4 ml-6 list-disc space-y-1.5 text-foreground/85", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-4 ml-6 list-decimal space-y-1.5 text-foreground/85", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("leading-relaxed", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className={cn("my-6 border-l-2 border-accent-blue/30 pl-4 italic text-muted-foreground", className)} {...props} />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className={cn("rounded-md bg-muted/50 px-1.5 py-0.5 font-mono text-[13px] text-foreground/85", className)} {...props} />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className={cn("my-6 overflow-x-auto rounded-xl border border-border bg-card p-5 font-mono text-[13px] leading-relaxed text-foreground/85", className)} {...props} />
  ),
  hr: () => <hr className="my-10 border-border" />,
  img: ({ src, alt, className, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <span className="my-8 block overflow-hidden rounded-xl border border-border/50">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full" {...rest} />
    </span>
  ),
  Callout: ({ type = "info", children }: { type?: "info" | "warning" | "tip"; children: React.ReactNode }) => {
    const styles: Record<string, string> = {
      info: "border-accent-blue/30 bg-accent-blue-subtle/30",
      warning: "border-amber-500/30 bg-amber-500/5",
      tip: "border-emerald-500/30 bg-emerald-500/5",
    };
    return (
      <div className={cn("my-6 rounded-xl border p-5 text-sm leading-relaxed text-foreground/80", styles[type])}>
        {children}
      </div>
    );
  },
};

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [rehypeSlug],
        },
      }}
    />
  );
}
