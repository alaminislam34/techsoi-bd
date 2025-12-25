'use client';

import { X } from 'lucide-react';

type BuyNowModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BuyNowModal({ isOpen, onClose }: BuyNowModalProps) {
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
        <div className="relative w-full max-w-md bg-[#eef9fd] rounded-2xl border border-[#9ED9F2] p-6">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#2cace2]"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-semibold text-[#303030] mb-6">
            Your Order
          </h2>

          <form className="space-y-4">
            {[
              { label: 'Full Name', placeholder: 'Mr. Jhon Don' },
              { label: 'Phone number', placeholder: '+888 0000 0000' },
              { label: 'Email Address', placeholder: 'yourmail@mail.com' },
              { label: 'Address', placeholder: 'Dhaka' },
              { label: 'City', placeholder: 'Dhaka' },
              { label: 'Postcode / ZIP', placeholder: '1222' },
            ].map((item, idx) => (
              <div key={idx}>
                <label className="text-sm text-gray-500">
                  {item.label}
                </label>
                <input
                  type="text"
                  placeholder={item.placeholder}
                  className="w-full mt-1 px-4 py-2.5 rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-[#9ED9F2]"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full cursor-pointer mt-4 bg-[#2cace2] hover:bg-[#25a1d3] text-white py-3 rounded-xl font-medium"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
