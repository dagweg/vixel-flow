import React, { MouseEvent } from "react";
import CButton from "./custom-button";
import Tooltip from "rc-tooltip";

interface MenuButton {
    children: React.ReactNode;
    disabled?: boolean;
    tooltip?: string | undefined;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

function MButton({
    tooltip = undefined,
    onClick,
    children,
    disabled = false,
}: MenuButton) {
    return (
        <button
            disabled={disabled}
            className="w-fit h-fit m-[1px] inline-block"
            onClick={(e) => onClick?.(e)}
        >
            {tooltip === undefined ? (
                <div className="p-2 hover:bg-gray-200 rounded-lg dark:hover:bg-gray-800 flex items-center">
                    <div className="inline-block mx-2">{children}</div>
                </div>
            ) : (
                <div className="p-2 hover:bg-gray-200 rounded-lg dark:hover:bg-gray-800 flex items-center">
                    <div className="inline-block mx-2">{children}</div>
                </div>
            )}
        </button>
    );
}

export default MButton;
