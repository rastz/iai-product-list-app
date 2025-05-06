import { ComponentProps } from "react";

type SearchProps = ComponentProps<"input">;

function Search(props: SearchProps) {
  return <input className="block w-full rounded border px-2 py-1" {...props} />;
}

export { Search };
