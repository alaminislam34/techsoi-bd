'use client';
import CommonWrapper from '@/components/layout/CommonWrapper';
import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function Manubar() {

    const parthName = usePathname();

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/products", label: "Products" },
        { to: "/about", label: "About" },
        { to: "/blog", label: "Blog" },
        { to: "/faq", label: "FAQ" },
    ];

    return (
        <>
            <div className="bg-[#2cace2] hidden md:block">
                <CommonWrapper>
                    <div className="flex justify-between items-center py-4">
                        <div className="flex justify-start items-center relative gap-10">
                            {navLinks.map((link) => (
                                <Link
                                    href={link.to}
                                    key={link.to}
                                    className={`text-lg text-white ${parthName == link.to ? (`font-medium`) : (`hover:font-medium duration-100 ease-linear`)}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <Link
                            href={'#'} 
                            className="flex justify-center items-center relative gap-2.5 px-6 py-2.5 rounded-lg bg-white"
                        >
                            <p className="text-lg text-[#505050]">
                                Contact Us
                            </p>
                        </Link>
                    </div>
                </CommonWrapper>
            </div>
        </>
    );
}
