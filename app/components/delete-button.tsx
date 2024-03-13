import React from "react";
import CButton from "./custom-button";

function DeleteButton({
    onDeleteCallback,
    label = "Delete",
}: {
    onDeleteCallback: () => void;
    label?: string;
}) {
    return (
        <CButton
            className="text-red-500 border-gray-300 dark:border-gray-700 border-[1px] p-2 px-4 rounded-md hover:bg-red-500 hover:text-white"
            onClickCallback={onDeleteCallback}
        >
            {label}
        </CButton>
    );
}

export default DeleteButton;
