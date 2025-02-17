import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";


function PingRender() {
    const [isPinging, setIsPinging] = useState(false);

    async function pingServer() {
        const ping = await fetch("https://forecast-unemployment.onrender.com/api/ping", { method: "GET" });

        if (!ping.ok) {
            setIsPinging(false);
            return;
        }

        setIsPinging(false);
    }

    function init() {
        setIsPinging(true);
        pingServer(); // Initial ping

        const intervalId = setInterval(() => {
            pingServer();
        }, 60000); // Ping every minute

        return () => clearInterval(intervalId);
    }

    useEffect(() => {
        init()
    }, []);


    return (
        <div>
            {/* {isShown && <div> */}
            {isPinging ? <div className="flex flex-row items-center justify-center gap-4">
                <p className="text-white font-bold">Starting the render server, please wait...</p>
                <ClipLoader color="#A0D6D8" loading={true} size={35} />
            </div> : <div className="flex flex-row items-center justify-center gap-2">
                <p className="text-white font-bold">The render server is up and running</p>
                <img src={"https://img.icons8.com/?size=100&id=63262&format=png&color=000000"} className="h-10"/>
            </div>}    
            {/* </div>} */}
        </div>
    )
}


export default PingRender;