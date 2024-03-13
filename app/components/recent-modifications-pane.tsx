"use client";

import { AppDispatch, RootState, store } from "@/lib/redux/store";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ImageError } from "next/dist/server/image-optimizer";
import {
    ImageState,
    setImageSelected,
    setImageSelectedAll,
} from "@/lib/redux/slices/imageSlice";
import { useDispatch, useSelector } from "react-redux";
import PaneTitle from "./pane-title";
import RecentCard from "./recent-card";
import { Button } from "@/components/ui/button";
import { count } from "console";
import { FiSettings } from "react-icons/fi";
import { IoIosMore } from "react-icons/io";
import Tooltip from "rc-tooltip";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleDownload } from "../utils/handleDownload";

function RecentModificationsPane() {
    const image = useSelector((state: RootState) => state.image);
    const dispatch = useDispatch<AppDispatch>();

    const [isSelectMode, setIsSelectMode] = useState(false);

    const parentDivRef = useRef<HTMLDivElement>(null);

    function handleSelectToggle() {
        setIsSelectMode(!isSelectMode);
    }

    const [recentCount, setRecentCount] = useState<number>(0);
    const [selected, setSelected] = useState<number>(0);

    useEffect(() => {
        setRecentCount(image.recentModifications?.length as number);
        setSelected(
            image.recentModifications?.filter((image) => image.selected)
                .length as number
        );
    }, [image]);

    useEffect(() => {
        if (!isSelectMode) {
            dispatch(setImageSelectedAll(false));
        }
    }, [isSelectMode, dispatch]);

    return (
        <>
            <div className="h-[50%] relative" ref={parentDivRef}>
                <PaneTitle
                    title={`Recent Modifications ${
                        recentCount !== 0 ? `(${recentCount})` : ""
                    }`}
                />
                {isSelectMode && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="h-[4px]  absolute z-10 right-0 top-0 translate-y-[-8px] text-xs translate-x-[-10px] bg-white text-black border-gray-300 hover:text-white dark:bg-black dark:text-white dark:border-gray-700 border-[1px] hover:bg-opacity-50">
                                Options {"  "}
                                {`${`(${selected})`}`}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuCheckboxItem
                                onClick={() => setIsSelectMode(false)}
                            >
                                Clear selection
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                onClick={() => handleDownload(parentDivRef)}
                            >
                                Download Selection
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

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
