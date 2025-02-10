async function fetchData() {
  try {
      const response = await fetch("http://127.0.0.1:5000/api/forecast_unemployment?start=2001-08-01&end=2015-08-01", {
          method: "GET", // or "POST", "PUT", etc.
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.error("Error fetching data:", error);
  }
}



function App() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <button type="button" className="w-72 h-72 bg-red-500 hover: cursor-pointer" onClick={fetchData}>Fetch Data</button>
    </div>
  );
}

export default App;