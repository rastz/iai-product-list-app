import { ComponentProps } from "react";
import { CELL_SIZE } from "../const";

type TableCellProps = ComponentProps<"td">;

function TableCell({ children, ...restProps }: TableCellProps) {
  return (
    <td className={`${CELL_SIZE} text-center align-middle`} {...restProps}>
      {children}
    </td>
  );
}

export { TableCell };
