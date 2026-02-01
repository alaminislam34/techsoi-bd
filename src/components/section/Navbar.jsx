"use client";
import CommonWrapper from "@/components/layout/CommonWrapper";
import { useAuth } from "@/Provider/AuthProvider";
import { User, LogOut, Handbag, Heart } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useSearchProducts } from "@/api/hooks";
import Image from "next/image";
import axios from "axios";
import {
  MdWhatsapp,
  MdOutlinePhoneInTalk,
  MdOutlineMailOutline,
  MdOutlineLocationOn,
} from "react-icons/md";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { user, logout, loginWithGoogle, isLoggingOut } = useAuth();
  const router = useRouter();
  const [websiteInfo, setWebsiteInfo] = useState(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch Website Info for Top Bar
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get(
          `https://api.techsoibd.com/api/website-info`,
        );
        setWebsiteInfo(res.data);
      } catch (error) {
        console.error("Error fetching website info:", error);
      }
    };
    fetchInfo();
  }, []);

  // Debounce input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedTerm(searchTerm.trim()), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const { data: searchResponse, isLoading: isSearching } =
    useSearchProducts(debouncedTerm);
  const suggestions = searchResponse?.data || [];

  return (
    <>
      {/* ---------- NAVBAR TOP SECTION ---------- */}
      <div className="border-b border-[#d1eef8] bg-[#eaf7fc] py-2 text-[12px] md:text-[13px] text-slate-700 font-medium">
        <CommonWrapper>
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-5 gap-y-2">
            <div className="flex items-center gap-1.5">
              <MdOutlinePhoneInTalk className="text-[#00aeef] text-lg" />
              <span>Phone: {websiteInfo?.phone || "01754545454"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MdOutlineMailOutline className="text-[#00aeef] text-lg" />
              <span>Mail: {websiteInfo?.email || "test@gmail.com"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MdOutlineLocationOn className="text-[#00aeef] text-lg" />
              <span>Location: {websiteInfo?.address || "Chapai"}</span>
            </div>
          </div>
        </CommonWrapper>
      </div>

      {/* ---------- MAIN NAVBAR ---------- */}
      <div className="bg-[#303030] backdrop-blur-[50px] sticky top-0 z-50 shadow-xs">
        <CommonWrapper>
          <div className="flex justify-between items-center relative py-2.5 md:py-4">
            {/* ---------- LOGO ---------- */}
            <Link href={"/"}>
              <div className="sm:block md:block mr-1 py-2">
                <Image
                  src={"/icons/logo.jpg"}
                  height={400}
                  width={800}
                  alt="Website logo"
                  className="h-10 md:h-14 w-auto object-contain"
                />
              </div>
            </Link>

            {/* ---------- SEARCH BAR ---------- */}
            <div className="hidden px-2 md:flex justify-between items-center md:w-xs lg:w-2xl relative mx-4 sm:mx-0 lg:mx-3 md:mx-4 py-2 rounded-xl bg-white border-2 border-primary">
              <div className="relative flex-1 ">
                <input
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                  }
                  className="lg:text-lg w-full focus:outline-none "
                  placeholder="Search products.."
                />

                {showSuggestions && (suggestions.length > 0 || isSearching) && (
                  <div className="absolute left-0 right-0 mt-2 bg-white border border-[#e6f6fd] rounded-lg shadow-lg z-50 max-h-60 overflow-auto max-w-xl">
                    {isSearching ? (
                      <div className="p-3 text-sm text-gray-500">
                        Searching...
                      </div>
                    ) : (
                      suggestions.map((s) => (
                        <div
                          key={s.id}
                          onMouseDown={() => {
                            router.push(`/products/${s.slug}`);
                            setSearchTerm("");
                            setShowSuggestions(false);
                          }}
                          className="p-3 hover:bg-[#f5fbff] cursor-pointer flex items-center gap-3"
                        >
                          <img
                            src={s.main_image || "/images/monitor.jpg"}
                            alt={s.name}
                            className="w-10 h-10 object-contain"
                            onError={(e) =>
                              (e.currentTarget.src = "/images/monitor.jpg")
                            }
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-800 truncate">
                              {s.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              ৳{s.sale_price?.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              <button className="flex items-center relative gap-2.5 pl-3 border-l border-[#9ed9f2] cursor-pointer">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.5 17.5L22 22"
                    stroke="#303030"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                    stroke="#303030"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>

            {/* ---------- ACTIONS ---------- */}
            <div className="flex items-center gap-2 md:gap-4">
              {user && (
                <>
                  <Link
                    href={"/favourite"}
                    className="hidden md:flex items-center relative gap-2"
                  >
                    <div className="w-10 h-10 flex items-center justify-center relative overflow-hidden rounded-[99px] bg-[#eaf7fc]">
                      <SafeImage
                        src="/icons/heart.png"
                        fallbackSrc="/icons/heart.png"
                        height={500}
                        width={500}
                        alt="Favourite icon"
                        className="w-5 h-auto"
                      />
                      <div className="flex flex-col justify-center items-center w-3.5 h-3.5 absolute left-5 top-[6.5px] rounded-3xl bg-primary">
                        <p className="text-[10px] text-white">0</p>
                      </div>
                    </div>
                    <div className="md:block hidden">
                      <p className="text-base font-medium text-primary">
                        Favourites
                      </p>
                      <p className="text-sm text-white">৳0</p>
                    </div>
                  </Link>

                  <Link
                    href={"/mycart"}
                    className="hidden md:flex items-center relative gap-2"
                  >
                    <div className="w-10 h-10 flex items-center justify-center relative overflow-hidden rounded-[99px] bg-[#eaf7fc]">
                      <SafeImage
                        src="/icons/cart.png"
                        fallbackSrc="/icons/cart.png"
                        height={500}
                        width={500}
                        alt="Cart icon"
                        className="w-5 h-auto"
                      />
                      <div className="flex justify-center items-center w-3.5 h-3.5 absolute left-5 top-[6.5px] rounded-3xl bg-primary">
                        <p className="text-[10px] text-white">0</p>
                      </div>
                    </div>
                    <div className="md:block hidden">
                      <p className="text-sm font-medium text-primary">Cart</p>
                      <p className="text-sm text-white">৳0</p>
                    </div>
                  </Link>

                  <Link
                    href={"/myorders"}
                    className="hidden md:flex items-center relative gap-2"
                  >
                    <div className="w-10 h-10 relative overflow-hidden rounded-[99px] bg-[#eaf7fc]">
                      <div className="flex items-center mt-2 justify-center">
                        <Handbag size={20} />
                      </div>
                      <div className="flex justify-center items-center w-3.5 h-3.5 absolute left-5 top-[6.5px] rounded-3xl bg-primary">
                        <p className="text-[10px] text-white">0</p>
                      </div>
                    </div>
                    <div className="md:block hidden">
                      <p className="text-sm font-medium text-primary">Orders</p>
                      <p className="text-sm text-white">৳0</p>
                    </div>
                  </Link>
                </>
              )}

              {/* USER DROPDOWN */}
              <div className="relative ml-1">
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="w-10 h-10 rounded-full bg-[#d8f1fb] flex items-center justify-center overflow-hidden border border-[#bee5f6]"
                >
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt="user"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="8"
                        r="4"
                        stroke="#303030"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M4 20C4 15.5817 7.58172 12 12 12C16.4183 12 20 15.5817 20 20"
                        stroke="#303030"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </button>

                {openDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setOpenDropdown(false)}
                    />
                    <div className="absolute right-0 mt-3 w-64 bg-white border border-[#bee5f6] rounded-xl shadow-lg p-4 z-50">
                      {user ? (
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={user?.image || "/images/user.jpg"}
                              className="w-10 h-10 rounded-full"
                              alt="avatar"
                            />
                            <div className="overflow-hidden">
                              <p className="text-sm font-bold text-gray-800 truncate">
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <hr className="border-gray-100" />
                          <Link
                            href={"/profile"}
                            onClick={() => setOpenDropdown(false)}
                            className="flex items-center gap-3 group"
                          >
                            <span className="p-2 bg-primary/10 text-primary rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                              <User size={20} />
                            </span>
                            <span className="font-medium text-primary">
                              My Profile
                            </span>
                          </Link>
                          <button
                            onClick={() => {
                              logout();
                              setOpenDropdown(false);
                            }}
                            disabled={isLoggingOut}
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 font-medium text-sm"
                          >
                            <LogOut size={16} />{" "}
                            {isLoggingOut ? "Logging out..." : "Logout"}
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-center py-2">
                          <User size={24} className="text-gray-400 mb-3" />
                          <p className="text-sm font-bold text-gray-800">
                            Welcome Guest
                          </p>
                          <button
                            onClick={loginWithGoogle}
                            className="w-full mt-4 flex items-center justify-center gap-3 border border-gray-200 py-2.5 rounded-xl hover:bg-gray-50 transition-all"
                          >
                            <FcGoogle />{" "}
                            <span className="text-sm font-semibold text-gray-700">
                              Continue with Google
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CommonWrapper>
      </div>

      {/* ---------- MOBILE BOTTOM NAVIGATION (FIX FOR SMALL DEVICES) ---------- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-between items-center z-100 shadow-lg">
        <Link href="/" className="flex flex-col items-center gap-1">
          <div className="p-1.5">
            <User size={20} className="text-gray-600" />
          </div>
          <span className="text-[10px] text-gray-600">Home</span>
        </Link>
        <Link
          href="/favourite"
          className="flex flex-col items-center gap-1 relative"
        >
          <div className="p-1.5">
            <Heart size={20} className="text-gray-600" />
          </div>
          <span className="absolute top-1 right-2 bg-primary text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
            0
          </span>
          <span className="text-[10px] text-gray-600">Wishlist</span>
        </Link>
        <Link
          href="/mycart"
          className="flex flex-col items-center gap-1 relative"
        >
          <div className="p-1.5">
            <Handbag size={20} className="text-gray-600" />
          </div>
          <span className="absolute top-1 right-1.5 bg-primary text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
            0
          </span>
          <span className="text-[10px] text-gray-600">Cart</span>
        </Link>
        <Link href="/myorders" className="flex flex-col items-center gap-1">
          <div className="p-1.5">
            <Handbag size={20} className="text-gray-600" />
          </div>
          <span className="text-[10px] text-gray-600">Orders</span>
        </Link>
      </div>

      {/* WhatsApp Floating Button */}
      {websiteInfo?.whatsapp_link && (
        <div className="fixed z-50 bottom-20 lg:bottom-8 lg:right-8 right-4">
          <a
            href={websiteInfo.whatsapp_link}
            target="_blank"
            className="flex p-3 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform"
          >
            <MdWhatsapp className="text-2xl lg:text-3xl" />
          </a>
        </div>
      )}
    </>
  );
}
