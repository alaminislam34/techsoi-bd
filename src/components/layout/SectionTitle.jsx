export default function SectionTitle({ title, titleInColor, description }) {
    return (
        <>
            <div className="flex flex-col items-center relative gap-3 mt-12 md:mt-[120px]">
                <p className="text-[18px] md:text-[40px] font-semibold text-center">
                    <span className="text-[#202020]">
                        {title}
                    </span>
                    <span className="text-[#2cace2]">
                        &nbsp;{titleInColor}
                    </span>
                </p>
                <p className="text-[14px] md:text-lg text-center text-[#808080]">
                    {description}
                </p>
            </div>
        </>
    );
}