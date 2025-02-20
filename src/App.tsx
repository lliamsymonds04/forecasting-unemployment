import { useState } from "react";

import ModelTuner from "./components/ModelTuner";
import InfoCard from "./components/InfoCard";
import LinksCard from "./components/LinksCard";
import { EvaluationResult, ForecastResult } from "./utils/ModelFunctions";
import Forecast from "./components/graphs/Forecast";
import Evaluation from "./components/graphs/Evaluation";

function App() {
  const [forecastData, setForecastData] = useState<ForecastResult | null>(null)
  const [evaluationData, setEvaluationData] = useState<EvaluationResult | null>(null);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-[#222831] relative">
      <p className="text-5xl text-[#EEEEEE] text-center font-bold font-sans mt-8">Unemployment Forecaster</p>
      <div className="w-screen flex flex-col items-center">
        {forecastData !== null && <Forecast forecastData={forecastData}/>}
        {evaluationData !== null && <Evaluation evaluationData={evaluationData}/>} 
      </div>
      <ModelTuner setForecastData={setForecastData} setEvaluationData={setEvaluationData}/>
      <InfoCard/>
      <LinksCard/>
    </div>
  );
}

export default App;