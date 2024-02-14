"use client";

import { setImage } from "@/lib/redux/slices/imageSlice";
import { AppDispatch } from "@/lib/redux/store";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdCloudUpload } from "react-icons/io";
import { useDispatch } from "react-redux";

/**
 * A component handling drag and drop files
 * @param param0
 * @returns
 */

function DragNDrop() {
    const dispatch = useDispatch<AppDispatch>();

    const onDrop: any = useCallback(
        (acceptedFiles: FileList) => {
            console.log(acceptedFiles);
            const reader = new FileReader();
            reader.addEventListener("load", (e) => {
                dispatch(setImage(e.target?.result as string));
            });
            reader.readAsDataURL(acceptedFiles[0]);
        },
        [dispatch]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });
    return (
        <div
            {...getRootProps()}
            className="w-full h-full flex flex-col justify-center items-center rounded-lg cursor-pointer"
        >
            <input {...getInputProps()} accept=".jpg, .png, .jpeg" />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <>
                    <IoMdCloudUpload className="md:hidden text-8xl " />
                    <p className="hidden md:block">
                        Drag n drop some files here, or click to select files
                    </p>
                </>
            )}
        </div>
    );
}

export default DragNDrop;
