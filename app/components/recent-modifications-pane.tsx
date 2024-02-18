"use client";

import { RootState, store } from "@/lib/redux/store";
import Image from "next/image";
import React, { useState } from "react";
import { ImageError } from "next/dist/server/image-optimizer";
import { ImageState } from "@/lib/redux/slices/imageSlice";
import { useSelector } from "react-redux";
import PaneTitle from "./pane-title";
import RecentCard from "./recent-card";

function RecentModificationsPane() {
    const image = useSelector((state: RootState) => state.image);

    const [isSelectMode, setIsSelectMode] = useState(false);

    function handleSelectToggle() {
        setIsSelectMode(!isSelectMode);
    }

    return (
        <>
            <div className="h-[50%] relative">
                <PaneTitle title="Recent Modifications" />
                <div className="flex flex-col bg-gray-50 dark:bg-transparent rounded-lg border-[1px] border-gray-100 dark:border-gray-700  shadow-sm md:flex-col gap-1 overflow-hidden md:h-full  w-full h-fit p-2 overflow-y-scroll  ">
                    {image.recentModifications?.map(
                        (
                            {
                                data,
                                fileName,
                                fileSize,
                                extension,
                                selected,
                                imageHash,
                            }: ImageState,
                            key
                        ) => (
                            <>
                                <RecentCard
                                    key={key}
                                    imageData={data}
                                    fileName={fileName}
                                    fileSize={fileSize}
                                    extension={extension}
                                    selected={selected as boolean}
                                    imageHash={imageHash}
                                    isInSelectMode={isSelectMode}
                                    selectToggleCallback={handleSelectToggle}
                                ></RecentCard>
                            </>
                        )
                    )}
                </div>
            </div>
        </>
    );
}

export default RecentModificationsPane;
