import { ComponentProps } from "react";
import { SortDirection } from "../hooks/useSort";

interface SortableTableHeadProps extends ComponentProps<"th"> {
  isActive: boolean;
  sortDirection: SortDirection;
}

const UP_ARROW = "↑";
const DOWN_ARROW = "↓";
const DEFAULT_ARROW = "↑↓";

function SortableTableHead({
  children,
  isActive,
  sortDirection,
  ...restProps
}: SortableTableHeadProps) {
  const arrow = isActive
    ? sortDirection === "asc"
      ? UP_ARROW
      : DOWN_ARROW
    : DEFAULT_ARROW;

  return (
    <th
      className="p-10 text-center align-middle font-medium whitespace-nowrap"
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
