"use client";
import { useState, useMemo } from "react";
import ProductImage from "@/assets/product-image.png";
import CommonWrapper from "@/components/layout/CommonWrapper";
import {
  Cpu,
  HardDrive,
  Microchip,
  MonitorPlay,
  Zap,
  Wind,
  Monitor,
  Mouse,
  Keyboard,
  Headphones,
  Speaker,
  Box,
  Settings,
  CircuitBoard,
  Trash2,
  Download,
} from "lucide-react";
import Image from "next/image";

const productList = [
  // 1. Processor (CPU)
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Processor Gen-${i + 1} ${
      i % 2 === 0 ? "Intel Core i" + (5 + i) : "AMD Ryzen " + (5 + i)
    }`,
    slug: `cpu-model-${i + 1}`,
    category: "Processor",
    image: ProductImage,
    regularPrice: (20000 + i * 5000).toString(),
    salePrice: (18000 + i * 5000).toString(),
    rating: "4.8",
    reviewCount: (100 + i * 20).toString(),
  })),

  // 2. Motherboard
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Motherboard Pro Series ${i % 2 === 0 ? "Z790" : "B650"} Plus ${
      i + 1
    }`,
    slug: `mobo-model-${i + 1}`,
    category: "Motherboard",
    image: ProductImage,
    regularPrice: (15000 + i * 3000).toString(),
    salePrice: (13500 + i * 3000).toString(),
    rating: "4.7",
    reviewCount: (50 + i).toString(),
  })),

  // 3. RAM
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `RGB Desktop RAM ${8 * (i + 1)}GB DDR5 6000MHz`,
    slug: `ram-model-${i + 1}`,
    category: "RAM",
    image: ProductImage,
    regularPrice: (5000 + i * 1500).toString(),
    salePrice: (4500 + i * 1500).toString(),
    rating: "4.9",
    reviewCount: "412",
  })),

  // 4. Storage
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `NVMe SSD Gen4 ${i < 5 ? "500GB" : "1TB"} High Speed`,
    slug: `storage-model-${i + 1}`,
    category: "Storage",
    image: ProductImage,
    regularPrice: (4000 + i * 2000).toString(),
    salePrice: (3600 + i * 2000).toString(),
    rating: "4.8",
    reviewCount: "890",
  })),

  // 5. Graphics Card (GPU)
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Graphics Card RTX ${4060 + i * 10} Edition 8GB/12GB`,
    slug: `gpu-model-${i + 1}`,
    category: "Graphics Card",
    image: ProductImage,
    regularPrice: (35000 + i * 12000).toString(),
    salePrice: (32000 + i * 12000).toString(),
    rating: "4.9",
    reviewCount: "150",
  })),

  // 6. Power Supply (PSU)
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Power Supply ${550 + i * 50}W 80+ Gold Modular`,
    slug: `psu-model-${i + 1}`,
    category: "Power Supply",
    image: ProductImage,
    regularPrice: (6000 + i * 1000).toString(),
    salePrice: (5400 + i * 1000).toString(),
    rating: "4.6",
    reviewCount: "230",
  })),

  // 7. CPU Cooler
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: i < 5 ? `Air Cooler Frost ${i + 1}` : `AIO Liquid Cooler 240/360mm`,
    slug: `cooler-model-${i + 1}`,
    category: "CPU Cooler",
    image: ProductImage,
    regularPrice: (3000 + i * 2500).toString(),
    salePrice: (2700 + i * 2500).toString(),
    rating: "4.7",
    reviewCount: "120",
  })),

  // 8. Casing
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `ATX Mid Tower Case RGB Glass ${i + 1}`,
    slug: `case-model-${i + 1}`,
    category: "Casing",
    image: ProductImage,
    regularPrice: (5000 + i * 2000).toString(),
    salePrice: (4500 + i * 2000).toString(),
    rating: "4.5",
    reviewCount: "85",
  })),

  // 9. Monitor
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Gaming Monitor ${24 + i * 2}" 144Hz/240Hz`,
    slug: `monitor-model-${i + 1}`,
    category: "Monitor",
    image: ProductImage,
    regularPrice: (15000 + i * 5000).toString(),
    salePrice: (13500 + i * 5000).toString(),
    rating: "4.8",
    reviewCount: "320",
  })),

  // 10. Case Fan
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Silent Case Fan 120mm RGB Pack of ${i + 1}`,
    slug: `fan-model-${i + 1}`,
    category: "Case Fan",
    image: ProductImage,
    regularPrice: (800 + i * 500).toString(),
    salePrice: (700 + i * 500).toString(),
    rating: "4.4",
    reviewCount: "600",
  })),

  // 11. UPS
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Offline UPS ${650 + i * 100}VA High Capacity`,
    slug: `ups-model-${i + 1}`,
    category: "UPS",
    image: ProductImage,
    regularPrice: (4000 + i * 1500).toString(),
    salePrice: (3600 + i * 1500).toString(),
    rating: "4.3",
    reviewCount: "95",
  })),

  // 12. Software
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `OS / Antivirus Subscription ${i + 1}`,
    slug: `software-model-${i + 1}`,
    category: "Software",
    image: ProductImage,
    regularPrice: "5000",
    salePrice: "4500",
    rating: "4.0",
    reviewCount: "1500",
  })),

  // 13. Mouse
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Gaming Mouse Wireless/Wired ${i + 1}`,
    slug: `mouse-model-${i + 1}`,
    category: "Mouse",
    image: ProductImage,
    regularPrice: (1200 + i * 1000).toString(),
    salePrice: (1000 + i * 1000).toString(),
    rating: "4.7",
    reviewCount: "800",
  })),

  // 14. Keyboard
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Mechanical Keyboard Hot-Swap RGB ${i + 1}`,
    slug: `keyboard-model-${i + 1}`,
    category: "Keyboard",
    image: ProductImage,
    regularPrice: (3000 + i * 2000).toString(),
    salePrice: (2700 + i * 2000).toString(),
    rating: "4.8",
    reviewCount: "450",
  })),

  // 15. Headphone
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `Surround Sound Gaming Headset ${i + 1}`,
    slug: `headphone-model-${i + 1}`,
    category: "Headphone",
    image: ProductImage,
    regularPrice: (2500 + i * 1500).toString(),
    salePrice: (2200 + i * 1500).toString(),
    rating: "4.6",
    reviewCount: "320",
  })),

  // 16. Speaker & home Theater
  ...Array.from({ length: 10 }).map((_, i) => ({
    name: `2.1/5.1 Speaker Home Theater System ${i + 1}`,
    slug: `speaker-model-${i + 1}`,
    category: "Speaker & home Theater",
    image: ProductImage,
    regularPrice: (5000 + i * 4000).toString(),
    salePrice: (4500 + i * 4000).toString(),
    rating: "4.7",
    reviewCount: "110",
  })),
];

const mainComponents = [
  { id: "cpu", name: "Processor", icon: Cpu },
  { id: "mobo", name: "Motherboard", icon: CircuitBoard },
  { id: "ram", name: "RAM", icon: Settings },
  { id: "storage", name: "Storage", icon: HardDrive },
  { id: "gpu", name: "Graphics Card", icon: MonitorPlay },
  { id: "psu", name: "Power Supply", icon: Zap },
  { id: "cooler", name: "CPU Cooler", icon: Wind },
  { id: "casing", name: "Casing", icon: Box },
];

const otherAccessories = [
  { id: "monitor", name: "Monitor", icon: Monitor },
  { id: "fan", name: "Case Fan", icon: Wind },
  { id: "ups", name: "UPS", icon: Zap },
  { id: "software", name: "Software", icon: Microchip },
  { id: "mouse", name: "Mouse", icon: Mouse },
  { id: "keyboard", name: "Keyboard", icon: Keyboard },
  { id: "headphone", name: "Headphone", icon: Headphones },
  { id: "speaker", name: "Speaker & home Theater", icon: Speaker },
];

const PcBuilder = () => {
  const [activeCategory, setActiveCategory] = useState("Processor");
  const [selectedProducts, setSelectedProducts] = useState({});
  // viewMode: 'list' (show products to pick) or 'build' (show what is already added)
  const [viewMode, setViewMode] = useState("build");

  const filteredProducts = useMemo(() => {
    return productList.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleChooseClick = (categoryName) => {
    setActiveCategory(categoryName);
    setViewMode("list"); // Switch to product selection
  };

  const handleAddToBuild = (product) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [product.category]: product,
    }));
    setViewMode("build"); // Automatically hide product list and show build list
  };

  const removeItem = (category) => {
    const updated = { ...selectedProducts };
    delete updated[category];
    setSelectedProducts(updated);
  };

  const totalPrice = Object.values(selectedProducts).reduce(
    (acc, item) => acc + parseInt(item.salePrice),
    0
  );

  const ComponentRow = ({ name, Icon }) => {
    const isSelected = selectedProducts[name];
    return (
      <div
        className={`flex items-center justify-between p-4 mb-3 transition-all bg-white border rounded-lg shadow-sm group ${
          activeCategory === name && viewMode === "list"
            ? "border-primary ring-1 ring-primary/20"
            : "border-blue-100"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 transition-colors bg-blue-50 rounded-xl group-hover:bg-blue-100">
            <Icon className="w-6 h-6 text-blue-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase">
              {name}
            </span>
            {isSelected ? (
              <span className="text-sm font-semibold text-primary truncate max-w-[140px]">
                {isSelected.name}
              </span>
            ) : (
              <span className="text-xs text-gray-400 italic">Not Selected</span>
            )}
          </div>
        </div>
        <button
          onClick={() => handleChooseClick(name)}
          className={`px-4 py-2 text-sm transition-colors border rounded-lg cursor-pointer ${
            isSelected
              ? "border-gray-200 text-gray-500 hover:bg-gray-50"
              : "text-primary border-primary hover:bg-primary hover:text-white"
          }`}
        >
          {isSelected ? "Change" : "Choose"}
        </button>
      </div>
    );
  };

  return (
    <CommonWrapper>
      <div className="my-4">
        <div className="">
          {Object.keys(selectedProducts).length > 0 && (
            <div className="flex justify-end py-4">
              <button className="px-4 py-2 font-semibold bg-white text-primary border border-primary rounded-xl hover:bg-blue-50 transition-all flex items-center flex-row gap-2 cursor-pointer">
                <Download /> Download
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* LEFT COLUMN: Categories (Span 5) */}
            <div className="border border-primary/30 bg-white shadow-sm rounded-2xl p-4 ">
              <h2 className="mb-6 text-xl text-primary py-3 border-b border-b-primary font-bold flex justify-between">
                PC Builder <span>৳{totalPrice}</span>
              </h2>
              <div className="max-h-screen overflow-y-auto">
                <section className="mb-8">
                  <h3 className="pb-2 mb-4 text-xs font-bold text-gray-500 border-b border-b-primary/20 uppercase tracking-widest">
                    Main Components
                  </h3>
                  <div className="">
                    {mainComponents.map((item) => (
                      <ComponentRow
                        key={item.id}
                        name={item.name}
                        Icon={item.icon}
                      />
                    ))}
                  </div>
                </section>
                <section>
                  <h3 className="pb-2 mb-4 text-xs font-bold text-gray-500 border-b border-b-primary/20 uppercase tracking-widest">
                    Accessories
                  </h3>
                  <div>
                    {otherAccessories.map((item) => (
                      <ComponentRow
                        key={item.id}
                        name={item.name}
                        Icon={item.icon}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* RIGHT COLUMN: Product List OR Build Summary (Span 7) */}
            <div className="border border-primary/30 bg-white shadow-sm rounded-2xl p-4  ">
              {viewMode === "list" ? (
                <>
                  {/* SELECTING PRODUCTS VIEW */}
                  <div className="flex justify-between items-center mb-6 border-b border-b-primary py-3">
                    <h2 className="text-xl text-primary font-bold">
                      Select {activeCategory}
                    </h2>
                    <button
                      onClick={() => setViewMode("build")}
                      className="text-sm text-gray-500 hover:underline"
                    >
                      Back to Build
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-2 max-h-screen overflow-y-auto">
                    {filteredProducts.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col p-4 rounded-xl bg-white border border-[#bee5f6] hover:shadow-md transition-all"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="w-full object-cover mb-4 rounded-lg"
                        />
                        <p className="text-sm font-bold text-gray-800 line-clamp-2 mb-2">
                          {item.name}
                        </p>
                        <p className="text-lg font-bold text-primary mb-4">
                          ৳{item.salePrice}
                        </p>
                        <button
                          onClick={() => handleAddToBuild(item)}
                          className="w-full py-2 bg-[#eaf7fc] text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all"
                        >
                          Add to PC Build
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {/* BUILD SUMMARY VIEW (Shown when product is selected or by default) */}
                  <div className="mb-6 border-b border-b-primary py-3 flex flex-row justify-between items-center">
                    <h2 className="text-xl text-primary font-bold">Your PC</h2>
                    <div className="flex flex-row items-center gap-2">
                      <h1 className="md:text-lg font-semibold text-gray-500">
                        Total
                      </h1>
                      <p className="p-2 border border-primary text-primary font-semibold rounded-xl">
                        ৳ {totalPrice}
                      </p>
                    </div>
                  </div>

                  {Object.keys(selectedProducts).length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                      <Box size={64} strokeWidth={1} />
                      <p className="mt-4">
                        Your build is empty. Choose a component to start!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-screen overflow-y-auto">
                      {Object.entries(selectedProducts).map(([cat, prod]) => (
                        <div
                          key={cat}
                          className="flex items-center gap-4 p-3 border-b border-primary/50"
                        >
                          <div className="grow">
                            <p className="">
                              <span className="bg-primary text-white py-0.5 px-2 rounded-full text-xs">
                                {cat}
                              </span>
                            </p>
                            <p className="text-sm font-medium text-gray-800 line-clamp-1">
                              {prod.name}
                            </p>
                          </div>
                          <div className="text-right flex flex-row gap-2">
                            <p className="text-sm font-semibold  items-center text-primary">
                              ৳{prod.salePrice}
                            </p>
                            <button
                              onClick={() => removeItem(cat)}
                              className="text-red-400 hover:text-red-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default PcBuilder;
