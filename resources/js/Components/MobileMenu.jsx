import { usePage } from "@inertiajs/react";
import {
    RiAccountCircleLine,
    RiEditFill,
    RiHome2Line,
    RiShutDownLine,
} from "react-icons/ri";
export default function MobileMenu() {
    const auth = usePage().props;
    // console.log(auth);
    const logout = (e) => {
        e.preventDefault();
        post(route("logout"));
    };
    return (
        <>
            <ul className="md:hidden menu menu-horizontal mx-10 flex flex-col items-center bg-base-200 mb-1 rounded-box">
                <div className="flex text-[10px]">
                    <li className="overflow-hidden rounded-xl">
                        <a
                            href={route("profile.index")}
                            className="flex flex-col gap-0 "
                        >
                            <RiAccountCircleLine className="text-xl text-blue-500" />
                            <span className="font-semibold text-slate-700 ">
                                Profile
                            </span>
                        </a>
                    </li>
                    <li className="overflow-hidden rounded-xl">
                        <a
                            href={route("dashboard.index")}
                            className="flex flex-col gap-0 "
                        >
                            <RiHome2Line className="text-xl " />
                            <span className="font-semibold text-slate-700">
                                Home
                            </span>
                        </a>
                    </li>
                    <li className="overflow-hidden rounded-xl">
                        <form onSubmit={logout}>
                            <button
                                type="submit"
                                className="flex flex-col items-center gap-0 "
                            >
                                <RiShutDownLine className="text-xl text-red-500" />
                                <span className="font-semibold text-slate-700">
                                    Log out
                                </span>
                            </button>
                        </form>
                    </li>
                    {auth &&
                        auth.auth.user.devisi_id != 8 &&
                        auth.auth.user.devisi_id != 9 && (
                            <li className="overflow-hidden rounded-xl">
                                <a href="#" className="flex flex-col gap-0 ">
                                    <RiEditFill className="text-xl text-green-500" />
                                    <span className="font-semibold text-slate-700">
                                        Kehadiran
                                    </span>
                                </a>
                            </li>
                        )}
                </div>
            </ul>
        </>
    );
}
