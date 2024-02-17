import React from "react";
import Accordion from "./accordion";
import CButton from "./custom-button";
import { FxRequest, FxResponse } from "@/lib/validators";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setImage } from "@/lib/redux/slices/imageSlice";

function ModifierPane() {
    const image = useSelector((state: RootState) => state.image);
    const dispatch = useDispatch<AppDispatch>();

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        let effectName = e.currentTarget.name;
        const payload: FxRequest = {
            image: image.data as string,
            effect: effectName,
        };

        console.log(payload);

        fetch("/api/v1/fx/", {
            method: "POST",
            body: JSON.stringify(payload),
        })
            .then(async (response) => {
                const data: FxResponse = await response.json();

                if (response.ok) {
                    dispatch(
                        setImage({
                            ...image,
                            data: data.image,
                            extension: data.ext,
                        })
                    );
                } else {
                    console.log("didnt recieve the data 😒");
                }
            })
            .catch((error) => console.log((error as Error).message));
    }

    return (
        <>
            <div className="overflow-y-scroll h-[50%]">
                <h1 className="text-xs">Modifier Pane</h1>
                <div className="flex flex-col bg-gray-50 dark:bg-transparent rounded-lg border-[1px] border-gray-100 dark:border-gray-700  shadow-sm md:flex-col gap-1 overflow-hidden md:h-full  w-full h-fit">
                    <Accordion title="Filter & Effects">
                        <CButton
                            onClickCallback={(e) => handleClick(e)}
                            name="Grayscale"
                        >
                            Grayscale
                        </CButton>
                        <CButton
                            onClickCallback={(e) => handleClick(e)}
                            name="Sepia"
                        >
                            Sepia
                        </CButton>
                        <CButton
                            onClickCallback={(e) => handleClick(e)}
                            name="Vintage"
                        >
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
            </div>
        </>
    );
}

export default ModifierPane;
