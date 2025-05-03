import { ComponentProps } from "react";

type TableProps = ComponentProps<"table">;

function Table({ children, ...restProps }: TableProps) {
  return (
    <table className="w-full text-sm" {...restProps}>
      {children}
    </table>
  );
}

export { Table };
