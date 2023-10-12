import axios from "axios";
import { useEffect, useState } from "react";
import NavLink from "./NavLink";

export default function Navbar({ auth }) {
    const [imgExist, setImageExist] = useState(false);

    const admin = auth.role_id == 2;

    const submit = (e) => {
        e.preventDefault();
        post(route("logout"));
    };

    useEffect(() => {
        const checkImage = async () => {
            try {
                const res = await axios.get(`/storage/images/${auth.image}`);
                setImageExist(res.data);
            } catch (error) {
                ("error bg");
            }
        };
        checkImage();
    }, []);
    return (
        <>
            <nav className="mx-5 mb-5 pt-5">
                <div className="flex pt-1 pb-2 pl-2 w-full h-auto bg-[#0EF6CC]/70 shadow-md rounded-md justify-between">
                    <a href={route("profile.index")}>
                        <div className="flex items-center justify-between gap-2">
                            <div className="p-2 mx-2 my-2 overflow-hidden flex items-center bg-[#273c3d]/40 rounded-full shadow-md shadow-slate-600 hover:shadow-none transition-all .2s w-10 h-10 ease-in-out">
                                {auth &&
                                    (imgExist ? (
                                        <img
                                            className="rounded-full"
                                            src={`/storage/images/${auth.image}`}
                                            alt="profile-logo.png"
                                        />
                                    ) : (
                                        <img
                                            className="rounded-full"
                                            src="../logo/person.png"
                                            alt="profile-logo.png"
                                        />
                                    ))}
                            </div>
                            <div className="flex justify-between flex-col gap-1">
                                <p className="font-semibold text-sm uppercase line-clamp-1 break-words">
                                    {auth.nama_lengkap}
                                </p>
                            </div>
                        </div>
                    </a>
                    <div className="md:flex gap-3 mr-7 hidden overflow-hidden">
                        {!admin && (
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Dashboard
                            </NavLink>
                        )}

                        {!admin && (
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Admin Tool
                            </NavLink>
                        )}
                        {auth ? (
                            <form onSubmit={submit}>
                                <button
                                    type="submit"
                                    className="inline-flex overflow-hidden items-center w-auto mt-4 h-3/6 px-2 font-bold rounded-md text-slate-200 bg-red-500 hover:bg-red-700 hover:text-white hover:shadow-none shadow-md transition all ease-in-out .2s"
                                >
                                    Logout
                                </button>
                            </form>
                        ) : (
                            <NavLink
                                className="mr-5 px-5 py-1"
                                href={route("login")}
                                active={true}
                            >
                                Login
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
