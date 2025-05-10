import {
  useState,
  useMemo,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { Product } from "../types";

export interface UseStockFilterHook {
  data: Product[];
  minStock?: number;
  maxStock?: number;
  setMinStock: Dispatch<SetStateAction<number | undefined>>;
  setMaxStock: Dispatch<SetStateAction<number | undefined>>;
  predicate: (product: Product) => boolean;
}

function productStockFilter(
  product: Product,
  minStock?: number,
  maxStock?: number,
) {
  if (minStock != null && product.stock < minStock) return false;
  if (maxStock != null && product.stock > maxStock) return false;

  return true;
}

export function useStockFilter(data: Product[]): UseStockFilterHook {
  const [minStock, setMinStock] = useState<number | undefined>(undefined);
  const [maxStock, setMaxStock] = useState<number | undefined>(undefined);

  const predicate = useCallback(
    (product: Product) => productStockFilter(product, minStock, maxStock),
    [minStock, maxStock],
  );

  const filteredData = useMemo(() => data.filter(predicate), [data, predicate]);

  return {
    data: filteredData,
    minStock,
    maxStock,
    setMinStock,
    setMaxStock,
    predicate,
  };
}
