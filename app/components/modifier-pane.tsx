import React, { ChangeEvent, useState } from "react";
import Accordion from "./accordion";
import CButton from "./custom-button";
import { FxRequest, FxResponse } from "@/lib/validators";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setImage,
  setImageIsBeingProcessed,
} from "@/lib/redux/slices/imageSlice";
import PaneTitle from "./pane-title";
import { Slider } from "@/components/ui/slider";
import { getCldImageUrl } from "next-cloudinary";
import EffectIntensity from "./effect-intensity";

function ModifierPane() {
  const image = useSelector((state: RootState) => state.image);
  const dispatch = useDispatch<AppDispatch>();

  const [intensity, setIntensity] = useState<Number>(1);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    // Used to display a loader until processing completes
    dispatch(setImageIsBeingProcessed(true));

    let effectName = e.currentTarget.name;
    const payload: FxRequest = {
      image: image.data as string,
      effect: effectName,
      fileName: image.originalImage?.fileName as string,
      intensity: intensity as number,
    };
    const handleIntensityChange = (values: Number[]) => {
      setIntensity(values[0]);
    };

    if (payload.image === undefined) {
      console.log("Cant process empty file. Image is undefined");
      return;
    }

    fetch("/api/v1/fx/", {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        const data: FxResponse = await response.json();

        dispatch(setImageIsBeingProcessed(false));

        if (response.ok) {
          dispatch(
            setImage({
              ...image,
              data: data.image,
              extension: data.extension,
              fileName: data.fileName,
              fileSize: data.fileSize,
            })
          );
        } else {
          console.log("didnt recieve the data 😒");
        }

        dispatch(setImageIsBeingProcessed(false));
      })
      .catch((error) => console.log((error as Error).message));
  }

  const filterButtons = ["Grayscale", "Sepia", "Vintage"];
  const enhancementButtons = ["Brightness", "Contrast", "Saturation"];

  return (
    <>
      <div className="h-[50%] relative">
        <PaneTitle title="Modifier Pane" />
        <div className="relative  flex flex-col items-center bg-gray-50 dark:bg-transparent rounded-lg border-[1px] border-gray-100 dark:border-gray-700  shadow-sm md:flex-col gap-1 md:h-full  w-full h-fit">
          <div className="overflow-y-scroll">
            <Accordion title="Filter & Effects">
              {filterButtons.map((name, key) => (
                <CButton
                  key={key}
                  onClickCallback={(e) => handleClick(e)}
                  name={name}
                >
                  {name}
                </CButton>
              ))}
              <EffectIntensity
                intensity={intensity}
                setIntensity={setIntensity}
              />
            </Accordion>
            <Accordion title="Image Enhancements">
              {enhancementButtons.map((name, key) => (
                <CButton
                  key={key}
                  onClickCallback={(e) => handleClick(e)}
                  name={name}
                >
                  {name}
                </CButton>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModifierPane;
