import React, { MouseEvent } from "react";
import CButton from "./custom-button";
import Tooltip from "rc-tooltip";

interface MenuButton {
    children: React.ReactNode;
    tooltip?: string | undefined;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

function MButton({ tooltip = undefined, onClick, children }: MenuButton) {
    return (
        <button
            className="w-fit h-fit m-[1px] inline-block"
            onClick={(e) => onClick?.(e)}
        >
            {tooltip === undefined ? (
                <div className="p-2 hover:bg-gray-200 rounded-lg dark:hover:bg-gray-800 flex items-center">
                    <div className="inline-block mx-2">{children}</div>
                </div>
            ) : (
                <Tooltip placement="bottom" overlay={<span>{tooltip}</span>}>
                    <div className="p-2 hover:bg-gray-200 rounded-lg dark:hover:bg-gray-800 flex items-center">
                        <div className="inline-block mx-2">{children}</div>
                    </div>
                </Tooltip>
            )}
        </button>
    );
}

export default MButton;
