"use client";

import { RootState, store } from "@/lib/redux/store";
import Image from "next/image";
import React from "react";
import VixelCard from "./vixel-card";
import { ImageError } from "next/dist/server/image-optimizer";
import { ImageState } from "@/lib/redux/slices/imageSlice";
import { useSelector } from "react-redux";

function RecentModificationsPane() {
    const image = useSelector((state: RootState) => state.image);
    return (
        <>
            <div className="overflow-y-scroll h-[50%]">
                <h1 className="text-xs">Recent Modifications</h1>
                <div className="flex flex-col bg-gray-50 dark:bg-transparent rounded-lg border-[1px] border-gray-100 dark:border-gray-700  shadow-sm md:flex-col gap-1 overflow-hidden md:h-full  w-full h-fit p-2">
                    {image.recentModifications?.map(
                        ({ data, fileName, fileSize }: ImageState, key) => (
                            <>
                                <VixelCard
                                    key={key}
                                    imageData={data}
                                    fileName={fileName}
                                    fileSize={fileSize}
                                ></VixelCard>
                            </>
                        )
                    )}
                </div>
            </div>
        </>
    );
}

export default RecentModificationsPane;
