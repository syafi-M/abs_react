import Jam from "@/Components/Jam";
import MainDiv from "@/Components/MainDiv";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import {
    RiHistoryFill,
    RiListCheck3,
    RiMoonClearLine,
    RiSpeakLine,
    RiTodoLine,
    RiUserStarLine,
} from "react-icons/ri";

export default function Dashboard({ auth, absen, lembur, nguser, jabatan }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const tanggalHariIni = currentTime.toISOString().split("T")[0];
    // console.log("userData", nguser.data, auth);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="justify-start flex items-center">
                {absen.map(
                    (abs, i) =>
                        auth.user.id == abs.user_id &&
                        abs.tanggal_absen == tanggalHariIni &&
                        abs.absensi_type_pulang == null && (
                            <div key={i}>
                                <div className="text-center rounded-tr-lg rounded-bl-lg mb-5 w-fit text-md sm:text-xl font-semibold text-slate-300 bg-red-500 py-2 px-4 shadow-md ml-5 inset-0">
                                    <p>Kamu Belum Absen Pulang !!</p>
                                </div>
                            </div>
                        )
                )}
                {lembur.map(
                    (lbr) =>
                        auth.user.id == lbr.user_id &&
                        lbr.jam_selesai == null && (
                            <div className="text-center rounded-tr-lg rounded-bl-lg mb-5 sm:w-fit text-md sm:text-xl font-semibold text-slate-300 bg-red-500 py-2 px-4 shadow-md ml-5 sm:ml-10 inset-0">
                                <p>Kamu Belum Mengakhiri Lembur !!</p>
                            </div>
                        )
                )}
            </div>
            <MainDiv>
                {jabatan.map(
                    (datas, i) =>
                        (datas.code_jabatan == "MITRA" ||
                            datas.code_jabatan == "LEADER" ||
                            datas.code_jabatan == "CO-CS") && (
                            <div key={i}>
                                <div className="bg-amber-500 mr-10 sm:w-fit flex justify-start px-4 rounded-tl-[5px] rounded-br-[5px]">
                                    <span className="text-white text-center text-xs font-semibold my-1 sm:pr-5">
                                        <i className="text-center">
                                            Wellcome, You Logged As,
                                            {datas?.code_jabatan}
                                        </i>
                                    </span>
                                </div>
                            </div>
                        )
                )}
                <div className="py-5">
                    <Jam />
                    <div className="flex flex-col items-center gap-2 justify-center pt-2 px-2 overflow-hidden">
                        <div className="flex justify-end w-full mx-10">
                            <div className="text-center md:flex hidden justify-end items-end rounded-tr-lg rounded-bl-lg mb-5 w-fit text-md sm:text-xl font-semibold text-slate-100 bg-red-500 py-2 px-4 shadow-md ml-10 ">
                                <span className="text-white">
                                    {tanggalHariIni}
                                </span>
                            </div>
                        </div>
                        {jabatan[0].code_jabatan != "MITRA" &&
                            jabatan[0].code_jabatan != "LEADER" && (
                                <div className="w-full">
                                    <span className="grid grid-cols-3 gap-1">
                                        {/* {{-- absen --}} */}
                                        <a
                                            href={route("absensi.index")}
                                            className="rounded-md p-2 flex items-center justify-center border-none bg-[#3A4F50] hover:bg-[#3A4F50]/80 text-slate-50 w-full"
                                        >
                                            <div className=" sm:px-16 overflow-hidden justify-center items-center  flex flex-col">
                                                <RiTodoLine className="text-lg font-light" />
                                                <span className="text-[10px] capitalize font-semibold">
                                                    kehadiran
                                                </span>
                                            </div>
                                        </a>
                                        {/* {{-- lembur --}} */}
                                        <a
                                            href={route("lembur.index")}
                                            className="rounded-md p-2 flex items-center justify-center border-none bg-[#3A4F50] hover:bg-[#3A4F50]/80 text-slate-50 w-full"
                                        >
                                            <div className=" sm:px-16 overflow-hidden justify-center items-center flex flex-col ">
                                                <RiMoonClearLine className="text-lg font-light" />
                                                <span className="text-[10px] capitalize font-semibold">
                                                    lembur
                                                </span>
                                            </div>
                                        </a>
                                        {/* {{-- izin --}} */}
                                        <a
                                            href={route("izin.create")}
                                            className="rounded-md p-2 flex items-center justify-center border-none bg-[#3A4F50] hover:bg-[#3A4F50]/80 text-slate-50 w-full"
                                        >
                                            <div className=" sm:px-16 overflow-hidden justify-center items-center flex flex-col ">
                                                <RiTodoLine className="text-lg font-light" />
                                                <span className="text-[10px] capitalize font-semibold">
                                                    izin
                                                </span>
                                            </div>
                                        </a>
                                        {/* {{-- cp --}} */}
                                        <a
                                            href={route(
                                                "checkpoint-user.create"
                                            )}
                                            className="rounded-md p-2 flex items-center justify-center border-none bg-[#3A4F50] hover:bg-[#3A4F50]/80 text-slate-50 w-full col-span-2"
                                        >
                                            <div className=" sm:px-16 overflow-hidden justify-center items-center flex  gap-1">
                                                <RiListCheck3 className="text-lg font-light" />
                                                <span className="text-[10px] capitalize font-semibold">
                                                    Kinerja Harian
                                                </span>
                                            </div>
                                        </a>
                                        {/* {{-- riwayat --}} */}
                                        <a
                                            href={route("riwayat")}
                                            className="rounded-md p-2 flex items-center justify-center border-none bg-[#3A4F50] hover:bg-[#3A4F50]/80 text-slate-50 w-full"
                                        >
                                            <div className=" sm:px-16 overflow-hidden justify-center items-center flex flex-col ">
                                                <RiHistoryFill className="text-lg font-light" />
                                                <span className="text-[10px] capitalize font-semibold">
                                                    riwayat
                                                </span>
                                            </div>
                                        </a>
                                        {/* {{-- rating --}} */}
                                        <a
                                            href={route(
                                                "myRate",
                                                nguser.data[0].id
                                            )}
                                            className="rounded-md p-2 flex items-center justify-center border-none bg-[#3A4F50] hover:bg-[#3A4F50]/80 text-slate-50 w-full"
                                        >
                                            <div className=" sm:px-16 overflow-hidden justify-center items-center flex flex-col ">
                                                <RiUserStarLine className="text-lg font-light" />
                                                <span className="text-[10px] capitalize font-semibold">
                                                    rating
                                                </span>
                                            </div>
                                        </a>
                                        {/* {{-- laporan --}} */}
                                        <a
                                            href={route("laporan.create")}
                                            className="rounded-md p-2 flex items-center justify-center border-none bg-[#3A4F50] hover:bg-[#3A4F50]/80 text-slate-50 w-full col-span-2"
                                        >
                                            <div className=" sm:px-16 overflow-hidden justify-center flex items-center gap-1">
                                                <RiSpeakLine className="text-lg font-light" />
                                                <span className="text-[10px] capitalize font-semibold">
                                                    Laporan
                                                </span>
                                            </div>
                                        </a>
                                    </span>
                                </div>
                            )}
                    </div>
                </div>
            </MainDiv>
        </AuthenticatedLayout>
    );
}
