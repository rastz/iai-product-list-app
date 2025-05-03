import { ComponentProps } from "react";

type BoxProps = ComponentProps<"div">;

function Box({ children }: BoxProps) {
  return (
    <div className="rounded-lg shadow-sm bg-white px-10 py-5 overflow-x-auto">
      {children}
    </div>
  );
}

export { Box };
