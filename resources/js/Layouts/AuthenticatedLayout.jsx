import MobileMenu from "@/Components/MobileMenu";
import Navbar from "@/Components/Navbar";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Authenticated({ header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const user = usePage().props.auth.user;

    // console.log(tes);

    return (
        <>
            <div className="font-sans antialiased bg-[#1B2223] ">
                <div className="min-h-screen">
                    <Navbar auth={user} />

                    {header && (
                        <header className="bg-white shadow">
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}
                    {user.role_id == 2 ? (
                        <main>{children}</main>
                    ) : (
                        <main>{children}</main>
                    )}
                </div>
            </div>
            <div className="flex justify-center">
                <div className="fixed bottom-0 z-[999]">
                    <MobileMenu />
                </div>
            </div>
        </>
    );
}
