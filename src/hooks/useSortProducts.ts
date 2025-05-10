import { useState, useMemo, useCallback } from "react";
import { Product } from "../types";

export type SortKey = "name" | "price" | "stock" | "id";
export type SortDirection = "asc" | "desc" | false;

export interface UseSortHook {
  sortedProducts: Product[];
  sortBy: (key: SortKey) => void;
  getDirection: (key: SortKey) => SortDirection;
}

function useSortProducts(
  data: Product[],
  defaultKey: SortKey | null = "name",
  defaultDirection: SortDirection = false,
): UseSortHook {
  const [sortKey, setSortKey] = useState<SortKey | null>(defaultKey);
  const [direction, setDirection] = useState<SortDirection>(defaultDirection);

  const sortBy = useCallback(
    (key: SortKey) => {
      if (key !== sortKey) {
        setSortKey(key);
        setDirection("asc");
        return;
      }

      setDirection((direction) => {
        if (direction === false) return "asc";
        if (direction === "asc") return "desc";

        return "asc";
      });
    },
    [sortKey],
  );

  const getDirection = useCallback(
    (key: SortKey): SortDirection => (key === sortKey ? direction : false),
    [sortKey, direction],
  );

  const sortedProducts = useMemo(() => {
    /**
     * If no sort applied - return unsorted data
     */
    if (!sortKey || direction === false) return data;

    return [...data].sort((a, b) => {
      const A = a[sortKey];
      const B = b[sortKey];

      if (A == null || B == null) return 0;
      if (A < B) return direction === "asc" ? -1 : 1;
      if (A > B) return direction === "asc" ? 1 : -1;

      return 0;
    });
  }, [data, sortKey, direction]);

  return { sortedProducts, sortBy, getDirection };
}

export { useSortProducts };
