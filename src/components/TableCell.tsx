import { ComponentProps } from "react";

type TableCellProps = ComponentProps<"td">;

function TableCell({ children, ...restProps }: TableCellProps) {
  return (
    <td
      className="p-10 align-middle text-center whitespace-nowrap"
      {...restProps}
    >
      {children}
    </td>
  );
}

export { TableCell };
