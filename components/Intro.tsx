import Image from 'next/image';
import mainImg from '../assets/main.png';

const Intro = () => {
    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-16 pt-20 gap-8 md:gap-16">

            <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center mb-6 gap-2 text-sm font-medium text-purple-800 px-4 py-1.5 bg-[rgba(216,180,254,0.3)] w-max rounded-full border border-[rgba(216,180,254,0.5)] shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                        <path d="M20 3v4" />
                        <path d="M22 5h-4" />
                        <path d="M4 17v2" />
                        <path d="M5 18H3" />
                    </svg>
                    Ai powered document generation
                </div>
                <h2 className="text-4xl md:text-5xl xl:text-7xl font-bold text-left leading-tight">
                    Transform your website into a <span className="text-blue-600">professional brochure</span> in seconds
                </h2>
            </div>

            <div className="w-full md:w-1/2 flex justify-center items-center">
                <Image
                    src={mainImg}
                    alt="AI Brochure Mockup"
                    className="w-full max-w-2xl h-auto drop-shadow-2xl rounded-2xl transition-transform duration-500 hover:scale-105"
                    priority
                />
            </div>

        </div>
    )
}
export default Intro