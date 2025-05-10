import { useState, useCallback } from "react";
import { Product } from "../types";

interface UseProductDataHook {
  products: Product[];
  removeOne: (id: Product["id"]) => void;
  removeMany: (ids: Product["id"][]) => void;
}

function useProductsData(data: Product[]): UseProductDataHook {
  const [products, setProducts] = useState<Product[]>(data);

  const removeOne = useCallback((id: Product["id"]) => {
    setProducts((products) => products.filter((product) => product.id !== id));
  }, []);

  const removeMany = useCallback((ids: Product["id"][]) => {
    setProducts((products) =>
      products.filter((product) => !ids.includes(product.id)),
    );
  }, []);

  return { products, removeOne, removeMany };
}

export { useProductsData };
