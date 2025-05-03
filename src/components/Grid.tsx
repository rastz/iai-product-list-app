import { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
}

function Grid({ children }: GridProps) {
  return (
    <div className="grid md:grid-flow-col auto-cols-max gap-2 place-content-center">
      {children}
    </div>
  );
}

export { Grid };
