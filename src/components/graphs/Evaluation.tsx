import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';


import { EvaluationResult } from "../../utils/ModelFunctions";

function Evaluation({evaluationData}: {evaluationData: EvaluationResult}) {
    const [dateIndexes, setDateIndexes] = useState<Date[]>([]);
    
    useEffect(() => {
        const dates = []

        for (let i = 0; i < evaluationData["index"].length; i++) {
            dates.push(new Date(evaluationData["index"][i]))
        }

        setDateIndexes(dates)
    }, [evaluationData])

    return (
        <div className="w-[90%] max-w-[55rem] h-96 rounded-2xl mt-8 bg-white flex flex-col items-center justify-center">
            <LineChart 
                series={[
                    {
                        data: evaluationData["expected"],
                        label: "Expected",
                        color: "#31363F",
                        showMark: false,
                        valueFormatter: (value) => {
                            if (value) {
                                return String(Math.round(value*100)/100).concat("%")
                            } else {
                                return "N/A"
                            }
                        }
                    },
                    {
                        data: evaluationData["predictions"],
                        label: "Prediction",
                        color: "#A0D6D8",
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
                    valueFormatter: (value) => {
                        return new Date(value).toLocaleDateString("en-US", {month: "short", year: "numeric"});
                    }
                }]}
                yAxis={[{
                    label: "Unemployment Rate",
                
                }]}
            />
        </div>
    )
}



export default Evaluation;