import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Product } from "../types";
import { TableCell } from "./TableCell";
import { Table } from "./Table";
import { TableCaption } from "./TableCaption";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { Grid } from "./Grid";
import { Button } from "./Button";

interface ProductTableProps {
  data: Product[];
}

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("img", {
    header: "Icon",
    cell: (info) => {
      const { url, alt } = info.getValue();
      return (
        <img
          src={url}
          alt={alt}
          width="50"
          height="50"
          className="rounded-sm"
        />
      );
    },
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("stock", {
    header: "Stock",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "action",
    header: "Action",
    cell: () => (
      <Grid>
        <Button variant="primary">Edit</Button>
        <Button variant="secondary">Delete</Button>
      </Grid>
    ),
  }),
];

function ProductTable({ data }: ProductTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table>
      <TableCaption>Product List</TableCaption>

      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { ProductTable };
