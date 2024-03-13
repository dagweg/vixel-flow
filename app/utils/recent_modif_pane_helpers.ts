import { base64ToUInt8Array } from "@/lib/image-processing/util";
import {
  ImageState,
  OriginalImageState,
  setImage,
  setImageRecentModifications,
  setImageSelected,
  setOriginalImage,
} from "@/lib/redux/slices/imageSlice";
import { AppDispatch, store } from "@/lib/redux/store";
import { Action, Dispatch } from "@reduxjs/toolkit";
import JSZip from "jszip";
import { MutableRefObject } from "react";

export function handleShare() {}

export function handleDownload(
  parentDivReference: MutableRefObject<HTMLDivElement | null>
) {
  // gets image data
  const images = store.getState().image.recentModifications;

  if (images?.[0] === undefined) {
    console.log("The image file is undefined. Nothing to download");
    return;
  }

  let selectedImages: ImageState[] = [];

  for (let image of images as ImageState[]) {
    if (image.selected) {
      selectedImages.push(image);
    }
  }

  // if nothing is selected download the current image being displayed
  if (selectedImages.length === 0) {
    selectedImages.push(store.getState().image);
  }

  const zip = new JSZip();

  for (let image of selectedImages) {
    const byteArray = base64ToUInt8Array(image.data as string);
    const blob = new Blob([byteArray], {
      type: `image/${image.extension}`,
    });
    zip.file(image.fileName as string, blob);
  }

  zip.generateAsync({ type: "blob" }).then((content) => {
    const href = URL.createObjectURL(content);

    // create a link
    const a = Object.assign(document.createElement("a"), {
      href,
      style: "display:none",
      download:
        `${images?.[0].fileName?.split(".")[0]}.zip` ?? `vixel-file.zip`,
    });
    parentDivReference.current?.appendChild(a);
    a.click();

    // Free the memory
    URL.revokeObjectURL(href);
    a.remove();
  });
}

export function handleDeleteSelected(dispatch: AppDispatch) {
  let image = store.getState().image;
  dispatch(
    setImageRecentModifications(
      image.recentModifications?.filter(
        (rmodif) => !rmodif.selected
      ) as ImageState[]
    )
  );
}
