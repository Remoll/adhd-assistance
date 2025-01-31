import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";

interface CustomDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  triggerButtonLabel?: string;
  customTrigger?: React.ReactNode;
  customContent?: React.ReactNode;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  title,
  description,
  onConfirm,
  triggerButtonLabel,
  customTrigger,
  customContent,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {customTrigger ?? (
          <Button variant="outline">{triggerButtonLabel ?? ""}</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {customContent}
        <DialogFooter>
          <Button onClick={onConfirm}>Confirm</Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
