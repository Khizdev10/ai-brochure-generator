import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
    return (
        <div className="bg-sky-50 min-h-screen flex flex-col">
            <Navbar />

            {/* Hero */}
            <section className="px-6 lg:px-16 xl:px-24 pt-20 pb-12 text-center">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 px-4 py-2 bg-indigo-100/60 rounded-full border border-indigo-100 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Get In Touch
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-[#0f172a] tracking-tight mb-5">
                    Let&apos;s <span className="text-indigo-600">connect</span>
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    Have a question, feedback, or want to collaborate? Reach out — I&apos;m always happy to chat.
                </p>
            </section>

            {/* Contact Cards */}
            <section className="px-6 lg:px-16 xl:px-24 pb-24 flex-1">
                <div className="max-w-screen-md mx-auto space-y-5">

                    {/* Email Card */}
                    <a
                        href="mailto:khizdev10@gmail.com"
                        className="group flex items-center gap-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-6"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ea4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email</p>
                            <p className="text-lg font-bold text-slate-900 truncate">khizdev10@gmail.com</p>
                            <p className="text-sm text-slate-500 mt-0.5">Drop me a message anytime</p>
                        </div>
                        <div className="shrink-0 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                            </svg>
                        </div>
                    </a>

                    {/* LinkedIn Card */}
                    <a
                        href="https://www.linkedin.com/in/khizdev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 p-6"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#0077b5">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">LinkedIn</p>
                            <p className="text-lg font-bold text-slate-900 truncate">linkedin.com/in/khizdev</p>
                            <p className="text-sm text-slate-500 mt-0.5">Connect with me professionally</p>
                        </div>
                        <div className="shrink-0 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                            </svg>
                        </div>
                    </a>

                    {/* Divider info */}
                    <div className="pt-8 pb-4">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-slate-200" />
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Or try the tool</span>
                            <div className="flex-1 h-px bg-slate-200" />
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-8 text-center text-white shadow-md">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Ready to create your brochure?</h3>
                        <p className="text-white/70 text-sm leading-relaxed mb-6">
                            No design skills needed. Just paste your URL and BrochureAI handles the rest.
                        </p>
                        <Link
                            href="/generate"
                            className="inline-flex items-center gap-2 bg-white text-indigo-700 px-7 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-sm"
                        >
                            Start for Free
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
