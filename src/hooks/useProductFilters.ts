import { useMemo } from "react";
import { Product } from "../types";
import { useGlobalFilter } from "./useGlobalFilter";
import { usePriceFilter } from "./usePriceFilter";
import { useStockFilter } from "./useStockFilter";

export function useProductFilters(data: Product[]) {
  const globalFilter = useGlobalFilter(data);
  const priceFilter = usePriceFilter(data);
  const stockFilter = useStockFilter(data);

  const filteredProducts = useMemo(
    () =>
      data.filter(
        (product) =>
          globalFilter.predicate(product) &&
          priceFilter.predicate(product) &&
          stockFilter.predicate(product),
      ),

    [data, globalFilter, priceFilter, stockFilter],
  );

  const resetPriceFilter = () => {
    priceFilter.setMinPrice(undefined);
    priceFilter.setMaxPrice(undefined);
  };

  const resetStockFilter = () => {
    stockFilter.setMinStock(undefined);
    stockFilter.setMaxStock(undefined);
  };

  return {
    filteredProducts,
    filterProduct: globalFilter.value,
    minPrice: priceFilter.minPrice,
    maxPrice: priceFilter.maxPrice,
    minStock: stockFilter.minStock,
    maxStock: stockFilter.maxStock,
    setFilterProduct: globalFilter.setValue,
    setMinPrice: priceFilter.setMinPrice,
    setMaxPrice: priceFilter.setMaxPrice,
    setMinStock: stockFilter.setMinStock,
    setMaxStock: stockFilter.setMaxStock,
    resetPriceFilter,
    resetStockFilter,
  };
}
