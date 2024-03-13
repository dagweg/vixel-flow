"use client";
import { Button } from "@/components/ui/button";
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
          "py-1 px-3  rounded-md inline-block  bg-white dark:bg-gray-900 hover:dark:!bg-white hover:dark:!text-black border-[1px] p-0  hover:text-white border-black dark:border-gray-500 hover:!bg-gray-700 duration-100 ease-in-out m-[1px] border-b-[5px] hover:translate-y-[2px]  hover:border-b-[3px] active:translate-y-[5px]  active:border-b-[1px]"
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
