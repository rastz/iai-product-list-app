import {
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { Product } from "../types";

export interface UsePriceFilterHook {
  data: Product[];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  setMinPrice: Dispatch<SetStateAction<number | undefined>>;
  setMaxPrice: Dispatch<SetStateAction<number | undefined>>;
  predicate: (product: Product) => boolean;
}

function productPriceFilter(
  product: Product,
  minPrice?: number,
  maxPrice?: number,
) {
  if (minPrice != null && product.stock < minPrice) return false;
  if (maxPrice != null && product.stock > maxPrice) return false;

  return true;
}

export function usePriceFilter(data: Product[]): UsePriceFilterHook {
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const predicate = useCallback(
    (product: Product) => productPriceFilter(product, minPrice, maxPrice),
    [minPrice, maxPrice],
  );

  const filteredData = useMemo(() => data.filter(predicate), [data, predicate]);

  return {
    data: filteredData,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    predicate,
  };
}
