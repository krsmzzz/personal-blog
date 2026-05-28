"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const easeOut = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: easeOut,
    },
  },
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  bg?: string;
  as?: "section" | "div";
}

export function AnimatedSection({
  children,
  className,
  bg,
  as: Component = "section",
}: AnimatedSectionProps) {
  return (
    <Component className={cn("py-28 sm:py-36", bg, className)}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {children}
        </motion.div>
      </div>
    </Component>
  );
}

export function AnimatedItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
