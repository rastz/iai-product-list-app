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
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { Grid } from "./Grid";
import { Button } from "./Button";
import { Fragment, useState } from "react";
import { SortableTableHead } from "./SortableTableHead";
import { Filters } from "./Filters";
import { RemoveProductDialog } from "./RemoveProductDialog";
import { EditProductDialog } from "./EditProductDialog";
import { Search } from "./Search";

interface ProductTableProps {
  data: Product[];
}

const columnHelper = createColumnHelper<Product>();

function ProductTable({ data }: ProductTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [products, setProducts] = useState(data);
  const [removeProduct, setRemoveProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

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
      cell: ({ row }) => {
        const product = row.original;
        return (
          <Grid>
            <Button variant="primary" onClick={() => setEditProduct(product)}>
              Edit
            </Button>
            <Button
              variant="secondary"
              onClick={() => setRemoveProduct(product)}
            >
              Remove
            </Button>
          </Grid>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: products,
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

  const isTableEmpty = table.getRowModel().rows.length === 0;

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <h1 className="text-left text-5xl font-bold text-neutral-700">
          Product List
        </h1>

        <div className="flex gap-x-1 md:justify-end">
          <Search
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
                      header.getContext(),
                    )}
                  </Fragment>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isTableEmpty ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-12 text-center"
                >
                  <p className="text-gray-500 italic">
                    No results found. Try adjusting your filters.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {removeProduct && (
        <RemoveProductDialog
          open={!!removeProduct}
          productName={removeProduct.name}
          onOpenChange={(open) => {
            if (!open) setRemoveProduct(null);
          }}
          onConfirm={() =>
            setProducts((prev) =>
              prev.filter((item) => item.id !== removeProduct.id),
            )
          }
          onCancel={() => setRemoveProduct(null)}
        />
      )}

      {editProduct && (
        <EditProductDialog
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={(updatedProduct) => {
            setProducts((prev) =>
              prev.map((item) =>
                item.id === updatedProduct.id ? updatedProduct : item,
              ),
            );
            setEditProduct(null);
          }}
        />
      )}
    </>
  );
}

export { ProductTable };
