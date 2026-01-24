import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";

interface DownloadButtonProps {
  product1: any;
  product2: any;
}

export function useDownloadPDF() {
  const handleDownload = (product1: any, product2: any) => {
    if (!product1 && !product2) {
      toast.error("Please select at least one product to compare");
      return;
    }

    try {
      const doc = new jsPDF("p", "mm", "a4");

      // Title
      doc.setFontSize(18);
      doc.setTextColor(40, 40, 40);
      doc.text("Product Comparison Report", 14, 20);

      const cleanText = (html: string) => {
        if (!html) return "";
        let text = html
          .replace(/<[^>]*>?/gm, "")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/\s+/g, " ")
          .trim();
        text = text.replace(/(.)\s+(?=.)/g, "$1 ");
        return text;
      };

      const safeParseSpecs = (p: any) => {
        let specs =
          p?.details?.specifications || p?.specifications || p?.attributes;

        if (typeof specs === "string") {
          try {
            specs = JSON.parse(specs);
          } catch (e) {
            specs = [];
          }
        }

        if (!Array.isArray(specs) || specs.length === 0)
          return "Details not available";

        return specs
          .map((s: any) => `${s.name || s.label}: ${s.value || s.text}`)
          .join("\n");
      };

      const p1Name = product1?.name ?? "Product 1";
      const p2Name = product2?.name ?? "Product 2";

      const head = [["Feature", p1Name, p2Name]];

      const body = [
        [
          "Price",
          `BDT ${(
            product1?.sale_price ??
            product1?.regular_price ??
            0
          ).toLocaleString()}`,
          `BDT ${(
            product2?.sale_price ??
            product2?.regular_price ??
            0
          ).toLocaleString()}`,
        ],
        [
          "Availability",
          product1?.stock > 0 ? "In Stock" : "Out of Stock",
          product2?.stock > 0 ? "In Stock" : "Out of Stock",
        ],
        [
          "Rating",
          product1?.rating ? `${product1.rating} / 5` : "—",
          product2?.rating ? `${product2.rating} / 5` : "—",
        ],
        [
          "Description",
          cleanText(product1?.short_description || product1?.description),
          cleanText(product2?.short_description || product2?.description),
        ],
        ["Specifications", safeParseSpecs(product1), safeParseSpecs(product2)],
      ];

      autoTable(doc, {
        head,
        body,
        startY: 30,
        theme: "grid",
        margin: { horizontal: 14 },
        styles: {
          fontSize: 9,
          cellPadding: 4,
          overflow: "linebreak",
          valign: "top",
          lineColor: [200, 200, 200],
          lineWidth: 0.1,
          font: "helvetica",
          cellWidth: "wrap",
          textColor: [40, 40, 40],
        },
        headStyles: {
          fillColor: [44, 172, 226],
          textColor: 255,
          fontSize: 10,
          fontStyle: "bold",
          halign: "center",
          cellPadding: 5,
          font: "helvetica",
        },
        columnStyles: {
          0: {
            cellWidth: 32,
            fontStyle: "bold",
            fillColor: [250, 250, 250],
          },
          1: { cellWidth: 77 },
          2: { cellWidth: 77 },
        },
        bodyStyles: {
          font: "helvetica",
        },
        didDrawPage: (data: any) => {
          const dateStr = new Date().toLocaleString();
          doc.setFontSize(8);
          doc.setTextColor(150);
          doc.setFont("helvetica", "normal");
          doc.text(
            `Generated on: ${dateStr}`,
            14,
            doc.internal.pageSize.getHeight() - 10,
          );
        },
      });

      doc.save(`product-comparison-${Date.now()}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF download error:", error);
      toast.error("Failed to download PDF");
    }
  };

  return handleDownload;
}

export default function DownloadButton({
  product1,
  product2,
}: DownloadButtonProps) {
  const handleDownload = useDownloadPDF();

  return (
    <div className="flex justify-center">
      <button
        onClick={() => handleDownload(product1, product2)}
        disabled={!product1 && !product2}
        title={
          !product1 && !product2
            ? "Select at least one product"
            : "Download comparison as PDF"
        }
        className={`px-6 py-3 font-semibold rounded-xl transition-all flex items-center gap-2 shadow-md hover:shadow-lg ${
          !product1 && !product2
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-linear-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:scale-105"
        }`}
      >
        <Download size={20} />
        <span className="whitespace-nowrap">Download PDF</span>
      </button>
    </div>
  );
}
