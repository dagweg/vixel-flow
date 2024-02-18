"use client";

import React, { Suspense } from "react";
import PaneTitle from "./pane-title";
import Image from "next/image";
import DragNDrop from "./drag-drop";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import Loading from "./loading";

function Canvas({
    handleContextMenu,
}: {
    handleContextMenu: (e: MouseEvent) => void;
}) {
    const imageData = useSelector((state: RootState) => state.image.data);

    const CanvasImage = React.lazy<React.FC>(() => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    default: () => (
                        <Image
                            src={imageData as string}
                            alt="image"
                            width={10}
                            height={10}
                            className="w-auto h-auto mx-auto z-10"
                            // @ts-ignore
                            onContextMenu={(e) => handleContextMenu(e)}
                        />
                    ),
                });
            }, 100);
        });
    });

    return (
        <div
            className="w-full flex-grow h-[375px] md:w-full md:h-screen
 rounded-lg relative flex items-c   enter
border-gray-200 border-[1px] dark:border-gray-700 z-[1]"
        >
            <PaneTitle title="Canvas" />
            <div className="overflow-hidden w-full h-full flex flex-col justify-center z-0">
                {imageData !== undefined ? (
                    <Suspense
                        fallback={
                            <div className="w-full h-full rounded-lg flex justify-center items-center">
                                <Loading />
                            </div>
                        }
                    >
                        <CanvasImage />
                    </Suspense>
                ) : (
                    <DragNDrop />
                )}
            </div>
        </div>
    );
}

export default Canvas;
