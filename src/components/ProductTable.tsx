import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
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
import { Fragment, useState } from "react";
import { SortableTableHead } from "./SortableTableHead";
import { Input } from "./Input";
import { Filters } from "./Filters";

interface ProductTableProps {
  data: Product[];
}

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("img", {
    id: "img",
    enableSorting: false,
    enableGlobalFilter: false,
    header: (info) => <TableHead key={info.header.id}>Icon</TableHead>,
    cell: (info) => {
      const { url, alt } = info.getValue();
      return (
        <img
          src={url}
          alt={alt}
          width="50"
          height="50"
          className="rounded-sm select-none"
        />
      );
    },
  }),
  columnHelper.accessor("name", {
    id: "name",
    enableSorting: true,
    enableGlobalFilter: true,
    header: ({ column }) => (
      <SortableTableHead
        onClick={column.getToggleSortingHandler()}
        sortDirection={column.getIsSorted()}
      >
        Name
      </SortableTableHead>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    id: "price",
    enableSorting: true,
    enableGlobalFilter: true,
    header: ({ column }) => (
      <SortableTableHead
        onClick={column.getToggleSortingHandler()}
        sortDirection={column.getIsSorted()}
      >
        Price
      </SortableTableHead>
    ),
    cell: (info) => `$${info.getValue()}`,
    filterFn: (row, columnId, filterValue: number[]) => {
      const value = row.getValue<number>(columnId);
      const [min, max] = filterValue;
      return (
        (min === undefined || value >= min) &&
        (max === undefined || value <= max)
      );
    },
  }),
  columnHelper.accessor("stock", {
    id: "stock",
    enableSorting: true,
    enableGlobalFilter: true,
    header: ({ column }) => (
      <SortableTableHead
        onClick={column.getToggleSortingHandler()}
        sortDirection={column.getIsSorted()}
      >
        Stock
      </SortableTableHead>
    ),
    cell: (info) => info.getValue(),
    filterFn: (row, columnId, filterValue: number[]) => {
      const value = row.getValue<number>(columnId);
      const [min, max] = filterValue;
      return (
        (min === undefined || value >= min) &&
        (max === undefined || value <= max)
      );
    },
  }),
  columnHelper.accessor("id", {
    id: "id",
    enableSorting: true,
    enableGlobalFilter: true,
    header: ({ column }) => (
      <SortableTableHead
        onClick={column.getToggleSortingHandler()}
        sortDirection={column.getIsSorted()}
      >
        ID
      </SortableTableHead>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "action",
    enableSorting: false,
    header: () => <TableHead>Action</TableHead>,
    cell: () => (
      <Grid>
        <Button variant="primary">Edit</Button>
        <Button variant="secondary">Delete</Button>
      </Grid>
    ),
  }),
];

function ProductTable({ data }: ProductTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, columnFilters },
    globalFilterFn: "includesString",
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-5xl font-bold text-neutral-700 text-left">
        Product List
      </h1>

      <div className="flex gap-x-1 md:justify-end">
        <Input
          type="text"
          placeholder="Search"
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
        />

        <Filters table={table} />
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Fragment key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Fragment>
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

        <TableCaption>End of list</TableCaption>
      </Table>
    </div>
  );
}

export { ProductTable };
