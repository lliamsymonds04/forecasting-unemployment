import { useState } from "react";

import { SingleSlider, DoubleSlider } from "./Sliders";
import interpolateDateRange from "../utils/InterpolateDateRange";

const DateRange = ["1991-08-01", "2025-01-01"]
const MaxForecastMonths = 12;

function InputsBox() {
    const [startDate, setStartDate] = useState<string>(interpolateDateRange(DateRange[0], DateRange[1], 0));
    const [endDate, setEndDate] = useState<string>(interpolateDateRange(DateRange[0], DateRange[1], 1));

    const [forecastMonths, setForecastMonths] = useState<number>(MaxForecastMonths * 0.5);
    
    return (
        <div className="max-w-96 w-[90%] rounded-2xl bg-[#31363F] h-fit mt-32 p-4 flex flex-col items-center">
            <p className="font-bold font-sans text-2xl text-[#EEEEEE] mb-5">Model Parameters</p>

            <p className="font-bold font-sans text-lg text-[#EEEEEE]">
                Range: {startDate} - {endDate}
            </p>
            <div className="w-[60%]">
                <DoubleSlider increments={200} startPos1={0} startPos2={1}
                    onUpdate={(p1: number, p2: number) => {
                        setStartDate(interpolateDateRange(DateRange[0], DateRange[1], p1));
                        setEndDate(interpolateDateRange(DateRange[0], DateRange[1], p2));
                    }}
                />
            </div>
            <p className="font-bold font-sans text-lg text-[#EEEEEE]">
                Forecast Months: {forecastMonths}
            </p>
            <div className="w-[60%]">
                <SingleSlider increments={MaxForecastMonths} startPos={0.5}
                    onUpdate={(p: number) => {
                        setForecastMonths(Math.trunc(MaxForecastMonths * p));
                    }}
                />
            </div>

            <div className="flex flex-row justify-between">
                
            </div>

            <button className="bg-[#76ABAE] text-[#EEEEEE] font-bold font-sans text-lg mt-10 mb-5 px-4 py-2 rounded-lg hover:bg-[#4A7B7D] focus:outline-none"> Run Model </button>
        </div>
    )
}


export default InputsBox;