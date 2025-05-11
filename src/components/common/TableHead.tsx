import { ComponentProps } from "react";
import { CELL_SIZE } from "../../const";

type TableHeadProps = ComponentProps<"th">;

function TableHead({ children, ...restProps }: TableHeadProps) {
  return (
    <th
      className={`${CELL_SIZE} text-center align-middle font-medium whitespace-nowrap select-none`}
      {...restProps}
    >
      {children}
    </th>
  );
}

export { TableHead };
