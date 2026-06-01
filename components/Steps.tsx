const Steps = () => {
    return (
        <section className="w-full bg-white py-24 px-6 lg:px-16 xl:px-24">
            <div className="max-w-screen-xl mx-auto flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">How it works</h2>
                <p className="text-slate-500 text-lg mb-16 text-center">Three simple steps to professional marketing collateral.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {/* Card 1 */}
                    <div className="bg-[#f4f7fe] p-8 md:p-10 rounded-xl flex flex-col transition-all duration-300 hover:shadow-sm hover:-translate-y-1 border border-transparent hover:border-blue-100">
                        <div className="w-12 h-12 bg-[#e6eeff] text-[#1e3a8a] rounded-lg flex items-center justify-center mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-[#0f172a] mb-3">Paste URL</h3>
                        <p className="text-slate-600 leading-relaxed text-[15px]">
                            Input your website address. Our AI scans your pages for key messaging, imagery, and brand style.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#f4f7fe] p-8 md:p-10 rounded-xl flex flex-col transition-all duration-300 hover:shadow-sm hover:-translate-y-1 border border-transparent hover:border-blue-100">
                        <div className="w-12 h-12 bg-[#e6eeff] text-[#1e3a8a] rounded-lg flex items-center justify-center mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                        </div>
                        <h3 className="text-xl font-bold text-[#0f172a] mb-3">AI Synthesis</h3>
                        <p className="text-slate-600 leading-relaxed text-[15px]">
                            The AI organizes content into logical sections and creates a high-conversion brochure layout automatically.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#f4f7fe] p-8 md:p-10 rounded-xl flex flex-col transition-all duration-300 hover:shadow-sm hover:-translate-y-1 border border-transparent hover:border-blue-100">
                        <div className="w-12 h-12 bg-[#e6eeff] text-[#1e3a8a] rounded-lg flex items-center justify-center mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
                        </div>
                        <h3 className="text-xl font-bold text-[#0f172a] mb-3">Export & Print</h3>
                        <p className="text-slate-600 leading-relaxed text-[15px]">
                            Download high-quality PDFs with bleed marks for professional printing or share digital versions instantly.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Steps;