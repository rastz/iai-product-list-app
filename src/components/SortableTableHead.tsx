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
      className="p-10 text-center align-middle font-medium whitespace-nowrap cursor-pointer select-none"
      {...restProps}
    >
      <div className="hover:cursor-pointer w-full h-full flex justify-center items-center">
        <p>{children}</p>
        <div className="w-6 h-6 flex justify-center items-center">{arrow}</div>
      </div>
    </th>
  );
}

export { SortableTableHead };
