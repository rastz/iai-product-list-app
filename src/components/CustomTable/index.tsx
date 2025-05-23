import { useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import { useProductsData } from "../../hooks/useProductData";
import { useProductFilters } from "../../hooks/useProductFilters";
import { useSelectedProducts } from "../../hooks/useSelectedProducts";
import { useSortProducts } from "../../hooks/useSortProducts";
import { Product } from "../../types";
import { Button } from "../common/Button";
import { Checkbox } from "../common/Checkbox";
import { EditProductDialog } from "../common/EditProductDialog";
import { FilterBox } from "../common/FilterBox";
import { Grid } from "../common/Grid";
import { RangeFilter } from "../common/RangeFilter";
import { RemoveProductDialog } from "../common/RemoveProductDialog";
import { Search } from "../common/Search";
import { SortableTableHead } from "../common/SortableTableHead";
import { Table } from "../common/Table";
import { TableBody } from "../common/TableBody";
import { TableCell } from "../common/TableCell";
import { TableHead } from "../common/TableHead";
import { TableHeader } from "../common/TableHeader";
import { TableRow } from "../common/TableRow";

interface CustomTableProps {
  data: Product[];
}

function CustomTable({ data }: CustomTableProps) {
  const { products, removeOne, removeMany, updateOne } = useProductsData(data);

  const {
    filteredProducts,
    filterProduct,
    minPrice,
    maxPrice,
    minStock,
    maxStock,
    setFilterProduct,
    setMinPrice,
    setMaxPrice,
    setMinStock,
    setMaxStock,
    resetPriceFilter,
    resetStockFilter,
  } = useProductFilters(products);

  const { sortedProducts, getDirection, sortBy } =
    useSortProducts(filteredProducts);

  const {
    paginatedProducts,
    pageIndex,
    pageCount,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
  } = usePagination(sortedProducts);

  const { selectedIds, selectedProducts, toggle, clear } =
    useSelectedProducts(sortedProducts);

  const [productToRemove, setProductToRemove] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [singleDialogOpen, setSingleDialogOpen] = useState(false);
  const [manyDialogOpen, setManyDialogOpen] = useState(false);

  const isTableEmpty = !paginatedProducts.length;
  const isSelected = selectedProducts.length > 0;
  const emptyTableColSpan = 7;

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex w-max flex-col gap-y-8 lg:w-full">
          <h1 className="text-left text-5xl font-bold text-neutral-700">
            Custom Table
          </h1>

          <div className="flex w-full items-start justify-between gap-2">
            <div className="flex flex-col gap-2 md:w-2/4 md:flex-row md:gap-2">
              <Search
                type="text"
                placeholder="Find Product"
                value={filterProduct}
                onChange={(event) => setFilterProduct(event.target.value)}
              />

              <FilterBox
                onReset={() => {
                  resetPriceFilter();
                  resetStockFilter();
                }}
              >
                <RangeFilter
                  label="Price"
                  min={minPrice}
                  max={maxPrice}
                  onChange={({ min, max }) => {
                    setMinPrice(min);
                    setMaxPrice(max);
                  }}
                />
                <RangeFilter
                  label="Stock"
                  min={minStock}
                  max={maxStock}
                  onChange={({ min, max }) => {
                    setMinStock(min);
                    setMaxStock(max);
                  }}
                />
              </FilterBox>
            </div>

            <div className="flex min-w-60 justify-end md:min-w-80">
              <Button
                disabled={!isSelected}
                variant={isSelected ? "danger" : "disabled"}
                onClick={() => {
                  setManyDialogOpen(true);
                }}
              >
                Remove selected ({selectedProducts.length})
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <SortableTableHead
                  onClick={() => sortBy("name")}
                  sortDirection={getDirection("name")}
                >
                  Name
                </SortableTableHead>
                <SortableTableHead
                  onClick={() => sortBy("price")}
                  sortDirection={getDirection("price")}
                >
                  Price
                </SortableTableHead>
                <SortableTableHead
                  onClick={() => sortBy("stock")}
                  sortDirection={getDirection("stock")}
                >
                  Stock
                </SortableTableHead>
                <SortableTableHead
                  onClick={() => sortBy("id")}
                  sortDirection={getDirection("id")}
                >
                  ID
                </SortableTableHead>
                <TableHead>Action</TableHead>
                <TableHead>Select</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.img.url}
                      alt={product.img.alt}
                      width="80"
                      height="80"
                      className="rounded-sm select-none"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{`$${product.price}`}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <Grid>
                      <Button
                        variant="primary"
                        onClick={() => setEditProduct(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setProductToRemove(product);
                          setSingleDialogOpen(true);
                        }}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(product.id)}
                      onChange={() => toggle(product.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}

              {isTableEmpty && (
                <TableRow>
                  <TableCell
                    colSpan={emptyTableColSpan}
                    className="py-20 text-center"
                  >
                    <p className="text-gray-500 italic">
                      No results found. Try adjusting your filters.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {!isTableEmpty && (
            <div className="flex w-full items-center gap-4 md:justify-end">
              <p className="hidden md:block">
                Page {pageIndex} of {pageCount}
              </p>
              <div className="w-1/12 shrink-0">
                <Button
                  variant={hasPrevPage ? "primary" : "disabled"}
                  onClick={prevPage}
                  disabled={!hasPrevPage}
                >
                  Previous
                </Button>
              </div>

              <div className="w-1/12 shrink-0">
                <Button
                  variant={hasNextPage ? "primary" : "disabled"}
                  onClick={nextPage}
                  disabled={!hasNextPage}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {productToRemove && (
        <RemoveProductDialog
          open={singleDialogOpen}
          productName={productToRemove.name}
          onOpenChange={(open) => {
            setSingleDialogOpen(open);
            if (!open) setProductToRemove(null);
          }}
          onConfirm={() => {
            removeOne(productToRemove.id);
            setSingleDialogOpen(false);
            setProductToRemove(null);
          }}
          onCancel={() => {
            setSingleDialogOpen(false);
            setProductToRemove(null);
          }}
        />
      )}

      <RemoveProductDialog
        open={manyDialogOpen}
        productName={`${selectedProducts.length} product(s)`}
        onOpenChange={(open) => {
          setManyDialogOpen(open);
        }}
        onConfirm={() => {
          removeMany(selectedProducts.map((product) => product.id));
          clear();
          setManyDialogOpen(false);
        }}
        onCancel={() => {
          setManyDialogOpen(false);
        }}
      />

      {editProduct && (
        <EditProductDialog
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={(updatedProduct) => {
            updateOne(updatedProduct);
            setEditProduct(null);
          }}
        />
      )}
    </>
  );
}

export { CustomTable };
