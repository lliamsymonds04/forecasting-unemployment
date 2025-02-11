import InputsBox from "./components/InputsBox";

// async function fetchData() {
//   try {
//       const response = await fetch("http://127.0.0.1:5000/api/forecast_unemployment?start=2001-08-01&end=2015-08-01", {
//           method: "GET", // or "POST", "PUT", etc.
//       });

//       if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(data);
//   } catch (error) {
//       console.error("Error fetching data:", error);
//   }
// }




function App() {
  return (
    <div className="w-screen h-screen flex flex-col items-center bg-[#222831]">
      <p className="text-5xl text-[#EEEEEE] text-center font-bold font-sans mt-8">Unemployment Forecaster</p>
      
      <InputsBox />
      
    </div>
  );
}

export default App;