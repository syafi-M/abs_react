import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function ModalPulang({
    pulang,
    routes,
    close,
    className,
    modalpulang,
    lama,
}) {
    const [text, setText] = useState();
    const [subtext, setsubText] = useState();
    const [lamashift, setlamashift] = useState();
    const [isOpen, setIsOpen] = useState(modalpulang);

    const { put } = useForm();
    const submit = (e) => {
        e.preventDefault();
        put(route(routes, pulang.id));
    };
    const jam = lama[0] - 1;
    const menit = lama[1];
    const detik = lama[2];
    const total = lama[3];

    if (total <= 0) {
        setText("Sudah Waktunya Pulang");
    } else {
        setText("Shift Anda Masih");
        setlamashift(`${jam} jam ${menit} menit ${detik} detik`);
        setsubText("Yakin ingin pulang sekarang?");
    }
    return (
        <>
            <div
                className={`fixed inset-0 modalSiang flex items-center ${
                    isOpen
                        ? "opacity-100 visible transition-opacity duration-300"
                        : "opacity-0 invisible transition-opacity duration-300"
                } bg-slate-500/10 backdrop-blur-sm   ease-in-out ${className}`}
            >
                <div
                    className={`bg-slate-200 w-fit p-5 mx-2 rounded-md shadow ${
                        isOpen
                            ? "opacity-100 visible transition-opacity duration-300"
                            : "opacity-0 invisible transition-opacity duration-300"
                    }`}
                >
                    <div className="flex justify-end mb-3">
                        <button
                            onClick={close}
                            className="btn btn-error scale-90 close"
                        >
                            &times;
                        </button>
                    </div>
                    <form
                        onSubmit={submit}
                        className="flex justify-center items-center  "
                    >
                        <div className="flex justify-center flex-col ">
                            <div className="flex flex-col gap-2">
                                <p className="text-center text-lg font-semibold">
                                    {text}
                                </p>
                                {total >= 0 && (
                                    <>
                                        <p className="text-center text-lg font-semibold">
                                            {lamashift}
                                        </p>
                                        <p className="text-center text-lg font-semibold">
                                            {subtext}
                                        </p>
                                    </>
                                )}
                            </div>
                            <div className="flex justify-center items-center">
                                <button
                                    type="submit"
                                    className="bg-yellow-600 flex justify-center shadow-md hover:bg-yellow-700 text-white hover:shadow-none px-3 py-1 text-xl rounded-md transition all ease-out duration-100 mt-5 mr-0 sm:mr-2 uppercase items-center"
                                >
                                    <i className="ri-run-line font-sans text-3xl"></i>
                                    <span className="font-bold">
                                        Pulang Sekarang
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
