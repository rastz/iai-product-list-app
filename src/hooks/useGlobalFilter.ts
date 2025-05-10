import {
  useState,
  useMemo,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { Product } from "../types";

export interface UseGlobalFilterHook {
  data: Product[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  predicate: (product: Product) => boolean;
}

const normalize = (value: string | number) =>
  value.toString().toLowerCase().trim();

function productGlobalFilter(product: Product, filterValue: string) {
  const normalizedFilterValue = normalize(filterValue);

  /**
   * If the filter value is empty, skip filtering
   */
  if (!normalizedFilterValue) {
    return true;
  }

  return [product.name, product.id, product.price, product.stock].some(
    (field) => normalize(field).includes(normalizedFilterValue),
  );
}

export function useGlobalFilter(data: Product[]): UseGlobalFilterHook {
  const [value, setValue] = useState("");

  const predicate = useCallback(
    (product: Product) => productGlobalFilter(product, value),
    [value],
  );

  const filteredData = useMemo(() => {
    return data.filter(predicate);
  }, [data, predicate]);

  return {
    data: filteredData,
    value,
    setValue,
    predicate,
  };
}
