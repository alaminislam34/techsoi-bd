'use client';
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import CommonWrapper from "@/components/layout/CommonWrapper";
import { blogList } from "@/components/lib/dummyProd";


  // new commit
  function OurBlogs() {
    return (
     <CommonWrapper>
     <section className="container mx-auto px-4 py-10">
      <h2 className="text-center text-3xl font-semibold mb-10 text-[#2CACE2]">
        Our Blogs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogList.map((blog) => (
          <article
            key={blog.id}
            className="bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 p-4"
          >
           <Link href={`/blog/${blog.id}`}>
              <div className="rounded-xl overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </Link>

            <div className="flex items-center gap-2 text-sm text-sky-600 mt-4">
              <CalendarDays size={18} />
              <span className="font-medium">{blog.date}</span>
            </div>

            <h3 className="text-lg font-semibold mt-3">{blog.name}</h3>

            <p className="text-gray-600 text-sm mt-2 leading-relaxed">
              {blog.shortDescription}
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
