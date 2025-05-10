import { useState, useCallback } from "react";

function useSelection<T extends string | number>(ids: T[]) {
  const [selectedIds, setSelectedIds] = useState<Set<T>>(
    () => new Set(ids ?? []),
  );

  const toggle = useCallback((id: T) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);

        return next;
      }

      next.add(id);

      return next;
    });
  }, []);

  const clear = useCallback(() => setSelectedIds(new Set()), []);

  return { selectedIds, toggle, clear };
}

export { useSelection };
