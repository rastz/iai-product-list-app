import { ComponentProps } from "react";

type TableCaptionProps = ComponentProps<"caption">;

function TableCaption({ children, ...restProps }: TableCaptionProps) {
  return (
    <caption
      className="text-3xl font-bold text-neutral-700 text-left"
      {...restProps}
    >
      {children}
    </caption>
  );
}

export { TableCaption };
