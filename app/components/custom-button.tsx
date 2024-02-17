"use client";
import React, { MouseEvent, ReactNode } from "react";

/**
 * Custom General Purpose Button Definition
 * @param param0
 * @returns
 */

function CButton({
    children,
    className,
    onClickCallback,
    name,
}: {
    children: ReactNode;
    className?: string;
    onClickCallback?: (e: MouseEvent<HTMLButtonElement>) => void;
    name?: string;
}) {
    return (
        <>
            <button
                className={
                    className ??
                    "btn inline-block  bg-white border-[1px] border-gray-300 dark:border-gray-800 hover:text-white hover:dark:bg-slate-950  dark:text-gray-100 dark:bg-slate-800 m-[1px]"
                }
                onClick={(e) => onClickCallback?.(e)}
                name={name}
            >
                {children}
            </button>
        </>
    );
}

export default CButton;
