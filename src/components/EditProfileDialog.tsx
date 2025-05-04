import * as Dialog from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";
import { Product } from "../types";
import { Button } from "./Button";
import clsx from "clsx";
import { useMedia } from "react-use";
import { Input } from "./Input";

interface EditProductDialogProps {
  product: Product;
  onClose: VoidFunction;
  onSave: (updatedProduct: Product) => void;
}

const BASE_DIALOG_CLASSES =
  "fixed right-0 bottom-0 left-0 z-50 flex max-h-1/2 flex-col gap-y-4 overflow-auto rounded-t-xl bg-white p-4 shadow-lg md:top-1/2 md:right-auto md:bottom-auto md:left-1/2 md:max-w-sm md:-translate-x-1/2 md:-translate-y-1/2 md:animate-none md:rounded-lg md:p-6";

export function EditProductDialog({
  product,
  onClose,
  onSave,
}: EditProductDialogProps) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  /**
   * This 'max-width' match with Tailwind 'md' breakpoint
   */
  const md = useMedia(`(max-width: 768px`);

  /**
   * Keep form in sync if dialog is opened again with different product
   */
  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
    setPrice(product.stock);
  }, [product]);

  const handleSave = () => {
    onSave({ ...product, name, price, stock });
  };

  return (
    <Dialog.Root open onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Dialog.Content
          className={clsx(BASE_DIALOG_CLASSES, {
            "animate-slideUp": md,
            "md:animate-none": !md,
          })}
        >
          <Dialog.Title className="text-lg font-medium">
            Edit Product
          </Dialog.Title>

          <form
            className="flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              handleSave();
            }}
          >
            <label className="text-sm font-medium">
              Name
              <Input
                required
                minLength={3}
                className="mt-1 w-full rounded border px-2 py-1"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label className="text-sm font-medium">
              Price
              <Input
                type="number"
                className="mt-1 w-full rounded border px-2 py-1"
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
              />
            </label>

            <label className="text-sm font-medium">
              Stock
              <Input
                type="number"
                className="mt-1 w-full rounded border px-2 py-1"
                value={stock}
                onChange={(event) => setStock(Number(event.target.value))}
              />
            </label>

            <div className="flex justify-end gap-2 pt-4">
              <Dialog.Close asChild>
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button variant="primary" onClick={handleSave} type="submit">
                  Save
                </Button>
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
