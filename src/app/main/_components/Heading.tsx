import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-exo2 font-[400]", {
  variants: {
    level: {
      1: "text-[4.8rem] md:text-[4.8rem] lg:text-[4.8rem]",
      2: "text-[4.8rem] md:text-[4.8rem] lg:text-[4.8rem] leading-[1.5]",
      3: "text-[2.4rem] md:text-[2.4rem] lg:text-[2.4rem] leading-[1.5]",
      4: "text-[2.4rem] md:text-[2.4rem] lg:text-[2.4rem]",
      5: "text-[2rem] md:text-[2rem] lg:text-[2rem]",
      6: "text-base md:text-base lg:text-base",
      0: ""
    }
  },
  defaultVariants: {
    level: 0
  }
});

interface HeadingProps extends VariantProps<typeof headingVariants> {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, level = 0, className, asChild = false, ...props }, ref) => {
    const classes = cn(headingVariants({ level }), className);

    if (asChild) {
      return (
        <Slot className={classes} ref={ref} {...props}>
          {children}
        </Slot>
      );
    }

    switch (level) {
      case 1:
        return (
          <h1 ref={ref} className={classes} {...props}>
            {children}
          </h1>
        );
      case 2:
        return (
          <h2 ref={ref} className={classes} {...props}>
            {children}
          </h2>
        );
      case 3:
        return (
          <h3 ref={ref} className={classes} {...props}>
            {children}
          </h3>
        );
      case 4:
        return (
          <h4 ref={ref} className={classes} {...props}>
            {children}
          </h4>
        );
      case 5:
        return (
          <h5 ref={ref} className={classes} {...props}>
            {children}
          </h5>
        );
      case 6:
        return (
          <h6 ref={ref} className={classes} {...props}>
            {children}
          </h6>
        );
      default:
        return (
          <h1 ref={ref} className={classes} {...props}>
            {children}
          </h1>
        );
    }
  }
);

Heading.displayName = "Heading";

export default Heading;
