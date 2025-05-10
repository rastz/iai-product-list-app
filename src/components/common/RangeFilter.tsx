import { ChangeEvent } from "react";
import { Input } from "../Input";

interface RangeFilterProps {
  label: string;
  min?: number;
  max?: number;
  onChange: (bounds: { min?: number; max?: number }) => void;
}

function RangeFilter({ label, min, max, onChange }: RangeFilterProps) {
  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    onChange({ min: val !== "" ? Number(val) : undefined, max });
  };

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    onChange({ min, max: val !== "" ? Number(val) : undefined });
  };

  return (
    <div className="flex flex-col gap-1 text-sm">
      <label className="font-medium">{label}</label>

      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder="Min"
          value={min ?? ""}
          onChange={handleMinChange}
        />
        <Input
          type="number"
          placeholder="Max"
          value={max ?? ""}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
}

export { RangeFilter };
