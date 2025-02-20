import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';


import { ForecastResult } from '../../utils/ModelFunctions';

const YearsShown = 4

const Legend = [
    {
        name: "Base Data",
        colour: "#31363F"
    },
    {
        name: "Forecast Data",
        colour: "#A0D6D8"
    }
]

function Forecast({forecastData}: {forecastData: ForecastResult}) {
    const [dateIndexes, setDateIndexes] = useState<Date[]>([]);
    const [values, setValues] = useState<number[]>([]);
    
    useEffect(() => {
        const dates = []
        const vs = []

        const start_index = Math.max(0, forecastData["base"]["index"].length - 12*YearsShown)
        for (let i = start_index; i < forecastData["base"]["index"].length; i++) {
            dates.push(new Date(forecastData["base"]["index"][i]))
            
            vs.push(forecastData["base"]["data"][i])
        }

        for (let i = 0; i < forecastData["forecast"]["index"].length; i++) {
            dates.push(new Date(forecastData["forecast"]["index"][i]))

            vs.push(forecastData["forecast"]["data"][i])
        }

        setDateIndexes(dates)
        setValues(vs)
    }, [forecastData])

    return (
        <div className="w-[90%] max-w-[55rem] h-96 rounded-2xl mt-8 bg-white flex flex-col items-center justify-center">
            <LineChart 
                series={[
                    {
                        data: values,
                        showMark: false,
                        valueFormatter: (value) => {
                            if (value) {
                                return String(Math.round(value*100)/100).concat("%")
                            } else {
                                return "N/A"
                            }
                        }
                    },
                ]}
                xAxis={[{
                    scaleType: "time",
                    data: dateIndexes,
                    tickInterval: (_, index) => index % 12 == 0,
                    colorMap: {
                        type: "piecewise",
                        thresholds: [dateIndexes[0], dateIndexes[dateIndexes.length - forecastData["forecast"]["index"].length]],
                        
                        colors: ["red", "#31363F", "#A0D6D8"] //just need red for values below, its never used
                    },
                    valueFormatter: (value) => {
                        return new Date(value).toLocaleDateString("en-US", {month: "short", year: "numeric"});
                    }
                }]}
                yAxis={[{
                    label: "Unemployment Rate",
                
                }]}
            />
            <div className='flex flex-row justify-center items-center mb-4 gap-4'>
                {Legend.map((item, index) => {
                    return (
                        <div key={index} className='flex flex-row items-center justify-center gap-2'>
                            <div className='w-4 h-4 rounded-full' style={{ backgroundColor: item.colour }}></div>
                            <p>{item.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Forecast;