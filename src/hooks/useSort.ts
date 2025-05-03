import { useState, useMemo } from "react";

export type SortDirection = "asc" | "desc";

type UseSortOptions<T> = {
  data: T[];
  defaultSortKey: keyof T;
  defaultDirection?: SortDirection;
};

export function useSort<T>({
  data,
  defaultSortKey,
  defaultDirection = "asc",
}: UseSortOptions<T>) {
  const [sortKey, setSortKey] = useState<keyof T>(defaultSortKey);
  const [direction, setDirection] = useState<SortDirection>(defaultDirection);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [data, sortKey, direction]);

  const toggleSort = (key: keyof T) => {
    if (key === sortKey) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDirection("asc");
    }
  };

  return {
    sortedData,
    sortKey,
    direction,
    toggleSort,
  };
}
