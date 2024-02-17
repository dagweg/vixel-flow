"use client";

import {
    ImageState,
    setImage,
    setOriginalImage,
} from "@/lib/redux/slices/imageSlice";
import { AppDispatch, store } from "@/lib/redux/store";
import React, { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdCloudUpload } from "react-icons/io";
import { useDispatch } from "react-redux";
import { string } from "zod";

/**
 * A component handling drag and drop files
 * @param param0
 * @returns
 */

function DragNDrop() {
    const dispatch = useDispatch<AppDispatch>();

    const onDrop: any = useCallback(
        (acceptedFiles: FileList) => {
            const reader = new FileReader();

            const fileName: string = acceptedFiles[0].name;
            const fileSize: number = parseFloat(
                (acceptedFiles[0].size / Math.pow(10, 6)).toFixed(4)
            );

            const extension = fileName.split(".").pop();

            reader.addEventListener("load", (e) => {
                dispatch(
                    setOriginalImage({
                        data: e.target?.result as string,
                        fileName: fileName,
                        fileSize: fileSize,
                        extension: extension,
                    })
                );
                dispatch(
                    setImage(store.getState().image.originalImage as ImageState)
                );
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
