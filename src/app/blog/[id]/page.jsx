"use client";

import BlogTitle from "@/components/layout/BlogTitle";
import CommonWrapper from "@/components/layout/CommonWrapper";
import BlogCard from "@/components/parts/BlogCard";
import { useGetBlog } from "@/api/hooks/useBlogs";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function BlogPage() {
  const { id } = useParams();
  const blogId = Number(id);

  const { data: blogResponse, isLoading, isError } = useGetBlog(blogId);
  const blog = blogResponse?.data;

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <CommonWrapper>
        <div className="text-center py-20">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </CommonWrapper>
    );
  }

  if (isError || !blog) {
    return (
      <CommonWrapper>
        <div className="text-center py-20 text-red-500">Blog not found.</div>
      </CommonWrapper>
    );
  }

  return (
    <CommonWrapper>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4 text-[#2CACE2]">{blog.title}</h1>

        <div className="flex items-center gap-2 text-sm text-sky-600 mb-6">
          <CalendarDays size={18} />
          <span className="font-medium">{formatDate(blog.created_at)}</span>
        </div>

        <div className="mb-6 rounded-xl overflow-hidden h-96 bg-gray-200">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/icons/logo.png";
            }}
          />
        </div>

        <div className="prose max-w-4xl mx-auto">
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            {blog.short_description}
          </p>

          <div className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
            {blog.full_description}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-[#2CACE2]">More Blogs</h3>
          <BlogCard limit={6} />
        </div>
      </section>
    </CommonWrapper>
  );
}
