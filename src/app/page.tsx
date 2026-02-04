"use client";

import { useState, useEffect, ComponentType } from "react";
import CommonWrapper from "@/components/layout/CommonWrapper";
import Hero from "@/components/section/Hero";
import AllBrands from "@/components/section/AllBrands";
import SectionTitle from "@/components/layout/SectionTitle";
import CategorySmall from "@/components/section/CategorySmall";
import ProductView from "@/components/section/ProductView";
const ProductViewTyped = ProductView as unknown as ComponentType<any>;
import WebFutures from "@/components/section/WebFutures";
import CustomerSays from "@/components/section/CustomerSays";
import BlogTitle from "@/components/layout/BlogTitle";
import BlogCard from "@/components/parts/BlogCard";
import { API_ENDPOINTS } from "@/api/ApiEndPoint";
import axios, { AxiosResponse } from "axios";

interface Product {
  sale_count: number;
  [key: string]: any;
}

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [features, setFeatures] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.PRODUCT_LIMIT(8)}`);

        if (response.data?.status) {
          setFeatures(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res: AxiosResponse<any> = await axios.get(
          `${API_ENDPOINTS.PRODUCT_GET_ALL}`,
        );
        if (res.data?.status) {
          setAllProducts(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching limited products:", error);
      }
    };
    fetchProducts();
  }, []);
  const topSellingProducts = [...allProducts]
    .sort((a, b) => b.sale_count - a.sale_count)
    .slice(0, 8);
  return (
    <>
      <Hero />
      <AllBrands />

      <CommonWrapper>
        <SectionTitle
          title={"Products By"}
          titleInColor={"Category"}
          description={"Get Your Desired Product from Featured Category!"}
        />
        <CategorySmall />

        {/* Featured Products */}
        <SectionTitle
          title={"Featured"}
          titleInColor={"Products"}
          description={"Get Your Desired Product from Featured Category!"}
        />
        <ProductViewTyped products={features} isLoading={loading} />

        {/* Top Selling Products */}
        <SectionTitle
          title={"Top Selling"}
          titleInColor={"Products"}
          description={"Get Your Desired Product from Featured Category!"}
        />
        <ProductViewTyped products={topSellingProducts} isLoading={loading} />
      </CommonWrapper>

      <WebFutures />

      <CommonWrapper>
        <SectionTitle
          title={"Our Customers"}
          titleInColor={"Says"}
          description={"Get Your Most Valueable Customers Thinkings & Feedback"}
        />
        <CustomerSays />

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
