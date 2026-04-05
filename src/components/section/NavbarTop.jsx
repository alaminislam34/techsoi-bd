"use client";

import CommonWrapper from "@/components/layout/CommonWrapper";
import { CiShop } from "react-icons/ci";

import {
  MdOutlinePhoneInTalk,
  MdOutlineMailOutline,
  MdOutlineLocationOn,
} from "react-icons/md";

export default function NavbarTop() {
  return (
    <>
      <div className="border-b hidden lg:block border-[#d1eef8] bg-[#eaf7fc] py-2 text-[12px] md:text-[13px] text-slate-700 font-medium">
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

       
      </div>
    </>
  );
}
