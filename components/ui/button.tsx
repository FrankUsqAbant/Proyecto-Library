"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary:
        "bg-[var(--accent)] text-white hover:opacity-90 shadow-md shadow-violet-200 dark:shadow-none",
      secondary:
        "bg-orange-600 text-white hover:bg-orange-700 shadow-md shadow-orange-200 dark:shadow-none",
      outline:
        "border-2 border-[var(--border)] bg-transparent hover:bg-[var(--hover)] text-[var(--foreground)]",
      ghost: "bg-transparent hover:bg-[var(--hover)] text-[var(--foreground)]",
      link: "bg-transparent underline-offset-4 hover:underline text-[var(--accent)]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-6 py-2.5 text-base",
      lg: "px-8 py-3.5 text-lg font-medium",
      icon: "h-10 w-10",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
