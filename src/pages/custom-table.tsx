import { TablePageLayout } from "../components/layout/TablePageLayout";
import { CustomTable } from "../components/CustomTable";
import data from "../data/products-100.json";

function CustomTablePage() {
  return (
    <TablePageLayout>
      <CustomTable data={data.items} />
    </TablePageLayout>
  );
}

export { CustomTablePage };
