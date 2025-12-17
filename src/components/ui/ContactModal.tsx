'use client';

import { X, Upload } from "lucide-react";

type ContactModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 border border-[#9ED9F2]">
                    
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-[#2cace2]"
                    >
                        <X size={22} />
                    </button>

                    <h2 className="text-2xl font-semibold text-[#1a1a1a]">
                        Contact Us
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        We&apos;d love to hear from you. Send us a message!
                    </p>

                    <form className="mt-6 space-y-4">
                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full mt-1 px-4 py-2 border border-[#9ED9F2] rounded-lg outline-none focus:ring-2 focus:ring-[#9ED9F2]"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full mt-1 px-4 py-2 border border-[#9ED9F2] rounded-lg outline-none focus:ring-2 focus:ring-[#9ED9F2]"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-sm font-medium">Phone Number</label>
                            <input
                                type="text"
                                placeholder="Enter your phone number"
                                className="w-full mt-1 px-4 py-2 border border-[#9ED9F2] rounded-lg outline-none focus:ring-2 focus:ring-[#9ED9F2]"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="text-sm font-medium">Message</label>
                            <textarea
                                rows={4}
                                placeholder="Write your message here..."
                                className="w-full mt-1 px-4 py-2 border border-[#9ED9F2] rounded-lg outline-none focus:ring-2 focus:ring-[#9ED9F2]"
                            />
                        </div>

                        {/* Upload File (CUSTOM UI) */}
                        <div>
                            <label className="text-sm font-medium">Upload File</label>

                            <label
                                htmlFor="file-upload"
                                className="mt-1 flex items-center gap-3 px-4 py-3 border border-[#9ED9F2] rounded-lg cursor-pointer text-[#2cace2]"
                            >
                                <Upload size={18} />
                                <span className="text-sm">Choose a file</span>
                            </label>

                            <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full cursor-pointer mt-4 bg-[#2cace2] text-white py-3 rounded-lg font-medium"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
