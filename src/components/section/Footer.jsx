"use client";

import CommonWrapper from "@/components/layout/CommonWrapper";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [info, setInfo] = useState({});
  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about-us", label: "About Us" },
    { to: "/blog", label: "Blog" },
    { to: "/contact-us", label: "Contact Us" },
  ];

  const topCategoryLink = [
    { to: "/accessories", label: "Accessories" },
    { to: "/laptop", label: "Laptop" },
    { to: "/monitor", label: "Monitor" },
    { to: "/casing", label: "Casing" },
  ];

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("https://api.techsoibd.com/api/website-info");
      if (res.data) {
        setInfo(res.data.data);
      } else {
        setInfo(null);
      }
    };

    fetch();
  }, []);

  return (
    <footer className="bg-[#eaf7fc] mt-12 md:mt-30">
      <CommonWrapper>
        <div className="w-full flex flex-col md:flex-row justify-between items-center py-6 gap-4">
          <p className="text-sm md:text-base text-center md:text-left text-[#808080]">
            © 2025 Techsoi. All Rights Reserved.
          </p>
          <p className="text-sm md:text-base text-center md:text-right text-[#808080]">
            Empowering Your Life with Cutting-Edge Electronics
          </p>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-10 py-12 md:py-20 border-t border-[#bee5f6]">
          <div className="flex flex-col w-full lg:max-w-1/3 gap-8">
            <div className="flex flex-col gap-6">
              <Link href={"/"} className="inline-block">
                <svg
                  width={185}
                  height={40}
                  viewBox="0 0 185 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-40 md:w-46.25 h-auto"
                >
                  <path
                    d="M77.9891 0.273926H84.6235V11.3036C86.1527 8.94812 88.116 6.80388 91.479 6.80388C96.5009 6.80388 99.4277 10.7783 99.4277 17.2125V35.3606H92.7894V19.7226C92.7894 15.9576 91.3039 14.0213 88.7729 14.0213C86.2422 14.0213 84.6235 15.9579 84.6235 19.7226V35.3606H77.9891V0.273926Z"
                    fill="#231F20"
                  />
                  <path d="M184.77 0H178.206V5.1207H184.77V0Z" fill="#2CACE2" />
                  <path
                    d="M184.77 9.47021H178.206V35.3609H184.77V9.47021Z"
                    fill="#2CACE2"
                  />
                  <path
                    d="M36.4992 29.2645H35.2159C32.1365 29.2645 29.4783 26.1433 29.0649 23.7098H45.5524C45.8629 22.194 45.8934 21.4456 45.8934 20.7904C45.8934 12.4934 42.182 4.90869 34.0791 4.90869C27.0179 4.90869 22.0838 11.7833 22.0838 20.1351V20.2437C22.0838 29.1937 27.4714 35.3617 34.757 35.3617H40.5881C38.9025 33.6616 37.5139 31.5918 36.4992 29.2645ZM34.0789 11.5658C36.9752 11.5658 38.7882 14.0775 39.1939 16.5379H28.8286C29.3715 14.0245 31.2262 11.5658 34.0789 11.5658Z"
                    fill="#231F20"
                  />
                  <path
                    d="M64.4286 4.90771C56.9656 4.90771 51.643 11.7823 51.643 20.1364V20.2429C51.643 28.5937 57.0111 35.3612 64.335 35.3612H69.7719C68.0769 33.657 66.6775 31.5836 65.6548 29.2506H65.2018C61.4273 29.2506 58.4682 24.6098 58.4682 20.1364V20.024C58.4682 15.7148 60.9247 12.0566 64.3828 12.0566C66.8391 12.0566 68.9265 13.8009 69.9319 16.5069L69.9415 16.4917C70.3965 13.7419 71.3468 11.1921 72.6723 8.96043C70.6348 6.69415 68.0829 4.90771 64.4286 4.90771Z"
                    fill="#231F20"
                  />
                  <path
                    d="M18.9916 5.04952H12.9397V0.273438H5.9966V5.04952H0C1.69673 6.72531 3.10417 8.76847 4.14191 11.0655H5.9966V26.4062C5.9966 33.3037 8.87585 35.3601 13.1225 35.3601H19.7455C18.0164 33.631 16.594 31.5194 15.5638 29.1427C15.4441 29.1732 15.3163 29.1978 15.1791 29.1978C13.6271 29.1978 12.9397 28.2536 12.9397 26.3071V11.0652H14.8533C15.8892 8.76873 17.2967 6.72531 18.9916 5.04952Z"
                    fill="#231F20"
                  />
                  <path
                    d="M116.564 17.7278C113.656 15.9302 110.954 14.401 111.44 12.3424L111.465 12.2358C111.836 10.6573 113.43 10.1487 115.877 10.383C116.659 10.4572 118.152 10.6991 119.59 11.0189C120.778 8.73354 122.389 6.70175 124.324 5.03372H117.116C111.165 4.71573 106.895 6.31525 105.653 11.5918L105.626 11.6965C104.371 17.0248 108.4 19.7557 112.1 21.8542C115.02 23.5985 118.666 24.7924 118.678 27.0168V27.1253C118.687 29.0261 117.126 30.2104 114.408 30.1951C113.115 30.1894 111.673 29.7378 110.272 29.2331C109.112 31.5051 107.583 33.7065 105.652 35.3611L114.28 35.405C120.026 35.4335 124.505 32.4704 124.472 26.449V26.3384C124.448 21.1838 120.184 19.916 116.564 17.7278Z"
                    fill="#2CACE2"
                  />
                  <path
                    d="M155.006 16.6284H147.762V23.8724H155.006V16.6284Z"
                    fill="#2CACE2"
                  />
                  <path
                    d="M155.005 39.9999C163.182 38.5051 169.64 32.0496 171.136 23.8726H155.005V39.9999Z"
                    fill="#2CACE2"
                  />
                  <path
                    d="M131.635 23.8721C133.13 32.0491 139.589 38.5064 147.762 39.9997V23.8721H131.635Z"
                    fill="#2CACE2"
                  />
                  <path
                    d="M155.005 0.5V16.6276H171.136C169.64 8.45393 163.182 1.99663 155.005 0.5Z"
                    fill="#2CACE2"
                  />
                  <path
                    d="M147.762 0.5C139.589 1.99663 133.129 8.45419 131.634 16.6276H147.762V0.5Z"
                    fill="#2CACE2"
                  />
                </svg>
              </Link>
              <p className="text-sm md:text-lg text-[#303030] leading-relaxed">
                Techsoi – Empowering Your Life with Cutting-Edge Electronics.
                Discover, Shop, and Unleash the Power of Technology with Us!
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href={`mailto:${info?.email || "technologiestechsoi@gmail.com"}`}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-[#2CACE2]"
                >
                  <path
                    d="M3.77762 11.9424C2.8296 10.2893 2.37185 8.93948 2.09584 7.57121C1.68762 5.54758 2.62181 3.57081 4.16938 2.30947C4.82345 1.77638 5.57323 1.95852 5.96 2.6524L6.83318 4.21891C7.52529 5.46057 7.87134 6.08139 7.8027 6.73959C7.73407 7.39779 7.26737 7.93386 6.33397 9.00601L3.77762 11.9424ZM3.77762 11.9424C5.69651 15.2883 8.70784 18.3013 12.0576 20.2224M12.0576 20.2224C13.7107 21.1704 15.0605 21.6282 16.4288 21.9042C18.4524 22.3124 20.4292 21.3782 21.6905 19.8306C22.2236 19.1766 22.0415 18.4268 21.3476 18.04L19.7811 17.1668C18.5394 16.4747 17.9186 16.1287 17.2604 16.1973C16.6022 16.2659 16.0661 16.7326 14.994 17.666L12.0576 20.2224Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-base md:text-lg text-[#303030]">
                  {info?.email || "technologiestechsoi@gmail.com"}
                </p>
              </Link>
              <Link
                href={`tel:${info?.phone || "+880 1672-224906"}`}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-[#2CACE2]"
                >
                  <path
                    d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-base md:text-lg text-[#303030]">
                  {info?.phone || "+880 1672-224906"}
                </p>
              </Link>
              <div className="flex items-start gap-3">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-[#2CACE2] mt-1"
                >
                  <path
                    d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M12 2C16.8706 2 21 6.03298 21 10.9258C21 15.8965 16.8033 19.3847 12.927 21.7567C12.6445 21.9162 12.325 22 12 22C11.675 22 11.3555 21.9162 11.073 21.7567C7.2039 19.3616 3 15.9137 3 10.9258C3 6.03298 7.12944 2 12 2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <p className="text-base md:text-lg text-[#303030]">
                  {info?.address || "Mohakhali, Amtoli, Dhaka, Bangladesh."}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 grow gap-8 lg:max-w-2/3">
            <div className="flex flex-col gap-6">
              <p className="text-lg md:text-2xl font-semibold text-[#303030]">
                Quick Links
              </p>
              <div className="flex flex-col gap-3">
                {quickLinks.map((item, index) => (
                  <Link
                    key={index}
                    href={item.to}
                    className="text-sm md:text-lg text-[#303030] hover:text-[#2CACE2] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <p className="text-lg md:text-2xl font-semibold text-[#303030]">
                Top Category
              </p>
              <div className="flex flex-col gap-3">
                {topCategoryLink.map((item, index) => (
                  <Link
                    key={index}
                    href={item.to}
                    className="text-sm md:text-lg text-[#303030] hover:text-[#2CACE2] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <p className="text-lg md:text-2xl font-semibold text-[#303030]">
                Follow us
              </p>
              <div className="flex flex-col items-start gap-4">
                <Link
                  href={info?.facebook_link || "#"}
                  className="flex items-center gap-2 hover:text-[#2CACE2] transition-colors"
                >
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6"
                  >
                    <path
                      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 8.75C17.4142 8.75 17.75 8.41421 17.75 8C17.75 7.58579 17.4142 7.25 17 7.25V8V8.75ZM16 8V8.75V8ZM11.25 21.5C11.25 21.9142 11.5858 22.25 12 22.25C12.4142 22.25 12.75 21.9142 12.75 21.5H12H11.25ZM10 13.25C9.58579 13.25 9.25 13.5858 9.25 14C9.25 14.4142 9.58579 14.75 10 14.75V14V13.25ZM15 14.75C15.4142 14.75 15.75 14.4142 15.75 14C15.75 13.5858 15.4142 13.25 15 13.25V14V14.75ZM17 8V7.25H16V8V8.75H17V8ZM12 12H11.25V21.5H12H12.75V12H12ZM16 8V7.25C15.0784 7.25 14.3117 7.24841 13.7055 7.32991C13.0777 7.41432 12.5109 7.59999 12.0555 8.05546L12.5858 8.58579L13.1161 9.11612C13.2464 8.9858 13.4439 8.87858 13.9054 8.81654C14.3884 8.75159 15.036 8.75 16 8.75V8ZM12 12H12.75C12.75 11.036 12.7516 10.3884 12.8165 9.90539C12.8786 9.44393 12.9858 9.24643 13.1161 9.11612L12.5858 8.58579L12.0555 8.05546C11.6 8.51093 11.4143 9.07773 11.3299 9.70552C11.2484 10.3117 11.25 11.0784 11.25 12H12ZM10 14V14.75H15V14V13.25H10V14Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="text-sm md:text-lg pb-1.5">Facebook</span>
                </Link>
                <Link
                  href={info?.instagram_link || "#"}
                  className="flex items-center gap-2 hover:text-[#2CACE2] transition-colors"
                >
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6"
                  >
                    <path
                      d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M17.5078 6.5L17.4988 6.5"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm md:text-lg pb-1.5">Instagram</span>
                </Link>
                <Link
                  href={info?.tiktok_link || "#"}
                  className="flex items-center gap-2 hover:text-[#2CACE2] transition-colors"
                >
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6 ml-0.5"
                  >
                    <path
                      d="M0.75 10.25C0.75 5.77166 0.75 3.53249 2.14124 2.14124C3.53249 0.75 5.77166 0.75 10.25 0.75C14.7283 0.75 16.9675 0.75 18.3588 2.14124C19.75 3.53249 19.75 5.77166 19.75 10.25C19.75 14.7283 19.75 16.9675 18.3588 18.3588C16.9675 19.75 14.7283 19.75 10.25 19.75C5.77166 19.75 3.53249 19.75 2.14124 18.3588C0.75 16.9675 0.75 14.7283 0.75 10.25Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.6438 10.0279C9.05384 10.0865 9.43379 9.80168 9.49244 9.39164C9.5511 8.9816 9.26624 8.60165 8.8562 8.543L8.75 9.28544L8.6438 10.0279ZM15.75 8.5C16.1642 8.5 16.5 8.16421 16.5 7.75C16.5 7.33579 16.1642 7 15.75 7V7.75V8.5ZM12.5 4.25C12.5 3.83579 12.1642 3.5 11.75 3.5C11.3358 3.5 11 3.83579 11 4.25H11.75H12.5ZM11.75 12.75H11C11 14.2688 9.76878 15.5 8.25 15.5V16.25V17C10.5972 17 12.5 15.0972 12.5 12.75H11.75ZM8.25 16.25V15.5C6.73122 15.5 5.5 14.2688 5.5 12.75H4.75H4C4 15.0972 5.90279 17 8.25 17V16.25ZM4.75 12.75H5.5C5.5 11.2312 6.73122 10 8.25 10V9.25V8.5C5.90279 8.5 4 10.4028 4 12.75H4.75ZM8.25 9.25V10C8.38412 10 8.51557 10.0095 8.6438 10.0279L8.75 9.28544L8.8562 8.543C8.65783 8.51463 8.4554 8.5 8.25 8.5V9.25ZM15.75 7.75V7C14.9754 7 14.1424 6.6808 13.5059 6.14923C12.87 5.61819 12.5 4.93835 12.5 4.25H11.75H11C11 5.49465 11.6635 6.56481 12.5444 7.30052C13.4246 8.0357 14.5916 8.5 15.75 8.5V7.75ZM11.75 4.25H11V12.75H11.75H12.5V4.25H11.75Z"
                      fill="currentColor"
                    />
                  </svg>

                  <span className="text-sm md:text-lg pb-1.5">Tiktok</span>
                </Link>
                <Link
                  href={`${info.youtube_link || "https://www.youtube.com/@techsoitechnologies3169"}`}
                  className="flex items-center gap-2 hover:text-[#2CACE2] transition-colors"
                >
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6 ml-0.5"
                  >
                    <path
                      d="M10.75 17.75C12.5597 17.75 14.2951 17.5712 15.9034 17.2434C17.9123 16.8339 18.9168 16.6291 19.8334 15.4506C20.75 14.2721 20.75 12.9193 20.75 10.2135V8.28645C20.75 5.58073 20.75 4.22787 19.8334 3.04937C18.9168 1.87088 17.9123 1.66613 15.9034 1.25662C14.2951 0.928774 12.5597 0.75 10.75 0.75C8.94031 0.75 7.20489 0.928774 5.59656 1.25662C3.58766 1.66613 2.58321 1.87088 1.6666 3.04937C0.75 4.22787 0.75 5.58073 0.75 8.28645V10.2135C0.75 12.9193 0.75 14.2721 1.6666 15.4506C2.58321 16.6291 3.58766 16.8339 5.59656 17.2434C7.20489 17.5712 8.94031 17.75 10.75 17.75Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M14.7121 9.56288C14.5637 10.1687 13.7741 10.6038 12.1949 11.4741C10.4772 12.4205 9.61844 12.8938 8.9228 12.7115C8.6872 12.6497 8.4702 12.5411 8.28799 12.3938C7.75 11.9589 7.75 11.0559 7.75 9.25C7.75 7.44408 7.75 6.54112 8.28799 6.10618C8.4702 5.95886 8.6872 5.85029 8.9228 5.78854C9.61844 5.60621 10.4772 6.07945 12.1949 7.02593C13.7741 7.89616 14.5637 8.33128 14.7121 8.93712C14.7626 9.14326 14.7626 9.35674 14.7121 9.56288Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span className="text-sm md:text-lg pb-1.5">Youtube</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end items-center w-full py-6 border-t border-[#bee5f6]">
          <p className="text-xs md:text-base text-[#808080]">
            Build by Mr. Jhon &amp; Mr. Don
          </p>
        </div>
      </CommonWrapper>
    </footer>
  );
}
