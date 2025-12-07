'use client';
import CommonWrapper from '@/components/layout/CommonWrapper';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useState } from 'react';

export default function NavbarCategory() {

    const parthName = usePathname();

    const [activeFilter, setActiveFilter] = useState(null);

    const handleMouseEnter = (link) => {
        setActiveFilter(link);
        console.log(link, "hovered");
    };

    const handleMouseLeave = () => {
        setActiveFilter(null);
    };

    const categories = [
        {
            to: "/category/laptop",
            label: "Laptop",
            sub_category: [
                {
                    to: '',
                    label: 'Lenovo',
                },
                {
                    to: '',
                    label: 'HP',
                },
            ]
        },
        { to: "/category/components", label: "Components" },
        { to: "/category/monitor", label: "Monitor" },
        { to: "/category/casing", label: "Casing" },
        { to: "/category/accessories", label: "Accessories" },
        { to: "/category/mouse", label: "Mouse" },
        { to: "/category/keyboard", label: "Keyboard" },
        { to: "/category/headphone", label: "Headphone" },
        { to: "/category/speaker", label: "Speaker" },
        { to: "/category/gaming", label: "Gaming" },
        { to: "/category/cctv", label: "CCTV" },
    ];

    return (
        <>
            <div className="bg-[#eaf7fc] relative">
                <CommonWrapper>
                    <div className="flex items-center gap-4 md:gap-8 py-3 md:py-5 overflow-x-auto">
                        {categories.map((item, index) => (
                            <div className="flex items-center gap-4 md:gap-8" key={index}>
                                <Link
                                    href={item.to}
                                    onMouseEnter={() => handleMouseEnter(index + 1)}
                                    // onMouseLeave={handleMouseLeave}
                                    className={`text-4 md:text-lg ${parthName == item.to ? (`font-semibold text-[#2cace2]`) : (`font-medium text-[#303030] hover:text-[#2cace2]`)}`}
                                >
                                    {item.label}
                                </Link>
                                <svg
                                    width={1}
                                    height={18}
                                    viewBox="0 0 1 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`flex-grow-0 flex-shrink-0 ${categories.at(-1).to == item.to ? 'hidden' : ''}`}
                                    preserveAspectRatio="none"
                                >
                                    <line x1="0.5" y1="2.18557e-8" x2="0.499999" y2={18} stroke="#BEE5F6" />
                                </svg>
                                {item.sub_category ? (activeFilter == index + 1 ? (
                                    <div
                                        className="absolute top-full left-0 right-0"
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="bg-[#fff]/64 backdrop-blur-[5px]">
                                            <div className='max-w-[1520px] md:w-[80%] w-[calc(100%-2rem)] mx-auto'>
                                                <div className="flex flex-col gap-2 py-10">
                                                    {item.sub_category.map((subItem, index2) => (
                                                        <Link
                                                            href={subItem.to}
                                                            className="group flex items-center gap-2"
                                                            key={index2}
                                                        >
                                                            <span className='hidden group-hover:block'>
                                                                <svg
                                                                    width={6}
                                                                    height={7}
                                                                    viewBox="0 0 6 7"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="flex-grow-0 flex-shrink-0"
                                                                    preserveAspectRatio="xMidYMid meet"
                                                                >
                                                                    <path
                                                                        d="M5.67547 2.93307C5.98908 3.11413 5.98908 3.56679 5.67547 3.74785L0.705616 6.61719C0.392009 6.79825 -1.58289e-08 6.57193 0 6.2098L2.50846e-07 0.471113C2.66675e-07 0.10899 0.39201 -0.117336 0.705617 0.063725L5.67547 2.93307Z"
                                                                        fill="#2CACE2"
                                                                    />
                                                                </svg>
                                                            </span>
                                                            {subItem.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : ('')) : ('')}
                            </div>
                        ))}
                    </div>
                </CommonWrapper>
            </div>
        </>
    );
}
