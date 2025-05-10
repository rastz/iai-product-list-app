import { useSelection } from "./useSelection";
import { Product } from "../types";

export function useSelectedProducts(products: Product[]) {
  const { selectedIds, toggle, clear } = useSelection<Product["id"]>([]);

  const selectedProducts = products.filter((product) =>
    selectedIds.has(product.id),
  );

  return {
    selectedIds,
    selectedProducts,
    toggle,
    clear,
  };
}
