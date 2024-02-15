import React from "react";
import MButton from "./menu-button";
import { FiShare2 } from "react-icons/fi";
import { TfiDownload } from "react-icons/tfi";

function MenuBar() {
    return (
        <div className="tooltip w-fit h-[40px]  bg-gray-100 dark:bg-gray-900 rounded-lg mx-4 flex justify-start items-center">
            <MButton tooltip="Download">
                <TfiDownload></TfiDownload>
            </MButton>
            <MButton tooltip="Share">
                <FiShare2></FiShare2>
            </MButton>
        </div>
    );
}

export default MenuBar;
