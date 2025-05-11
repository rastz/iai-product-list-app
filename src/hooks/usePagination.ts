import { useState, useMemo, useEffect, useCallback } from "react";
import { Product } from "../types";

export interface UsePaginationHook {
  paginatedProducts: Product[];
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: () => void;
  prevPage: () => void;
  setPageIndex: (newIndex: number) => void;
  setPageSize: (size: number) => void;
}

export function usePagination(
  data: Product[],
  initialPageSize: number = 10,
  initialPageIndex: number = 1,
): UsePaginationHook {
  const [pageIndex, setPageIndex] = useState(() =>
    Math.max(1, initialPageIndex),
  );
  const [pageSize, setPageSize] = useState(initialPageSize);

  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(data.length / pageSize)),
    [data.length, pageSize],
  );

  useEffect(() => {
    setPageIndex((prevIndex) => Math.min(Math.max(1, prevIndex), pageCount));
  }, [pageCount]);

  const hasNextPage = pageIndex < pageCount;
  const hasPrevPage = pageIndex > 1;

  const nextPage = useCallback(() => {
    setPageIndex((prevIndex) => Math.min(prevIndex + 1, pageCount));
  }, [pageCount]);

  const prevPage = useCallback(() => {
    setPageIndex((prevIndex) => Math.max(prevIndex - 1, 1));
  }, []);

  const paginatedProducts = useMemo(() => {
    const start = (pageIndex - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, pageIndex, pageSize]);

  return {
    paginatedProducts,
    pageIndex,
    pageSize,
    pageCount,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
    setPageIndex,
    setPageSize,
  };
}
