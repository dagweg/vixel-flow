"use client";

import React, { useRef } from "react";
import MenuBar from "@/app/components/menu-bar";
import WorkspaceSidebar from "@/app/components/workspace-side-bar";
import Canvas from "@/app/components/canvas";
import ContextMenu from "@/app/components/context-menu";
import useComponentVisible from "@/app/hooks/use-component-visible";
import MetaWrapper from "@/app/components/meta-wrapper";
import { DialogWarning } from "@/app/components/dialog-warning";
import { Button } from "@/components/ui/button";
import CButton from "@/app/components/custom-button";
import DeleteButton from "@/app/components/delete-button";

function Workspace() {
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
        <div>
            <MetaWrapper
                title="Vixel Flow"
                description="Workspaces"
                imageTwitter=""
                imageUrl=""
            ></MetaWrapper>
            <div className="flex flex-col gap-4  h-fit  w-full relative p-4">
                <MenuBar />
                <div className="flex flex-col md:flex-row h-full gap-4 md:gap-2">
                    <Canvas handleContextMenu={handleContextMenu} />
                    <WorkspaceSidebar />
                </div>
                {/* <ContextMenu
                isComponentVisible={isComponentVisible}
                setIsComponentVisible={setIsComponentVisible}
                ref={ref}
            /> */}
            </div>
        </div>
    );
}

export default Workspace;
