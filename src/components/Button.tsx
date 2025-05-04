import { ComponentProps, ReactNode } from "react";
import { FilterIcon } from "./Icons/FilterIcon";

type Variant = "primary" | "secondary" | "danger";
type Icon = "filters";

interface ButtonProps extends ComponentProps<"button"> {
  variant: Variant;
  icon?: Icon;
}

const ICONS: Record<Icon, ReactNode> = {
  filters: <FilterIcon />,
};

const VARIANTS: Record<Variant, string> = {
  primary: "bg-gray-900 text-white hover:bg-gray-800",
  secondary:
    "bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200",
  danger: "bg-red-700 text-white hover:bg-red-800",
};

const DEFAULT_CLASSES =
  "rounded-sm px-4 py-2 cursor-pointer select-none grid auto-cols-max gap-2 place-content-center grid-flow-col";

function Button({ children, variant, icon, ...restProps }: ButtonProps) {
  return (
    <button
      className={`${DEFAULT_CLASSES} ${VARIANTS[variant]}`}
      {...restProps}
    >
      {icon && <span className="w-6 h-6">{ICONS[icon]}</span>}
      {children}
    </button>
  );
}

export { Button };
