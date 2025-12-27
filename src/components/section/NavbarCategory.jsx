'use client';
import CommonWrapper from '@/components/layout/CommonWrapper';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useState } from 'react';

export default function NavbarCategory() {

    const parthName = usePathname();
    const [activeFilter, setActiveFilter] = useState(null);

    const categories = [
        {
            to: "/category/laptop",
            label: "Laptop",
            sub_category: ["Lenovo", "HP", "Dell", "Asus", "Acer"]
        },
        {
            to: "/category/components",
            label: "PC Components",
            sub_category: ["Processor", "Motherboard", "RAM", "SSD", "Graphics Card"]
        },
        {
            to: "/category/monitor",
            label: "Monitor",
            sub_category: ["Gaming Monitor", "4K Monitor", "Curved Monitor"]
        },
        {
            to: "/category/casing",
            label: "Casing",
            sub_category: ["ATX Case", "Micro ATX", "Mini ITX"]
        },
        {
            to: "/category/accessories",
            label: "Accessories",
            sub_category: ["Webcam", "USB Hub", "Cooling Pad"]
        },
        {
            to: "/category/mouse",
            label: "Mouse",
            sub_category: ["Gaming Mouse", "Wireless Mouse"]
        },
        {
            to: "/category/keyboard",
            label: "Keyboard",
            sub_category: ["Mechanical", "Wireless", "RGB Keyboard"]
        },
        {
            to: "/category/headphone",
            label: "Headphone",
            sub_category: ["Gaming Headphone", "Bluetooth Headphone"]
        },
        {
            to: "/category/speaker",
            label: "Speaker",
            sub_category: ["Bluetooth Speaker", "Soundbar"]
        },
        {
            to: "/category/gaming",
            label: "Gaming",
            sub_category: ["Gaming Chair", "Gaming Desk"]
        },
        {
            to: "/category/cctv",
            label: "CCTV",
            sub_category: ["IP Camera", "DVR", "NVR"]
        },
    ];

    return (
        <div
            className="bg-[#eaf7fc] relative"
            onMouseLeave={() => setActiveFilter(null)}
        >
            <CommonWrapper>
                <div className="flex items-center gap-4 md:gap-8 py-3 md:py-5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            className="relative flex items-center gap-4 md:gap-8"
                            onMouseEnter={() => setActiveFilter(index)}
                        >
                            <Link
                                href={item.to}
                                className={`md:text-lg font-medium whitespace-nowrap ${
                                    parthName === item.to
                                        ? "text-[#2cace2] font-semibold"
                                        : "text-[#303030] hover:text-[#2cace2]"
                                }`}
                            >
                                {item.label}
                            </Link>

                            {index !== categories.length - 1 && (
                                <span className="h-4 w-px bg-[#BEE5F6]" />
                            )}
                        </div>
                    ))}
                </div>
            </CommonWrapper>

            {/* ===== BOTTOM SUB MENU (VERTICAL) ===== */}
            {activeFilter !== null && (
                <div className="absolute top-full left-0 right-0 z-40">
                 <CommonWrapper>
                     <div
                        className="
                            backdrop-blur-sm
                            bg-white/40
                            border
                            border-[#72C7EC]
                            rounded-b-xl
                        "
                    >
                        <CommonWrapper>
                            <div className="py-6 flex flex-col gap-4">
                                {categories[activeFilter].sub_category.map((sub, idx) => (
                                    <Link
                                        key={idx}
                                        href="#"
                                        className="text-sm text-[#303030] hover:text-[#2cace2] hover:underline"
                                    >
                                        {sub}
                                    </Link>
                                ))}
                            </div>
                        </CommonWrapper>
                    </div>
                 </CommonWrapper>
                </div>
            )}
        </div>
    );
}
