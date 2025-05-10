import { useState, useMemo, Dispatch } from "react";
import { Product } from "../types";

interface UseGlobalFilterHook {
  filteredData: Product[];
  filterValue: string;
  setFilterValue: Dispatch<React.SetStateAction<string>>;
}

const normalize = (value: string | number) => value.toString().toLowerCase();

function productGlobalFilter(product: Product, filterValue: string) {
  return [product.name, product.id, product.price, product.stock].some(
    (value) => normalize(value).includes(normalize(filterValue)),
  );
}

function useGlobalFilter(data: Product[]): UseGlobalFilterHook {
  const [filterValue, setFilterValue] = useState("");

  const filteredData = useMemo(() => {
    if (!filterValue.trim()) {
      return data;
    }

    return data.filter((product) => productGlobalFilter(product, filterValue));
  }, [data, filterValue]);

  return { filteredData, filterValue, setFilterValue };
}

export { useGlobalFilter };
