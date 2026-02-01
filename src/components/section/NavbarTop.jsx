"use client";

import CommonWrapper from "@/components/layout/CommonWrapper";
import { useEffect } from "react";
import { useState } from "react";
import { MdWhatsapp } from "react-icons/md";
import { apiClient } from "../../api/apiClient";
import { API_ENDPOINTS } from "../../api/ApiEndPoint";

export default function NavbarTop() {
  const [websiteInfo, setWebsiteInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const res = apiClient.get(API_ENDPOINTS.WEBSITE_INFO_GET);
      console.log(res);
    };
    fetchInfo();
  }, []);
  return (
    <>
      <div className="border-b border-[#eaf7fc]">
        <CommonWrapper>
          <div className="flex justify-between items-center relative py-2 bg-white">
            <div className="flex items-center relative gap-2">
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 relative"
                preserveAspectRatio="none"
              >
                <path
                  d="M2.51809 7.96157C1.88607 6.85954 1.58091 5.95965 1.3969 5.04747C1.12476 3.69838 1.74755 2.38054 2.77926 1.53965C3.21531 1.18425 3.71516 1.30568 3.97301 1.76827L4.55513 2.81261C5.01653 3.64038 5.24724 4.05426 5.20148 4.49306C5.15572 4.93186 4.84459 5.28924 4.22232 6.004L2.51809 7.96157ZM2.51809 7.96157C3.79735 10.1922 5.8049 12.2008 8.0381 13.4816M8.0381 13.4816C9.14014 14.1136 10.04 14.4188 10.9522 14.6028C12.3013 14.8749 13.6191 14.2521 14.46 13.2204C14.8154 12.7844 14.694 12.2845 14.2314 12.0267L13.1871 11.4445C12.3593 10.9831 11.9454 10.7524 11.5066 10.7982C11.0678 10.844 10.7104 11.1551 9.99567 11.7774L8.0381 13.4816Z"
                  stroke="#2CACE2"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm text-[#505050]">+888 8888 888</p>
            </div>
            <p className="text-sm text-[#505050] hidden md:block">
              <span className="text-sm text-[#505050]">
                Get Upto 25% cashback
              </span>
            </p>
            <div className="flex justify-end items-center relative gap-2">
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 relative"
                preserveAspectRatio="none"
              >
                <circle cx="7.99967" cy={8} r="6.66667" stroke="#2CACE2" />
                <path
                  d="M5 11.3333C6.55447 9.70522 9.42882 9.62856 11 11.3333M9.6634 6.33333C9.6634 7.25381 8.91614 8 7.99435 8C7.07257 8 6.32531 7.25381 6.32531 6.33333C6.32531 5.41286 7.07257 4.66667 7.99435 4.66667C8.91614 4.66667 9.6634 5.41286 9.6634 6.33333Z"
                  stroke="#2CACE2"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-sm text-[#505050]">Mr. Jhon Don</p>
            </div>
          </div>
          <p className="flex justify-center items-center pb-2 md:hidden">
            <span className="text-sm text-[#505050]">
              Get Upto 25% cashback
            </span>
          </p>
        </CommonWrapper>
        <div className="fixed z-50 bottom-5 lg:bottom-8 lg:right-8 right-4">
          <button className="p-2 text-xl md:text-2xl lg:text-3xl rounded-full bg-[#25D366] text-white">
            <MdWhatsapp />
          </button>
        </div>
      </div>
    </>
  );
}
