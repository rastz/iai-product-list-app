import { Box } from "./components/Box";
import { Main } from "./components/Main";
import { Section } from "./components/Section";

import data from "./data/products.json";
import { ProductTable } from "./components/ProductTable";

function App() {
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
