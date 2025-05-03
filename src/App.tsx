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

function App() {
  return (
    <Main>
      <Section>
        <Box>
          <Table>
            <TableCaption>Product List</TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead scope="col">ID</TableHead>
                <TableHead scope="col">Name</TableHead>
                <TableHead scope="col">Icon</TableHead>
                <TableHead scope="col">Price</TableHead>
                <TableHead scope="col">Stock</TableHead>
                <TableHead scope="col">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableHead scope="row">1</TableHead>

                <TableCell>Product Name</TableCell>
                <TableCell>
                  <img
                    src="https://placehold.co/600x400?font=montserrat"
                    alt=""
                    width="50"
                    height="50"
                  />
                </TableCell>
                <TableCell>$99.99</TableCell>
                <TableCell>37</TableCell>
                <TableCell>
                  <Grid>
                    <Button variant="primary">Edit</Button>
                    <Button variant="secondary">Delete</Button>
                  </Grid>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Section>
    </Main>
  );
}

export default App;
