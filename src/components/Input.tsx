import { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

function Input(props: InputProps) {
  return <input className="block px-2 py-1 border rounded" {...props} />;
}

export { Input };
