import { ComponentProps } from "react";

type MainProps = ComponentProps<"main">;

function Main({ children }: MainProps) {
  return <main className="flex-1 bg-[#f1f5f966]">{children}</main>;
}

export { Main };
