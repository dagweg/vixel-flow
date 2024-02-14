"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

/**
 * Custom General Purpose Button Definition
 * @param param0
 * @returns
 */

function CButton({
    children,
    className,
    onClick,
    name,
}: {
    children: ReactNode;
    className?: string;
    onClick?: (arg0: any) => void;
    name?: string;
}) {
    return (
        <>
            <button
                className={
                    className ??
                    "btn inline-block bg-white border-[1px] border-gray-300 dark:border-gray-800 hover:text-white dark:bg-zinc-900 dark:hover:bg-gray-950 m-[1px]"
                }
                onClick={onClick}
                name={name}
            >
                {children}
            </button>
        </>
    );
}

export default CButton;
