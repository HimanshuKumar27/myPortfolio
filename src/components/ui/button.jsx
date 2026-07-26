import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
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
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-11 rounded-full px-7 py-3 text-base",
        icon: "h-9 w-9 rounded-full",
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

{/* Hover.dev Rounded Slide Button Component */}
export function RoundedSlideButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary", // "primary" or "outline"
  type = "button",
  target,
  rel,
  ...props
}) {
  const isOutline = variant === "outline";

  const innerContent = (
    <span
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold px-7 py-3 text-base shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer",
        isOutline
          ? "border-2 border-teal-500/40 dark:border-teal-400/40 text-teal-900 dark:text-teal-300 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md hover:text-white dark:hover:text-slate-900 hover:border-teal-500"
          : "border-2 border-teal-600 dark:border-teal-500 bg-teal-600 dark:bg-teal-500 text-white hover:text-teal-950 dark:hover:text-slate-950",
        className
      )}
    >
      {/* Sliding Background Pill Overlay */}
      <span
        className={cn(
          "absolute inset-0 z-0 rounded-full transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0",
          isOutline
            ? "bg-teal-600 dark:bg-teal-400"
            : "bg-white dark:bg-teal-300"
        )}
      />
      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300">
        {children}
      </span>
    </span>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} target={target} rel={rel} className="inline-block" {...props}>
        {innerContent}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className="bg-transparent border-0 p-0 focus:outline-none cursor-pointer inline-block" {...props}>
      {innerContent}
    </button>
  );
}

export { Button, buttonVariants }
