import { ComponentProps } from "react";

type TableCellProps = ComponentProps<"td">;

function TableCell({ children, ...restProps }: TableCellProps) {
  return (
    <td className="w-80 p-10 text-center align-middle" {...restProps}>
      {children}
    </td>
  );
}

export { TableCell };
