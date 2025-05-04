import clsx from "clsx";
import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  errorMessage?: string;
}

function Input({ errorMessage, ...restProps }: InputProps) {
  return (
    <div className="flex flex-col gap-y-0.5">
      <input
        className={clsx("block w-full rounded border px-2 py-3", {
          "border border-red-700": errorMessage,
        })}
        {...restProps}
      />
      <p className="h-3 w-full text-xs text-red-700">{errorMessage}</p>
    </div>
  );
}

export { Input };
