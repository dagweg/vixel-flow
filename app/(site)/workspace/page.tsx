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
        <div className="flex flex-col justify-center  h-screen w-full relative p-4">
            <MenuBar />
            <div className="flex flex-col md:flex-row w-full h-full pb-8 pt-2 gap-4 ">
                {/** Main section for displaying the image */}
                <div className="w-full h-[375px] md:w-full md:h-full overflow-hidden rounded-lg  relative flex items-center border-gray-200 border-[1px] dark:border-gray-700">
                    {imageData !== undefined ? (
                        <Image
                            src={imageData ?? ""}
                            alt="image"
                            width={10}
                            height={10}
                            className="w-auto  h-auto mx-auto"
                            // @ts-ignore
                            onContextMenu={(e) => handleContextMenu(e)}
                        ></Image>
                    ) : (
                        <DragNDrop />
                    )}
                </div>

                {/** Side Bar Containing all modifiers */}
                <ModifierPane />
            </div>

            {/** Image Right Click ContextMenu */}
            <div ref={ref} className="w-fit h-fit fixed inset-0">
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
