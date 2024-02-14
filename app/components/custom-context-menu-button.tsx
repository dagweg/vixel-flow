import React, { ReactNode } from "react";
import CButton from "./custom-button";

/**
 * Custom Button For Context Menu
 * @returns
 */
function CMButton({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <CButton
            className={`p-1 px-2 flex justify-start gap-2 items-center hover:bg-gray-100 dark:hover:bg-gray-800 w-full rounded-md ${className}`}
        >
            {children}
        </CButton>
    );
}

export default CMButton;
