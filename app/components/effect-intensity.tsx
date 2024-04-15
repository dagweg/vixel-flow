import { Slider } from "@/components/ui/slider";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  intensity: Number;
  setIntensity: Dispatch<SetStateAction<Number>>;
}

function EffectIntensity({ intensity, setIntensity }: Props) {
  return (
    <div className="flex flex-col  gap-2 p-4 w-full border-t-gray-400  border-t-[1px] mt-7">
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
    </div>
  );
}

export default EffectIntensity;
