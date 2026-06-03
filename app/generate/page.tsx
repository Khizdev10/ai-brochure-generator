"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
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
    const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
    const [copiedText, setCopiedText] = useState<boolean>(false);
    const [copiedLink, setCopiedLink] = useState<boolean>(false);

    // Dynamic sharing link decoder
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#content=')) {
                try {
                    const encodedData = hash.substring('#content='.length);
                    const decodedData = decodeURIComponent(escape(atob(encodedData)));
                    setGeneratedMarkdown(decodedData);
                    setStep(3);
                } catch (e) {
                    console.error("Failed to decode brochure hash", e);
                }
            }
        };

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);



    const handleCopyMarkdown = () => {
        navigator.clipboard.writeText(generatedMarkdown);
        setCopiedText(true);
        setTimeout(() => setCopiedText(false), 2000);
    };

    const handleCopyLink = () => {
        try {
            const encoded = btoa(unescape(encodeURIComponent(generatedMarkdown)));
            const shareUrl = `${window.location.origin}${window.location.pathname}#content=${encoded}`;
            navigator.clipboard.writeText(shareUrl);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        } catch (e) {
            console.error("Failed to copy link", e);
        }
    };

    const loadPdfLibraries = (): Promise<{ jsPDF: any; html2canvas: any }> => {
        return new Promise((resolve, reject) => {
            if (typeof window === 'undefined') return reject();

            // Check if already loaded
            if (window.html2canvas && (window.jspdf || (window.jspdf && window.jspdf.jsPDF))) {
                const jsPDFLib = window.jspdf.jsPDF || window.jspdf;
                resolve({ jsPDF: jsPDFLib, html2canvas: window.html2canvas });
                return;
            }

            const loadScript = (src: string): Promise<void> => {
                return new Promise((res, rej) => {
                    const script = document.createElement('script');
                    script.src = src;
                    script.onload = () => res();
                    script.onerror = (err) => rej(err);
                    document.body.appendChild(script);
                });
            };

            Promise.all([
                loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),
                loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js')
            ]).then(() => {
                const jsPDFLib = window.jspdf?.jsPDF || window.jspdf;
                resolve({ jsPDF: jsPDFLib, html2canvas: window.html2canvas });
            }).catch(reject);
        });
    };

    const parseMarkdownToHtml = (markdown: string) => {
        return markdown
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/^\- (.*$)/gim, '<li>$1</li>')
            .replace(/\n$/gim, '<br />')
            .replace(/\n/gim, '<br />');
    };

    const extractBrochureData = (markdown: string) => {
        const clean = (text: string) =>
            // Strip markdown syntax, emojis, and normalize whitespace
            text
                .replace(/[*#_`\[\]()~]/g, '')
                .replace(/[\u{1F300}-\u{1FFFF}]/gu, '') // emoji ranges
                .replace(/[\u2600-\u27BF]/gu, '')        // misc symbols
                .replace(/[\u{1F000}-\u{1F02F}]/gu, '') // mahjong tiles etc
                .replace(/\s+/g, ' ')
                .trim();

        // --- Title ---
        const titleMatch = markdown.match(/^# (.*?)$/m) || markdown.match(/Title:\s*(.*?)$/im);
        const title = titleMatch ? clean(titleMatch[1]) : "Our Company";

        // --- All H2 headings ---
        const h2Matches = [...markdown.matchAll(/^## (.*?)$/gm)];
        const tagline = h2Matches.length > 0 ? clean(h2Matches[0][1]) : "Innovative Solutions for Tomorrow";
        const subtitle = h2Matches.length > 1 ? clean(h2Matches[1][1]) : "Excellence in Every Project";

        // --- Extract sections: each H2/H3 heading + its following content ---
        const sections: { heading: string; body: string }[] = [];
        const allHeadings = [...markdown.matchAll(/^#{2,3} (.+)$/gm)];
        for (let i = 0; i < allHeadings.length; i++) {
            const heading = clean(allHeadings[i][1]);
            const start = (allHeadings[i].index ?? 0) + allHeadings[i][0].length;
            const end = allHeadings[i + 1]?.index ?? markdown.length;
            const block = markdown.slice(start, end);
            const bodyLines = block
                .split('\n')
                .map(l => l.trim())
                .filter(l => l.length > 10 && !l.startsWith('#') && !l.startsWith('---'))
                .slice(0, 4)
                .map(l => clean(l.replace(/^[\-\*\+]\s*/, '')));
            if (bodyLines.length > 0) {
                sections.push({ heading, body: bodyLines.join(' ').slice(0, 250) });
            }
        }

        // --- Bullet points (services/features) ---
        const bulletPoints = markdown.match(/^[\-\*\+]\s+(.+)$/gm) || [];
        const services = bulletPoints
            .map(bp => clean(bp.replace(/^[\-\*\+]\s+/, '')))
            .filter(s => s.length > 3 && s.length < 120)
            .slice(0, 8);
        const finalServices = services.length > 0 ? services : ["Quality Services", "Innovative Products", "Expert Consultation", "Client Support"];

        // --- Plain paragraphs ---
        const paragraphs = markdown.split('\n')
            .map(p => p.trim())
            .filter(p =>
                p.length > 30 &&
                !p.startsWith('#') &&
                !p.startsWith('-') &&
                !p.startsWith('*') &&
                !p.startsWith('>') &&
                !p.match(/^\d+\./)
            )
            .map(p => clean(p));

        const intro = paragraphs[0] || "We deliver world-class solutions to help your business scale efficiently.";
        const secondaryText = paragraphs[1] || "Partner with us to unlock your business's true potential and achieve sustainable growth.";
        const thirdParagraph = paragraphs[2] || "";

        // --- Why Choose Us ---
        const whySection = markdown.match(/why choose us[\s\S]*?(?=\n##|\n#|$)/i);
        const whyBullets = whySection
            ? (whySection[0].match(/^[\-\*\+]\s+(.+)$/gm) || []).map(b => clean(b.replace(/^[\-\*\+]\s+/, ''))).filter(b => b.length > 3)
            : [];
        const whyChooseUs = whyBullets.length > 0
            ? whyBullets.slice(0, 4)
            : finalServices.slice(0, 4).map(s => s.split(':')[0]);

        // --- Contact ---
        const emailMatch = markdown.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/);
        const email = emailMatch ? emailMatch[0] : "hello@company.com";
        const phoneMatch = markdown.match(/(\+?\d[\d\-\s()]{7,}\d)/);
        const phone = phoneMatch ? phoneMatch[0] : "+1 (555) 019-2834";

        return { title, tagline, subtitle, services: finalServices, intro, secondaryText, thirdParagraph, whyChooseUs, sections, email, phone };
    };

    const handleDownloadPdf = () => {
        const formattedHtml = parseMarkdownToHtml(generatedMarkdown);
        const printIframe = document.createElement('iframe');
        printIframe.style.position = 'fixed';
        printIframe.style.right = '0';
        printIframe.style.bottom = '0';
        printIframe.style.width = '0';
        printIframe.style.height = '0';
        printIframe.style.border = '0';
        document.body.appendChild(printIframe);
        const doc = printIframe.contentWindow?.document;
        if (!doc) return;

        doc.write(`
            <html>
                <head>
                    <title>AI Generated Brochure</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                        body { 
                            font-family: 'Inter', sans-serif; 
                            padding: 40px; 
                            color: #1e293b; 
                            line-height: 1.6;
                            max-width: 800px;
                            margin: 0 auto;
                        }
                        h1 { 
                            color: #5542f6; 
                            font-size: 32px;
                            border-bottom: 2px solid #eef2fc; 
                            padding-bottom: 12px; 
                            margin-top: 0;
                            margin-bottom: 24px;
                            font-weight: 700;
                        }
                        h2 { 
                            color: #0f172a; 
                            font-size: 22px;
                            margin-top: 32px; 
                            margin-bottom: 16px;
                            font-weight: 600;
                            border-bottom: 1px solid #f1f5f9;
                            padding-bottom: 6px;
                        }
                        h3 {
                            color: #334155;
                            font-size: 18px;
                            margin-top: 24px;
                            margin-bottom: 12px;
                            font-weight: 600;
                        }
                        p {
                            margin-bottom: 16px;
                            font-size: 15px;
                        }
                        ul, ol { 
                            padding-left: 20px; 
                            margin-bottom: 20px;
                        }
                        li { 
                            margin-bottom: 8px; 
                            font-size: 15px;
                        }
                        strong {
                            color: #0f172a;
                            font-weight: 600;
                        }
                        blockquote { 
                            border-left: 4px solid #5542f6; 
                            padding-left: 16px; 
                            margin: 20px 0; 
                            color: #475569; 
                            font-style: italic; 
                            background: #f8fafc;
                            padding-top: 8px;
                            padding-bottom: 8px;
                        }
                        @media print {
                            body { padding: 20px; }
                            h1 { color: #5542f6 !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
                        }
                    </style>
                </head>
                <body>
                    ${formattedHtml}
                </body>
            </html>
        `);
        doc.close();

        setTimeout(() => {
            printIframe.contentWindow?.focus();
            printIframe.contentWindow?.print();
            setTimeout(() => {
                document.body.removeChild(printIframe);
            }, 1000);
        }, 500);
    };

    const handleDownloadImage = async () => {
        try {
            // Dynamically import html2canvas-pro — no CDN, no window globals needed
            const html2canvasModule = await import('html2canvas-pro');
            const html2canvas = html2canvasModule.default;

            const element = document.getElementById('brochure-print-container');
            if (!element) {
                alert('Brochure preview not found.');
                return;
            }

            // Temporarily clear the CSS scale transform so it captures at full 842x595
            const originalTransform = element.style.transform;
            element.style.transform = 'none';

            await new Promise(r => setTimeout(r, 100));

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false,
                backgroundColor: '#ffffff',
                width: 842,
                height: 595,
            });

            // Restore transform
            element.style.transform = originalTransform;

            const imgData = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = imgData;
            downloadLink.download = `brochure_${selectedStyle || 'output'}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch (error: any) {
            console.error('Failed to download image:', error);
            alert('Failed to download brochure image: ' + (error?.message || String(error)));
        }
    };

    const handleRegenerate = async () => {
        try {
            setIsRegenerating(true);
            let data = await scrapeFullWebsite(sourceLink);
            let structuredData = await structureData(data);
            let broucherMarkDown = await createMarkdownBroucher(structuredData, selectedStyle);
            setGeneratedMarkdown(broucherMarkDown || "");
        } catch (err) {
            console.error("Regeneration error:", err);
            alert("Something went wrong during regeneration. Please try again.");
        } finally {
            setIsRegenerating(false);
        }
    };
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-[#5542f6]"><circle cx="12" cy="12" r="10" /><path d="M12 2a7 7 0 1 0 10 10" /></svg>
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
                                {/* Live Brochure Preview */}
                                <div className="w-full flex-1 min-h-[440px] bg-slate-50 rounded-lg border border-slate-200 p-2 flex items-center justify-center relative overflow-hidden">
                                    {isRegenerating ? (
                                        <div className="flex flex-col items-center justify-center relative z-10">
                                            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                                            <span className="text-sm font-semibold text-slate-600">Regenerating brochure preview...</span>
                                        </div>
                                    ) : (
                                        (() => {
                                            const brochureData = extractBrochureData(generatedMarkdown);
                                            const primaryColor = selectedStyle === 'creative' ? '#d946ef' : selectedStyle === 'enterprise' ? '#0f766e' : '#5542f6';
                                            return (
                                                <div
                                                    id="brochure-print-container"
                                                    className="bg-white overflow-hidden text-left relative"
                                                    style={{
                                                        width: '842px',
                                                        height: '595px',
                                                        transform: 'scale(0.55)',
                                                        minWidth: '842px',
                                                        minHeight: '595px',
                                                        transformOrigin: 'top left',
                                                        display: 'flex',
                                                        fontFamily: 'system-ui, sans-serif',
                                                    }}
                                                >
                                                    {/* Left Panel: Contact + Why Us */}
                                                    <div style={{ width: '260px', minWidth: '260px', background: primaryColor, padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'white', position: 'relative', overflow: 'hidden' }}>
                                                        <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                                                        <div style={{ position: 'absolute', bottom: -30, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                                                        <div style={{ position: 'relative', zIndex: 1 }}>
                                                            {/* Logo mark */}
                                                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                                            </div>
                                                            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.6, marginBottom: 4 }}>Why Choose Us</div>
                                                            <div style={{ width: 24, height: 2, background: 'rgba(255,255,255,0.5)', borderRadius: 1, marginBottom: 12 }} />
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                                {brochureData.whyChooseUs.map((item: string, i: number) => (
                                                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                                                                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', marginTop: 4, flexShrink: 0 }} />
                                                                        <span style={{ fontSize: 9.5, lineHeight: 1.5, opacity: 0.9 }}>{item}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div style={{ position: 'relative', zIndex: 1 }}>
                                                            <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', marginBottom: 14 }} />
                                                            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.6, marginBottom: 10 }}>Get In Touch</div>
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 9 }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                                                    <span style={{ opacity: 0.85 }}>{brochureData.email}</span>
                                                                </div>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 9 }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                                                    <span style={{ opacity: 0.85 }}>{brochureData.phone}</span>
                                                                </div>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 9 }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                                                    <span style={{ opacity: 0.85 }}>{sourceLink || "www.company.com"}</span>
                                                                </div>
                                                            </div>
                                                            <div style={{ marginTop: 14, fontSize: 7.5, opacity: 0.5 }}>© {new Date().getFullYear()} {brochureData.title}</div>
                                                        </div>
                                                    </div>

                                                    {/* Middle Panel: Mission + Body Text + Sections */}
                                                    <div style={{ flex: 1, padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 16, borderRight: '1px solid #e2e8f0', overflow: 'hidden' }}>
                                                        <div>
                                                            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: primaryColor, marginBottom: 6 }}>About Us</div>
                                                            <p style={{ fontSize: 10, lineHeight: 1.65, color: '#334155', margin: 0 }}>{brochureData.intro}</p>
                                                        </div>
                                                        {brochureData.secondaryText && (
                                                            <p style={{ fontSize: 9.5, lineHeight: 1.65, color: '#475569', margin: 0 }}>{brochureData.secondaryText}</p>
                                                        )}
                                                        {brochureData.sections.length > 0 && (
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
                                                                {brochureData.sections.slice(0, 2).map((section: { heading: string; body: string }, i: number) => (
                                                                    <div key={i} style={{ borderLeft: `3px solid ${primaryColor}`, paddingLeft: 10 }}>
                                                                        <div style={{ fontSize: 8.5, fontWeight: 700, color: '#1e293b', marginBottom: 3 }}>{section.heading}</div>
                                                                        <p style={{ fontSize: 9, lineHeight: 1.55, color: '#64748b', margin: 0 }}>{section.body.slice(0, 160)}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                        {brochureData.thirdParagraph && (
                                                            <p style={{ fontSize: 9, lineHeight: 1.6, color: '#64748b', margin: 0, fontStyle: 'italic', borderTop: '1px solid #f1f5f9', paddingTop: 10 }}>
                                                                "{brochureData.thirdParagraph.slice(0, 180)}"
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Right Panel: Cover + Services */}
                                                    <div style={{ width: '260px', minWidth: '260px', padding: '32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#f8fafc' }}>
                                                        <div>
                                                            <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 4 }}>Company Overview</div>
                                                            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0', lineHeight: 1.2 }}>{brochureData.title}</h2>
                                                            <div style={{ width: 28, height: 3, background: primaryColor, borderRadius: 2, marginBottom: 10 }} />
                                                            <p style={{ fontSize: 10, color: '#475569', fontWeight: 600, lineHeight: 1.5, margin: '0 0 20px 0' }}>{brochureData.tagline}</p>

                                                            <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 10 }}>Our Services</div>
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                                                {brochureData.services.slice(0, 6).map((service: string, i: number) => (
                                                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                                                                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: `${primaryColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                                                                            <div style={{ width: 4, height: 4, borderRadius: '50%', background: primaryColor }} />
                                                                        </div>
                                                                        <span style={{ fontSize: 9.5, color: '#334155', lineHeight: 1.5 }}>{service.slice(0, 55)}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 16 }}>
                                                            <div style={{ width: 18, height: 18, borderRadius: '50%', background: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                                            </div>
                                                            <span style={{ fontSize: 8.5, fontWeight: 700, color: '#64748b' }}>Created with</span>
                                                            <span style={{ fontSize: 8.5, fontWeight: 900, color: primaryColor }}>BrochureAI</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })()
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Markdown & Actions */}
                        <div className="w-full lg:w-1/2 flex flex-col gap-6">

                            {/* Markdown Viewer */}
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex-1 flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-slate-800">Extracted Content</h2>
                                    <button
                                        onClick={handleCopyMarkdown}
                                        className="text-xs font-semibold text-[#5542f6] hover:underline flex items-center gap-1 cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                        {copiedText ? "Copied!" : "Copy Markdown"}
                                    </button>
                                </div>
                                <div className={`bg-slate-50 border border-slate-100 rounded-lg p-5 font-mono text-sm text-slate-600 flex-1 overflow-y-auto max-h-[300px] whitespace-pre-wrap ${isRegenerating ? 'flex flex-col justify-center items-center' : ''}`}>
                                    {isRegenerating ? (
                                        <div className="text-center">
                                            <div className="w-10 h-10 border-4 border-[#5542f6] border-t-transparent rounded-full animate-spin mb-3 mx-auto"></div>
                                            <span className="text-sm font-semibold text-slate-500">Regenerating brochure content...</span>
                                        </div>
                                    ) : (
                                        generatedMarkdown
                                    )}
                                </div>
                            </div>

                            {/* Actions Panel */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={handleDownloadPdf}
                                    className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-white hover:border-[#5542f6] hover:bg-indigo-50 transition-all group cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#5542f6] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                    </div>
                                    <span className="font-semibold text-slate-800 text-sm">Download PDF</span>
                                </button>

                                <button
                                    onClick={handleDownloadImage}
                                    className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-white hover:border-[#5542f6] hover:bg-indigo-50 transition-all group cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#5542f6] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                    </div>
                                    <span className="font-semibold text-slate-800 text-sm">Download Image</span>
                                </button>

                                <button
                                    onClick={handleCopyLink}
                                    className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-white hover:border-[#5542f6] hover:bg-indigo-50 transition-all group cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#5542f6] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                                    </div>
                                    <span className="font-semibold text-slate-800 text-sm">{copiedLink ? "Copied Link!" : "Share Link"}</span>
                                </button>

                                <button
                                    onClick={handleRegenerate}
                                    disabled={isRegenerating}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-white hover:border-[#5542f6] hover:bg-indigo-50 transition-all group cursor-pointer ${isRegenerating ? 'opacity-60 cursor-not-allowed' : ''}`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-[#5542f6] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isRegenerating ? "animate-spin" : ""}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                                    </div>
                                    <span className="font-semibold text-slate-800 text-sm">{isRegenerating ? "Regenerating..." : "Generate Another"}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
}