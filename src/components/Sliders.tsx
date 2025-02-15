import { Slider } from "radix-ui";
import { useState } from "react";


function Thumb() {
    return (
        <Slider.Thumb 
            className="block w-5 h-5 bg-[#76ABAE] rounded-full shadow-md hover:bg-[#4A7B7D] focus:outline-none" 
            aria-label="Volume" 
        />
    )
}

function Track() {
    return (
        <Slider.Track className="bg-[#222831] relative grow rounded-full h-1">
            <Slider.Range className="absolute bg-[#76ABAE] rounded-full h-full" />
        </Slider.Track>
    )
}

export function SingleSlider({increments, onUpdate, startPos}: {increments: number, startPos: number, onUpdate: (p: number) => void}) {
    const [value, setValue] = useState<number[]>([Math.trunc(increments * startPos)]);

    return (
        <Slider.Root 
            value={value}
            onValueChange={(newValue) => {
                setValue(newValue)
                onUpdate(newValue[0]/increments)
            }}
            className="relative flex items-center select-none touch-none w-full h-5"
            min={0}
            max={increments}
        >
            <Track />
            <Thumb />
        </Slider.Root>
    )
}

export function DoubleSlider({increments, startPos1, startPos2, onUpdate}: {increments: number, startPos1: number, startPos2: number, onUpdate: (p1: number, p2: number) => void}) {
    const [values, setValues] = useState<number[]>([Math.trunc(increments * startPos1), Math.trunc(increments * startPos2)]);

    return (
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={values}
          onValueChange={(newValues) => {
            setValues(newValues)
            onUpdate(newValues[0]/increments, newValues[1]/increments)}
        }
          min={0}
          max={increments}
          step={1}
          minStepsBetweenThumbs={1}
          
        >
            <Track />
            <Thumb />
            <Thumb />

        </Slider.Root>
      );
}

export default Slider;