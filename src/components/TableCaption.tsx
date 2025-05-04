import { ComponentProps } from "react";

type TableCaptionProps = ComponentProps<"caption">;

function TableCaption({ children, ...restProps }: TableCaptionProps) {
  return (
    <caption
      className="font-light text-neutral-500 text-center caption-bottom"
      {...restProps}
    >
      {children}
    </caption>
  );
}

export { TableCaption };
