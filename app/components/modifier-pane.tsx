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

  const handleIntensityChange = (values: Number[]) => {
    setIntensity(values[0]);
  };

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
          <fieldset className="flex flex-col absolute bottom-0 gap-2 p-4 w-full bg-gray-100 dark:bg-gray-800 rounded-t-lg">
            <label htmlFor="intensity">Effect Intensity</label>
            <div className="flex flex-col gap-4">
              <div>
                <span>{String(intensity)}</span>
                <Slider
                  className="cursor-pointer"
                  name="intensity"
                  id="intensity"
                  // defaultValue={[intensity]}
                  min={0}
                  max={10}
                  step={0.01}
                  onValueChange={(v: Number[]) => setIntensity(v[0])}
                ></Slider>
              </div>
              {/* <Button onClick={(e) => }>Apply</Button> */}
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
}

export default ModifierPane;
