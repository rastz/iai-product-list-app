import { ComponentProps } from "react";

type TableHeadProps = ComponentProps<"th">;

function TableHead({ children, ...restProps }: TableHeadProps) {
  return (
    <th
      className="p-10 text-center align-middle font-medium whitespace-nowrap select-none"
      {...restProps}
    >
      {children}
    </th>
  );
}

export { TableHead };
