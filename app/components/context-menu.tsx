"use client";

import React, { LegacyRef } from "react";
import useComponentVisible from "../hooks/use-component-visible";
import ImageContextMenu from "./image-context-menu";

function ContextMenu({
    ref,
    isComponentVisible,
    setIsComponentVisible,
}: {
    ref: LegacyRef<HTMLDivElement> | undefined;
    isComponentVisible: boolean;
    setIsComponentVisible: (arg0: boolean) => void;
}) {
    return (
        <div ref={ref} className="w-fit h-fit fixed inset-0 z-[15]">
            {isComponentVisible && (
                <ImageContextMenu
                    setIsComponentVisible={setIsComponentVisible}
                />
            )}
        </div>
    );
}

export default ContextMenu;
