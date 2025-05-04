import { ComponentProps } from "react";

type TableHeadProps = ComponentProps<"th">;

function TableHead({ children, ...restProps }: TableHeadProps) {
  return (
    <th
      className="w-80 p-10 text-center align-middle font-medium whitespace-nowrap select-none"
      {...restProps}
    >
      {children}
    </th>
  );
}

export { TableHead };
