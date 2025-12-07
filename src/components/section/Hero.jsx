import CommonWrapper from '@/components/layout/CommonWrapper';
import Image from 'next/image';
import HeroImage from '@/assets/Hero-Banner.png';
import Link from 'next/link';

export default function Hero() {
    return (
        <>
            <div className="my-3 md:my-8">
                <CommonWrapper>
                    <Link
                        href={'#'}
                    >
                        <Image
                            src={HeroImage}
                            alt='hero'
                        />
                    </Link>
                </CommonWrapper>
            </div>
        </>
    );
}
