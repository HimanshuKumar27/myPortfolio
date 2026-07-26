import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-teal-600 text-white shadow hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600",
        outline:
          "border border-teal-200 bg-background shadow-sm hover:bg-teal-50 hover:text-teal-900 dark:border-teal-800 dark:hover:bg-slate-800 dark:hover:text-teal-400",
        secondary:
          "bg-teal-100 text-teal-900 shadow-sm hover:bg-teal-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
        ghost: "hover:bg-teal-100/50 hover:text-teal-900 dark:hover:bg-slate-800 dark:hover:text-slate-100",
        link: "text-teal-600 underline-offset-4 hover:underline dark:text-teal-400",
        gradient: "bg-linear-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white font-semibold shadow-lg shadow-teal-900/20 hover:shadow-teal-900/30 border border-teal-600/50 transform hover:scale-105"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-6 py-3 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
