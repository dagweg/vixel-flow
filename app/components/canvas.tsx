"use client";

import React from "react";
import PaneTitle from "./pane-title";
import Image from "next/image";
import DragNDrop from "./drag-drop";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";

function Canvas({
    handleContextMenu,
}: {
    handleContextMenu: (e: MouseEvent) => void;
}) {
    const imageData = useSelector((state: RootState) => state.image.data);

    return (
        <div
            className="w-full flex-grow h-[375px] md:w-full md:h-screen
 rounded-lg relative flex items-center
border-gray-200 border-[1px] dark:border-gray-700 z-[1]"
        >
            <PaneTitle title="Canvas" />
            <div className="overflow-hidden w-full h-full flex flex-col justify-center z-0">
                {imageData !== undefined ? (
                    <Image
                        src={imageData}
                        alt="image"
                        width={10}
                        height={10}
                        className="w-auto  h-auto mx-auto z-10"
                        // @ts-ignore
                        onContextMenu={(e) => handleContextMenu(e)}
                    ></Image>
                ) : (
                    <DragNDrop />
                )}
            </div>
        </div>
    );
}

export default Canvas;
