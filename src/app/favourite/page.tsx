"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";

import FavA from "@/assets/reviewImg/fav1.jpg";
import FavB from "@/assets/reviewImg/fav1.jpg";
import FavAC from "@/assets/reviewImg/fav1.jpg";
import CommonWrapper from "@/components/layout/CommonWrapper";
import WebFutures from "@/components/section/WebFutures";
import BlogTitle from "@/components/layout/BlogTitle";
import BlogCard from "@/components/parts/BlogCard";

type FavItem = {
id: number;
name: string;
price: number;
status: string;
img: StaticImageData | string;
qty: number;
};

const initialFavourites: FavItem[] = [
{
id: 1,
name: "A donut dressed up as a Smart Assistant",
price: 3600,
status: "In stock",
img: FavA,
qty: 1,
},
{
id: 2,
name: "A donut dressed up as a Smart Assistant",
price: 3600,
status: "In stock",
img: FavB,
qty: 1,
},
{
id: 3,
name: "A donut dressed up as a Smart Assistant",
price: 3600,
status: "In stock",
img: FavAC,
qty: 1,
},
];

export default function FavouritePage() {
const [favourites, setFavourites] = useState<FavItem[]>(initialFavourites);

const increaseQty = (id: number) => {
setFavourites((prev) =>
prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it))
);
};

const decreaseQty = (id: number) => {
setFavourites((prev) =>
prev.map((it) =>
it.id === id && it.qty > 1 ? { ...it, qty: it.qty - 1 } : it
)
);
};

return (
<> <CommonWrapper> 
  <section className="w-full py-10 ">
     <div className=" bg-white border border-gray-200 rounded-2xl p-6 ">
       <h2 className="text-2xl font-semibold mb-6">My Favourite</h2>

        {/* Table header - visible on md+ */}
        <div className="hidden md:grid grid-cols-12 text-gray-600 font-medium text-sm border-b pb-3 mb-4">
          <div className="col-span-1">Delete</div>
          <div className="col-span-5">Products</div>
          <div className="col-span-2">Stock Status</div>
          <div className="col-span-2">Quantity</div>
          <div className="col-span-2 text-right">Total Price</div>
        </div>

        {/* Items */}
        {favourites.map((item) => (
          <div
            key={item.id}
            className="grid md:grid-cols-12 grid-cols-1 gap-y-4 md:gap-y-0 items-center py-6 border-b last:border-none"
          >
            {/* Delete */}
            <div className="md:col-span-1 flex items-start md:items-center">
              <button className="text-gray-500 hover:text-red-500">
                <Trash2 size={20} />
              </button>
            </div>

            {/* Product */}
            <div className="md:col-span-5 flex items-start md:items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl border p-1 overflow-hidden relative shrink-0">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="font-medium text-gray-700 text-sm sm:text-base">
                {item.name}
              </p>
            </div>

            {/* Stock */}
            <div className="md:col-span-2">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg text-sm font-medium">
                {item.status}
              </span>
            </div>

            {/* Quantity selector */}
            <div className="md:col-span-2 flex items-center">
              <div className="flex items-center border border-blue-400 rounded-lg px-2 py-1 w-28 justify-between">
                <button
                  onClick={() => decreaseQty(item.id)}
                  aria-label="decrease"
                  className="text-blue-400"
                >
                  <Minus size={16} />
                </button>

                <span className="text-sm font-semibold">
                  {item.qty.toString().padStart(2, "0")}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  aria-label="increase"
                  className="text-blue-400"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Price + Add to Cart */}
            <div className="md:col-span-2 flex flex-col md:flex-row items-center md:justify-end gap-3 w-full">
              <div className="w-28 text-right">
                <p className="text-blue-500 font-semibold text-lg">
                  ৳{item.price * item.qty}
                </p>
              </div>

              <button
                type="button"
                className="border border-blue-400 text-blue-500 flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition text-sm min-w-[140px]"
              >
                <ShoppingCart size={16} />
                <span className="whitespace-nowrap">Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </CommonWrapper>

  {/* WebFutures Section */}
  <WebFutures />

  {/* Blog Section */}
  <CommonWrapper>
    <BlogTitle
      title={"Our Latest Blog"}
      description={"Get Your Desired Product from Featured Category!"}
      btnText={"Read All"}
      btnLink={"#"}
    />
    <BlogCard limit={3} />
  </CommonWrapper>
</>


);
}
