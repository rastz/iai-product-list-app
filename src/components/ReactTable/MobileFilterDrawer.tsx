import * as Dialog from "@radix-ui/react-dialog";
import { Table } from "@tanstack/react-table";
import { Product } from "../../types";
import { Button } from "../common/Button";
import { CloseIcon } from "../Icons/CloseIcon";
import { RangeFilter } from "./RangeFilter";

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
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Dialog.Content className="animate-slideUp fixed right-0 bottom-0 left-0 z-50 flex max-h-1/2 flex-col gap-y-4 overflow-auto rounded-t-xl bg-white p-4 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
              <Dialog.Title className="text-lg font-medium">
                Filters
              </Dialog.Title>
              <Dialog.Description className="mb-4 text-sm text-gray-500">
                Choose a filter on product list.
              </Dialog.Description>
            </div>
            <Dialog.Close className="text-gray-500 hover:text-gray-800">
              <span className="h-6 w-6">
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
