import Image from 'next/image';
import mainImg from '../assets/main.png';
import Link from 'next/link';


const Intro = () => {
    return (
        <div className="w-full min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 xl:px-24 py-16 lg:py-0 gap-16 overflow-hidden">

            {/* Left Column - Text Content */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center items-start space-y-8">

                {/* Badge */}
                <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 px-4 py-2 bg-indigo-100/50 rounded-full border border-indigo-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                        <path d="M20 3v4" />
                        <path d="M22 5h-4" />
                        <path d="M4 17v2" />
                        <path d="M5 18H3" />
                    </svg>
                    AI-Powered Document Generation
                </div>

                {/* Heading */}
                <h2 className="text-5xl md:text-6xl xl:text-7xl font-extrabold text-[#0f172a] tracking-tight leading-[1.1]">
                    Transform your website <br className="hidden lg:block" /> into a <span className="text-indigo-600">professional</span> <br className="hidden lg:block" /> <span className="text-indigo-600">brochure</span> in seconds
                </h2>

                {/* Paragraph */}
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
                    Stop spending thousands on graphic designers. BrochureAI crawls your site to generate stunning, brand-compliant brochures ready for print or digital distribution.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
                    <Link href='/generate' className="w-full sm:w-auto flex justify-center items-center gap-2 bg-[#5542f6] hover:bg-indigo-700 text-white px-8 py-3.5 rounded-lg font-medium transition-all shadow-md">
                        Get Started Free
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </Link>

                </div>

            </div>

            {/* Right Column - Image */}
            <div className="w-full lg:w-[45%] flex justify-end items-center relative">
                <Image
                    src={mainImg}
                    alt="AI Brochure Mockup"
                    className="w-full max-w-[800px] h-auto object-contain transition-transform duration-700 hover:scale-[1.02] lg:translate-x-8"
                    priority
                />
            </div>

        </div>
    )
}
export default Intro