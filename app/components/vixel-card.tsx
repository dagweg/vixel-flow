"use client";

import { setImage } from "@/lib/redux/slices/imageSlice";
import { AppDispatch, store } from "@/lib/redux/store";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

interface VixelCardProps {
    key?: number;
    imageData: string | undefined;
    fileName: string | undefined;
    fileSize?: number | undefined;
    imageRes?: string | undefined;
}

function VixelCard({
    key,
    imageData,
    fileName,
    fileSize = undefined,
    imageRes = undefined,
}: VixelCardProps) {
    const dispatch = useDispatch<AppDispatch>();

    function handleVixelCardClick() {
        // dispatch(setImage({
        //     data: imageData,
        //     fileName: fileName,
        //     fileSize: fileSize,
        // }))
    }

    return (
        <section
            className="w-full h-[75px] dark:bg-slate-800 hover:bg-gray-200 dark:hover:brightness-110 cursor-pointer duration-100 p-1 flex gap-2 rounded-md"
            onClick={handleVixelCardClick}
        >
            <div className=" overflow-hidden aspect-square min-h-full min-w-[75px] border-[1px] border-gray-300 dark:border-none  dark:bg-slate-950 rounded-lg flex items-center">
                <Image
                    src={imageData ?? ""}
                    alt=""
                    width={10}
                    height={10}
                    objectFit="cover"
                    className="h-fit w-full"
                ></Image>
            </div>
            <div>
                <h1 className="text-sm">
                    {fileName !== undefined &&
                        `${
                            fileName.length <= 30
                                ? fileName
                                : `${fileName.substring(0, 30)}...`
                        }`}
                </h1>
                <span className="text-[12px] font-light">
                    <p>{fileSize !== undefined && `Size: ${fileSize}mb`}</p>
                    <p>{imageRes !== undefined && `Dim: ${imageRes}`}</p>
                </span>
            </div>
        </section>
    );
}

export default VixelCard;
