"use client";

import React, { MutableRefObject, useRef, useState } from "react";
import MButton from "./menu-button";
import { FiShare2 } from "react-icons/fi";
import { TfiDownload } from "react-icons/tfi";
import { AppDispatch, store } from "@/lib/redux/store";
import { base64ToUInt8Array } from "@/lib/image-processing/util";
import { IoTrashBin } from "react-icons/io5";
import { handleImageRemove } from "./image-context-menu";
import { useDispatch } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import { ImageState } from "@/lib/redux/slices/imageSlice";
import JSZip from "jszip";

function MenuBar() {
    const menuRef = useRef<HTMLDivElement | null>(null);

    const image = store.getState().image;
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div
            ref={menuRef}
            className="tooltip w-full h-[40px]  bg-gray-100 dark:bg-transparent border-gray-900 border-[1px] rounded-lg  flex justify-between items-center"
        >
            <div>
                <MButton
                    tooltip="Download"
                    onClick={() => handleDownload(menuRef)}
                >
                    <TfiDownload></TfiDownload>
                </MButton>
                <MButton tooltip="Share" onClick={handleShare}>
                    <FiShare2></FiShare2>
                </MButton>
            </div>
            <div>
                {image !== undefined && (
                    <MButton
                        tooltip="Delete"
                        onClick={() => handleImageRemove(dispatch)}
                    >
                        <FaRegTrashAlt></FaRegTrashAlt>
                    </MButton>
                )}
            </div>
        </div>
    );
}

export default MenuBar;

function handleDownload(menuRef: MutableRefObject<HTMLDivElement | null>) {
    // gets image data
    const images = store.getState().image.recentModifications;

    let selectedImages: ImageState[] = [];

    for (let image of images as ImageState[]) {
        if (image.selected) {
            selectedImages.push(image);
        }
    }

    const zip = new JSZip();

    for (let image of selectedImages) {
        const byteArray = base64ToUInt8Array(image.data as string);
        const blob = new Blob([byteArray], {
            type: `image/${image.extension}`,
        });
        zip.file(image.fileName as string, blob);
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
        const href = URL.createObjectURL(content);

        // create a link
        const a = Object.assign(document.createElement("a"), {
            href,
            style: "display:none",
            download:
                `${images?.[0].fileName?.split(".")[0]}.zip` ??
                `vixel-file.zip`,
        });
        menuRef.current?.appendChild(a);
        a.click();

        // Free the memory
        URL.revokeObjectURL(href);
        a.remove();
    });
}

function handleShare() {}
