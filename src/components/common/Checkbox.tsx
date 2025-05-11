import { ComponentProps } from "react";

type CheckboxkProps = ComponentProps<"input">;

function Checkbox({ ...restProps }: CheckboxkProps) {
  return (
    <input
      type="checkbox"
      className="block h-4 w-full rounded border px-2 py-3"
      {...restProps}
    />
  );
}

export { Checkbox };
