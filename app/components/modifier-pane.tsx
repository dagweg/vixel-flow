import React from "react";
import Accordion from "./accordion";
import CButton from "./custom-button";
import { FxRequest, FxResponse } from "@/lib/validators";
import { AppDispatch, RootState, store } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setImage, setImageExtension } from "@/lib/redux/slices/imageSlice";

function ModifierPane() {
    const imageData = useSelector((state: RootState) => state.image.data);
    const dispatch = useDispatch<AppDispatch>();

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        let effectName = e.currentTarget.name;

        const payload: FxRequest = {
            image: imageData as string,
            effect: effectName,
        };

        console.log(payload);

        fetch("/api/v1/fx/", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then(async (r) => {
                const data: FxResponse = await r.json();

                if (r.ok) {
                    console.log(data);
                    dispatch(setImage(data.image));
                    dispatch(setImageExtension(data.ext));
                }
            })
            .catch((error) => console.log((error as Error).message));
    }

    return (
        <div className="flex flex-col bg-gray-50 dark:bg-gray-900 rounded-lg border-[1px] border-gray-100 dark:border-gray-700  shadow-sm md:flex-col gap-1 overflow-hidden md:h-full md:w-[600px]">
            <Accordion title="Filter & Effects">
                <CButton
                    onClickCallback={(e) => handleClick(e)}
                    name="Grayscale"
                >
                    Grayscale
                </CButton>
                <CButton onClickCallback={(e) => handleClick(e)} name="Sepia">
                    Sepia
                </CButton>
                <CButton onClickCallback={(e) => handleClick(e)} name="Vintage">
                    Vintage
                </CButton>
            </Accordion>
            <Accordion title="Image Enhancements">
                <CButton
                    onClickCallback={(e) => handleClick(e)}
                    name="Brightness"
                >
                    Brightness
                </CButton>
                <CButton
                    onClickCallback={(e) => handleClick(e)}
                    name="Exposure"
                >
                    Exposure
                </CButton>
            </Accordion>
        </div>
    );
}

export default ModifierPane;
