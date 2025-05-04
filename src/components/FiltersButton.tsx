import { Table } from "@tanstack/react-table";
import { Product } from "../types";
import { Button } from "./Button";
import { useRef, useState } from "react";
import { RangeFilter } from "./RangeFilter";
import { useClickAway } from "react-use";

interface FiltersButtonProps {
  table: Table<Product>;
}

function FiltersButton({ table }: FiltersButtonProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const ref = useRef(null);

  const priceColumn = table.getColumn("price");
  const stockColumn = table.getColumn("stock");

  useClickAway(ref, () => setFiltersOpen(false));

  return (
    <div className="relative inline-block">
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
          className="absolute right-0 mt-2 p-4 w-72 z-50 bg-white border rounded shadow-lg flex flex-col gap-y-4"
        >
          {priceColumn && <RangeFilter column={priceColumn} label="Price" />}
          {stockColumn && <RangeFilter column={stockColumn} label="Stock" />}

          <Button
            variant={"primary"}
            onClick={() => {
              priceColumn?.setFilterValue(undefined);
              stockColumn?.setFilterValue(undefined);
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
