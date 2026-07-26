import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-teal-500 text-white shadow hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700",
        secondary:
          "border-transparent bg-teal-100 text-teal-900 hover:bg-teal-200 dark:bg-slate-800 dark:text-teal-300",
        destructive:
          "border-transparent bg-red-500 text-white shadow hover:bg-red-600",
        outline: "text-foreground border-teal-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
