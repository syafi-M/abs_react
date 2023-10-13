import MainDiv from "@/Components/MainDiv";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { RiEdit2Line } from "react-icons/ri";

export default function Index() {
    const url = usePage().props.ziggy.url;
    const { auth } = usePage().props;
    console.log(url, auth);
    return (
        <>
            <Authenticated>
                <MainDiv>
                    <div>
                        <p className="text-center text-2xl font-bold pt-5 uppercase grid justify-center items-center">
                            Profile
                        </p>
                        <div className="bg-slate-100 mx-5 my-5 rounded-md shadow">
                            <div>
                                <span className="flex justify-end mt-5 mx-5">
                                    <a
                                        href={route(
                                            "profile.edit",
                                            auth.user.id
                                        )}
                                        className="bg-amber-400 py-1.5 px-2 text-xs rounded-full"
                                    >
                                        <span className="flex">
                                            <p className="font-semibold">
                                                Edit
                                            </p>
                                            <RiEdit2Line />
                                        </span>
                                    </a>
                                </span>
                                <div className="flex items-center py-10 justify-center">
                                    <div className="p-5 mx-2 my-2 overflow-hidden flex items-center justify-center bg-slate-200 rounded-full shadow-md  hover:shadow-none transition-all .2s w-24 h-24 ease-in-out">
                                        {auth.image == "no-image.jpg" ? (
                                            <img
                                                className="w-20 rounded-full "
                                                src={"/logo/person.png"}
                                                alt="profile-logo.png"
                                                srcSet={"/logo/person.png"}
                                            />
                                        ) : url + "/images/" + auth.image ==
                                          undefined ? (
                                            <img
                                                className=" rounded-full"
                                                src={
                                                    url +
                                                    "/images/" +
                                                    auth.image
                                                }
                                                alt="profile-logo.png"
                                                srcSet={
                                                    url +
                                                    "/images/" +
                                                    auth.image
                                                }
                                            />
                                        ) : (
                                            <img
                                                className="w-20 rounded-full "
                                                src={"/logo/person.png"}
                                                alt="profile-logo.png"
                                                srcSet={"/logo/person.png"}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="bg-slate-300 mx-4 my-4 rounded-md p-2 py-5 font-semibold text-sm">
                                    <div className="text-slate-800 space-y-2">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>UserName</td>
                                                    <td>:{auth.user.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Nama Lengkap</td>
                                                    <td className="break-words whitespace-pre-wrap">
                                                        :
                                                        {auth.user.nama_lengkap}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td class="break-words whitespace-pre-line">
                                                        :{auth.user.email}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Jabatan</td>
                                                    {auth.user.devisi_id ==
                                                    null ? (
                                                        <td>:Kosong</td>
                                                    ) : (
                                                        <td>
                                                            :
                                                            {
                                                                auth.user
                                                                    .devisi_id
                                                            }
                                                        </td>
                                                    )}
                                                </tr>
                                                <tr>
                                                    <td>Bermitra</td>
                                                    {auth.user.kerjasama_id ==
                                                    null ? (
                                                        <td>:Kosong</td>
                                                    ) : (
                                                        <td>
                                                            :
                                                            {
                                                                auth.user
                                                                    .kerjasama_id
                                                            }
                                                        </td>
                                                    )}
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center sm:justify-end mt-2 mb-5">
                            <a
                                href={route("dashboard.index")}
                                className="btn btn-error mx-2 sm:mx-10"
                            >
                                Kembali
                            </a>
                        </div>
                    </div>
                </MainDiv>
            </Authenticated>
        </>
    );
}
