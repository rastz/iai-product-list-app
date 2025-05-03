import { ComponentProps } from "react";

type TableHeaderProps = ComponentProps<"thead">;

function TableHeader({ children, ...restProps }: TableHeaderProps) {
  return (
    <thead className="[&_tr]:border-b" {...restProps}>
      {children}
    </thead>
  );
}

export { TableHeader };
