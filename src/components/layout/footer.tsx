import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "GitHub", href: "https://github.com", external: true },
  { label: "X", href: "https://x.com", external: true },
  { label: "Email", href: "mailto:hello@ruikang.dev", external: false },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Deep infra blue footer atmosphere */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          left: "50%",
          top: "-250px",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.08) 0%, rgba(37,99,235,0.03) 40%, transparent 68%)",
          filter: "blur(130px)",
          transform: "translateX(-50%)",
          opacity: 0.55,
        }}
      />
      <div className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-6 py-10">
        <p className="text-xs text-muted-foreground/40">
          © {new Date().getFullYear()} ruikang
        </p>
        <div className="flex items-center gap-6">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-xs text-muted-foreground/50 transition-colors duration-200 hover:text-accent-blue"
              >
                {link.label}
                <ArrowUpRight className="size-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-accent-blue/60 group-hover:-translate-y-px group-hover:translate-x-px" />
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground/50 transition-colors duration-200 hover:text-accent-blue"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
