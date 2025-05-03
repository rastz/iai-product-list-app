import { ComponentProps } from "react";

type TableRowProps = ComponentProps<"tr">;

function TableRow({ children, ...restProps }: TableRowProps) {
  return (
    <tr
      className={"hover:bg-gray-50 border-b border-b-gray-500"}
      {...restProps}
    >
      {children}
    </tr>
  );
}

export { TableRow };
