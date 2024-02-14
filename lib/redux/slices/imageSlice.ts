import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ImageState {
    data: string | undefined;
}

const initialState: ImageState = {
    data: undefined,
};

const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: {
        setImage: (state, action: PayloadAction<string | undefined>) => {
            state.data = action.payload;
        },
    },
});

export const { setImage } = imageSlice.actions;

// Will be imported as ImageReducer in other modules
const ImageReducer = imageSlice.reducer;
export default ImageReducer;
