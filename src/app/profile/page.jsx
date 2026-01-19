"use client";

import CommonWrapper from "@/components/layout/CommonWrapper";
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Edit2,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../Provider/AuthProvider";
import Link from "next/link";

const ProfilePage = () => {
  const { user, loading, logout } = useAuth();

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center text-primary gap-3">
        <Loader2 className="animate-spin" size={40} />
        <p className="font-semibold">Loading Profile...</p>
      </div>
    );

  if (!user)
    return (
      <div className="text-center py-20">Profile not found. Please login.</div>
    );

  return (
    <div className="py-12 mt-6 lg:mt-20 md:mt-14">
      <CommonWrapper>
        <div className="flex flex-col lg:flex-row gap-8 -mt-10">
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100">
                    <img
                      src={
                        user.image ||
                        `https://ui-avatars.com/api/?name=${user.name}`
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>

              <nav className="mt-8 space-y-1">
                <SidebarItem
                  icon={<User size={18} />}
                  label="My Profile"
                  href={"/profile"}
                  active
                />
                <SidebarItem
                  icon={<Package size={18} />}
                  label="My Orders"
                  href={"/myorders"}
                />
                <SidebarItem
                  icon={<Heart size={18} />}
                  label="Favourite"
                  href={"/favourite"}
                />
                <SidebarItem
                  icon={<MapPin size={18} />}
                  label="Addresses"
                  href={"/addresses"}
                />

                <hr className="my-4 border-gray-100" />

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
                >
                  <LogOut size={18} /> Logout
                </button>
              </nav>
            </div>
          </aside>

          <main className="w-full lg:w-3/4 space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">
                  Personal Information
                </h3>
                <Link
                  href="/profile/edit"
                  className="text-primary flex items-center gap-1 font-semibold text-sm hover:underline"
                >
                  <Edit2 size={16} /> Edit
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <InfoItem label="Full Name" value={user.name} />
                <InfoItem label="Email" value={user.email} />
                <InfoItem label="Phone" value={user.phone || "Not provided"} />
                <InfoItem
                  label="Member Since"
                  value={
                    user.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "N/A"
                  }
                />
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 text-lg">
                  Default Address
                </h3>
                <Link
                  href="/addresses"
                  className="text-primary text-sm font-semibold hover:underline"
                >
                  Manage
                </Link>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <MapPin className="text-primary shrink-0" />
                <div>
                  <p className="text-gray-700">
                    {user.address || "No address saved."} <br />
                    {user.city && `${user.city}, `} {user.postcode}
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </CommonWrapper>
    </div>
  );
};

// SidebarItem updated to ensure href is passed correctly
const SidebarItem = ({ icon, label, active, href }) => (
  <Link
    href={href || "#"} // Fallback to # if href is missing
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
      active
        ? "bg-primary text-white shadow-md"
        : "text-gray-600 hover:bg-gray-50"
    }`}
  >
    {icon} <span className="font-medium text-sm">{label}</span>
  </Link>
);

const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">
      {label}
    </p>
    <p className="text-gray-800 font-medium">{value}</p>
  </div>
);

export default ProfilePage;
