import { ReactNode } from "react";
import { useFixRadixScrollLock } from "../../hooks/useFixRadixScrollLock";
import { Main } from "../common/Main";
import { Box } from "../common/Box";
import { Section } from "../common/Section";
import { Link } from "react-router-dom";
import Nav from "../common/Nav";

interface TablePageLayoutProps {
  children: ReactNode;
}

const LINK_STYLE =
  "grid w-full cursor-pointer auto-cols-max grid-flow-col place-content-center gap-2 rounded-sm bg-gray-900 px-4 py-2 text-white select-none hover:bg-gray-800";

function TablePageLayout({ children }: TablePageLayoutProps) {
  useFixRadixScrollLock();

  return (
    <Main>
      <Section>
        <Nav>
          <Link className={LINK_STYLE} to="/react-table">
            React Table
          </Link>
          <Link className={LINK_STYLE} to="/custom-table">
            Custon Table
          </Link>
        </Nav>
      </Section>
      <Section>
        <Box>{children}</Box>
      </Section>
    </Main>
  );
}

export { TablePageLayout };
