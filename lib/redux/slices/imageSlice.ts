import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialize } from "next/dist/server/lib/render-server";
import crypto from "crypto";
import { access } from "fs";

interface OriginalImageState
    extends Omit<ImageState, "recentModifications" | "originalImage"> {}

export interface ImageState {
    data: string | undefined;
    extension: string | undefined;
    fileName: string | undefined;
    fileSize: number | undefined;
    recentModifications?: ImageState[];
    originalImage?: OriginalImageState | undefined;
}

const initialState: ImageState = {
    data: undefined,
    extension: undefined,
    fileName: undefined,
    fileSize: undefined,
    recentModifications: [],
    originalImage: undefined,
};

const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        setImage: (state, action: PayloadAction<ImageState>) => {
            // sha256 hash for the new image
            const newImageHash = crypto
                .createHash("sha256")
                .update(action.payload.data as string)
                .digest("hex");

            // compared with each image data hash
            const imageAlreadyPresent = state.recentModifications?.some(
                (image: ImageState) => {
                    const imageHash = crypto
                        .createHash("sha256")
                        .update(image.data as string)
                        .digest("hex");
                    return imageHash === newImageHash;
                }
            );

            if (imageAlreadyPresent === false) {
                state.recentModifications?.push(action.payload);
            }

            state.data = action.payload.data;
            state.extension = action.payload.extension;
            state.fileName = action.payload.fileName;
            state.fileSize = action.payload.fileSize;
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
    },
});

export const { setImage, setImageRecentModifications, setOriginalImage } =
    imageSlice.actions;

// Will be imported as ImageReducer in other modules
const ImageReducer = imageSlice.reducer;
export default ImageReducer;
