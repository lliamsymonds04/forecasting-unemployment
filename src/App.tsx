import { useState } from "react";
import ModelTuner from "./components/ModelTuner";
import InfoCard from "./components/InfoCard";
import LinksCard from "./components/LinksCard";
// import Footer from "./components/Footer";


function App() {
  const [graphSrc, setGraphSrc] = useState<string>("");

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-[#222831] relative">
      <p className="text-5xl text-[#EEEEEE] text-center font-bold font-sans mt-8">Unemployment Forecaster</p>
      <div className="w-90% maw-w-[25rem] rounded-2xl overflow-hidden mt-8">
        {graphSrc !== "" && <img src={graphSrc} alt="Graph" className="w-fit h-auto" />}

      </div>
      {/* {graphSrc !== "" && <img src={graphSrc} alt="Graph" className="w-[90%] h-auto mt-8 max-w-[25rem]" />} */}
      <ModelTuner setGraphSrc={setGraphSrc}/>
      {/* <Footer /> */}
      <InfoCard/>
      <LinksCard/>
    </div>
  );
}

export default App;