import SafeImage from "@/components/ui/SafeImage";
import TeamImg from "@/assets/reviewImg/aboutImg.jpg";
import { Check } from "lucide-react";
import CommonWrapper from "@/components/layout/CommonWrapper";
import WebFutures from "@/components/section/WebFutures";
import BlogTitle from "@/components/layout/BlogTitle";
import BlogCard from "@/components/parts/BlogCard";

export default function AboutPage() {
  return (
    <>
      <CommonWrapper>
        <main className=" py-10">
          <div className="relative w-full h-95 rounded-2xl overflow-hidden">
            <SafeImage
              src={TeamImg}
              fallbackSrc={TeamImg}
              alt="Techsoi Team"
              fill
              priority
              className="object-cover"
            />
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold mb-3">ভূমিকা:</h2>
            <p className="text-gray-700 leading-relaxed">
              Techsoi একটি আধুনিক প্রযুক্তিনির্ভর প্রতিষ্ঠান যেখানে উদ্ভাবন,
              নির্ভরযোগ্যতা এবং গ্রাহক সন্তুষ্টিকে সর্বাধিক গুরুত্ব দেওয়া হয়।
              প্রযুক্তিকে মানুষের দৈনন্দিন জীবনের সহজ ও কার্যকর সমাধানে রূপান্তর
              করাই আমাদের মূল লক্ষ্য।
            </p>
          </section>

          <hr className="my-8" />

          <section>
            <h2 className="text-2xl font-semibold mb-4">আমরা যারা শুরু:</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Techsoi প্রতিষ্ঠিত হয় কিছু দক্ষ ও অভিজ্ঞ প্রযুক্তি বিশেষজ্ঞের
              উদ্যোগে। শুরু থেকেই আমরা মানসম্পন্ন প্রযুক্তি সেবা এবং গ্রাহক
              সন্তুষ্টিকে সর্বোচ্চ অগ্রাধিকার দিয়ে কাজ করছি।
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>ওয়েবসাইট ও সফটওয়্যার ডেভেলপমেন্ট</li>
              <li>ই–কমার্স সল্যুশন</li>
              <li>ডিজিটাল মার্কেটিং ও SEO</li>
              <li>কাস্টম সফটওয়্যার সাপোর্ট</li>
              <li>UI/UX ডিজাইন ও ব্র্যান্ডিং</li>
              <li>২৪/৭ কাস্টমার সাপোর্ট</li>
            </ul>
          </section>

          <hr className="my-8" />

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              কেন Techsoi বেছে নেবেন?
            </h2>

            <ul className="space-y-3">
              {[
                "আসল পণ্য: শুধুমাত্র ব্র্যান্ড-অরিজিনাল ও গ্যারান্টিযুক্ত পণ্য",
                "অনলাইন ও অফলাইন সুবিধা: ওয়েবসাইট, ফোন ও শোরুম থেকে কেনাকাটা",
                "দ্রুত ডেলিভারি: সারাদেশে দ্রুততম সময়ে অর্ডার ডেলিভারি",
                "সাশ্রয়ী মূল্য: প্রতিযোগিতামূলক ও যুক্তিসঙ্গত দাম",
                "বিক্রয়োত্তর সেবা: ওয়ারেন্টি, রিপ্লেসমেন্ট ও টেক সাপোর্ট",
                "২৪/৭ কাস্টমার কেয়ার: যেকোনো সমস্যায় অনলাইন সাপোর্ট",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-2 text-gray-700">
                  <Check className="text-green-500 mt-1" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <hr className="my-8" />

          <section>
            <h2 className="text-2xl font-semibold mb-4">আমাদের টিম:</h2>
            <p className="text-gray-700 mb-4">
              Techsoi-এর মূল শক্তি হলো আমাদের পেশাদার ও অভিজ্ঞ টিম।
            </p>

            <ul className="space-y-3">
              {[
                "প্রোডাক্ট স্পেশালিস্ট: সঠিক প্রোডাক্ট নির্বাচনে সহায়তা",
                "টেকনিক্যাল টিম: হার্ডওয়্যার ও সফটওয়্যার সাপোর্টে দক্ষ",
                "কাস্টমার কেয়ার: অর্ডার, রিটার্ন ও সার্ভিস সাপোর্ট",
                "লজিস্টিক টিম: সারাদেশে নির্ভরযোগ্য ডেলিভারি",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-2 text-gray-700">
                  <Check className="text-green-500 mt-1" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <hr className="my-8" />

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              আমাদের সেবার বিশেষ দিক:
            </h2>

            <ul className="space-y-3 text-gray-700">
              <li>
                💻 কম্পিউটার ও ল্যাপটপ সেলস – অফিস, স্টুডেন্ট ও গেমিং সেটআপ
              </li>
              <li>🔧 কম্পিউটার রিপেয়ার ও আপগ্রেড</li>
              <li>🖨️ প্রিন্টার ও নেটওয়ার্কিং সলিউশন</li>
              <li>🎧 এক্সেসরিজ ও গ্যাজেটস</li>
              <li>🛒 অনলাইন অর্ডার ও দ্রুত ডেলিভারি সিস্টেম</li>
            </ul>
          </section>

          <hr className="my-8" />

          {/* ভবিষ্যৎ পরিকল্পনা */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">ভবিষ্যৎ পরিকল্পনা:</h2>

            <ul className="space-y-3 text-gray-700">
              <li>🚀 Techsoi মোবাইল অ্যাপ – অর্ডার, ট্র্যাকিং ও সাপোর্ট</li>
              <li>🏬 নতুন শোরুম ও সার্ভিস সেন্টার সম্প্রসারণ</li>
              <li>🧠 AI-চালিত রেকমেন্ডেশন সিস্টেম</li>
              <li>🎓 টেক এডুকেশন ও ইউজার গাইড সাপোর্ট</li>
            </ul>
          </section>

          <hr className="my-8" />

          {/* ভিশন */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">আমাদের ভিশন:</h2>
            <p className="text-gray-700 leading-relaxed">
              প্রযুক্তিকে আরও সহজ, আধুনিক ও সাশ্রয়ী করে তোলা এবং Techsoi-কে একটি
              বিশ্বমানের নির্ভরযোগ্য প্রযুক্তি ব্র্যান্ডে রূপান্তর করাই আমাদের
              দীর্ঘমেয়াদি লক্ষ্য।
            </p>
          </section>
        </main>
      </CommonWrapper>
      <WebFutures />

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
