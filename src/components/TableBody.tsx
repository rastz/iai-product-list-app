import { ComponentProps } from "react";

type TableBodyProps = ComponentProps<"tbody">;

function TableBody({ children, ...restProps }: TableBodyProps) {
  return (
    <tbody className="[&_tr:last-child]:border-0" {...restProps}>
      {children}
    </tbody>
  );
}

export { TableBody };
