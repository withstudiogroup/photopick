"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  label: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  linkHref?: string;
  linkText?: string;
  centered?: boolean;
  isInView?: boolean;
  theme?: "light" | "dark";
}

export default function SectionHeader({
  label,
  title,
  titleHighlight,
  description,
  linkHref,
  linkText = "전체보기",
  centered = false,
  isInView = true,
  theme = "light",
}: SectionHeaderProps) {
  const textColor = theme === "dark" ? "text-white-force" : "text-charcoal";
  const mutedColor = theme === "dark" ? "text-white/50" : "text-[var(--color-text-secondary)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`${centered ? "text-center" : "flex flex-col md:flex-row md:items-end md:justify-between"} mb-14 lg:mb-16`}
    >
      <div>
        <p className="text-[12px] tracking-[0.2em] uppercase text-gold-force mb-4">
          {label}
        </p>
        <h2 className={`font-display text-3xl md:text-4xl ${textColor}`}>
          {title}
          {titleHighlight && (
            <span className="italic text-gold-force"> {titleHighlight}</span>
          )}
        </h2>
        {description && (
          <p className={`${mutedColor} max-w-lg ${centered ? "mx-auto" : ""} mt-4 text-lg`}>
            {description}
          </p>
        )}
      </div>
      {linkHref && !centered && (
        <Link
          href={linkHref}
          className={`mt-4 md:mt-0 inline-flex items-center gap-2 ${theme === "dark" ? "text-white hover:text-gold-force" : "text-[var(--color-charcoal)] hover:text-gold-force"} text-sm font-medium transition-colors`}
        >
          <span className="underline-animation">{linkText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </motion.div>
  );
}
