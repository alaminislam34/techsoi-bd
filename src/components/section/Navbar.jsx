"use client";
import CommonWrapper from "@/components/layout/CommonWrapper";
import { useAuth } from "@/Provider/AuthProvider";
import {
  User,
  LogOut,
  Handbag,
} from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useSearchProducts } from "@/api/hooks";
import Image from "next/image";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { user, logout, loginWithGoogle, isLoggingOut } = useAuth();
  const router = useRouter();

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

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
      <div className="bg-white sticky top-0 z-50 shadow-xs">
        <CommonWrapper>
          <div className="flex justify-between items-center relative py-2.5 md:py-4">
            {/* ---------- LOGO ---------- */}
            <Link href={"/"}>
              <div className="sm:block md:block mr-1 py-2">
                <Image
                  src={"/icons/logo.png"}
                  height={400}
                  width={800}
                  alt="Website logo"
                  className="h-10 md:h-14 w-auto object-contain"
                />
              </div>
            </Link>

            {/* ---------- SEARCH ---------- */}
            <div className="hidden px-2 md:flex justify-between items-center md:w-xs lg:w-2xl relative mx-4 sm:mx-0 lg:mx-3 md:mx-4 py-2 rounded-xl bg-white border border-primary">
              <div className="relative flex-1">
                <input
                  required
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                  }
                  className="lg:text-lg w-full focus:outline-none"
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
                            // navigate to product page (by slug)
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
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                      <p className="text-sm text-[#505050]">৳0</p>
                    </div>
                  </Link>

                  {/* Cart Icon */}
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
                      <p className="text-sm text-[#505050]">৳0</p>
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
                      <p className="text-sm text-[#505050]">৳0</p>
                    </div>
                  </Link>
                </>
              )}

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
                              src={
                                user?.image ? user?.image : "/images/user.jpg"
                              }
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

                            <div>
                              <p className="font-medium text-primary">Orders</p>
                            </div>
                          </Link>
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
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <LogOut size={16} />{" "}
                            {isLoggingOut ? "Logging out..." : "Logout"}
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-center py-2">
                          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                            <User size={24} className="text-gray-400" />
                          </div>
                          <p className="text-sm font-bold text-gray-800">
                            Welcome Guest
                          </p>
                          <button
                            onClick={loginWithGoogle}
                            className="w-full mt-4 flex items-center justify-center gap-3 border border-gray-200 py-2.5 rounded-xl hover:bg-gray-50 transition-all active:scale-95"
                          >
                            <FcGoogle />
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
    </>
  );
}
