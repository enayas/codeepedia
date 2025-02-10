import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-white border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-500",
        teal: "bg-teal-500 text-primary-foreground hover:brightness-[1.05] border-teal-600 border-b-4 active:border-b-0",
        tealOutline:"bg-white text-teal-500 hover:bg-slate-100",
        rose: "bg-rose-300 text-primary-foreground hover:brightness-[1.05] border-rose-400 border-b-4 active:border-b-0",
        roseOutline:"bg-white text-rose-300 hover:bg-slate-100",
        danger:"bg-rose-500 text-primary-foreground hover:brightness-[1.10] border-rose-600 border-b-4 active:border-b-0",
        dangerOutline:"bg-white text-rose-500 hover:bg-slate-100",
        sidebar:"bg-transparent text-slate-500 border-2 border-transparent hover:bg-slate-100 transition-none",
        sidebarOutline:"bg-rose-100 text-rose-400 border-rose-300 border-2 hover:bg-rose-400/15 transition-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10", 
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
