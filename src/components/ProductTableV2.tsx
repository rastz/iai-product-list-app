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

interface ProductTableProps {
  data: Product[];
}

function ProductTableV2({ data }: ProductTableProps) {
  const { products, removeOne, removeMany } = useProductsData(data);
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
  const { selectedProduct, selectedProducts, toggle, clear } =
    useSelectedProducts(filteredProducts);

  const isTableEmpty = !filteredProducts.length;
  const tableSize = data.length;
  const isSelected = selectedProducts.length > 0;

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex w-max flex-col gap-y-8 md:w-full">
          <h1 className="text-left text-5xl font-bold text-neutral-700">
            Table of Products
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
                  removeMany(selectedProducts.map((product) => product.id));
                  clear();
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
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Select</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredProducts.map((product) => (
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
                      <Button variant="primary" onClick={() => null}>
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => removeOne(product.id)}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={selectedProduct.has(product.id)}
                      disabled={false}
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
    </>
  );
}

export { ProductTableV2 };
