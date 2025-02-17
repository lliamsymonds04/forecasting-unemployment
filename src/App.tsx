import { useState } from "react";
import ModelTuner from "./components/ModelTuner";
import InfoCard from "./components/InfoCard";
import LinksCard from "./components/LinksCard";
import PingRender from "./components/PingRender";


function App() {
  const [graphSrc, setGraphSrc] = useState<string>("");

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-[#222831] relative">
      <p className="text-5xl text-[#EEEEEE] text-center font-bold font-sans mt-8">Unemployment Forecaster</p>
      <div className="w-90% maw-w-[25rem] rounded-2xl overflow-hidden mt-8">
        {graphSrc !== "" && <img src={graphSrc} alt="Graph" className="w-fit h-auto" />}

      </div>
      <PingRender />
      <ModelTuner setGraphSrc={setGraphSrc}/>
      <InfoCard/>
      <LinksCard/>
    </div>
  );
}

export default App;