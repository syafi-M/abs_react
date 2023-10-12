import {
    RiAccountCircleLine,
    RiEditFill,
    RiHome2Line,
    RiShutDownLine,
} from "react-icons/ri";
export default function MobileMenu({ auth }) {
    const logout = (e) => {
        e.preventDefault();
        post(route("logout"));
    };
    return (
        <>
            <ul className="md:hidden menu menu-horizontal px-3 flex flex-col items-center bg-base-200 mb-1 rounded-box">
                <div className="flex text-[10px]">
                    <li className="overflow-hidden rounded-xl">
                        <a
                            href={route("profile.index")}
                            className="flex flex-col gap-0 mt-2 mb-2"
                        >
                            <RiAccountCircleLine className="text-xl text-blue-500" />
                            <span className="font-semibold text-slate-700 ">
                                Profile
                            </span>
                        </a>
                    </li>
                    <li className="overflow-hidden rounded-xl">
                        <a
                            href={route("dashboard")}
                            className="flex flex-col gap-0 mt-2 mb-2"
                        >
                            <RiHome2Line className="text-xl " />
                            <span className="font-semibold text-slate-700">
                                Home
                            </span>
                        </a>
                    </li>
                    <form onSubmit={logout}>
                        <li className="overflow-hidden rounded-xl">
                            <button
                                type="submit"
                                className="flex flex-col gap-0 my-2"
                            >
                                <RiShutDownLine className="text-xl text-red-500" />
                                <span className="font-semibold text-slate-700">
                                    Log out
                                </span>
                            </button>
                        </li>
                    </form>
                    {auth &&
                        auth.divisi.jabatan.code_jabatan != "MITRA" &&
                        auth.divisi.jabatan.code_jabatan != "LEADER" && (
                            <li className="overflow-hidden rounded-xl">
                                <a
                                    href="#"
                                    className="flex flex-col gap-0 my-2"
                                >
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
