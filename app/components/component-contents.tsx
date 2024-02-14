import React from "react";
import { TypeContent } from "./drop-down";
import CDButton from "./custom-context-menu-button";
import { CiImport } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

/**
 * Will rendered when right clicking the imported image
 */
export const ImageContextMenuComponents: TypeContent[] = [
    {
        content: (
            <CDButton>
                <CiImport />
                Import
            </CDButton>
        ),
    },
    {
        content: (
            <CDButton className="!text-red-500">
                <FaRegTrashAlt />
                Remove
            </CDButton>
        ),
    },
];
