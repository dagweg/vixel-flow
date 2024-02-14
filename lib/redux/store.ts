import { configureStore } from "@reduxjs/toolkit";
import ImageReducer from "@/lib/redux/slices/imageSlice";

export const store = configureStore({
    reducer: {
        image: ImageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
