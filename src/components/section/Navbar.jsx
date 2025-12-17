// "use client"
// import CommonWrapper from '@/components/layout/CommonWrapper';
// import Link from 'next/link';

// export default function Navbar() {
//     return (
//         <>
//             <div className="bg-white/50 backdrop-blur-[50px]">
//                 <CommonWrapper>
//                     <div className="flex justify-between items-center relative py-[10px] md:py-4">
//                         <Link
//                             href={'/'}
//                         >
//                             <svg
//                                 width={250}
//                                 height={55}
//                                 viewBox="0 0 250 55"
//                                 fill="none"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="w-[100px] md:w-[250px]"
//                                 preserveAspectRatio="xMidYMid meet"
//                             >
//                                 <path
//                                     d="M105.522 0.370789H114.498V15.2943C116.567 12.1072 119.224 9.20602 123.774 9.20602C130.569 9.20602 134.529 14.5835 134.529 23.2893V47.8441H125.547V26.6855C125.547 21.5913 123.537 18.9714 120.113 18.9714C116.688 18.9714 114.498 21.5917 114.498 26.6855V47.8441H105.522V0.370789Z"
//                                     fill="#231F20"
//                                 />
//                                 <path d="M250 0H241.119V6.92847H250V0Z" fill="#2CACE2" />
//                                 <path d="M250 12.8136H241.119V47.8445H250V12.8136Z" fill="#2CACE2" />
//                                 <path
//                                     d="M49.3846 39.5956H47.6482C43.4817 39.5956 39.8851 35.3725 39.3258 32.0798H61.6339C62.054 30.029 62.0952 29.0163 62.0952 28.1299C62.0952 16.9038 57.0735 6.64139 46.1101 6.64139C36.5561 6.64139 29.8801 15.9429 29.8801 27.2432V27.3901C29.8801 39.4998 37.1696 47.8453 47.0273 47.8453H54.917C52.6363 45.545 50.7576 42.7445 49.3846 39.5956ZM46.1098 15.6487C50.0286 15.6487 52.4817 19.047 53.0305 22.376H39.0061C39.7406 18.9753 42.2501 15.6487 46.1098 15.6487Z"
//                                     fill="#231F20"
//                                 />
//                                 <path
//                                     d="M87.1737 6.64062C77.0761 6.64062 69.8744 15.9421 69.8744 27.2455V27.3897C69.8744 38.6885 77.1376 47.8452 87.0471 47.8452H94.4034C92.1101 45.5393 90.2166 42.734 88.8328 39.5774H88.22C83.1129 39.5774 79.1091 33.2981 79.1091 27.2455V27.0934C79.1091 21.2629 82.4329 16.3133 87.1118 16.3133C90.4352 16.3133 93.2595 18.6734 94.6199 22.3347L94.6328 22.3141C95.2485 18.5936 96.5343 15.1435 98.3277 12.1241C95.571 9.05774 92.1181 6.64062 87.1737 6.64062Z"
//                                     fill="#231F20"
//                                 />
//                                 <path
//                                     d="M25.6962 6.83221H17.5078V0.370026H8.11359V6.83221H0C2.29573 9.09961 4.20004 11.8641 5.60413 14.972H8.11359V35.7284C8.11359 45.0611 12.0093 47.8434 17.7551 47.8434H26.7163C24.3768 45.5039 22.4522 42.6467 21.0583 39.431C20.8963 39.4723 20.7235 39.5055 20.5378 39.5055C18.4379 39.5055 17.5078 38.2281 17.5078 35.5944V14.9717H20.097C21.4986 11.8644 23.403 9.09961 25.6962 6.83221Z"
//                                     fill="#231F20"
//                                 />
//                                 <path
//                                     d="M157.715 23.9866C153.781 21.5544 150.125 19.4854 150.782 16.6999L150.815 16.5558C151.318 14.4199 153.474 13.7319 156.785 14.0488C157.844 14.1492 159.864 14.4766 161.809 14.9093C163.417 11.8171 165.596 9.06801 168.215 6.81111H158.462C150.41 6.38086 144.632 8.54506 142.951 15.6845L142.915 15.8261C141.217 23.0355 146.669 26.7304 151.675 29.5697C155.625 31.9298 160.559 33.5452 160.575 36.5549V36.7018C160.587 39.2735 158.475 40.8759 154.798 40.8553C153.048 40.8476 151.098 40.2365 149.202 39.5537C147.633 42.6277 145.564 45.6063 142.951 47.845L154.625 47.9044C162.399 47.9429 168.459 43.9339 168.415 35.7867V35.637C168.382 28.6627 162.613 26.9473 157.715 23.9866Z"
//                                     fill="#2CACE2"
//                                 />
//                                 <path d="M209.728 22.4991H199.927V32.3005H209.728V22.4991Z" fill="#2CACE2" />
//                                 <path
//                                     d="M209.727 54.1214C220.791 52.0989 229.528 43.3644 231.553 32.3006H209.727V54.1214Z"
//                                     fill="#2CACE2"
//                                 />
//                                 <path
//                                     d="M178.106 32.2998C180.129 43.3636 188.868 52.1005 199.927 54.121V32.2998H178.106Z"
//                                     fill="#2CACE2"
//                                 />
//                                 <path
//                                     d="M209.727 0.676727V22.4979H231.553C229.528 11.4387 220.791 2.70171 209.727 0.676727Z"
//                                     fill="#2CACE2"
//                                 />
//                                 <path
//                                     d="M199.926 0.676727C188.868 2.70171 180.128 11.439 178.105 22.4979H199.926V0.676727Z"
//                                     fill="#2CACE2"
//                                 />
//                             </svg>
//                         </Link>
//                         <div className="hidden md:flex justify-between items-center md:w-[588px] relative px-4 py-3 rounded-xl bg-white border border-[#bee5f6]">
//                             {/* <p className="text-lg text-[#808080]">Search products..</p> */}
//                             <input
//                                 className='text-lg w-full focus:outline-none'
//                                 placeholder='Search products..'
//                             />
//                             <button className="flex items-center relative gap-2.5 pl-3 border-l border-[#9ed9f2] cursor-pointer">
//                                 <svg
//                                     width={24}
//                                     height={24}
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className="w-6 h-6 relative"
//                                     preserveAspectRatio="none"
//                                 >
//                                     <path
//                                         d="M17.5 17.5L22 22"
//                                         stroke="#303030"
//                                         strokeWidth="1.5"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                     />
//                                     <path
//                                         d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
//                                         stroke="#303030"
//                                         strokeWidth="1.5"
//                                         strokeLinejoin="round"
//                                     />
//                                 </svg>
//                             </button>
//                         </div>
//                         <button className="flex items-center relative gap-2.5 p-2 rounded-xl bg-white border border-[#bee5f6] cursor-pointer md:hidden ml-auto mr-3">
//                             <svg
//                                 width={24}
//                                 height={24}
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="w-6 h-6 relative"
//                                 preserveAspectRatio="none"
//                             >
//                                 <path
//                                     d="M17.5 17.5L22 22"
//                                     stroke="#303030"
//                                     strokeWidth="1.5"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                 />
//                                 <path
//                                     d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
//                                     stroke="#303030"
//                                     strokeWidth="1.5"
//                                     strokeLinejoin="round"
//                                 />
//                             </svg>
//                         </button>
//                         <div className="flex items-center gap-2 md:gap-6">
//                             <Link
//                                 href={'/favourite'}
//                                 className="flex items-center relative gap-2"
//                             >
//                                 <div className="w-10 h-10 relative overflow-hidden rounded-[99px] bg-[#eaf7fc]">
//                                     <svg
//                                         width={24}
//                                         height={24}
//                                         viewBox="0 0 24 24"
//                                         fill="none"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="w-6 h-6 absolute left-2 top-2"
//                                         preserveAspectRatio="none"
//                                     >
//                                         <path
//                                             d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
//                                             stroke="#303030"
//                                             strokeWidth="1.5"
//                                             strokeLinecap="round"
//                                         />
//                                     </svg>
//                                     <div className="flex flex-col justify-center items-center w-3.5 h-3.5 absolute left-5 top-[6.5px] rounded-3xl bg-[#2cace2]">
//                                         <p className="text-[10px] text-center text-white">2</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col items-start relative space-y-[-2px] md:block">
//                                     <p className="text-base font-medium text-[#2cace2]">
//                                         Favourite
//                                     </p>
//                                     <p className="w-[70px] text-sm text-[#505050]">
//                                         ৳650
//                                     </p>
//                                 </div>
//                             </Link>
//                             <Link
//                                 href={'/mycart'}
//                                 className="flex items-center relative gap-2"
//                             >
//                                 <div className="w-10 h-10 relative overflow-hidden rounded-[99px] bg-[#eaf7fc]">
//                                     <svg
//                                         width={24}
//                                         height={24}
//                                         viewBox="0 0 24 24"
//                                         fill="none"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="w-6 h-6 absolute left-2 top-2"
//                                         preserveAspectRatio="none"
//                                     >
//                                         <path
//                                             d="M8 16H15.2632C19.7508 16 20.4333 13.1808 21.261 9.06908C21.4998 7.88311 21.6192 7.29013 21.3321 6.89507C21.045 6.5 20.4947 6.5 19.3941 6.5H6"
//                                             stroke="#303030"
//                                             strokeWidth="1.5"
//                                             strokeLinecap="round"
//                                         />
//                                         <path
//                                             d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5"
//                                             stroke="#303030"
//                                             strokeWidth="1.5"
//                                             strokeLinecap="round"
//                                         />
//                                         <path
//                                             d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5"
//                                             stroke="#303030"
//                                             strokeWidth="1.5"
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                         />
//                                         <circle cx="10.5" cy="20.5" r="1.5" stroke="#303030" strokeWidth="1.5" />
//                                         <circle cx="17.5" cy="20.5" r="1.5" stroke="#303030" strokeWidth="1.5" />
//                                     </svg>
//                                     <div className="flex flex-col justify-center items-center w-3.5 h-3.5 absolute left-5 top-[6.5px] rounded-3xl bg-[#2cace2]">
//                                         <p className="text-[10px] text-center text-white">3</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col items-start relative space-y-[-2px] hidden md:block">
//                                     <p className="text-base font-medium text-[#2cace2]">
//                                         My Cart
//                                     </p>
//                                     <p className="w-[60px] text-sm text-[#505050]">
//                                         ৳200
//                                     </p>
//                                 </div>
//                             </Link>
//                         </div>
//                     </div>
//                 </CommonWrapper>
//             </div>
//         </>
//     );
// }
"use client";
import CommonWrapper from '@/components/layout/CommonWrapper';
import { Handbag } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [openDropdown, setOpenDropdown] = useState(false);

    return (
        <>
            <div className="bg-white/50 backdrop-blur-[50px] sticky top-0 z-50">
                <CommonWrapper>
                    <div className="flex justify-between items-center relative py-[10px] md:py-4">

                        {/* ---------- LOGO ---------- */}
                        <Link href={'/'}>
                            <svg
                                 width={250}
                                height={55}
                                 viewBox="0 0 250 55"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                                 className="w-[100px] md:w-[250px]"
                                 preserveAspectRatio="xMidYMid meet"
                             >
                                 <path
                                     d="M105.522 0.370789H114.498V15.2943C116.567 12.1072 119.224 9.20602 123.774 9.20602C130.569 9.20602 134.529 14.5835 134.529 23.2893V47.8441H125.547V26.6855C125.547 21.5913 123.537 18.9714 120.113 18.9714C116.688 18.9714 114.498 21.5917 114.498 26.6855V47.8441H105.522V0.370789Z"
                                     fill="#231F20"
                                 />
                                 <path d="M250 0H241.119V6.92847H250V0Z" fill="#2CACE2" />
                                 <path d="M250 12.8136H241.119V47.8445H250V12.8136Z" fill="#2CACE2" />
                                 <path
                                     d="M49.3846 39.5956H47.6482C43.4817 39.5956 39.8851 35.3725 39.3258 32.0798H61.6339C62.054 30.029 62.0952 29.0163 62.0952 28.1299C62.0952 16.9038 57.0735 6.64139 46.1101 6.64139C36.5561 6.64139 29.8801 15.9429 29.8801 27.2432V27.3901C29.8801 39.4998 37.1696 47.8453 47.0273 47.8453H54.917C52.6363 45.545 50.7576 42.7445 49.3846 39.5956ZM46.1098 15.6487C50.0286 15.6487 52.4817 19.047 53.0305 22.376H39.0061C39.7406 18.9753 42.2501 15.6487 46.1098 15.6487Z"
                                    fill="#231F20"
                                 />                                <path
                                     d="M87.1737 6.64062C77.0761 6.64062 69.8744 15.9421 69.8744 27.2455V27.3897C69.8744 38.6885 77.1376 47.8452 87.0471 47.8452H94.4034C92.1101 45.5393 90.2166 42.734 88.8328 39.5774H88.22C83.1129 39.5774 79.1091 33.2981 79.1091 27.2455V27.0934C79.1091 21.2629 82.4329 16.3133 87.1118 16.3133C90.4352 16.3133 93.2595 18.6734 94.6199 22.3347L94.6328 22.3141C95.2485 18.5936 96.5343 15.1435 98.3277 12.1241C95.571 9.05774 92.1181 6.64062 87.1737 6.64062Z"
                                    fill="#231F20"
                                />
                                <path
                                     d="M25.6962 6.83221H17.5078V0.370026H8.11359V6.83221H0C2.29573 9.09961 4.20004 11.8641 5.60413 14.972H8.11359V35.7284C8.11359 45.0611 12.0093 47.8434 17.7551 47.8434H26.7163C24.3768 45.5039 22.4522 42.6467 21.0583 39.431C20.8963 39.4723 20.7235 39.5055 20.5378 39.5055C18.4379 39.5055 17.5078 38.2281 17.5078 35.5944V14.9717H20.097C21.4986 11.8644 23.403 9.09961 25.6962 6.83221Z"
                                     fill="#231F20"
                                />
                                 <path
                                     d="M157.715 23.9866C153.781 21.5544 150.125 19.4854 150.782 16.6999L150.815 16.5558C151.318 14.4199 153.474 13.7319 156.785 14.0488C157.844 14.1492 159.864 14.4766 161.809 14.9093C163.417 11.8171 165.596 9.06801 168.215 6.81111H158.462C150.41 6.38086 144.632 8.54506 142.951 15.6845L142.915 15.8261C141.217 23.0355 146.669 26.7304 151.675 29.5697C155.625 31.9298 160.559 33.5452 160.575 36.5549V36.7018C160.587 39.2735 158.475 40.8759 154.798 40.8553C153.048 40.8476 151.098 40.2365 149.202 39.5537C147.633 42.6277 145.564 45.6063 142.951 47.845L154.625 47.9044C162.399 47.9429 168.459 43.9339 168.415 35.7867V35.637C168.382 28.6627 162.613 26.9473 157.715 23.9866Z"
                                    fill="#2CACE2"
                                 />
                                 <path d="M209.728 22.4991H199.927V32.3005H209.728V22.4991Z" fill="#2CACE2" />
                                <path
                                     d="M209.727 54.1214C220.791 52.0989 229.528 43.3644 231.553 32.3006H209.727V54.1214Z"
                                     fill="#2CACE2"
                                />
                                <path
                                     d="M178.106 32.2998C180.129 43.3636 188.868 52.1005 199.927 54.121V32.2998H178.106Z"
                                     fill="#2CACE2"
                                 />
                                 <path
                                     d="M209.727 0.676727V22.4979H231.553C229.528 11.4387 220.791 2.70171 209.727 0.676727Z"
                                     fill="#2CACE2"
                                 />
                                 <path
                                    d="M199.926 0.676727C188.868 2.70171 180.128 11.439 178.105 22.4979H199.926V0.676727Z"
                                    fill="#2CACE2"
                               />
                             </svg>
                        </Link>

                        {/* ---------- SEARCH (DESKTOP) ---------- */}
                        <div className="hidden md:flex justify-between items-center md:w-[520px] lg:w-[588px] relative px-4 py-3 rounded-xl bg-white border border-[#bee5f6]">
                            <input
                                className="text-lg w-full focus:outline-none"
                                placeholder="Search products.."
                            />
                            <button className="flex items-center relative gap-2.5 pl-3 border-l border-[#9ed9f2] cursor-pointer">
                                <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 relative"
                                >
                                    <path
                                        d="M17.5 17.5L22 22"
                                        stroke="#303030"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                                        stroke="#303030"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* ---------- SEARCH (MOBILE) ---------- */}
                        <button className="flex items-center relative gap-2.5 p-2 rounded-xl bg-white border border-[#bee5f6] cursor-pointer md:hidden ml-auto mr-3">
                             <input
                                className="text-lg w-full focus:outline-none"
                                placeholder="Search products.."
                            />
                            <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 relative"
                            >
                                <path
                                    d="M17.5 17.5L22 22"
                                    stroke="#303030"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                                    stroke="#303030"
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </button>

                        {/* ---------- DESKTOP FAV + CART ---------- */}
                        <div className="hidden md:flex items-center gap-6">
                            {/* Favourite */}
                            <Link href={'/favourite'} className="flex items-center relative gap-2">
                                {/* SAME SVG — NOT MODIFIED */}
                                <div className="w-10 h-10 relative overflow-hidden rounded-[99px] bg-[#eaf7fc]">
                                     <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 absolute left-2 top-2"
                                        preserveAspectRatio="none"
                                    >
                                        <path
                                            d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
                                            stroke="#303030"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="flex flex-col justify-center items-center w-3.5 h-3.5 absolute left-5 top-[6.5px] rounded-3xl bg-[#2cace2]">
                                        <p className="text-[10px] text-white">2</p>
                                    </div>
                                </div>

                                <div className="md:block hidden">
                                    <p className="text-base font-medium text-[#2cace2]">Favourites</p>
                                    <p className="text-sm text-[#505050]">৳650</p>
                                </div>
                            </Link>

                            {/* Cart */}
                            <Link href={'/mycart'} className="flex items-center relative gap-2">
                                <div className="w-10 h-10 relative overflow-hidden rounded-[99px] bg-[#eaf7fc]">
                                     <svg
                                         width={24}
                                         height={24}
                                         viewBox="0 0 24 24"
                                         fill="none"
                                         xmlns="http:www.w3.org/2000/svg"
                                         className="w-6 h-6 absolute left-2 top-2"
                                         preserveAspectRatio="none"
                                     >
                                         <path
                                             d="M8 16H15.2632C19.7508 16 20.4333 13.1808 21.261 9.06908C21.4998 7.88311 21.6192 7.29013 21.3321 6.89507C21.045 6.5 20.4947 6.5 19.3941 6.5H6"
                                             stroke="#303030"
                                             strokeWidth="1.5"
                                             strokeLinecap="round"
                                         />
                                         <path
                                             d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5"
                                             stroke="#303030"
                                             strokeWidth="1.5"
                                             strokeLinecap="round"
                                         />
                                         <path
                                             d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5"
                                             stroke="#303030"
                                             strokeWidth="1.5"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                         />
                                         <circle cx="10.5" cy="20.5" r="1.5" stroke="#303030" strokeWidth="1.5" />
                                         <circle cx="17.5" cy="20.5" r="1.5" stroke="#303030" strokeWidth="1.5" />
                                     </svg>
                                    <div className="flex justify-center items-center w-3.5 h-3.5 absolute left-5 top-[6.5px] rounded-3xl bg-[#2cace2]">
                                        <p className="text-[10px] text-white">3</p>
                                    </div>
                                </div>

                                <div className="md:block hidden">
                                    <p className="text-base font-medium text-[#2cace2]">My Cart</p>
                                    <p className="text-sm text-[#505050]">৳200</p>
                                </div>
                            </Link>
                            {/* my order */}
                            <Link href={'/myorders'} className="flex items-center relative gap-2">
                                <div className="w-10 h-10 relative overflow-hidden rounded-[99px] bg-[#eaf7fc]">
                                    <div className='flex items-center justify-center'>
                                        <Handbag />
                                    </div>
                                    <div className="flex justify-center items-center w-3.5 h-3.5 absolute left-5 top-[6.5px] rounded-3xl bg-[#2cace2]">
                                        <p className="text-[10px] text-white">3</p>
                                    </div>
                                </div>

                                <div className="md:block hidden">
                                    <p className="text-base font-medium text-[#2cace2]">My Orders</p>
                                    <p className="text-sm text-[#505050]">৳200</p>
                                </div>
                            </Link>
                            {/* for desktopa avatar */}
                             <button
                                onClick={() => setOpenDropdown(!openDropdown)}
                                className="w-10 h-10 rounded-full bg-[#d8f1fb] flex items-center justify-center overflow-hidden"
                            >
                                {/* SIMPLE USER AVATAR ICON */}
                                <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="8" r="4" stroke="#303030" strokeWidth="1.5" />
                                    <path d="M4 20C4 15.5817 7.58172 12 12 12C16.4183 12 20 15.5817 20 20" stroke="#303030" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </button>
                            {/* ------------ */}
                               
                        </div>

                        {/* ---------- USER AVATAR (MOBILE + MEDIUM) ---------- */}
                        <div className="md:hidden relative">
                            <button
                                onClick={() => setOpenDropdown(!openDropdown)}
                                className="w-10 h-10 rounded-full bg-[#d8f1fb] flex items-center justify-center overflow-hidden"
                            >
                                {/* SIMPLE USER AVATAR ICON */}
                                <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="8" r="4" stroke="#303030" strokeWidth="1.5" />
                                    <path d="M4 20C4 15.5817 7.58172 12 12 12C16.4183 12 20 15.5817 20 20" stroke="#303030" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </button>

                            {openDropdown && (
  <div className="absolute right-0 mt-3 w-40 bg-white border border-[#bee5f6] rounded-xl shadow-lg p-3 flex flex-col gap-3">

    {/* Favourite */}
    <Link
      href="/favourite"
      className="flex items-center gap-2"
      onClick={() => setOpenDropdown(false)}
    >
      <div className="w-7 h-7 rounded-full bg-[#eaf7fc] flex items-center justify-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
            stroke="#303030"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span className="text-sm text-[#303030]">Favourite</span>
    </Link>

    {/* Cart */}
    <Link
      href="/mycart"
      className="flex items-center gap-2"
      onClick={() => setOpenDropdown(false)}
    >
      <div className="w-7 h-7 rounded-full bg-[#eaf7fc] flex items-center justify-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          <path
            d="M8 16H15.2632C19.7508 16 20.4333 13.1808 21.261 9.06908C21.4998 7.88311 21.6192 7.29013 21.3321 6.89507C21.045 6.5 20.4947 6.5 19.3941 6.5H6"
            stroke="#303030"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5"
            stroke="#303030"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5"
            stroke="#303030"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10.5" cy="20.5" r="1.5" stroke="#303030" strokeWidth="1.5" />
          <circle cx="17.5" cy="20.5" r="1.5" stroke="#303030" strokeWidth="1.5" />
        </svg>
      </div>
      <span className="text-sm text-[#303030]">My Cart</span>
    </Link>

  </div>
)}

                        </div>

                    </div>
                </CommonWrapper>
            </div>
        </>
    );
}
