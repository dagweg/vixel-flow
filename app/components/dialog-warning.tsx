import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CiWarning } from "react-icons/ci";

interface DialogWarningProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    dialogClose?: React.ReactNode;
    triggerRef: React.Ref<HTMLButtonElement>;
}

export function DialogWarning({
    title = "Warning",
    description,
    children,
    footer,
    triggerRef,
    dialogClose,
}: DialogWarningProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" ref={triggerRef} className="hidden">
                    <p className="sr-only">Dialog Trigger</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex gap-2 items-center ">
                        <CiWarning></CiWarning>
                        {title}
                    </DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter>{footer}</DialogFooter>
                <DialogClose className="flex w-full  justify-between items-center px-3">
                    {dialogClose}
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
