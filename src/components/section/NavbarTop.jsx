"use client";

import CommonWrapper from "@/components/layout/CommonWrapper";
import { CiShop } from "react-icons/ci";

import {
  MdWhatsapp,
  MdOutlinePhoneInTalk,
  MdOutlineMailOutline,
  MdOutlineLocationOn,
} from "react-icons/md";

export default function NavbarTop() {
  return (
    <>
      <div className="border-b border-[#d1eef8] bg-[#eaf7fc] py-2 text-[12px] md:text-[13px] text-slate-700 font-medium">
        <CommonWrapper>
          <div className="flex flex-wrap items-center justify-center lg:justify-center gap-x-5 gap-y-2">
            {/* Phone */}
            <div className="flex items-center gap-1.5">
              <MdOutlinePhoneInTalk className="text-[#00aeef] text-lg" />
              <span>Phone: +880 1672-224906</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-1.5">
              <MdOutlineMailOutline className="text-[#00aeef] text-lg" />
              <span>Mail: technologiestechsoi@gmail.com</span>
            </div>
            {/* shop */}
            <div className="flex items-center gap-1.5">
              <CiShop className="text-[#00aeef] text-lg" />
              <span>Shop: 104 & 105</span>
            </div>

            {/* Location / Address */}
            <div className="flex items-center gap-1.5">
              <MdOutlineLocationOn className="text-[#00aeef] text-lg" />
              <span>Location: MultiPlan Computer City Center, Dhaka</span>
            </div>
          </div>
        </CommonWrapper>

        <div className="fixed z-50 bottom-5 lg:bottom-8 lg:right-8 right-4">
          <a
            href={+8801672224906}
            target="_blank"
            rel="noopener noreferrer"
            className="flex p-3 text-2xl lg:text-3xl rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform duration-300"
          >
            <MdWhatsapp />
          </a>
        </div>
      </div>
    </>
  );
}
