"use client";

import DragNDrop from "@/app/components/drag-drop";
import CDropDown from "@/app/components/drop-down";
import useComponentVisible from "@/app/hooks/use-component-visible";
import Image from "next/image";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { TfiDownload } from "react-icons/tfi";
import { FiShare2 } from "react-icons/fi";
import ModifierPane from "@/app/components/modifier-pane";
import Tooltip from "rc-tooltip";
import { CiImport } from "react-icons/ci";
import CMButton from "@/app/components/custom-context-menu-button";
import { FaRegTrashAlt } from "react-icons/fa";
import { setImage } from "@/lib/redux/slices/imageSlice";
import MenuBar from "@/app/components/menu-bar";
import ImageContextMenu from "@/app/components/image-context-menu";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import RecentModificationsPane from "@/app/components/recent-modifications-pane";
import PaneTitle from "@/app/components/pane-title";

function Workspace() {
    // Image stored here after import
    // const [image, setImage] = useState<string | undefined>();

    // Redux Store State
    const imageData = useSelector((state: RootState) => state.image.data);
    const dispatch = useDispatch<AppDispatch>();

    /**
     * Custom Hook for Handling Outside Click Events.
     * Specifically for right click
     */
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(false);

    // Context Menu Handler for Image Right Click
    function handleContextMenu(e: MouseEvent) {
        e.preventDefault();

        const { pageX, pageY } = e;

        if (ref.current) {
            ref.current.style.top = `${pageY}px`;
            ref.current.style.left = `${pageX}px`;
        } else {
            console.log("Ref is null | Not assigned to a div element");
        }
        setIsComponentVisible(true);
    }

    return (
        <div className="flex flex-col gap-4  h-fit  w-full relative p-4">
            <MenuBar />
            <div className="flex flex-col md:flex-row h-full gap-4 md:gap-2">
                <div
                    className="w-full flex-grow h-[375px] md:w-full md:h-screen
                 rounded-lg relative flex items-center
                border-gray-200 border-[1px] dark:border-gray-700 z-[1]"
                >
                    <PaneTitle title="Canvas" />
                    <div className="overflow-hidden w-full h-full flex flex-col justify-center z-0">
                        {/** Main section for displaying the image */}
                        {imageData !== undefined ? (
                            <Image
                                src={imageData ?? ""}
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
                {/** Side Bar Containing all modifiers */}
                <div className="flex flex-col gap-4 w-full md:w-[450px] md:h-screen">
                    <ModifierPane />
                    <RecentModificationsPane />
                </div>
            </div>

            {/** Image Right Click ContextMenu */}
            <div ref={ref} className="w-fit h-fit fixed inset-0 z-[15]">
                {isComponentVisible && (
                    <ImageContextMenu
                        setIsComponentVisible={setIsComponentVisible}
                    />
                )}
            </div>
        </div>
    );
}

export default Workspace;

{
    /* <ResizablePanelGroup
                direction="horizontal"
                className="flex flex-col md:flex-row w-full h-full pb-8 pt-2 gap-4 "
            >
                <ResizablePanel
                    defaultSize={80}
                    className="w-full flex-grow h-[375px] md:w-full md:h-full overflow-hidden rounded-lg  relative flex items-center border-gray-200 border-[1px] dark:border-gray-700"
                >
                    {imageData !== undefined ? (
                        <Image
                            src={imageData ?? ""}
                            alt="image"
                            width={10}
                            height={10}
                            className="w-auto  h-auto mx-auto"
                            onContextMenu={(e) => handleContextMenu(e)}
                        ></Image>
                    ) : (
                        <DragNDrop />
                    )}
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel className="!w-[300px] min-w-[300px]">
                    <ResizablePanelGroup
                        direction="vertical"
                        className="flex flex-col"
                    >
                        <ResizablePanel>
                            <ModifierPane />
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel>
                            <LayerPane />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup> */
}
