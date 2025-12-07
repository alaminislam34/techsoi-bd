import Link from "next/link";

export default function BlogTitle({ title, description, btnText, btnLink }) {
    return (
        <>
            <div className="flex justify-between items-end mt-12 md:mt-[120px]">
                <div className="flex flex-col gap-3">
                    <p className="text-[18px] md:text-[40px] font-semibold text-[#2cace2]">
                        {title}
                    </p>
                    <p className="w-[168px] md:w-[400px] text-[12px] md:text-lg text-[#808080]">
                        {description}
                    </p>
                </div>
                <Link
                    href={btnLink}
                    className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-md bg-[#bee5f6]/50 hover:bg-[#2CACE2] group"
                >
                    <p className="text-[16px] md:text-lg text-[#185f7c] group-hover:text-white">
                        {btnText}
                    </p>
                    <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 relative text-[#185f7c] group-hover:text-white"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M4 12H20M20 12L14 6M20 12L14 18"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </div>
        </>
    );
}