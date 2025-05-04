import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./Button";
import { ReactNode } from "react";
import clsx from "clsx";
import { useMedia } from "react-use";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
}

const BASE_DIALOG_CLASSES =
  "fixed right-0 bottom-0 left-0 z-50 flex max-h-1/2 flex-col gap-y-4 overflow-auto rounded-t-xl bg-white p-4 shadow-lg md:top-1/2 md:right-auto md:bottom-auto md:left-1/2 md:max-w-sm md:-translate-x-1/2 md:-translate-y-1/2 md:animate-none md:rounded-lg md:p-6";

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  /**
   * This 'max-width' match with Tailwind 'md' breakpoint
   */
  const md = useMedia(`(max-width: 768px`);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40" />
        <Dialog.Content
          className={clsx(BASE_DIALOG_CLASSES, {
            "animate-slideUp": md,
            "md:animate-none": !md,
          })}
        >
          <Dialog.Title className="text-lg font-medium">{title}</Dialog.Title>
          {description && (
            <Dialog.Description className="text-sm text-gray-600">
              {description}
            </Dialog.Description>
          )}

          <div className="mt-4 flex justify-end gap-2">
            <Dialog.Close asChild>
              <Button variant="secondary" onClick={onCancel}>
                {cancelLabel}
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button variant="danger" onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
