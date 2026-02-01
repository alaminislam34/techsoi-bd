"use client";

import CommonWrapper from "@/components/layout/CommonWrapper";
import { useEffect, useState } from "react";
import {
  MdWhatsapp,
  MdOutlinePhoneInTalk,
  MdOutlineMailOutline,
  MdOutlineLocationOn,
} from "react-icons/md";
import axios from "axios";

export default function NavbarTop() {
  const [websiteInfo, setWebsiteInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get(
          `https://api.techsoibd.com/api/website-info`,
        );
        setWebsiteInfo(res.data.data);
      } catch (error) {
        console.error("Error fetching website info:", error);
      }
    };
    fetchInfo();
  }, []);

  if (!websiteInfo) return null;
  console.log(websiteInfo)

  return (
    <>
      <div className="border-b border-[#d1eef8] bg-[#eaf7fc] py-2 text-[12px] md:text-[13px] text-slate-700 font-medium">
        <CommonWrapper>
          <div className="flex flex-wrap items-center justify-center lg:justify-center gap-x-5 gap-y-2">
            {/* Phone */}
            <div className="flex items-center gap-1.5">
              <MdOutlinePhoneInTalk className="text-[#00aeef] text-lg" />
              <span>Phone: {websiteInfo.phone}</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-1.5">
              <MdOutlineMailOutline className="text-[#00aeef] text-lg" />
              <span>Mail: {websiteInfo.email}</span>
            </div>

            {/* Location / Address */}
            <div className="flex items-center gap-1.5">
              <MdOutlineLocationOn className="text-[#00aeef] text-lg" />
              <span>Location: {websiteInfo.address}</span>
            </div>
          </div>
        </CommonWrapper>

        {/* Floating WhatsApp Button */}
        {websiteInfo.whatsapp_link && (
          <div className="fixed z-50 bottom-5 lg:bottom-8 lg:right-8 right-4">
            <a
              href={websiteInfo.whatsapp_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex p-3 text-2xl lg:text-3xl rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform duration-300"
            >
              <MdWhatsapp />
            </a>
          </div>
        )}
      </div>
    </>
  );
}
