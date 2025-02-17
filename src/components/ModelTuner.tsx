import { useState } from "react";

import { SingleSlider, DoubleSlider } from "./Sliders";
import interpolateDateRange from "../utils/InterpolateDateRange";
import NumbersInput from "./NumberInput";
import ToggleButton from "./ToggleButton";
import { PulseLoader } from "react-spinners";

const DateRange = ["1991-08-01", "2024-01-01"]
const MaxForecastMonths = 12;

const BaseURL = "http://127.0.0.1:5000"

function formatDate(date: string): string {
    const parts = date.split("/")
    const m = parts[0]
    let y = parts[1]
    if (Number(y) > 50) {
        y = "19" + y
    } else {
        y = "20" + y
    }

    return `${y}-${m}-01`
}

function ModelTuner({setGraphSrc}: {setGraphSrc: React.Dispatch<React.SetStateAction<string>>}) {
    const [startDate, setStartDate] = useState<string>(interpolateDateRange(DateRange[0], DateRange[1], 0));
    const [endDate, setEndDate] = useState<string>(interpolateDateRange(DateRange[0], DateRange[1], 1));
    const [modelInterestRate, setModelInterestRate] = useState<string>("5");
    const [modelInflationRate, setModelInflationRate] = useState<string>("2");
    const [testInterestRate, setTestInterestRate] = useState<string>("5");
    const [testInflationRate, setTestInflationRate] = useState<string>("2");

    const [predictMode, setPredictMode] = useState<boolean>(false);

    const [forecastMonths, setForecastMonths] = useState<number>(MaxForecastMonths * 0.5);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    async function forecast() {
        //convert the dates
        const s = formatDate(startDate);
        const e = formatDate(endDate);
        const url = `${BaseURL}/api/forecast_unemployment?start=${s}&end=${e}&forecast_months=${forecastMonths}&interest_rate=${modelInterestRate}&inflation_rate=${modelInflationRate}`;

        const response = await fetch(url, {method: "GET"});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blob = await response.blob()
        const imgUrl = URL.createObjectURL(blob)
        setGraphSrc(imgUrl)
    }

    async function evaluate() {
        //convert the dates
        const s = formatDate(startDate);
        const e = formatDate(endDate);
        const url = `${BaseURL}/api/evaluate_model?start=${s}&end=${e}`;

        const response = await fetch(url, {method: "GET"});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blob = await response.blob()
        const imgUrl = URL.createObjectURL(blob)
        setGraphSrc(imgUrl)
    }

    async function getInterestAndInflation(date: string) {
        const formattedDate = formatDate(date);
        const url = `${BaseURL}/api/get_interest_and_inflation?date=${formattedDate}`;
        const response = await fetch(url, {method: "GET"});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        setTestInflationRate(data["inflation"])
        setTestInterestRate(data["interest"])
    }
    
    return (
        <div className="max-w-[25rem] w-[90%] rounded-2xl bg-[#31363F] h-fit mt-4 p-4 flex flex-col items-center">
            <p className="font-bold font-sans text-2xl text-[#EEEEEE] mb-5">Model Parameters</p>
            <div className="w-[80%]">
                <ToggleButton
                    activeColour="#76ABAE"
                    backgroundColour="#222831"
                    option1="Evaluate"
                    option2="Predict"
                    toggle={predictMode}
                    setToggle={setPredictMode}
                />
            </div>

            <p className="font-bold font-sans text-lg text-[#EEEEEE] mt-4">
                Range: {startDate} - {endDate}
            </p>
            <div className="w-[60%] mt-2">
                <DoubleSlider increments={200} startPos1={0} startPos2={1}
                    onUpdate={(p1: number, p2: number) => {
                        setStartDate(interpolateDateRange(DateRange[0], DateRange[1], p1));
                        const date2 =interpolateDateRange(DateRange[0], DateRange[1], p2)
                        setEndDate(date2);
                        getInterestAndInflation(date2)
                    }}
                />
            </div>

            {predictMode ? <div className="flex flex-col items-center w-full">
                
                <p className="font-bold font-sans text-lg text-[#EEEEEE] mt-4">
                    Forecast Months: {forecastMonths}
                </p>
                <div className="w-[60%]">
                    <SingleSlider increments={MaxForecastMonths} startPos={0.5}
                        onUpdate={(p: number) => {
                            setForecastMonths(Math.trunc(MaxForecastMonths * p));
                        }}
                    />
                </div>
                <p className="text-white mt-2 font-bold">Data at end of period: </p>
                <div className="flex flex-row gap-6">
                    <p className="text-white">Interest Rate: {testInterestRate}%</p>
                    <p className="text-white">Inflation Rate: {testInflationRate}%</p>
                </div>
                <p className="text-white mt-4 font-bold">Prediction Values</p>
                <div className="flex flex-row gap-6 mt-2">
                    <NumbersInput inputName="Interest Rate:" value={modelInterestRate} setValue={setModelInterestRate} />
                    <NumbersInput inputName="Inflation Rate:" value={modelInflationRate} setValue={setModelInflationRate} />
                </div>
            </div> : <p className="text-white text-center w-[80%] mt-2">Evaluation mode trains the model on data from the period and runs a prediction to present day</p>}

            <button 
                className="bg-[#76ABAE] text-[#EEEEEE] font-bold font-sans text-lg mt-10 mb-5 px-4 py-2 rounded-lg hover:bg-[#4A7B7D] focus:outline-none"
                onClick={() => {
                    setIsFetching(true)
                    
                    try {
                        if (predictMode) {
                            forecast();
                        } else {
                            evaluate();
                        }
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    } finally {
                        setIsFetching(false)
                    }
                    
                }}
            > Run Model </button>
            <PulseLoader color="#A0D6D8" size={15} loading={isFetching}/>
        </div>
    )
}


export default ModelTuner;