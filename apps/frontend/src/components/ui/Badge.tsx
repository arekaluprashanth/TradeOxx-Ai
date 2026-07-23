import * as React from "react"
import { cn } from "./utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-brand-cyan/20 text-brand-cyan",
    secondary: "border-transparent bg-brand-purple/20 text-brand-purple",
    destructive: "border-transparent bg-brand-danger/20 text-brand-danger",
    success: "border-transparent bg-brand-success/20 text-brand-success",
    warning: "border-transparent bg-brand-warning/20 text-brand-warning",
    outline: "text-brand-textSecondary border-white/10",
  }
  
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
