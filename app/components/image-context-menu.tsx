import React from "react";
import CDropDown from "./drop-down";
import CMButton from "./custom-context-menu-button";
import { FaRegTrashAlt } from "react-icons/fa";
import { AppDispatch } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
import {
    setImage,
    setImageRecentModifications,
} from "@/lib/redux/slices/imageSlice";

interface ImageContextMenuProps {
    setIsComponentVisible: (isComponentVisible: boolean) => void;
}

function ImageContextMenu({ setIsComponentVisible }: ImageContextMenuProps) {
    const dispatch = useDispatch<AppDispatch>();

    function _handleImageRemove() {
        handleImageRemove(dispatch);
        setIsComponentVisible(false);
    }

    return (
        <div className="bg-white p-2 rounded-sm border-[1px] border-gray-300 dark:bg-black dark:border-gray-700 flex flex-col gap-2">
            <CMButton
                className="!text-red-500"
                onClickCallback={() => _handleImageRemove()}
            >
                <FaRegTrashAlt />
                Remove
            </CMButton>
        </div>
    );
}

export default ImageContextMenu;

export function handleImageRemove(dispatch: AppDispatch) {
    dispatch(
        setImage({
            data: undefined,
            extension: undefined,
            fileName: undefined,
            fileSize: undefined,
        })
    );
    dispatch(setImageRecentModifications([]));
}
