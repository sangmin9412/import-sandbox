import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[.4rem] text-[1.4rem] lg:text-[1.6rem] font-[500] ring-offset-background transition-[transform,background-color] duration-200 ease-in-out focus:outline-none focus-visible:border-black disabled:pointer-events-none disabled:bg-[#C5C5C5] disabled:text-white active:scale-90 focus-visible:scale-90",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-primary focus-visible:bg-primary",
        tertiary:
          "bg-tertiary text-tertiary-foreground hover:bg-white hover:text-tertiary focus-visible:bg-white focus-visible:text-tertiary",
        outlineTertiary:
          "border border-tertiary/50 text-tertiary hover:bg-tertiary hover:text-tertiary-foreground focus-visible:bg-tertiary focus-visible:text-tertiary-foreground",
        ghost:
          "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline focus-visible:underline",
        disabled: "bg-[#C5C5C5] text-white"
      },
      size: {
        default: "h-[5.6rem] px-[1.2rem]",
        xs: "h-[3.2rem] px-[1.2rem] text-[1.3rem] lg:text-[1.4rem]",
        sm: "h-[4.8rem] px-[1.2rem] text-[1.3rem] lg:text-[1.6rem]",
        lg: "h-[6.4rem] px-[1.2rem]",
        icon: "h-[5.6rem] w-[5.6rem]"
      }
    },
    defaultVariants: {
      variant: "secondary",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
