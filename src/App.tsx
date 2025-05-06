import { Box } from "./components/Box";
import { Main } from "./components/Main";
import { Section } from "./components/Section";
import { ProductTable } from "./components/ProductTable";

import data from "./data/products-100.json";
import { useFixRadixScrollLock } from "./hooks/useFixRadixScrollLock";

function App() {
  useFixRadixScrollLock();

  return (
    <Main>
      <Section>
        <Box>
          <ProductTable data={data.items} />
        </Box>
      </Section>
    </Main>
  );
}

export default App;
