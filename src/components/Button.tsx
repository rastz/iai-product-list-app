import { ComponentProps, ReactNode } from "react";
import { FilterIcon } from "./Icons/FilterIcon";
import { SpinnerIcon } from "./Icons/SpinnerIcon";

type Variant = "primary" | "secondary" | "danger" | "loading" | "disabled";
type Icon = "filters";

interface ButtonProps extends ComponentProps<"button"> {
  variant: Variant;
  icon?: Icon;
}

const ICONS: Record<Icon, ReactNode> = {
  filters: <FilterIcon />,
};

const VARIANTS: Record<Variant, string> = {
  primary: "bg-gray-900 text-white hover:bg-gray-800 cursor-pointer",
  secondary:
    "bg-gray-50 text-gray-900 hover:bg-gray-100 border border-gray-200 cursor-pointer border",
  danger: "bg-red-700 text-white hover:bg-red-800 cursor-pointer border",
  loading: "bg-gray-200 cursor-not-allowed",
  disabled:
    "text-gray-900 border border-gray-200 bg-gray-200 cursor-not-allowed",
};

const DEFAULT_CLASSES =
  "w-full rounded-sm px-4 py-2 select-none grid auto-cols-max gap-2 place-content-center grid-flow-col";

function Button({ children, variant, icon, ...restProps }: ButtonProps) {
  const isLoading = variant === "loading";

  const loadingJSX = (
    <span className="h-6 w-6 animate-spin">
      <SpinnerIcon />
    </span>
  );

  const contentJSX = (
    <>
      {icon && <span className="h-6 w-6">{ICONS[icon]}</span>}
      {children}
    </>
  );

  return (
    <button
      className={`${DEFAULT_CLASSES} ${VARIANTS[variant]}`}
      {...restProps}
    >
      {isLoading ? loadingJSX : contentJSX}
    </button>
  );
}

export { Button };
