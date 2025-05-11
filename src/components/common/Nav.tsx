import { ReactNode } from "react";

interface NavProps {
  children: ReactNode;
}

function Nav({ children }: NavProps) {
  return (
    <nav className="flex max-w-fit items-center justify-center gap-2 p-8">
      {children}
    </nav>
  );
}

export default Nav;
