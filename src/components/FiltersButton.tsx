import { Table } from "@tanstack/react-table";
import { Product } from "../types";
import { Button } from "./Button";
import { useRef, useState } from "react";
import { RangeFilter } from "./RangeFilter";
import { useClickAway, useKey } from "react-use";

interface FiltersButtonProps {
  table: Table<Product>;
}

function FiltersButton({ table }: FiltersButtonProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const ref = useRef(null);

  const priceColumn = table.getColumn("price");
  const stockColumn = table.getColumn("stock");

  useClickAway(ref, () => setFiltersOpen(false));
  useKey("Escape", () => setFiltersOpen(false), {}, [filtersOpen]);

  return (
    <div className="relative">
      <Button
        variant="primary"
        icon="filters"
        onClick={() => setFiltersOpen((prev) => !prev)}
      >
        Filters
      </Button>

      {filtersOpen && (
        <div
          ref={ref}
          className="absolute right-0 z-50 mt-2 flex w-72 flex-col gap-y-4 rounded border bg-white p-4 shadow-lg"
        >
          {priceColumn && <RangeFilter column={priceColumn} label="Price" />}
          {stockColumn && <RangeFilter column={stockColumn} label="Stock" />}

          <Button
            variant={"primary"}
            onClick={() => {
              priceColumn?.setFilterValue(undefined);
              stockColumn?.setFilterValue(undefined);

              setFiltersOpen(false);
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}

export { FiltersButton };
