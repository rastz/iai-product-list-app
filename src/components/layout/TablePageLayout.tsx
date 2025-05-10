import { ReactNode } from "react";
import { useFixRadixScrollLock } from "../../hooks/useFixRadixScrollLock";
import { Main } from "../Main";
import { Box } from "../Box";
import { Section } from "../Section";
import { Link } from "react-router-dom";
import Nav from "../Nav";

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
          <Link className={LINK_STYLE} to="/">
            React Table
          </Link>
          <Link className={LINK_STYLE} to="/product-table-v2">
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
