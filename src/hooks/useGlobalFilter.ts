import { useState, useMemo, Dispatch } from "react";
import { Product } from "../types";

interface UseGlobalFilterHook {
  data: Product[];
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
}

const normalize = (value: string | number) =>
  value.toString().toLowerCase().trim();

function productGlobalFilter(product: Product, filterValue: string) {
  return [product.name, product.id, product.price, product.stock].some(
    (value) => normalize(value).includes(normalize(filterValue)),
  );
}

function useGlobalFilter(data: Product[]): UseGlobalFilterHook {
  const [globalfilterValue, setGlobalFilterValue] = useState("");

  const globalfilteredData = useMemo(() => {
    if (!normalize(globalfilterValue)) {
      return data;
    }

    return data.filter((product) =>
      productGlobalFilter(product, globalfilterValue),
    );
  }, [data, globalfilterValue]);

  return {
    data: globalfilteredData,
    value: globalfilterValue,
    setValue: setGlobalFilterValue,
  };
}

export { useGlobalFilter };
