import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode, useState, useRef } from "react";
import { useClickAway, useKey } from "react-use";
import { CloseIcon } from "../Icons/CloseIcon";
import { Button } from "./Button";

interface FiltersButtonProps {
  children: ReactNode;
  onReset: VoidFunction;
}

function FilterBox({ children, onReset }: FiltersButtonProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setFiltersOpen(false));
  useKey("Escape", () => setFiltersOpen(false), {}, [filtersOpen]);

  const desktopInterfaceJSX = (
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
          {children}

          <Button variant="primary" onClick={onReset}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );

  const mobileInterfaceJSX = (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="primary" icon="filters">
          Filters
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Dialog.Content className="animate-slideUp fixed right-0 bottom-0 left-0 z-50 flex max-h-fit flex-col gap-y-4 overflow-auto rounded-t-xl bg-white p-4 shadow-lg">
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

          {children}

          <Button variant="primary" onClick={onReset}>
            Reset Filters
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );

  return (
    <>
      <div className="hidden md:block">{desktopInterfaceJSX}</div>
      <div className="md:hidden">{mobileInterfaceJSX}</div>
    </>
  );
}

export { FilterBox };
