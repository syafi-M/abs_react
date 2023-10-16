import Jam from "@/Components/Jam";
import MainDiv from "@/Components/MainDiv";
import ModalPulang from "@/Components/Modal/ModalPulang";
import ModalSiang from "@/Components/Modal/ModalSiang";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import {
    RiCalendarCheckLine,
    RiHistoryFill,
    RiImageAddLine,
    RiListCheck3,
    RiMoonClearLine,
    RiPassPendingLine,
    RiShieldUserLine,
    RiSparklingLine,
    RiSpeakLine,
    RiTimeLine,
    RiTodoLine,
    RiUserStarLine,
} from "react-icons/ri";

export default function Dashboard({ auth, absen, lembur, nguser, jabatan }) {
    const [currentTime, setCurrentTime] = useState(
        DateTime.local().setZone("Asia/Jakarta")
    );
    const [modalSiang, setModalSiang] = useState(false);
    const [modalPulang, setModalPulang] = useState(false);

    const modalSiangBtn = () => {
        setModalSiang(true);
    };

    const modalPulangBtn = () => {
        setModalPulang(true);
    };

    const closeModal = () => {
        setModalSiang(false);
        setModalPulang(false);
    };

    const tanggalHariIni = currentTime.setLocale("id").toFormat("yyyy-MM-dd");
    // console.log(absen);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(DateTime.local());
        }, 1000);

        return () => clearInterval(intervalId); // Clear the interval when the component unmounts
    }, []);

    const formattedTime = currentTime.toFormat("HH:mm:ss");

    const timeParts = formattedTime.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
    const totalMinutes = Math.round(hours * 60 + minutes + seconds / 60);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="justify-start flex items-center">
                {absen.data.map(
                    (hadir, i) =>
                        auth.user.id == hadir.user_id &&
                        hadir.tanggal_absen == tanggalHariIni &&
                        hadir.absensi_type_pulang == null && (
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
                        jabatan[0].code_jabatan != "LEADER" ? (
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
                                        href={route("checkpoint-user.create")}
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
                        ) : jabatan[0].code_jabatan == "MITRA" ? (
                            <>
                                <div
                                    className="w-full space-y-4  sm:px-16 overflow-hidden flex items-center"
                                    id="Luser"
                                >
                                    <a
                                        href={route("mitra_user")}
                                        className="btn btn-info w-full"
                                    >
                                        <RiPassPendingLine className="text-xl" />
                                        Data Karyawan
                                    </a>
                                </div>
                                <div
                                    className="w-full space-y-4  sm:px-16 overflow-hidden"
                                    id="Ljadwal"
                                >
                                    <a
                                        href={route("mitra_jadwal")}
                                        className="btn btn-info w-full"
                                    >
                                        <RiCalendarCheckLine className="text-xl" />
                                        Jadwal
                                    </a>
                                </div>
                                <div
                                    className="w-full space-y-4  sm:px-16 overflow-hidden"
                                    id="Labsensi"
                                >
                                    <a
                                        href={route("mitra_absensi")}
                                        className="btn btn-info w-full"
                                    >
                                        <RiTodoLine className="text-xl" />
                                        Data Absensi
                                    </a>
                                </div>
                                <div
                                    className="w-full space-y-4  sm:px-16 overflow-hidden"
                                    id="lizin"
                                >
                                    <a
                                        href={route("mitra_izin")}
                                        className="btn btn-info w-full"
                                    >
                                        <RiShieldUserLine className="text-xl" />
                                        Data Izin
                                    </a>
                                </div>
                                <div
                                    className="w-full space-y-4  sm:px-16 overflow-hidden"
                                    id="Llembur"
                                >
                                    <a
                                        href={route("mitra_lembur")}
                                        className="btn btn-info w-full"
                                    >
                                        <RiTimeLine className="text-xl" />
                                        Data Lembur
                                    </a>
                                </div>
                                <div
                                    className="w-full space-y-4  sm:px-16 overflow-hidden"
                                    id="Llaporan"
                                >
                                    <a
                                        href={route("mitra_laporan")}
                                        className="btn btn-info w-full"
                                    >
                                        <RiImageAddLine className="text-xl" />
                                        Data Laporan
                                    </a>
                                </div>
                                <div
                                    className="w-full space-y-4  sm:px-16 overflow-hidden"
                                    id="LRating"
                                >
                                    <a
                                        href={route("mitra-rating.index")}
                                        className="btn btn-info w-full"
                                    >
                                        <RiSparklingLine className="text-xl" />
                                        Rating
                                    </a>
                                </div>
                            </>
                        ) : (
                            jabatan[0].code_jabatan == "LEADER" && (
                                <>
                                    <div
                                        className=" w-full space-y-4  sm:px-16 overflow-hidden flex items-center"
                                        id="Luser"
                                    >
                                        <a
                                            href={route("lead_user")}
                                            className="btn btn-info w-full"
                                        >
                                            <RiPassPendingLine className="text-xl" />
                                            Data Karyawan
                                        </a>
                                    </div>
                                    <div
                                        className=" w-full space-y-4  sm:px-16 overflow-hidden"
                                        id="Ljadwal"
                                    >
                                        <a
                                            href={route("leader-jadwal.index")}
                                            className="btn btn-info w-full"
                                        >
                                            <i className="ri-calendar-check-line text-xl"></i>
                                            Jadwal
                                        </a>
                                    </div>
                                    <div
                                        className=" w-full space-y-4  sm:px-16 overflow-hidden"
                                        id="Labsensi"
                                    >
                                        <a
                                            href={route("lead_absensi")}
                                            className="btn btn-info w-full"
                                        >
                                            <i className="ri-todo-line text-xl"></i>
                                            Data Absensi
                                        </a>
                                    </div>
                                    <div
                                        className=" w-full space-y-4  sm:px-16 overflow-hidden"
                                        id="Lizin"
                                    >
                                        <a
                                            href={route("lead_izin")}
                                            className="btn btn-info w-full"
                                        >
                                            <i className="ri-shield-user-line text-xl"></i>
                                            Data Izin
                                        </a>
                                    </div>
                                    <div
                                        className=" w-full space-y-4  sm:px-16 overflow-hidden"
                                        id="Llembur"
                                    >
                                        <a
                                            href={route("lead_lembur")}
                                            className="btn btn-info w-full"
                                        >
                                            <i className="ri-time-line text-xl"></i>
                                            Data Lembur
                                        </a>
                                    </div>
                                    <div
                                        className=" w-full space-y-4  sm:px-16 overflow-hidden"
                                        id="Llaporan"
                                    >
                                        <a
                                            href={route("lead_laporan")}
                                            className="btn btn-info w-full"
                                        >
                                            <i className="ri-image-add-line text-xl"></i>
                                            Data Laporan
                                        </a>
                                    </div>
                                    <div
                                        className="w-full space-y-4  sm:px-16 overflow-hidden"
                                        id="Lrating"
                                    >
                                        <a
                                            href={route("leader-rating.index")}
                                            className="btn btn-info w-full"
                                        >
                                            <i className="ri-sparkling-line text-xl"></i>
                                            Rating
                                        </a>
                                    </div>
                                </>
                            )
                        )}
                        {/* pulang */}
                        <div className="flex justify-center sm:justify-end">
                            {absen.data.map((hadir, i) => {
                                const canSiang =
                                    auth.user.kerjasama_id == 1 &&
                                    hadir.user_id == auth.user.id &&
                                    hadir.tanggal_absen == tanggalHariIni &&
                                    formattedTime >= "13:00:00" &&
                                    formattedTime <= "14:00:00" &&
                                    hadir.absensi_type_pulang == null;

                                const jamEnd = DateTime.fromFormat(
                                    hadir.shift.jam_end,
                                    "HH:mm"
                                ).toFormat("HH:mm:ss");

                                const timeParts = jamEnd.split(":");
                                const hours2 = parseInt(timeParts[0], 10);
                                const minutes2 = parseInt(timeParts[1], 10);

                                const jadijam = hours2 - hours - 1;
                                const jadimenit = minutes2 - minutes;
                                const jadidetik = 60 - seconds;

                                const jadi = Math.round(
                                    jadijam * 60 + jadimenit
                                );

                                const canPulang =
                                    hadir.user_id == auth.user.id &&
                                    hadir.tanggal_absen == tanggalHariIni &&
                                    jadi <= 90 &&
                                    hadir.absensi_type_pulang == null;

                                return (
                                    <div key={i}>
                                        {canSiang && (
                                            <>
                                                <button
                                                    onClick={modalSiangBtn}
                                                    className="bg-[#E55604] flex justify-center shadow-md hover:bg-[#af4a0f] text-white hover:shadow-none px-3 py-1 text-xl rounded-md transition-all ease-in-out duration-200 mt-5 mr-0 sm:mr-2 uppercase items-center"
                                                >
                                                    <i className="ri-sun-foggy-line"></i>
                                                    <span className="font-bold">
                                                        Absen siang
                                                    </span>
                                                </button>
                                                {modalSiang && (
                                                    <ModalSiang
                                                        routes="data.update.siang"
                                                        absen={hadir}
                                                        close={closeModal}
                                                        modalsiang={modalSiang}
                                                    />
                                                )}
                                            </>
                                        )}
                                        {canPulang && (
                                            <>
                                                <button
                                                    onClick={modalPulangBtn}
                                                    className="bg-yellow-600 flex justify-center shadow-md hover:bg-yellow-700 text-white hover:shadow-none px-3 py-1 text-xl rounded-md transition all ease-out duration-100 mt-5 mr-0 sm:mr-2 uppercase items-center"
                                                >
                                                    <i className="ri-run-line font-sans text-3xl"></i>
                                                    <span className="font-bold">
                                                        Pulang
                                                    </span>
                                                </button>
                                                {modalPulang && (
                                                    <ModalPulang
                                                        routes={"data.update"}
                                                        pulang={hadir}
                                                        close={closeModal}
                                                        modalpulang={
                                                            modalPulang
                                                        }
                                                        lama={[
                                                            jadijam,
                                                            jadimenit,
                                                            jadidetik,
                                                            jadi,
                                                        ]}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </MainDiv>
        </AuthenticatedLayout>
    );
}
