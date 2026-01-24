"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md",

        neo:
          "bg-accent-orange text-white " +
          "font-helvetica font-bold uppercase tracking-wider " +
          "border-4 border-foreground rounded-none " +
          "shadow-[6px_6px_0_0] shadow-foreground " +
          "transition-all duration-200 " +
          "hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none " +
          "active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",

        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 rounded-md",

        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground rounded-md",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md",

        ghost:
          "hover:bg-accent hover:text-accent-foreground rounded-md",

        link:
          "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-8 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-16 px-10 has-[>svg]:px-8 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }