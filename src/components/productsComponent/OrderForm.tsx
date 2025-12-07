"use client";

type InputProps = {
  label: string;
  placeholder: string;
};

function Input({ label, placeholder }: InputProps) {
  return (
    <div>
      <label className="text-sm text-gray-600 block mb-1">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
      />
    </div>
  );
}

export default function OrderForm() {
  return (
    <div className="border border-blue-200 rounded-2xl p-6 bg-blue-50">
      <h2 className="text-xl font-semibold mb-5">Your Order</h2>

      <form className="space-y-4">
        <Input label="Full Name" placeholder="Mr. Jhon Don" />
        <Input label="Phone number" placeholder="+888 0000 0000" />
        <Input label="Email Address" placeholder="yourmail@mail.com" />
        <Input label="Address" placeholder="Dhaka" />
        <Input label="City" placeholder="Dhaka" />
        <Input label="Postcode / ZIP" placeholder="1222" />

        <button
          type="submit"
          className="w-full mt-4 bg-sky-500 text-white py-3 rounded-xl font-semibold
                     hover:bg-sky-600 transition cursor-pointer"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
