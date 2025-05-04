import { SortDirection } from "@tanstack/react-table";
import { ComponentProps } from "react";

interface SortableTableHeadProps extends ComponentProps<"th"> {
  sortDirection: SortDirection | false;
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
      className="w-80 cursor-pointer p-10 text-center align-middle font-medium whitespace-nowrap select-none"
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
