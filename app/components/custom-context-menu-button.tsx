import React, { MouseEvent, ReactNode } from "react";
import CButton from "./custom-button";

/**
 * Context Menu Button
 * @returns
 */
function CMButton({
    children,
    className,
    onClickCallback,
}: {
    children: ReactNode;
    className?: string;
    onClickCallback?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
    return (
        <CButton
            className={`p-1 px-2 flex justify-start gap-2 items-center hover:bg-gray-100 dark:hover:bg-gray-800 w-full rounded-md ${className}`}
            onClickCallback={onClickCallback}
        >
            {children}
        </CButton>
    );
}

export default CMButton;
