import { useState, useCallback } from "react";
import { Product } from "../types";

function useSelectedProducts(products: Product[]) {
  const [selectedProduct, setSelectedProduct] = useState<Set<Product["id"]>>(
    new Set(),
  );

  const toggle = useCallback((id: Product["id"]) => {
    setSelectedProduct((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);

        return next;
      }

      next.add(id);

      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setSelectedProduct(new Set());
  }, []);

  const selectedProducts = products.filter((product) =>
    selectedProduct.has(product.id),
  );

  return { selectedProduct, selectedProducts, toggle, clear };
}

export { useSelectedProducts };
