import { TablePageLayout } from "../components/layout/TablePageLayout";
import data from "../data/products-100.json";
import { ProductTable } from "../components/ProductTable";

function ProductTableV1Page() {
  return (
    <TablePageLayout>
      <ProductTable data={data.items} />
    </TablePageLayout>
  );
}

export { ProductTableV1Page };
