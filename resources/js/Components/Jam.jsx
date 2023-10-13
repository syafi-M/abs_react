import { useEffect, useState } from "react";

export default function Jam() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId); // Clear the interval when the component unmounts
    }, []);

    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const tanggalHariIni = currentTime.toLocaleDateString("id");
    return (
        <>
            <div className="flex items-end justify-end mr-3">
                <span className="text-xs font-bold text-white sm:hidden bg-[#3A4F50] px-4 py-1 rounded-full shadow-sm shadow-gray-600/70">
                    {tanggalHariIni},<span>{formattedTime}</span>
                </span>
            </div>
        </>
    );
}
