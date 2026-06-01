"use client";

import Link from 'next/link';
import { useState } from 'react';
import { scrapeFullWebsite, scrapeWebsite } from '../src/lib/scraper';
import { structureData, createMarkdownBroucher } from '../src/lib/gemini'

const styleOptions = [
    {
        id: 'business',
        title: 'Business',
        subtitle: 'Clean & Professional',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>,
        imgClass: "bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center grayscale"
    },
    {
        id: 'enterprise',
        title: 'Enterprise',
        subtitle: 'Data-driven & Robust',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>,
        imgClass: "bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center grayscale"
    },
    {
        id: 'creative',
        title: 'Creative',
        subtitle: 'Bold & Modern',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>,
        imgClass: "bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center grayscale"
    },
    {
        id: 'minimal',
        title: 'Minimal',
        subtitle: 'Sleek & Simple',
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
        imgClass: "bg-[url('https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center grayscale"
    }
];

export default function GeneratePage() {
    const [step, setStep] = useState<number>(1);
    const [sourceLink, setSourceLink] = useState<string>("");
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [generatedMarkdown, setGeneratedMarkdown] = useState<string>("");
    const [loadingStage, setLoadingStage] = useState<'idle' | 'scraping' | 'structuring' | 'generating'>('idle');

    return (
        <div className="min-h-screen bg-[#fafcff] font-sans">
            {/* Header */}
            <header className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link href="/" className="inline-flex items-center gap-2 text-[#5542f6] font-semibold hover:opacity-80 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    BrochureAI
                </Link>
                <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
                    <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
                    <Link href="#" className="hover:text-slate-900 transition-colors">Drafts</Link>
                    <Link href="#" className="hover:text-slate-900 transition-colors">Templates</Link>
                </div>
            </header>

            {loadingStage === 'idle' && step === 1 && (
                <main className="max-w-2xl mx-auto px-6 pt-8 pb-20">
                    {/* Progress */}
                    <div className="mb-12 flex flex-col items-center">
                        <span className="text-[13px] font-semibold text-[#5542f6] mb-4">Step 1: Source Selection</span>
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-[#5542f6] text-white flex items-center justify-center text-sm font-bold shadow-sm">1</div>
                            <div className="w-12 sm:w-16 h-[2px] bg-[#eef2fc]"></div>
                            <div className="w-8 h-8 rounded-full bg-[#eef2fc] text-slate-400 flex items-center justify-center text-sm font-bold">2</div>
                            <div className="w-12 sm:w-16 h-[2px] bg-[#eef2fc]"></div>
                            <div className="w-8 h-8 rounded-full bg-[#eef2fc] text-slate-400 flex items-center justify-center text-sm font-bold">3</div>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                            Where should we pull content from?
                        </h1>
                        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
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
                                    value={sourceLink}
                                    onChange={(e) => setSourceLink(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex gap-3 bg-[#f8faff] border border-[#eef2fc] rounded-xl p-4 shadow-sm">
                                <div className="text-[#5542f6] shrink-0 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V5l8-3 8 3v8Z" /></svg>
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
                            <button
                                disabled={!sourceLink.trim()}
                                onClick={() => setStep(2)}
                                className={`w-full flex justify-center items-center gap-2 py-3.5 rounded-lg font-semibold transition-colors shadow-sm ${sourceLink.trim()
                                    ? "bg-[#5542f6] hover:bg-indigo-700 text-white cursor-pointer"
                                    : "bg-[#c4bdfb] text-white cursor-not-allowed"
                                    }`}
                            >
                                Continue
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </button>

                            <p className="text-center text-sm text-slate-500">
                                Don't have a website? <button className="text-[#5542f6] font-semibold hover:underline">Upload a PDF instead</button>
                            </p>
                        </div>
                    </div>
                </main>
            )}

            {loadingStage === 'idle' && step === 2 && (
                <main className="max-w-5xl mx-auto px-6 pt-8 pb-20">
                    {/* Progress */}
                    <div className="mb-12 flex flex-col items-center">
                        <span className="text-[13px] font-semibold text-[#5542f6] mb-4">Step 2: Selection</span>
                        <div className="flex items-center">
                            <button onClick={() => setStep(1)} className="w-8 h-8 rounded-full bg-[#5542f6] text-white flex items-center justify-center text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors">1</button>
                            <div className="w-12 sm:w-16 h-[2px] bg-[#5542f6]"></div>
                            <div className="w-8 h-8 rounded-full bg-[#5542f6] text-white flex items-center justify-center text-sm font-bold shadow-sm">2</div>
                            <div className="w-12 sm:w-16 h-[2px] bg-[#eef2fc]"></div>
                            <div className="w-8 h-8 rounded-full bg-[#eef2fc] text-slate-400 flex items-center justify-center text-sm font-bold">3</div>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                            Choose your brochure style
                        </h1>
                        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
                            Select the visual direction that best aligns with your brand goals and audience expectations.
                        </p>
                    </div>

                    {/* Style Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {styleOptions.map((style) => (
                            <div
                                key={style.id}
                                onClick={() => setSelectedStyle(style.id)}
                                className={`cursor-pointer rounded-xl border p-3 transition-all ${selectedStyle === style.id
                                    ? "border-[#5542f6] shadow-md ring-1 ring-[#5542f6] bg-white transform -translate-y-1"
                                    : "border-slate-200 bg-white hover:border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                                    }`}
                            >
                                <div className={`w-full h-36 rounded-lg mb-4 ${style.imgClass}`}></div>
                                <div className="flex flex-col items-center text-center pb-2">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${selectedStyle === style.id ? "bg-[#5542f6] text-white" : "bg-[#f8faff] text-[#5542f6]"
                                        }`}>
                                        {style.icon}
                                    </div>
                                    <h3 className="font-bold text-slate-800">{style.title}</h3>
                                    <p className="text-xs text-slate-500 mt-1">{style.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-12 flex flex-col items-center">
                        <button
                            onClick={async () => {
                                try {
                                    setLoadingStage('scraping');
                                    let data = await scrapeFullWebsite(sourceLink);
                                    
                                    setLoadingStage('structuring');
                                    let structuredData = await structureData(data);
                                    
                                    setLoadingStage('generating');
                                    let broucherMarkDown = await createMarkdownBroucher(structuredData, selectedStyle);
                                    
                                    setGeneratedMarkdown(broucherMarkDown || "");
                                    setStep(3);
                                } catch (err) {
                                    console.error("Pipeline error:", err);
                                    alert("Something went wrong during generation. Please try again.");
                                } finally {
                                    setLoadingStage('idle');
                                }
                            }}
                            disabled={!selectedStyle}
                            className={`w-full max-w-xs flex justify-center items-center py-3.5 rounded-lg font-semibold transition-colors shadow-sm ${selectedStyle
                                ? "bg-[#5542f6] hover:bg-indigo-700 text-white cursor-pointer"
                                : "bg-[#c4bdfb] text-white cursor-not-allowed"
                                }`}
                        >
                            Generate Brochure
                        </button>
                        <p className="text-xs text-slate-500 mt-4 font-medium">
                            Next: Content Generation & Review
                        </p>
                    </div>
                </main>
            )}

            {/* Stage-by-stage Loading Screen */}
            {loadingStage !== 'idle' && (
                <main className="max-w-md mx-auto px-6 pt-16 pb-20 flex flex-col items-center justify-center min-h-[60vh]">
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md w-full flex flex-col items-center">
                        <div className="w-16 h-16 bg-indigo-50 text-[#5542f6] rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-[#5542f6]"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 1 0 10 10"/></svg>
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 text-center mb-2">Generating Brochure</h2>
                        <p className="text-sm text-slate-500 text-center mb-8">Please wait while we extract info and build your brochure.</p>
                        
                        <div className="w-full space-y-5">
                            {/* Step 1: Scraping */}
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0">
                                    {loadingStage === 'scraping' ? (
                                        <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (loadingStage === 'structuring' || loadingStage === 'generating') ? (
                                        <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                                    ) : (
                                        <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200"></div>
                                    )}
                                </div>
                                <span className={`text-sm font-semibold ${loadingStage === 'scraping' ? 'text-[#5542f6]' : (loadingStage === 'structuring' || loadingStage === 'generating') ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>Scraping Website Data...</span>
                            </div>

                            {/* Step 2: Structuring */}
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0">
                                    {loadingStage === 'structuring' ? (
                                        <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (loadingStage === 'generating') ? (
                                        <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                                    ) : (
                                        <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200"></div>
                                    )}
                                </div>
                                <span className={`text-sm font-semibold ${loadingStage === 'structuring' ? 'text-[#5542f6]' : loadingStage === 'generating' ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>Structuring Information...</span>
                            </div>

                            {/* Step 3: Generating */}
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0">
                                    {loadingStage === 'generating' ? (
                                        <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200"></div>
                                    )}
                                </div>
                                <span className={`text-sm font-semibold ${loadingStage === 'generating' ? 'text-[#5542f6]' : 'text-slate-400'}`}>Generating Brochure...</span>
                            </div>
                        </div>
                    </div>
                </main>
            )}

            {loadingStage === 'idle' && step === 3 && (
                <main className="max-w-6xl mx-auto px-6 pt-8 pb-20">
                    {/* Progress */}
                    <div className="mb-12 flex flex-col items-center">
                        <span className="text-[13px] font-semibold text-[#5542f6] mb-4">Step 3: Your Brochure</span>
                        <div className="flex items-center">
                            <button onClick={() => setStep(1)} className="w-8 h-8 rounded-full bg-[#5542f6] text-white flex items-center justify-center text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></button>
                            <div className="w-12 sm:w-16 h-[2px] bg-[#5542f6]"></div>
                            <button onClick={() => setStep(2)} className="w-8 h-8 rounded-full bg-[#5542f6] text-white flex items-center justify-center text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></button>
                            <div className="w-12 sm:w-16 h-[2px] bg-[#5542f6]"></div>
                            <div className="w-8 h-8 rounded-full bg-[#5542f6] text-white flex items-center justify-center text-sm font-bold shadow-sm">3</div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Side: Mockup */}
                        <div className="w-full lg:w-1/2 flex flex-col">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-slate-800">Visual Preview</h2>
                                    <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">Ready</span>
                                </div>
                                {/* Mockup Placeholder */}
                                <div className="w-full flex-1 min-h-[400px] bg-slate-100 rounded-lg border border-slate-200 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#f8faff] to-[#eef2fc] opacity-50"></div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-200 mb-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="font-semibold text-slate-700 relative z-10">Brochure_{selectedStyle || 'output'}.pdf</h3>
                                    <p className="text-sm text-slate-500 mt-2 relative z-10 max-w-xs">A stunning, print-ready brochure automatically generated from {sourceLink || "your website"}.</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Markdown & Actions */}
                        <div className="w-full lg:w-1/2 flex flex-col gap-6">

                            {/* Markdown Viewer */}
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-slate-800">Extracted Content</h2>
                                    <button className="text-xs font-semibold text-[#5542f6] hover:underline flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                        Copy Markdown
                                    </button>
                                </div>
                                <div className="bg-slate-50 border border-slate-100 rounded-lg p-5 font-mono text-sm text-slate-600 flex-1 overflow-y-auto max-h-[300px] whitespace-pre-wrap">
                                    {generatedMarkdown}
                                </div>
                            </div>

                            {/* Actions Panel */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-white hover:border-[#5542f6] hover:bg-indigo-50 transition-all group">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#5542f6] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                    </div>
                                    <span className="font-semibold text-slate-800 text-sm">Download PDF</span>
                                </button>

                                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-white hover:border-[#5542f6] hover:bg-indigo-50 transition-all group">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#5542f6] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                                    </div>
                                    <span className="font-semibold text-slate-800 text-sm">Share Link</span>
                                </button>

                                <button
                                    onClick={() => { setStep(1); setSourceLink(""); setSelectedStyle(null); setGeneratedMarkdown(""); }}
                                    className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-white hover:border-[#5542f6] hover:bg-indigo-50 transition-all group col-span-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#5542f6]"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                                        <span className="font-semibold text-slate-800">Generate Another</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
}