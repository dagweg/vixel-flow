import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialize } from "next/dist/server/lib/render-server";
import crypto from "crypto";
import { access, stat } from "fs";

interface OriginalImageState
    extends Omit<ImageState, "recentModifications" | "originalImage"> {}

export interface ImageState {
    data?: string | undefined;
    extension?: string | undefined;
    fileName?: string | undefined;
    fileSize?: number | undefined;
    recentModifications?: ImageState[];
    originalImage?: OriginalImageState | undefined;
    selected?: boolean | undefined;
    imageHash?: string | undefined;
}

interface SetImageSelectedState {
    imageHash: string;
    selected: boolean;
}

const initialState: ImageState = {
    data: undefined,
    extension: undefined,
    fileName: undefined,
    fileSize: undefined,
    recentModifications: [],
    originalImage: undefined,
    selected: false,
    imageHash: undefined,
};

const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        setImage: (state, action: PayloadAction<ImageState>) => {
            let newImageHash: string | undefined = undefined;

            if (action.payload.data) {
                newImageHash = crypto
                    .createHash("sha256")
                    .update(action.payload.data as string)
                    .digest("hex");
            }

            let imageAlreadyPresent: boolean = false;
            if (state.recentModifications && newImageHash !== undefined) {
                imageAlreadyPresent = state.recentModifications.some(
                    (image: ImageState) => {
                        return image.imageHash === newImageHash;
                    }
                );
            }

            // sha256 hash for the new image
            // compared with each image data hash

            state.data = action.payload.data;
            state.extension = action.payload.extension;
            state.fileName = action.payload.fileName;
            state.fileSize = action.payload.fileSize;
            state.imageHash = newImageHash;

            if (!imageAlreadyPresent) {
                state.recentModifications?.push({
                    ...action.payload,
                    imageHash: newImageHash,
                });
            }
        },
        setImageRecentModifications: (
            state,
            action: PayloadAction<ImageState[]>
        ) => {
            state.recentModifications = action.payload;
        },
        setOriginalImage: (
            state,
            action: PayloadAction<OriginalImageState>
        ) => {
            state.originalImage = action.payload;
        },
        setImageSelected: (
            state,
            action: PayloadAction<SetImageSelectedState>
        ) => {
            let foundImageIndex = -1;

            for (
                let i = 0;
                i < (state.recentModifications?.length! ?? 0);
                i++
            ) {
                if (
                    state.recentModifications?.[i].imageHash ===
                    action.payload.imageHash
                ) {
                    foundImageIndex = i;
                    break;
                }
            }
            if (foundImageIndex !== -1 && state.recentModifications) {
                state.recentModifications[foundImageIndex].selected =
                    action.payload.selected;
            } else {
                console.log(`Image not found`);
            }
        },
    },
});

export const {
    setImage,
    setImageRecentModifications,
    setOriginalImage,
    setImageSelected,
} = imageSlice.actions;

// Will be imported as ImageReducer in other modules
const ImageReducer = imageSlice.reducer;
export default ImageReducer;
