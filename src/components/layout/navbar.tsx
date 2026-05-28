"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const navLinks = [
  { href: "/blog", label: "文章" },
  { href: "/projects", label: "项目" },
  { href: "/now", label: "近况" },
  { href: "/about", label: "关于" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-700",
          scrolled
            ? "border-b border-border bg-background/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/50"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
          {/* Home */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[15px] font-medium tracking-tight text-foreground transition-opacity duration-200 hover:opacity-50"
          >
            王瑞康的博客
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-lg px-4 py-2 text-[14px] transition-all duration-200",
                    isActive
                      ? "text-accent-blue font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-accent-blue" />
                  )}
                </Link>
              );
            })}

            <span className="mx-2 h-4 w-px bg-border" />

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 rounded-lg px-4 py-2 text-[14px] text-muted-foreground transition-all duration-200 hover:text-accent-blue hover:bg-muted/30"
            >
              GitHub
              <ArrowUpRight className="size-3 text-muted-foreground/40 transition-all duration-200 group-hover:text-accent-blue/60 group-hover:-translate-y-px group-hover:translate-x-px" />
            </a>

            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:text-foreground"
              aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
            >
              <div className="relative size-4">
                <Menu
                  className={cn(
                    "absolute inset-0 size-4 transition-all duration-300",
                    mobileOpen
                      ? "rotate-90 opacity-0 scale-75"
                      : "rotate-0 opacity-100 scale-100"
                  )}
                />
                <X
                  className={cn(
                    "absolute inset-0 size-4 transition-all duration-300",
                    mobileOpen
                      ? "rotate-0 opacity-100 scale-100"
                      : "-rotate-90 opacity-0 scale-75"
                  )}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 top-20 z-40 flex flex-col items-center justify-center bg-background/90 backdrop-blur-xl md:hidden",
          "transition-all duration-400 ease-in-out",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-2">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 text-xl font-medium tracking-tight text-muted-foreground transition-all duration-400 hover:text-accent-blue"
              style={{
                transitionDelay: mobileOpen ? `${i * 70}ms` : "0ms",
                transform: mobileOpen ? "translateY(0)" : "translateY(8px)",
                opacity: mobileOpen ? 1 : 0,
              }}
            >
              {link.label}
            </Link>
          ))}
          <span
            className="my-1 h-px w-8 bg-border transition-all duration-400"
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 70}ms` : "0ms",
              opacity: mobileOpen ? 1 : 0,
            }}
          />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 py-3 text-xl font-medium tracking-tight text-muted-foreground transition-all duration-400 hover:text-accent-blue"
            style={{
              transitionDelay: mobileOpen
                ? `${(navLinks.length + 1) * 70}ms`
                : "0ms",
              transform: mobileOpen ? "translateY(0)" : "translateY(8px)",
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            GitHub
            <ArrowUpRight className="size-4 text-muted-foreground/40 transition-all duration-200 group-hover:text-accent-blue/60 group-hover:-translate-y-px group-hover:translate-x-px" />
          </a>
        </nav>
      </div>
    </>
  );
}
