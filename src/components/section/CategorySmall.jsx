import Laptop from "@/assets/icons/Laptop";
import Components from "@/assets/icons/Components";
import Monitor from "@/assets/icons/Monitor";
import Casing from "@/assets/icons/Casing";
import Accessories from "@/assets/icons/Accessories";
import Mouse from "@/assets/icons/Mouse";
import Keyboard from "@/assets/icons/Keyboard";
import Headphone from "@/assets/icons/Headphone";
import Speaker from "@/assets/icons/Speaker";
import Gaming from "@/assets/icons/Gaming";
import CCTV from "@/assets/icons/CCTV";
import Link from "next/link";

export default function CategorySmall() {
  const categories = [
    { to: "/products?category=1", label: "Laptop", icon: <Laptop /> },
    {
      to: "/products?category=2",
      label: "Components",
      icon: <Components />,
    },
    { to: "/products?category=3", label: "Monitor", icon: <Monitor /> },
    { to: "/products?category=4", label: "Casing", icon: <Casing /> },
    {
      to: "/products?category=5",
      label: "Accessories",
      icon: <Accessories />,
    },
    { to: "/products?category=6", label: "Mouse", icon: <Mouse /> },
    {
      to: "/products?category=7",
      label: "Keyboard",
      icon: <Keyboard />,
    },
    {
      to: "/products?category=8",
      label: "Headphone",
      icon: <Headphone />,
    },
    { to: "/products?category=9", label: "Speaker", icon: <Speaker /> },
    { to: "/products?category=10", label: "Gaming", icon: <Gaming /> },
    { to: "/products?category=11", label: "CCTV", icon: <CCTV /> },
  ];

  return (
    <>
      <div className="flex justify-around items-center gap-5 overflow-x-auto  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((item, index) => (
          <Link href={item.to} key={index} className="px-1.5 mt-5 md:mt-12">
            <div className="flex flex-col items-center gap-2.5 group">
              <div className="w-19 md:w-full h-19 md:h-full flex justify-center items-center bg-[#EAF7FC] group-hover:bg-[#2CACE2] group-hover:-translate-y-3 duration-100 ease-linear border-4 border-[#EAF7FC] group-hover:border-[#BEE5F6] rounded-full">
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
