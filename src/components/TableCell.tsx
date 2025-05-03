import { ComponentProps } from "react";

type TableCellProps = ComponentProps<"td">;

function TableCell({ children, ...restProps }: TableCellProps) {
  return (
    <td
      className="p-1 align-middle text-center whitespace-nowrap"
      {...restProps}
    >
      {children}
    </td>
  );
}

export { TableCell };
