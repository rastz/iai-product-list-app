import { Column } from "@tanstack/react-table";
import { Product } from "../../types";
import { Input } from "../common/Input";

type RangeFilterProps = {
  column: Column<Product, unknown>;
  label: string;
};

function RangeFilter({ column, label }: RangeFilterProps) {
  const [min, max] = (column.getFilterValue() as [number, number]) ?? [];

  return (
    <div className="flex flex-col gap-1 text-sm">
      <label className="font-medium">{label}</label>

      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder="Min"
          value={min ?? ""}
          onChange={(event) => {
            const newMin = event.target.value ?? undefined;
            column.setFilterValue([newMin, max]);
          }}
          className="w-24 rounded border px-2 py-1"
        />

        <Input
          type="number"
          placeholder="Max"
          value={max ?? ""}
          onChange={(event) => {
            const newMax = event.target.value ?? undefined;
            column.setFilterValue([min, newMax]);
          }}
          className="w-24 rounded border px-2 py-1"
        />
      </div>
    </div>
  );
}

export { RangeFilter };
