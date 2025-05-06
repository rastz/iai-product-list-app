import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
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
import { Checkbox } from "./Checkbox";

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
  const [removeMany, setRemoveMany] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

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
    columnHelper.display({
      id: "select",
      header: () => <TableHead>Select</TableHead>,
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    }),
  ];

  const table = useReactTable({
    data: products,
    columns,
    state: { sorting, globalFilter, columnFilters, rowSelection, pagination },
    globalFilterFn: "includesString",
    enableRowSelection: true,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const isTableEmpty = table.getPaginationRowModel().rows.length === 0;
  const selectedProducts = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex w-max flex-col gap-y-8 md:w-full">
          <h1 className="text-left text-5xl font-bold text-neutral-700">
            Product List
          </h1>

          <div className="flex w-full items-start justify-between gap-2">
            <div className="flex flex-col gap-2 md:w-2/4 md:flex-row md:gap-2">
              <Search
                type="text"
                placeholder="Find Product"
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
              />
              <Filters table={table} />
            </div>

            <div className="flex min-w-60 justify-end md:min-w-80">
              {selectedProducts.length > 0 ? (
                <Button
                  variant="danger"
                  onClick={() => setRemoveMany(selectedProducts)}
                >
                  Remove selected ({selectedProducts.length})
                </Button>
              ) : (
                <Button variant="disabled">Remove selected (0)</Button>
              )}
            </div>
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
                table.getPaginationRowModel().rows.map((row) => (
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

          {!isTableEmpty && (
            <div className="flex w-full items-center gap-4 md:justify-end">
              <p>
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </p>
              <div className="w-1/12">
                <Button
                  variant="primary"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
              </div>

              <div className="w-1/12">
                <Button
                  variant="primary"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
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

      {removeMany.length > 0 && (
        <RemoveProductDialog
          open={removeMany.length > 0}
          productName={`${removeMany.length} selected product(s)`}
          onOpenChange={(open) => {
            if (!open) setRemoveMany([]);
          }}
          onConfirm={() => {
            setProducts((prev) =>
              prev.filter((item) => !removeMany.some((p) => p.id === item.id)),
            );
            setRemoveMany([]);
            table.resetRowSelection();
          }}
          onCancel={() => setRemoveMany([])}
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
