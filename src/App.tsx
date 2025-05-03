import { Box } from "./components/Box";
import { Button } from "./components/Button";
import { Grid } from "./components/Grid";
import { Main } from "./components/Main";
import { Section } from "./components/Section";
import { Table } from "./components/Table";
import { TableBody } from "./components/TableBody";
import { TableCaption } from "./components/TableCaption";
import { TableCell } from "./components/TableCell";
import { TableHead } from "./components/TableHead";
import { TableHeader } from "./components/TableHeader";
import { TableRow } from "./components/TableRow";
import data from "./data/products.json";
import { Product } from "./types";
import { useSort } from "./hooks/useSort";
import { SortableTableHead } from "./components/SortableTableHead";

function App() {
  const { sortedData, sortKey, direction, toggleSort } = useSort<Product>({
    data: data.items,
    defaultSortKey: "id",
  });

  const toggleSortBy = (key: keyof Product) => () => toggleSort(key);

  return (
    <Main>
      <Section>
        <Box>
          <Table>
            <TableCaption>Product List</TableCaption>

            <TableHeader>
              <TableRow>
                <SortableTableHead
                  scope="col"
                  onClick={toggleSortBy("id")}
                  isActive={sortKey === "id"}
                  sortDirection={direction}
                >
                  ID
                </SortableTableHead>

                <SortableTableHead
                  scope="col"
                  onClick={toggleSortBy("name")}
                  isActive={sortKey === "name"}
                  sortDirection={direction}
                >
                  Name
                </SortableTableHead>

                <TableHead scope="col">Icon</TableHead>

                <SortableTableHead
                  scope="col"
                  onClick={toggleSortBy("price")}
                  isActive={sortKey === "price"}
                  sortDirection={direction}
                >
                  Price
                </SortableTableHead>

                <SortableTableHead
                  scope="col"
                  onClick={toggleSortBy("stock")}
                  isActive={sortKey === "stock"}
                  sortDirection={direction}
                >
                  Stock
                </SortableTableHead>

                <TableHead scope="col">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedData.map((product) => {
                return (
                  <TableRow key={product.id}>
                    <TableHead scope="row">{product.id}</TableHead>

                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <img
                        src={product.img.url}
                        alt={product.img.alt}
                        width="50"
                        height="50"
                      />
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Grid>
                        <Button variant="primary">Edit</Button>
                        <Button variant="secondary">Delete</Button>
                      </Grid>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Section>
    </Main>
  );
}

export default App;
