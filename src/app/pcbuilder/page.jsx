// components/pc-builder/PcBuilder.jsx
"use client";

import { useState, useMemo, useRef } from "react"; // useRef যুক্ত করা হয়েছে
import { useQuery } from "@tanstack/react-query";
import CommonWrapper from "@/components/layout/CommonWrapper";
import { Trash2, Download, Loader2, Box } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/api/ApiEndPoint";

// Category icons mapping
const categoryIcons = {
  Processor: "processor.png",
  Motherboard: "motherboard.png",
  RAM: "ram.png",
  Storage: "hardisk.png",
  "Graphics Card": "graphicscard.png",
  "Power Supply": "powersupply.png",
  "CPU Cooler": "cpucoler.png",
  Casing: "casing.png",
  Monitor: "monitor.png",
  "Case Fan": "casefan.png",
  UPS: "ups.png",
  Software: "software.png",
  Mouse: "mouse.png",
  Keyboard: "keyboard.png",
  Headphone: "headphone.png",
  "Speaker & home Theater": "speaker.png",
};

const mainComponents = [
  "Processor",
  "Motherboard",
  "RAM",
  "Storage",
  "Graphics Card",
  "Power Supply",
  "CPU Cooler",
  "Casing",
];

const PcBuilder = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [viewMode, setViewMode] = useState("build");

  // প্রোডাক্ট কন্টেইনারের জন্য রেফারেন্স
  const productViewRef = useRef(null);

  const {
    data: rawProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product-search", activeCategory],
    queryFn: async () => {
      if (!activeCategory) return [];
      const searchQuery = activeCategory;
      const response = await apiClient.get(
        API_ENDPOINTS.PRODUCT_SEARCH(searchQuery),
      );
      return response.data || [];
    },
    enabled: !!activeCategory,
    staleTime: 4 * 60 * 1000,
  });

  const currentProducts = useMemo(() => {
    return (rawProducts || []).map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      salePrice: p.sale_price ?? p.regular_price ?? 0,
      regularPrice: p.regular_price ?? p.sale_price ?? 0,
      image: p.main_image || "/images/placeholder-product.png",
      category: activeCategory,
    }));
  }, [rawProducts, activeCategory]);

  const handleChooseCategory = (category) => {
    setActiveCategory(category);
    setViewMode("list");

    // স্ক্রল লজিক: ক্লিক করার সাথে সাথে কন্টেইনার ভিউতে নিয়ে যাবে
    setTimeout(() => {
      productViewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const addToBuild = (product) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [activeCategory]: product,
    }));
    setViewMode("build");
  };

  const removeFromBuild = (category) => {
    const updated = { ...selectedProducts };
    delete updated[category];
    setSelectedProducts(updated);
  };

  const totalPrice = Object.values(selectedProducts).reduce(
    (sum, item) => sum + Number(item.salePrice || 0),
    0,
  );

  const exportToPDF = () => {
    if (totalPrice === 0) {
      alert("Please add at least one component!");
      return;
    }

    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59);
    doc.text("TechsoiBD", margin, 20);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Custom PC Specification", margin, 26);

    const dateStr = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    doc.text(`Date: ${dateStr}`, pageWidth - margin, 20, { align: "right" });
    doc.text(
      `Ref: #BC-${Math.floor(1000 + Math.random() * 9000)}`,
      pageWidth - margin,
      25,
      { align: "right" },
    );

    const tableRows = Object.entries(selectedProducts).map(
      ([category, product]) => {
        return [
          category.toUpperCase(),
          product.name,
          `${Number(product.salePrice).toLocaleString()} TK`,
        ];
      },
    );

    autoTable(doc, {
      startY: 35,
      head: [["CATEGORY", "PRODUCT NAME", "PRICE"]],
      body: tableRows,
      theme: "striped",
      styles: {
        fontSize: 9,
        font: "helvetica",
        cellPadding: 4,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: 255,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: "auto" },
        2: { cellWidth: 35, halign: "right" },
      },
      margin: { left: margin, right: margin },
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    const boxWidth = 65;

    doc.setFillColor(30, 41, 59);
    doc.rect(pageWidth - margin - boxWidth, finalY, boxWidth, 12, "F");

    doc.setFontSize(10);
    doc.setTextColor(255);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL:", pageWidth - margin - boxWidth + 5, finalY + 7.8);
    doc.text(
      `${totalPrice.toLocaleString()} TK`,
      pageWidth - margin - 5,
      finalY + 7.8,
      { align: "right" },
    );

    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.setFont("helvetica", "normal");
    doc.text(
      "This is a computer-generated quote. Prices may vary at the time of purchase.",
      pageWidth / 2,
      pageHeight - 15,
      { align: "center" },
    );
    doc.text(
      "techsoi.com | support@techsoi.com",
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" },
    );

    doc.save(`Techsoibd_Build_${new Date().toISOString().split("T")[0]}.pdf`);
  };

  const CategoryItem = ({ name }) => {
    const iconImage = categoryIcons[name];
    const isSelected = !!selectedProducts[name];

    return (
      <div
        className={`py-2 border-b transition-all cursor-pointer ${
          activeCategory === name && viewMode === "list"
            ? "border-b-primary bg-blue-50 shadow-sm"
            : "border-b-gray-200 hover:bg-gray-50"
        }`}
        onClick={() => handleChooseCategory(name)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className=" bg-blue-50 rounded-lg flex items-center justify-center w-12 h-12 relative overflow-hidden">
              {iconImage ? (
                <SafeImage
                  src={`/icons/${iconImage}`}
                  fallbackSrc="/icons/logo.png"
                  alt={name}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              ) : (
                <Box className="" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                {name}
              </div>
              {isSelected ? (
                <div className="text-sm font-medium text-gray-800 truncate max-w-55">
                  {selectedProducts[name].name}
                </div>
              ) : (
                <div className="text-xs text-gray-400 italic">Not selected</div>
              )}
            </div>
          </div>

          <span
            className={`px-4 py-1.5 text-sm rounded-lg font-medium ${
              isSelected ? "bg-gray-200 text-gray-700" : "bg-primary text-white"
            }`}
          >
            {isSelected ? "Change" : "Choose"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <CommonWrapper>
      <div className="py-6">
        <div className="flex justify-end mb-6">
          {totalPrice > 0 && (
            <button
              onClick={exportToPDF}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-colors"
            >
              <Download size={18} />
              Download PDF
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h1 className="text-2xl font-bold text-primary mb-6 flex justify-between items-center border-b border-gray-200 pb-4">
              PC Builder
            </h1>

            <div className="max-h-[70vh] overflow-y-auto space-y-1 pr-2">
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-gray-300">
                  Main Components
                </h2>
                <div className="flex flex-col gap-2">
                  {mainComponents.map((name) => (
                    <CategoryItem key={name} name={name} />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4 pb-2 border-b">
                  Peripherals & Others
                </h2>
                {Object.keys(categoryIcons)
                  .filter((c) => !mainComponents.includes(c))
                  .map((name) => (
                    <CategoryItem key={name} name={name} />
                  ))}
              </div>
            </div>
          </div>

          <div
            ref={productViewRef}
            className="lg:col-span-3 bg-white rounded-2xl border border-gray-50 shadow-sm p-6 min-h-125 scroll-mt-6"
          >
            {viewMode === "list" ? (
              <>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-b-gray-200">
                  <h2 className="text-2xl font-bold text-primary">
                    Select {activeCategory}
                  </h2>
                  <button
                    onClick={() => setViewMode("build")}
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    ← Back to Build
                  </button>
                </div>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                    <p className="text-gray-600">
                      Loading {activeCategory} products...
                    </p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12 text-red-600">
                    Failed to load products. Please try again.
                  </div>
                ) : currentProducts.length === 0 ? (
                  <div className="text-center py-20 text-gray-500">
                    No products found for <strong>{activeCategory}</strong>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-5 max-h-[65vh] overflow-y-auto">
                    {currentProducts.map((item) => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all bg-gray-50/70"
                      >
                        <div className="aspect-square relative mb-3 bg-white rounded-lg overflow-hidden border border-gray-100">
                          <SafeImage
                            src={item.image}
                            fallbackSrc="/images/monitor.jpg"
                            alt={item.name}
                            fill
                            className="object-contain p-3"
                          />
                        </div>
                        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-11">
                          {item.name}
                        </h3>
                        <div className="text-xl font-bold text-primary mb-3">
                          ৳{Number(item.salePrice).toLocaleString()}
                        </div>
                        <button
                          onClick={() => addToBuild(item)}
                          className="w-full py-2.5 bg-primary hover:bg-primary text-white rounded-lg font-medium transition-colors"
                        >
                          Add to Build
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-primary">
                    Your PC Build
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-gray-600">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-primary px-4 py-1 bg-blue-50 rounded-xl">
                      ৳{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {Object.keys(selectedProducts).length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                    <Box size={80} strokeWidth={1} />
                    <p className="mt-6 text-lg font-medium">
                      Your build is empty
                    </p>
                    <p className="text-sm mt-2">
                      Click any category on the left to begin
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[65vh] overflow-y-auto">
                    {Object.entries(selectedProducts).map(([cat, item]) => (
                      <div
                        key={cat}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded-lg border border-gray-100"
                      >
                        <div>
                          <span className="inline-block px-3 py-1 text-xs bg-primary text-white rounded-full mb-2">
                            {cat}
                          </span>
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {item.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-primary pt-0.5">
                            ৳{Number(item.salePrice).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeFromBuild(cat)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                          >
                            <Trash2 size={18} />
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
    </CommonWrapper>
  );
};

export default PcBuilder;
