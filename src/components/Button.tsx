import { ComponentProps } from "react";

type Variant = "primary" | "secondary";

interface ButtonProps extends ComponentProps<"button"> {
  variant: Variant;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gray-900 rounded-sm px-4 py-2 text-white cursor-pointer hover:bg-gray-800",
  secondary:
    "bg-gray-50 rounded-sm px-4 py-2 text-gray-900 cursor-pointer hover:bg-gray-100 border border-gray-200",
};

function Button({ children, variant, ...restProps }: ButtonProps) {
  return (
    <button className={VARIANTS[variant]} {...restProps}>
      {children}
    </button>
  );
}

export { Button };
