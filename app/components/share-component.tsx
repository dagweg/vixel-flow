"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";
import React, { useRef } from "react";
import { FiShare2 } from "react-icons/fi";
import MButton from "./menu-button";

function Share({
    handleShare,
    shareLink = "https://vixelflow.vercel.app",
}: {
    handleShare: () => void;
    shareLink: string;
}) {
    async function handleCopyToClipboard() {
        navigator.clipboard.writeText(shareLink);
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <MButton tooltip="Share" onClick={handleShare}>
                        <FiShare2></FiShare2>
                    </MButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Share Vixel</DialogTitle>
                        <DialogDescription>
                            You can use the link below to share the image to
                            other people.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="link"
                                defaultValue={shareLink}
                                readOnly
                            />
                        </div>
                        <Button
                            type="submit"
                            size="sm"
                            className="px-3"
                            onClick={handleCopyToClipboard}
                        >
                            <span className="sr-only">Copy</span>
                            <CopyIcon className="h-4 w-4" />
                        </Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Share;
