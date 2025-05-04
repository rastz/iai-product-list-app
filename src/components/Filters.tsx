import { Table } from "@tanstack/react-table";
import { FiltersButton } from "./FiltersButton";
import { MobileFilterDrawer } from "./MobileFilterDrawer";
import { Product } from "../types";

interface FiltersProps {
  table: Table<Product>;
}

function Filters({ table }: FiltersProps) {
  return (
    <>
      <div className="hidden md:block">
        <FiltersButton table={table} />
      </div>

      <div className="md:hidden">
        <MobileFilterDrawer table={table} />
      </div>
    </>
  );
}

export { Filters };
