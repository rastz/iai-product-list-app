import { TablePageLayout } from "../components/layout/TablePageLayout";

function NotFoundPage() {
  return (
    <TablePageLayout>
      <h1 className="grid h-[500px] grid-cols-1 place-items-center text-gray-500 italic">
        Page Not Found (404)
      </h1>
    </TablePageLayout>
  );
}

export default NotFoundPage;
