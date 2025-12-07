"use client";

import BlogTitle from "@/components/layout/BlogTitle";
import CommonWrapper from "@/components/layout/CommonWrapper";
import { blogList } from "@/components/lib/dummyProd";
import BlogCard from "@/components/parts/BlogCard";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function BlogPage() {
  const { id } = useParams();
  const blogId = Number(id);

  const blog = blogList.find((b) => b.id === blogId);

  if (!blog) {
    return (
      <CommonWrapper>
        <div className="text-center py-20 text-red-500">
          Blog not found.
        </div>
      </CommonWrapper>
    );
  }

  return (
    <CommonWrapper>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4 text-[#2CACE2]">
          {blog.name}
        </h1>

        <div className="flex items-center gap-2 text-sm text-sky-600 mb-6">
          <CalendarDays size={18} />
          <span className="font-medium">{blog.date}</span>
        </div>

        <div className="mb-6 rounded-xl overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.name}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        <p className="text-gray-700 leading-relaxed text-lg">
          {blog.shortDescription}
        </p>
      </section>
       <BlogTitle title={'Our Latest Blog'} description={'Get Your Desired Product from Featured Category!'} btnText={'Read All'} btnLink={'#'} />
        <BlogCard limit={3} />
    </CommonWrapper>
  );
}
