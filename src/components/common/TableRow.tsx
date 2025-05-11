import { ComponentProps } from "react";

type TableRowProps = ComponentProps<"tr">;

function TableRow({ children, ...restProps }: TableRowProps) {
  return (
    <tr className="border-b border-b-gray-300" {...restProps}>
      {children}
    </tr>
  );
}

export { TableRow };
