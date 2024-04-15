"use client";

import {
  ImageState,
  setImage,
  setOriginalImage,
} from "@/lib/redux/slices/imageSlice";
import { AppDispatch, store } from "@/lib/redux/store";
import { PackageOpen } from "lucide-react";
import React, { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdCloudUpload } from "react-icons/io";
import { IoCloudUpload } from "react-icons/io5";
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
        const originalImage = {
          data: e.target?.result as string,
          fileName: fileName,
          fileSize: fileSize,
          extension: extension,
        };
        dispatch(setOriginalImage(originalImage));
        dispatch(setImage(originalImage));

        console.log("STORE STATE");
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
      className="w-full h-full flex flex-col  gap-3 justify-center items-center rounded-lg cursor-pointer"
    >
      <input {...getInputProps()} accept=".jpg, .png, .jpeg" />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <>
          <IoCloudUpload className="text-8xl " />
          {/* <IoMdCloudUpload className="md:hidden text-8xl " /> */}
          <p className="hidden md:block">
            Drag n drop some files here, or click to select files
          </p>
        </>
      )}
    </div>
  );
}

export default DragNDrop;
