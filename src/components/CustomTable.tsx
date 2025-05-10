import { useState } from "react";
import { Product } from "../types";
import { TableCell } from "./TableCell";
import { Table } from "./Table";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TableBody } from "./TableBody";
import { Button } from "./Button";
import { Search } from "./Search";
import { TableHead } from "./TableHead";
import { Grid } from "./Grid";
import { Checkbox } from "./Checkbox";
import { FilterBox } from "./common/FilterBox";
import { RangeFilter } from "./common/RangeFilter";
import { useProductFilters } from "../hooks/useProductFilters";
import { useProductsData } from "../hooks/useProductData";
import { useSelectedProducts } from "../hooks/useSelectedProducts";
import { RemoveProductDialog } from "./RemoveProductDialog";
import { EditProductDialog } from "./EditProductDialog";
import { useSortProducts } from "../hooks/useSortProducts";
import { SortableTableHead } from "./SortableTableHead";

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

  const { selectedIds, selectedProducts, toggle, clear } =
    useSelectedProducts(sortedProducts);

  const [productToRemove, setProductToRemove] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [singleDialogOpen, setSingleDialogOpen] = useState(false);
  const [manyDialogOpen, setManyDialogOpen] = useState(false);

  const isTableEmpty = !filteredProducts.length;
  const tableSize = data.length;
  const isSelected = selectedProducts.length > 0;

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex w-max flex-col gap-y-8 md:w-full">
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
              {sortedProducts.map((product) => (
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
                  <TableCell>{product.price}</TableCell>
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
                  <TableCell colSpan={tableSize} className="py-20 text-center">
                    <p className="text-gray-500 italic">
                      No results found. Try adjusting your filters.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
