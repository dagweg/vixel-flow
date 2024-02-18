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
import { handleDownload } from "../utils/handleDownload";
import { handleShare } from "../utils/handleShare";
import Share from "./share-component";

function MenuBar() {
    const menuRef = useRef<HTMLDivElement | null>(null);

    const image = store.getState().image;
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div
            ref={menuRef}
            className="tooltip w-full h-[40px]  bg-white dark:bg-transparent dark:border-gray-900 border-[1px] rounded-lg  flex justify-between items-center"
        >
            <div className="flex">
                <MButton
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
