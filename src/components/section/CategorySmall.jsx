import Laptop from '@/assets/icons/Laptop';
import Components from '@/assets/icons/Components';
import Monitor from '@/assets/icons/Monitor';
import Casing from '@/assets/icons/Casing';
import Accessories from '@/assets/icons/Accessories';
import Mouse from '@/assets/icons/Mouse';
import Keyboard from '@/assets/icons/Keyboard';
import Headphone from '@/assets/icons/Headphone';
import Speaker from '@/assets/icons/Speaker';
import Gaming from '@/assets/icons/Gaming';
import CCTV from '@/assets/icons/CCTV';
import Link from 'next/link';

export default function CategorySmall() {

    const categories = [
        { to: "/category/laptop", label: "Laptop", icon: <Laptop /> },
        { to: "/category/components", label: "Components", icon: <Components /> },
        { to: "/category/monitor", label: "Monitor", icon: <Monitor /> },
        { to: "/category/casing", label: "Casing", icon: <Casing /> },
        { to: "/category/accessories", label: "Accessories", icon: <Accessories /> },
        { to: "/category/mouse", label: "Mouse", icon: <Mouse /> },
        { to: "/category/keyboard", label: "Keyboard", icon: <Keyboard /> },
        { to: "/category/headphone", label: "Headphone", icon: <Headphone /> },
        { to: "/category/speaker", label: "Speaker", icon: <Speaker /> },
        { to: "/category/gaming", label: "Gaming", icon: <Gaming /> },
        { to: "/category/cctv", label: "CCTV", icon: <CCTV /> },
    ];

    return (
        <>
            <div className="flex justify-around items-center gap-5 overflow-x-auto">
                {categories.map((item, index) => (
                    <Link
                        href={item.to}
                        key={index}
                        className="px-[6px] mt-5 md:mt-12"
                    >
                        <div className="flex flex-col items-center gap-2.5 group">
                            <div className="w-[76px] md:w-full h-[76px] md:h-full flex justify-center items-center bg-[#EAF7FC] group-hover:bg-[#2CACE2] group-hover:-translate-y-3 duration-100 ease-linear border-4 border-[#EAF7FC] group-hover:border-[#BEE5F6] rounded-full">
                                {item.icon}
                            </div>
                            <p className="text-[14px] md:text-lg text-center text-[#185f7c] group-hover:text-[#2CACE2] group-hover:-translate-y-3 duration-100 ease-linear">
                                {item.label}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}