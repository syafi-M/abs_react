import { Link } from "@inertiajs/react";

export default function Guest({ children, auth }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 mx-3">
            <div>
                <Link href="/">
                    <div className="flex flex-col justify-center items-center gap-2 sm:p-4 sm:bg-gradient-to-tr sm:from-gray-400/20 sm:to-gray-500/20  sm:rounded-md sm:shadow-inner sm:shadow-gray-400/30">
                        <img
                            src="../logo/sac.png"
                            className="w-20  -right-2 bg-white p-3 rounded-full shadow"
                            alt="..."
                        />
                        <p className="text-slate-800 font-black text-lg p-2 rounded-md shadow sm:shadow-lg sm:pl-4 text-center sm:pr-2  bg-white">
                            PT. Surya Amanah Cendikia
                        </p>
                    </div>
                </Link>
            </div>

            <div className="w-full drop-shadow-2xl sm:max-w-md mt-6 px-6 py-4 bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg overflow-hidden rounded-lg h-fit mx-4 sm:mx-0 ">
                <div className="mt-4">
                    {auth ? (
                        <div>
                            <p className="text-center font-black text-xl text-slate-800">
                                Anda Sudah Login
                            </p>
                            <div>
                                <div className="flex items-center justify-center mt-4">
                                    <a
                                        href="/dashboard"
                                        className="bg-teal-400 hover:bg-teal-500 rounded-lg py-2 px-10 shadow"
                                    >
                                        Klik Disini
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="text-center sm:hidden font-black text-xl text-slate-800">
                                Silahkan Login
                                <br />
                                Terlebih Dahulu
                            </p>
                            <div>{children}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
