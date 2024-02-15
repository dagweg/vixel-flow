import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ImageState {
    data: string | undefined;
    extension: string | undefined;
}

const initialState: ImageState = {
    data: undefined,
    extension: undefined,
};

const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        setImage: (state, action: PayloadAction<string | undefined>) => {
            state.data = action.payload;
        },
        setImageExtension: (
            state,
            action: PayloadAction<string | undefined>
        ) => {
            state.extension = action.payload;
        },
    },
});

export const { setImage, setImageExtension } = imageSlice.actions;

// Will be imported as ImageReducer in other modules
const ImageReducer = imageSlice.reducer;
export default ImageReducer;
