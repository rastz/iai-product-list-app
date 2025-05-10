import { TablePageLayout } from "../components/layout/TablePageLayout";
import { ProductTableV2 } from "../components/ProductTableV2";
import data from "../data/products-100.json";

function ProductTableV2Page() {
  return (
    <TablePageLayout>
      <ProductTableV2 data={data.items} />
    </TablePageLayout>
  );
}

export { ProductTableV2Page };
