"use client";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import CommonWrapper from "@/components/layout/CommonWrapper";
import { useGetAllBlogs } from "@/api/hooks/useBlogs";

function OurBlogs() {
  const { data: blogsResponse, isLoading, isError } = useGetAllBlogs();
  const blogs = blogsResponse?.data || [];

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
        <section className="container mx-auto px-4 py-10">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </section>
      </CommonWrapper>
    );
  }

  if (isError || blogs.length === 0) {
    return (
      <CommonWrapper>
        <section className="container mx-auto px-4 py-10">
          <div className="flex justify-center items-center h-96">
            <p className="text-lg text-gray-500">No blogs available</p>
          </div>
        </section>
      </CommonWrapper>
    );
  }

  return (
    <CommonWrapper>
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-center text-3xl font-semibold mb-10 text-[#2CACE2]">
          Our Blogs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-2xl border my-2 border-[#bee5f6] p-4 hover:-translate-y-3 duration-100 ease-linear hover:shadow-[0_3px_15px_#72C7EC] hover:border-[#72C7EC]"
            >
              <Link href={`/blog/${blog.id}`}>
                <div className="rounded-xl overflow-hidden h-48 bg-gray-200">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/icons/logo.png";
                    }}
                  />
                </div>
              </Link>

              <div className="flex items-center gap-2 text-sm text-sky-600 mt-4">
                <CalendarDays size={18} />
                <span className="font-medium">
                  {formatDate(blog.created_at)}
                </span>
              </div>

              <h3 className="text-lg font-semibold mt-3 line-clamp-2">
                {blog.title_bn}
              </h3>

              <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-2">
                {blog.short_description}
              </p>

              <Link
                href={`/blog/${blog.id}`}
                className="inline-block mt-4 text-sm text-sky-700 font-semibold"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </CommonWrapper>
  );
}

export default OurBlogs;
