"use client";

import React, { MutableRefObject, useRef } from "react";
import MButton from "./menu-button";
import { FiShare2 } from "react-icons/fi";
import { TfiDownload } from "react-icons/tfi";
import { store } from "@/lib/redux/store";
import { base64ToUInt8Array } from "@/lib/image-processing/util";

function MenuBar() {
    const menuRef = useRef<HTMLDivElement | null>(null);

    return (
        <div
            ref={menuRef}
            className="tooltip w-fit h-[40px]  bg-gray-100 dark:bg-gray-900 rounded-lg  flex justify-start items-center"
        >
            <MButton tooltip="Download" onClick={() => handleDownload(menuRef)}>
                <TfiDownload></TfiDownload>
            </MButton>
            <MButton tooltip="Share" onClick={handleShare}>
                <FiShare2></FiShare2>
            </MButton>
        </div>
    );
}

export default MenuBar;

function handleDownload(menuRef: MutableRefObject<HTMLDivElement | null>) {
    // gets image data
    const image = store.getState().image;

    // Decode base64 string to Uint8Array
    const byteArray = base64ToUInt8Array(image.data as string);

    // Convert Uint8Array to image object
    const blob = new Blob([byteArray], {
        type: `image/${image.extension}`,
    });

    const href = URL.createObjectURL(blob);

    // create a link
    const a = Object.assign(document.createElement("a"), {
        href,
        style: "display:none",
        download: image.fileName,
    });
    menuRef.current?.appendChild(a);
    a.click();

    // Free the memory
    URL.revokeObjectURL(href);
    a.remove();
}

function handleShare() {}
