"use client";

import Accordion from "@/app/components/accordion";
import DragNDrop from "@/app/components/drag-drop";
import CDropDown from "@/app/components/drop-down";
import { ImageContextMenuComponents } from "@/app/components/component-contents";
import EffectComponents from "@/app/components/effect-components";
import useComponentVisible from "@/app/hooks/use-component-visible";
import Image from "next/image";
import React, { useState } from "react";

function Workspace() {
    // Image stored here after import
    const [image, setImage] = useState<string | undefined>();

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
        <div className="flex flex-col justify-center items-center h-screen w-full relative">
            <div className="flex flex-col md:flex-row w-full h-full p-8 gap-4 ">
                {/** Main section for displaying the image */}
                <div className="w-full h-[375px] md:w-full md:h-full overflow-hidden rounded-lg  relative flex items-center border-gray-200 border-[1px] dark:border-gray-700">
                    {image !== undefined ? (
                        <Image
                            src={image ?? ""}
                            alt="image"
                            width={10}
                            height={10}
                            className="w-full  h-auto"
                            // @ts-ignore
                            onContextMenu={(e) => handleContextMenu(e)}
                        ></Image>
                    ) : (
                        <DragNDrop setImage={setImage} />
                    )}
                </div>

                {/** Side Bar Containing all modifiers */}
                <div className="flex bg-gray-50 dark:bg-gray-900 rounded-lg border-[1px] border-gray-100 dark:border-gray-700  shadow-sm md:flex-col gap-1 overflow-hidden md:h-full md:w-[600px]">
                    <Accordion accordion={EffectComponents}></Accordion>
                </div>
            </div>

            {/** Image Right Click ContextMenu Drop Down is here! */}
            <div ref={ref} className="w-fit h-fit fixed inset-0">
                {isComponentVisible && (
                    <div className="bg-white p-2 rounded-sm border-[1px] border-gray-300 dark:bg-black dark:border-gray-700 flex flex-col gap-2">
                        <CDropDown
                            dropDownElements={ImageContextMenuComponents}
                        ></CDropDown>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Workspace;
