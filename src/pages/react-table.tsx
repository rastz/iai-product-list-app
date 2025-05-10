import { TablePageLayout } from "../components/layout/TablePageLayout";
import data from "../data/products-100.json";
import { ReactTable } from "../components/ReactTable";

function ReactTablePage() {
  return (
    <TablePageLayout>
      <ReactTable data={data.items} />
    </TablePageLayout>
  );
}

export { ReactTablePage };
