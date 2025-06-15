import * as React from "react";

import { cn } from "@lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[4rem] w-full border border-white bg-transparent rounded-lg py-2 px-[1.2rem] text-[1.3rem] leading-[2rem] lg:text-[1.4rem] lg:leading-[2.2rem] text-white placeholder:text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
