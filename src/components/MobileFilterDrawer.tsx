import * as Dialog from "@radix-ui/react-dialog";
import { RangeFilter } from "./RangeFilter";
import { Button } from "./Button";
import { Table } from "@tanstack/react-table";
import { Product } from "../types";
import { CloseIcon } from "./Icons/CloseIcon";

interface MobileFilterDrawerProps {
  table: Table<Product>;
}

function MobileFilterDrawer({ table }: MobileFilterDrawerProps) {
  const priceColumn = table.getColumn("price");
  const stockColumn = table.getColumn("stock");

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="primary" icon="filters">
          Filters
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed z-50 bottom-0 left-0 right-0 rounded-t-xl bg-white p-4 shadow-lg animate-slideUp max-h-1/2 overflow-auto flex flex-col gap-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col gap-y-1">
              <Dialog.Title className="text-lg font-medium">
                Filters
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-500 mb-4">
                Choose a filter on product list.
              </Dialog.Description>
            </div>
            <Dialog.Close className="text-gray-500 hover:text-gray-800">
              <span className="w-6 h-6">
                <CloseIcon />
              </span>
            </Dialog.Close>
          </div>

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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { MobileFilterDrawer };
