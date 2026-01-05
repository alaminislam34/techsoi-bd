"use client";

type InputProps = {
  label: string;
  placeholder: string;
};

function Input({ label, placeholder }: InputProps) {
  return (
    <div className="space-y-1">
      <label
        className="text-sm block"
        style={{ color: "#808080" }}
      >
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg px-4 py-3 bg-white focus:outline-none"
        style={{
          border: "1px solid #E6E6E6",
        }}
      />
    </div>
  );
}

export default function OrderForm() {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        backgroundColor: "#EAF7FC",
        border: "1px solid #CFEAF8",
      }}
    >
      <h2 className="text-xl font-semibold mb-6">Your Order</h2>

      <form className="space-y-5">
        <Input label="Full Name" placeholder="Mr. Jhon Don" />
        <Input label="Phone number" placeholder="+888 0000 0000" />
        <Input label="Email Address" placeholder="yourmail@mail.com" />
        <Input label="Address" placeholder="Dhaka" />
        <Input label="City" placeholder="Dhaka" />
        <Input label="Postcode / ZIP" placeholder="1222" />

        <button
          type="submit"
          className="w-full mt-6 bg-[#2CACE2] cursor-pointer text-white py-4 rounded-xl font-semibold hover:bg-sky-600 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
