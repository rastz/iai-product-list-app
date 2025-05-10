import { useState, useMemo, Dispatch, SetStateAction } from "react";
import { Product } from "../types";

export interface UsePriceFilterHook {
  data: Product[];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  setMinPrice: Dispatch<SetStateAction<number | undefined>>;
  setMaxPrice: Dispatch<SetStateAction<number | undefined>>;
}

export function usePriceFilter(data: Product[]): UsePriceFilterHook {
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const filteredData = useMemo(() => {
    return data.filter(({ price }) => {
      if (minPrice !== undefined && price < minPrice) return false;
      if (maxPrice !== undefined && price > maxPrice) return false;

      return true;
    });
  }, [data, minPrice, maxPrice]);

  return { data: filteredData, minPrice, maxPrice, setMinPrice, setMaxPrice };
}
