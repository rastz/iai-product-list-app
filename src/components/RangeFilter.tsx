import { Column } from "@tanstack/react-table";
import { Product } from "../types";
import { Input } from "./Input";

type RangeFilterProps = {
  column: Column<Product, unknown>;
  label: string;
};

function RangeFilter({ column, label }: RangeFilterProps) {
  const [min, max] = (column.getFilterValue() as [number, number]) ?? [];

  return (
    <div className="flex flex-col text-sm gap-1">
      <label className="font-medium">{label}</label>

      <div className="flex gap-2 items-center">
        <Input
          type="number"
          placeholder="Min"
          value={min ?? ""}
          onChange={(event) => {
            const newMin = event.target.value ?? undefined;
            column.setFilterValue([newMin, max]);
          }}
          className="w-24 px-2 py-1 border rounded"
        />

        <Input
          type="number"
          placeholder="Max"
          value={max ?? ""}
          onChange={(event) => {
            const newMax = event.target.value ?? undefined;
            column.setFilterValue([min, newMax]);
          }}
          className="w-24 px-2 py-1 border rounded"
        />
      </div>
    </div>
  );
}

export { RangeFilter };
