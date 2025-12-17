'use client';

import CommonWrapper from '@/components/layout/CommonWrapper';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ContactModal from "@/components/ui/ContactModal";

export default function Manubar() {
    const parthName = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/products", label: "Products" },
        { to: "/about", label: "About" },
        { to: "/blog", label: "Blog" },
        { to: "/faq", label: "FAQ" },
    ];

    return (
        <>
            {/* ===== DESKTOP MENU ===== */}
            <div className="bg-[#2cace2] hidden md:block">
                <CommonWrapper>
                    <div className="flex justify-between items-center py-4">
                        <div className="flex gap-10">
                            {navLinks.map((link) => (
                                <Link
                                    href={link.to}
                                    key={link.to}
                                    className={`text-lg text-white ${
                                        parthName === link.to
                                            ? "font-medium"
                                            : "hover:font-medium"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="px-6 py-2.5 cursor-pointer rounded-lg bg-white text-[#505050]"
                        >
                            Contact Us
                        </button>
                    </div>
                </CommonWrapper>
            </div>

            {/* ===== MOBILE TOP BAR ===== */}
            <div className="bg-[#2cace2] md:hidden">
                <CommonWrapper>
                    <div className="flex cursor-pointer justify-between items-center py-4">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="text-white"
                        >
                            <Menu size={28} />
                        </button>

                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="px-4 cursor-pointer py-2 rounded-lg bg-white text-[#505050]"
                        >
                            Contact Us
                        </button>
                    </div>
                </CommonWrapper>
            </div>

            {/* ===== MOBILE SLIDE MENU ===== */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-[#2cace2] z-50 transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center px-5 py-4 border-b border-white/20">
                    <p className="text-lg text-white">Menu</p>
                    <button onClick={() => setIsOpen(false)}>
                        <X className="text-white" />
                    </button>
                </div>

                <div className="flex flex-col gap-4 px-5 py-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            href={link.to}
                            onClick={() => setIsOpen(false)}
                            className="text-white"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* ===== OVERLAY ===== */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40"
                />
            )}

            {/* ===== CONTACT MODAL ===== */}
            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
            />
        </>
    );
}
