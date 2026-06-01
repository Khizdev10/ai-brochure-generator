import Link from 'next/link';

export default function GeneratePage() {
    return (
        <div className="min-h-screen bg-[#fafcff] font-sans">
            {/* Header */}
            <header className="p-6">
                <Link href="/" className="inline-flex items-center gap-2 text-[#5542f6] font-semibold hover:opacity-80 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    BrochureAI
                </Link>
            </header>

            {/* Main Content */}
            <main className="max-w-2xl mx-auto px-6 pt-8 pb-20">
                {/* Progress */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-semibold text-[#5542f6]">Step 1 of 3</span>
                        <span className="text-sm font-medium text-slate-500">Source Selection</span>
                    </div>
                    <div className="flex gap-2 h-1.5">
                        <div className="flex-1 bg-teal-500 rounded-full"></div>
                        <div className="flex-1 bg-slate-200 rounded-full"></div>
                        <div className="flex-1 bg-slate-200 rounded-full"></div>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                        Where should we pull content from?
                    </h1>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Enter your company's website URL and our AI will automatically extract branding, services, and key messaging for your brochure.
                    </p>
                </div>

                {/* Form Section */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Company Website
                        </label>
                        <div className="flex items-center border border-slate-300 rounded-lg p-3 bg-white focus-within:border-[#5542f6] focus-within:ring-1 focus-within:ring-[#5542f6] transition-all shadow-sm">
                            <span className="text-slate-400 select-none">https://</span>
                            <input 
                                type="text" 
                                placeholder="www.yourcompany.com" 
                                className="flex-1 ml-2 outline-none bg-transparent text-slate-900 placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex gap-3 bg-[#f8faff] border border-[#eef2fc] rounded-xl p-4 shadow-sm">
                            <div className="text-[#5542f6] shrink-0 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-800">Auto-Extraction</h3>
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                    We'll fetch your logo, color palette, and core text content.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 bg-[#f8faff] border border-[#eef2fc] rounded-xl p-4 shadow-sm">
                            <div className="text-[#5542f6] shrink-0 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V5l8-3 8 3v8Z"/></svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-slate-800">Secure Scraping</h3>
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                    Read-only access. We only pull publicly visible information.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 space-y-4">
                        <button className="w-full flex justify-center items-center gap-2 bg-[#c4bdfb] hover:bg-[#b0a7f9] text-white py-3.5 rounded-lg font-semibold transition-colors shadow-sm">
                            Continue
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </button>
                        
                        <p className="text-center text-sm text-slate-500">
                            Don't have a website? <button className="text-[#5542f6] font-semibold hover:underline">Upload a PDF instead</button>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}