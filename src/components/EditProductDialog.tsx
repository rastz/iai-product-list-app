import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { z } from "zod";
import { useState, useEffect, FormEvent } from "react";
import { Product } from "../types";
import { Button } from "./Button";
import { useMedia } from "react-use";
import { Input } from "./Input";

interface EditProductDialogProps {
  product: Product;
  onClose: VoidFunction;
  onSave: (updatedProduct: Product) => void;
}

export type ProductFormInput = z.infer<typeof productFormSchema>;

const productFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z.number().nonnegative("Price must be a positive number"),
  stock: z.number().int().nonnegative("Stock must be 0 or positive number"),
});

const BASE_DIALOG_CLASSES =
  "fixed right-0 bottom-0 left-0 z-50 flex min-w-80 max-h-2/3 flex-col gap-y-4 overflow-auto rounded-t-xl bg-white p-4 shadow-lg md:top-1/2 md:right-auto md:bottom-auto md:left-1/2 md:max-w-sm md:-translate-x-1/2 md:-translate-y-1/2 md:animate-none md:rounded-lg md:p-6";

export function EditProductDialog({
  product,
  onClose,
  onSave,
}: EditProductDialogProps) {
  const [formState, setFormState] = useState<ProductFormInput>({
    name: product.name,
    price: product.price,
    stock: product.stock,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormInput, string>>
  >({});

  const md = useMedia(`(max-width: 768px)`);

  /**
   * Keep form in sync if dialog is opened again with different product
   */
  useEffect(() => {
    setFormState({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
    setErrors({});
  }, [product]);

  const handleChange = (key: keyof ProductFormInput, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [key]: key === "name" ? value : Number(value),
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = productFormSchema.safeParse(formState);

    if (result.error) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0],
        price: fieldErrors.price?.[0],
        stock: fieldErrors.stock?.[0],
      });

      return null;
    }

    onSave({ ...product, ...result.data });
    onClose();
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
          <div className="flex flex-col gap-y-0.5">
            <Dialog.Title className="text-lg font-medium">
              Edit Product
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500">
              Name, Price or Stock
            </Dialog.Description>
          </div>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-y-1 text-sm font-medium">
              Name
              <Input
                type="text"
                errorMessage={errors.name}
                value={formState.name}
                onChange={(event) => handleChange("name", event.target.value)}
              />
            </label>

            <label className="flex flex-col gap-y-1 text-sm font-medium">
              Price
              <Input
                type="number"
                errorMessage={errors.price}
                value={formState.price}
                onChange={(event) => handleChange("price", event.target.value)}
              />
            </label>

            <label className="flex flex-col gap-y-1 text-sm font-medium">
              Stock
              <Input
                type="number"
                errorMessage={errors.stock}
                value={formState.stock}
                onChange={(event) => handleChange("stock", event.target.value)}
              />
            </label>

            <div className="flex justify-end gap-2 pt-4">
              <Dialog.Close asChild>
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
              </Dialog.Close>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
