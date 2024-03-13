"use client";

import React, { MutableRefObject, useRef, useState } from "react";
import MButton from "./menu-button";
import { FiShare2 } from "react-icons/fi";
import { TfiDownload } from "react-icons/tfi";
import { AppDispatch, RootState, store } from "@/lib/redux/store";
import { base64ToUInt8Array } from "@/lib/image-processing/util";
import { IoTrashBin } from "react-icons/io5";
import { handleImageRemove } from "./image-context-menu";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import { ImageState } from "@/lib/redux/slices/imageSlice";
import JSZip from "jszip";
import { handleDownload } from "../utils/handleDownload";
import { handleShare } from "../utils/handleShare";
import Share from "./share-component";
import { DialogWarning } from "./dialog-warning";
import CButton from "./custom-button";
import DeleteButton from "./delete-button";

function MenuBar() {
    const menuRef = useRef<HTMLDivElement | null>(null);

    const image = useSelector((state: RootState) => state.image);
    const dispatch = useDispatch<AppDispatch>();

    const warningDialogRef = useRef<HTMLButtonElement>(null);

    return (
        <>
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
                    <Share handleShare={handleShare} shareLink="" />
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
