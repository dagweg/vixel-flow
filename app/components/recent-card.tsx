"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setImage, setImageSelected } from "@/lib/redux/slices/imageSlice";
import { AppDispatch, store } from "@/lib/redux/store";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, MouseEvent } from "react";
import { IoMdMore } from "react-icons/io";
import { useDispatch } from "react-redux";

interface RecentCardProps {
    key?: number;
    imageData: string | undefined;
    fileName: string | undefined;
    extension: string | undefined;
    fileSize?: number | undefined;
    imageRes?: string | undefined;
    selected: boolean;
    imageHash: string | undefined;
    isInSelectMode: boolean;
    selectToggleCallback: () => void;
}

function RecentCard({
    key,
    imageData,
    fileName,
    extension,
    fileSize = undefined,
    imageRes = undefined,
    selected = false,
    imageHash = undefined,
    isInSelectMode = false,
    selectToggleCallback,
}: RecentCardProps) {
    const dispatch = useDispatch<AppDispatch>();

    function handleCardClick() {
        dispatch(
            setImage({
                data: imageData,
                fileName: fileName,
                fileSize: fileSize,
                extension: extension,
            })
        );
    }

    function handleCheckBoxChange(e: ChangeEvent<HTMLInputElement>) {
        console.log(e.target.checked);
        dispatch(
            setImageSelected({
                imageHash: imageHash as string,
                selected: e.target.checked,
            })
        );
    }

    return (
        <>
            <section
                className="w-full h-[75px] dark:bg-slate-800 hover:bg-gray-200 dark:hover:brightness-110 cursor-pointer duration-100 p-1 flex gap-2 rounded-md relative [&>*]:font-roboto"
                onClick={handleCardClick}
            >
                <div className=" overflow-hidden aspect-square min-h-full min-w-[75px] border-[1px] border-gray-300 dark:border-none  dark:bg-slate-950 rounded-lg flex items-center">
                    <Image
                        src={imageData ?? ""}
                        alt=""
                        width={10}
                        height={10}
                        objectFit="cover"
                        className="h-fit w-full"
                    ></Image>
                </div>
                <div>
                    <h1 className="text-sm">
                        {fileName !== undefined &&
                            `${
                                fileName.length <= 30
                                    ? fileName
                                    : `${fileName.substring(0, 30)}...`
                            }`}
                    </h1>
                    <span className="text-[12px] font-light">
                        <p>
                            {fileSize !== undefined &&
                                `Size: ${fileSize.toPrecision(4)}mb`}
                        </p>
                        <p>{imageRes !== undefined && `Dim: ${imageRes}`}</p>
                    </span>
                </div>
                <div className="absolute right-0">
                    {isInSelectMode ? (
                        // <Checkbox
                        //     id={key}
                        //     checked={selected}
                        //     onCheckedChange={handleCheckBoxChange}
                        //     className="z-[100]"
                        // ></Checkbox>
                        <div className="p-2 duration-150 mx-2 ">
                            <input
                                type="checkbox"
                                checked={selected}
                                onChange={handleCheckBoxChange}
                                className="accent-purple-700 cursor-pointer"
                            ></input>
                        </div>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="p-2 hover:bg-black hover:bg-opacity-5 duration-150 dark:hover:bg-opacity-35 mx-2 rounded-lg">
                                    <IoMdMore />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuCheckboxItem
                                    onClick={selectToggleCallback}
                                >
                                    Select
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Properties
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </section>
        </>
    );
}

export default RecentCard;
