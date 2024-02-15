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
    const imageData = store.getState().image.data as string;
    const imageExtension = store.getState().image.extension;

    // Decode base64 string to Uint8Array
    const byteArray = base64ToUInt8Array(imageData);

    // Convert Uint8Array to image object
    const blob = new Blob([byteArray], {
        type: `image/${imageExtension}`,
    });

    // converts to url
    const href = URL.createObjectURL(blob);
    console.log(href);
    // create a link
    const a = Object.assign(document.createElement("a"), {
        href,
        style: "display:none",
        download: `image.${imageExtension}`,
    });
    menuRef.current?.appendChild(a);
    // click the link
    a.click();
    // free the url
    URL.revokeObjectURL(href);
    // delete the link
    a.remove();
}

function handleShare() {}
