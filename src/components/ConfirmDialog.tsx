import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./Button";
import { ReactNode } from "react";

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
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 max-w-sm -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg flex flex-col gap-y-4">
          <Dialog.Title className="text-lg font-medium">{title}</Dialog.Title>
          {description && (
            <Dialog.Description className="text-sm text-gray-600">
              {description}
            </Dialog.Description>
          )}

          <div className="flex justify-end gap-2 mt-4">
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
