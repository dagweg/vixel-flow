"use client";

import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import MButton from "./menu-button";
import { FiShare2 } from "react-icons/fi";
import { TfiDownload, TfiShare } from "react-icons/tfi";
import { AppDispatch, RootState, store } from "@/lib/redux/store";
import { base64ToUInt8Array } from "@/lib/image-processing/util";
import { IoClose, IoShareSocialOutline, IoTrashBin } from "react-icons/io5";
import { handleImageRemove } from "./image-context-menu";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import { ImageState } from "@/lib/redux/slices/imageSlice";
import JSZip from "jszip";
import Share from "./share-component";
import { DialogWarning } from "./dialog-warning";
import CButton from "./custom-button";
import DeleteButton from "./delete-button";
import {
  handleDownload,
  handleShare,
} from "../utils/recent_modif_pane_helpers";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Dialogs {
  shareDialog: boolean;
}

function MenuBar() {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const image = useSelector((state: RootState) => state.image);
  const dispatch = useDispatch<AppDispatch>();

  const warningDialogRef = useRef<HTMLButtonElement>(null);

  const [dialogs, setDialogs] = useState<Dialogs>({
    shareDialog: false,
  });

  return (
    <>
      {dialogs.shareDialog && (
        <ShareDialog dialogs={dialogs} setDialogs={setDialogs} />
      )}
      <div
        ref={menuRef}
        className="tooltip w-full h-[40px]  bg-white dark:bg-transparent dark:border-gray-900 border-[1px] rounded-lg  flex justify-between items-center"
      >
        <div className="flex">
          <MButton
            disabled={image.recentModifications?.length === 0}
            tooltip="Download"
            onClick={() => handleDownload(menuRef)}
          >
            <TfiDownload></TfiDownload>
          </MButton>
          <MButton
            onClick={() =>
              setDialogs({
                ...dialogs,
                shareDialog: true,
              })
            }
          >
            <IoShareSocialOutline />
          </MButton>
          {/* <Share handleShare={handleShare} shareLink="" /> */}
        </div>
        <div>
          {image !== undefined && (
            <MButton
              disabled={image.recentModifications?.length === 0}
              tooltip="Delete"
              onClick={() => warningDialogRef.current?.click()}
            >
              <FaRegTrashAlt></FaRegTrashAlt>
            </MButton>
          )}
        </div>
      </div>
      <DialogWarning
        title="Warning"
        description="You are about to delete your work."
        triggerRef={warningDialogRef}
        dialogClose={
          <>
            <CButton className="hover:underline underline-offset-[5px] duration-100">
              Cancel
            </CButton>
            <DeleteButton
              onDeleteCallback={() => handleImageRemove(dispatch)}
            ></DeleteButton>
          </>
        }
      />
    </>
  );
}

export default MenuBar;

function ShareDialog({
  dialogs,
  setDialogs,
}: {
  dialogs: {};
  setDialogs: Dispatch<SetStateAction<Dialogs>>;
}) {
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
    (image.recentModifications || []).length > 0 && (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center backdrop-blur-sm ">
        <div className="w-fit relative flex flex-col gap-4 bg-gray-200 p-4 rounded-lg  shadow-2xl ">
          <span
            className="z-[100] p-2  bg-gray-500 hover:bg-red-500 hover:text-white   left-1 top-1 absolute flex items-center justify-center rounded-md cursor-pointer "
            onClick={() =>
              setDialogs({
                ...dialogs,
                shareDialog: false,
              })
            }
          >
            <IoClose className="scale-110" />
          </span>
          <div className="relative grid grid-cols-3 grid-rows-1 gap-4 ">
            {shareImage?.map((image, key) => (
              <div
                key={key}
                onClick={() => handleImageSelected(image.imageHash as string)}
                className="relative w-[100px] h-[100px]"
              >
                <Image
                  src={image.data as string}
                  alt={image.fileName as string}
                  width={5}
                  height={5}
                  objectFit="cover"
                  className="min-w-[100px] min-h-[100px]  rounded-lg relative z-10"
                ></Image>
                {image.radioSelected && (
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 scale-105 inset-0  absolute top-0 left-0 w-full h-full rounded-lg"></div>
                )}
              </div>
            ))}
          </div>
          <Button>Share</Button>
        </div>
      </div>
    )
  );
}
