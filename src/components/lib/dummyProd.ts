import ProductImage from "@/assets/product-image.png";
import ProductImage2 from "@/assets/reviewImg/prod1.png"
import ProductImage3 from "@/assets/reviewImg/prod2.png"
import ProductImage4 from "@/assets/reviewImg/prod3.png"
import type { StaticImageData } from "next/image";

// ---------- TYPES ----------
export interface ProductType {
  id: string;
  name: string;
  slug: string;
  category: string;

  image: StaticImageData | string;        // accepts imported image
  gallery: (StaticImageData | string)[];

  regularPrice: number;
  salePrice: number;

  rating: number;
  reviewCount: number;

  description: string;
  stockStatus: string;
}

// ---------- PRODUCT LIST ----------
export const productList: ProductType[] = [
  {
    id: "1",
    name: "RK M65 Tri mode / RGB",
    slug: "rk-m65-tri-mode-rgb-hot-swap",
    category: "Keyboard",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 4200,
    salePrice: 3600,

    rating: 4.5,
    reviewCount: 325,

    description:
      "The RK M65 Tri-Mode keyboard offers hot-swappable switches, RGB lighting, and multiple connectivity modes.",
    stockStatus: "In Stock",
  },

  {
    id: "2",
    name: "RK M75 Mechanical Keyboard",
    slug: "rk-m75-mechanical-keyboard",
    category: "Keyboard",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 4800,
    salePrice: 4200,

    rating: 4.7,
    reviewCount: 210,

    description:
      "RK M75 mechanical keyboard with premium stabilizers and smooth typing experience.",
    stockStatus: "In Stock",
  },

  {
    id: "3",
    name: "Logitech G102 Gaming Mouse",
    slug: "logitech-g102-gaming-mouse",
    category: "Mouse",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 1500,
    salePrice: 1300,

    rating: 4.6,
    reviewCount: 500,

    description: "A lightweight gaming mouse with high DPI precision sensor.",
    stockStatus: "In Stock",
  },

  {
    id: "4",
    name: "Razer DeathAdder V2",
    slug: "razer-deathadder-v2",
    category: "Mouse",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 6200,
    salePrice: 5700,

    rating: 4.8,
    reviewCount: 780,

    description:
      "Ergonomic gaming mouse with Razer's focus+ optical sensor and durable switches.",
    stockStatus: "In Stock",
  },

  {
    id: "5",
    name: "HP Pavilion Laptop 15",
    slug: "hp-pavilion-15-laptop",
    category: "Laptop",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 62000,
    salePrice: 59000,

    rating: 4.4,
    reviewCount: 150,

    description: "Powerful and stylish laptop with excellent performance.",
    stockStatus: "In Stock",
  },

  {
    id: "6",
    name: "ASUS TUF Gaming Laptop",
    slug: "asus-tuf-gaming-laptop",
    category: "Laptop",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 88000,
    salePrice: 82000,

    rating: 4.7,
    reviewCount: 290,

    description: "Durable gaming laptop built with high-end GPU and cooling.",
    stockStatus: "In Stock",
  },

  {
    id: "7",
    name: "Gigabyte C200 Glass Casing",
    slug: "gigabyte-c200-glass",
    category: "Casing",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 3500,
    salePrice: 3200,

    rating: 4.3,
    reviewCount: 98,

    description: "Tempered-glass PC casing with strong airflow and RGB.",
    stockStatus: "In Stock",
  },

  {
    id: "8",
    name: "Montech Air 100 Case",
    slug: "montech-air-100",
    category: "Casing",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 4200,
    salePrice: 3990,

    rating: 4.6,
    reviewCount: 140,

    description: "High airflow case designed for performance and aesthetics.",
    stockStatus: "In Stock",
  },

  {
    id: "9",
    name: "Dell 24-inch IPS Monitor",
    slug: "dell-24-ips-monitor",
    category: "Monitor",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 16500,
    salePrice: 15500,

    rating: 4.5,
    reviewCount: 210,

    description: "Vibrant IPS monitor with ultra-thin bezels and color accuracy.",
    stockStatus: "In Stock",
  },

  {
    id: "10",
    name: "Acer Nitro 27 Gaming Monitor",
    slug: "acer-nitro-27-monitor",
    category: "Monitor",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 26500,
    salePrice: 24900,

    rating: 4.8,
    reviewCount: 330,

    description: "Gaming monitor with high refresh rate and smooth performance.",
    stockStatus: "In Stock",
  },

  {
    id: "11",
    name: "Sony Bluetooth Speaker XB12",
    slug: "sony-xb12-bluetooth-speaker",
    category: "Speaker",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 4500,
    salePrice: 4200,

    rating: 4.6,
    reviewCount: 470,

    description: "Portable speaker with deep bass and long battery life.",
    stockStatus: "In Stock",
  },

  {
    id: "12",
    name: "JBL Charge 5 Speaker",
    slug: "jbl-charge-5",
    category: "Speaker",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 14500,
    salePrice: 13500,

    rating: 4.9,
    reviewCount: 540,

    description: "Premium Bluetooth speaker with powerful stereo output.",
    stockStatus: "In Stock",
  },

  {
    id: "13",
    name: "Samsung EVO 500GB SSD",
    slug: "samsung-evo-500gb-ssd",
    category: "SSD",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 5200,
    salePrice: 4900,

    rating: 4.8,
    reviewCount: 600,

    description: "High-performance SSD with fast read/write speeds.",
    stockStatus: "In Stock",
  },

  {
    id: "14",
    name: "WD Blue 1TB HDD",
    slug: "wd-blue-1tb-hdd",
    category: "HDD",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 4200,
    salePrice: 3990,

    rating: 4.4,
    reviewCount: 310,

    description: "Reliable HDD storage for long-term usage.",
    stockStatus: "In Stock",
  },

  {
    id: "15",
    name: "Corsair 8GB DDR4 RAM",
    slug: "corsair-8gb-ddr4-ram",
    category: "RAM",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 3200,
    salePrice: 3000,

    rating: 4.7,
    reviewCount: 450,

    description: "Fast DDR4 RAM optimized for gaming performance.",
    stockStatus: "In Stock",
  },
  {
    id: "16",
    name: "Corsair 8GB DDR4 RAM",
    slug: "corsair-8gb-ddr4-ram",
    category: "Keyboard",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 3200,
    salePrice: 3000,

    rating: 4.7,
    reviewCount: 450,

    description: "Fast DDR4 RAM optimized for gaming performance.",
    stockStatus: "In Stock",
  },
  {
    id: "17",
    name: "Corsair 8GB DDR4 RAM",
    slug: "corsair-8gb-ddr4-ram",
    category: "Keyboard",
    image: ProductImage,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 3200,
    salePrice: 3000,

    rating: 4.7,
    reviewCount: 450,

    description: "Fast DDR4 RAM optimized for gaming performance.",
    stockStatus: "In Stock",
  },
  {
    id: "18",
    name: "Corsair 8GB DDR4 RAM",
    slug: "corsair-8gb-ddr4-ram",
    category: "Keyboard",
    image: ProductImage4,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 3200,
    salePrice: 3000,

    rating: 4.7,
    reviewCount: 450,

    description: "Fast DDR4 RAM optimized for gaming performance.",
    stockStatus: "In Stock",
  },
  {
    id: "19",
    name: "Corsair 8GB DDR4 RAM",
    slug: "corsair-8gb-ddr4-ram",
    category: "Keyboard",
    image: ProductImage3,
    gallery: [ProductImage3, ProductImage, ProductImage, ProductImage],

    regularPrice: 3200,
    salePrice: 3000,

    rating: 4.7,
    reviewCount: 450,

    description: "Fast DDR4 RAM optimized for gaming performance.",
    stockStatus: "In Stock",
  },
  {
    id: "20",
    name: "Corsair 8GB DDR4 RAM",
    slug: "corsair-8gb-ddr4-ram",
    category: "Keyboard",
    image: ProductImage2,
    gallery: [ProductImage, ProductImage, ProductImage, ProductImage],

    regularPrice: 3200,
    salePrice: 3000,

    rating: 4.7,
    reviewCount: 450,

    description: "Fast DDR4 RAM optimized for gaming performance.",
    stockStatus: "In Stock",
  },
];


import BlogImage from '@/assets/blog.png';


export const blogList = [
  {
    id: 1,
    name: 'আপনার পিসি বানানোর সম্পূর্ণ গাইড – যা জানা জরুরি',
    slug: 'build-your-dream-pc-complete-guide',
    image: BlogImage,
    shortDescription:
      'নিজের হাতে পিসি বানানো মানেই পারফরম্যান্স, বাজেট আর ডিজাইনে পুরো নিয়ন্ত্রণ রাখা। কোন প্রসেসর, গ্রাফিক্স কার্ড বা মাদারবোর্ড নেবেন তা আপনার প্রয়োজন অনুযায়ী ঠিক করতে পারবেন।',
    date: '20-Jun-2025',
  },
  {
    id: 2,
    name: 'গেমিং পিসির জন্য সঠিক গ্রাফিক্স কার্ড বাছাই করার উপায়',
    slug: 'choose-right-graphics-card-for-gaming',
    image: BlogImage,
    shortDescription:
      'RTX না Radeon? VRAM কত হলে ভালো? এই ব্লগে জানুন আপনার গেমিং রেজোলিউশন ও বাজেট অনুযায়ী কোন গ্রাফিক্স কার্ড সবচেয়ে উপযুক্ত।',
    date: '18-Jun-2025',
  },
  {
    id: 3,
    name: 'SSD আপগ্রেড করলে আপনার পিসি কতটা দ্রুত হবে?',
    slug: 'ssd-upgrade-speed-benefits',
    image: BlogImage,
    shortDescription:
      'কম্পিউটার স্লো লাগছে? SSD ব্যবহার করলে বুট টাইম, ফাইল লোডিং ও সফটওয়্যার ওপেনিংয়ে পার্থক্য বোঝা যায়।',
    date: '16-Jun-2025',
  },
  {
    id: 4,
    name: 'ল্যাপটপ কেনার আগে যে ৭টি বিষয় অবশ্যই দেখবেন',
    slug: 'laptop-buying-guide-7-things',
    image: BlogImage,
    shortDescription:
      'স্টুডেন্ট, অফিস বা গেমিং—যার জন্যই হোক, ভুল ল্যাপটপ কিনলে পরে পস্তাতে হয়। এই গাইড সাহায্য করবে।',
    date: '14-Jun-2025',
  },
  {
    id: 5,
    name: 'ওয়ার্ক ফ্রম হোম সেটআপ: কোন কোন ডিভাইস দরকার',
    slug: 'work-from-home-essential-setup',
    image: BlogImage,
    shortDescription:
      'আরামদায়ক ও প্রোডাকটিভ ওয়ার্ক ফ্রম হোম সেটআপের জন্য প্রয়োজনীয় ডিভাইসগুলোর তালিকা।',
    date: '12-Jun-2025',
  },
  {
    id: 6,
    name: 'মেকানিক্যাল কীবোর্ড কেন এখন এত জনপ্রিয়?',
    slug: 'why-mechanical-keyboards-are-popular',
    image: BlogImage,
    shortDescription:
      'টাইপিং স্পিড, ডিউরেবিলিটি ও গেমিং পারফরম্যান্সের কারণে কেন মেকানিক্যাল কীবোর্ড জনপ্রিয় হয়ে উঠছে।',
    date: '10-Jun-2025',
  },
  {
    id: 7,
    name: 'ল্যাপটপ অতিরিক্ত গরম হওয়ার কারণ ও সমাধান',
    slug: 'laptop-overheating-causes-solutions',
    image: BlogImage,
    shortDescription:
      'ল্যাপটপ হিটিং পারফরম্যান্স ও ব্যাটারির জন্য ক্ষতিকর। কীভাবে সহজে এই সমস্যা কমাবেন জেনে নিন।',
    date: '08-Jun-2025',
  },
  {
    id: 8,
    name: 'ডুয়াল মনিটর সেটআপ কি সত্যিই দরকারি?',
    slug: 'dual-monitor-setup-benefits',
    image: BlogImage,
    shortDescription:
      'মাল্টিটাস্কিং করলে ডুয়াল মনিটর কতটা কার্যকর হতে পারে—এই ব্লগে বিস্তারিত আলোচনা করা হয়েছে।',
    date: '06-Jun-2025',
  },
  {
    id: 9,
    name: 'বাজেটের মধ্যে সেরা গেমিং অ্যাকসেসরিজ গাইড',
    slug: 'best-budget-gaming-accessories',
    image: BlogImage,
    shortDescription:
      'কম বাজেটেও ভালো গেমিং এক্সপেরিয়েন্স সম্ভব যদি সঠিক অ্যাকসেসরিজ বাছা যায়।',
    date: '04-Jun-2025',
  },
  {
    id: 10,
    name: 'নতুন পিসির জন্য উইন্ডোজ না লিনাক্স—কোনটি ভালো?',
    slug: 'windows-vs-linux-for-new-pc',
    image: BlogImage,
    shortDescription:
      'আপনার কাজের ধরন অনুযায়ী কোন অপারেটিং সিস্টেম আপনার জন্য সবচেয়ে সুবিধাজনক হবে তা জানুন।',
    date: '02-Jun-2025',
  },
];
