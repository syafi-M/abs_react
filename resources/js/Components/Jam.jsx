import { DateTime } from "luxon";
import { useEffect, useState } from "react";

export default function Jam() {
    const [currentTime, setCurrentTime] = useState(
        DateTime.local().setZone("Asia/Jakarta")
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(DateTime.local().setZone("Asia/Jakarta"));
        }, 1000);

        return () => clearInterval(intervalId); // Clear the interval when the component unmounts
    }, []);
    // console.log(DateTime.now().setZone("Asia/Jakarta"));

    const formattedTime = currentTime.toFormat("HH:mm:ss");
    const tanggalHariIni = currentTime
        .setLocale("id")
        .toLocaleString(DateTime.DATE_SHORT);
    return (
        <>
            <div className="flex items-end justify-end mr-3">
                <span className="text-xs font-bold text-white sm:hidden bg-[#3A4F50] px-4 py-1 rounded-full shadow-sm shadow-gray-600/70">
                    {tanggalHariIni}, <span>{formattedTime}</span>
                </span>
            </div>
        </>
    );
}
