import { ComponentProps } from "react";

type TableBodyProps = ComponentProps<"tbody">;

function TableBody({ children, ...restProps }: TableBodyProps) {
  return (
    <tbody
      className="[&_tr:last-child]:border-0 [&_tr]:hover:bg-gray-100 [&_tr]:even:bg-gray-50"
      {...restProps}
    >
      {children}
    </tbody>
  );
}

export { TableBody };
