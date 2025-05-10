import { ComponentProps } from "react";
import { CELL_SIZE } from "../const";

type SortDirection = "asc" | "desc" | false;
interface SortableTableHeadProps extends ComponentProps<"th"> {
  sortDirection: SortDirection;
}

const UP_ARROW = "↑";
const DOWN_ARROW = "↓";
const DEFAULT_ARROW = "↑↓";

function SortableTableHead({
  children,
  sortDirection,
  ...restProps
}: SortableTableHeadProps) {
  let arrow;

  if (sortDirection === "desc") {
    arrow = DOWN_ARROW;
  }

  if (sortDirection === "asc") {
    arrow = UP_ARROW;
  }

  if (sortDirection === false) {
    arrow = DEFAULT_ARROW;
  }

  return (
    <th
      className={`${CELL_SIZE} cursor-pointer text-center align-middle font-medium whitespace-nowrap select-none`}
      {...restProps}
    >
      <div className="flex h-full w-full items-center justify-center hover:cursor-pointer">
        <p>{children}</p>
        <div className="flex h-6 w-6 items-center justify-center">{arrow}</div>
      </div>
    </th>
  );
}

export { SortableTableHead };
