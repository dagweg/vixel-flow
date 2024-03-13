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
import React, { useRef, useState } from "react";
import { FiShare2 } from "react-icons/fi";
import MButton from "./menu-button";
import { store } from "@/lib/redux/store";
import Image from "next/image";
import { ImageState } from "@/lib/redux/slices/imageSlice";
import clsx from "clsx";
import { cn } from "@/lib/utils";

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

  const image = store.getState().image;

  interface ShareImageState extends ImageState {
    radioSelected: boolean;
  }

  const [shareImage, setShareImage] = useState<ShareImageState[]>([
    ...(image.recentModifications?.map(
      (rmodif: ImageState) =>
        ({
          ...rmodif,
          radioSelected: false,
        } as ShareImageState)
    ) as ShareImageState[]),
  ]);

  const handleImageSelected = (imageHash: string) => {
    setShareImage([
      ...(shareImage.map((img: ShareImageState) => {
        return {
          ...img,
          radioSelected: img.imageHash === imageHash,
        };
      }) as ShareImageState[]),
    ]);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <MButton tooltip="Share" onClick={handleShare}>
            <FiShare2></FiShare2>
          </MButton>
        </DialogTrigger>
        <DialogContent className="w-fit">
          <DialogHeader>
            <DialogTitle>Share Vixel</DialogTitle>
            {/* <DialogDescription>
                            You can use the link below to share the image to
                            other people.
                        </DialogDescription> */}
          </DialogHeader>

          <div className="grid grid-cols-3 grid-rows-1 gap-4 ">
            {shareImage?.map((image, key) => (
              <>
                <div
                  key={key}
                  onClick={() => handleImageSelected(image.imageHash as string)}
                  className="relative w-[500px] h-[500px]"
                >
                  <Image
                    src={image.data as string}
                    alt={image.fileName as string}
                    width={500}
                    height={500}
                  ></Image>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 scale-105 inset-0 w-full h-full"></div>
                </div>
              </>
            ))}
          </div>
          {/* <div className="flex items-center space-x-2">
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
                    </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Share;
