import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const templates = [
    {
        id: 'business',
        name: 'Business Professional',
        category: 'Corporate',
        description: 'Clean, authoritative layout perfect for B2B companies, consultancies, and professional services firms.',
        color: '#5542f6',
        accent: '#eef2fc',
        tags: ['Professional', 'B2B', 'Corporate'],
        preview: {
            leftBg: '#5542f6',
            midBorder: '#5542f6',
            badge: 'Most Popular',
        },
    },
    {
        id: 'enterprise',
        name: 'Enterprise Data',
        category: 'Analytics',
        description: 'Data-driven design with charts, metrics, and structured sections — ideal for SaaS, fintech, and analytics companies.',
        color: '#0f766e',
        accent: '#f0fdf9',
        tags: ['Data-driven', 'SaaS', 'Analytics'],
        preview: {
            leftBg: '#0f766e',
            midBorder: '#0f766e',
            badge: '',
        },
    },
    {
        id: 'creative',
        name: 'Creative Bold',
        category: 'Design',
        description: 'Vibrant, eye-catching layout for creative agencies, studios, startups, and brands that want to stand out.',
        color: '#d946ef',
        accent: '#fdf4ff',
        tags: ['Creative', 'Agency', 'Bold'],
        preview: {
            leftBg: '#d946ef',
            midBorder: '#d946ef',
            badge: 'Trending',
        },
    },
    {
        id: 'minimal',
        name: 'Minimal Sleek',
        category: 'Modern',
        description: 'Refined whitespace, subtle typography, and elegant structure for luxury brands and premium services.',
        color: '#334155',
        accent: '#f8fafc',
        tags: ['Minimal', 'Luxury', 'Premium'],
        preview: {
            leftBg: '#334155',
            midBorder: '#334155',
            badge: '',
        },
    },
    {
        id: 'tech',
        name: 'Tech Startup',
        category: 'Technology',
        description: 'Modern gradient-accented layout with a digital-first feel. Built for tech companies and product launches.',
        color: '#2563eb',
        accent: '#eff6ff',
        tags: ['Tech', 'Startup', 'Product'],
        preview: {
            leftBg: '#2563eb',
            midBorder: '#2563eb',
            badge: 'New',
        },
    },
    {
        id: 'nonprofit',
        name: 'Non-Profit & NGO',
        category: 'Social Impact',
        description: 'Warm, trustworthy layout that communicates impact and mission. Perfect for charities and social enterprises.',
        color: '#ea580c',
        accent: '#fff7ed',
        tags: ['Non-profit', 'NGO', 'Impact'],
        preview: {
            leftBg: '#ea580c',
            midBorder: '#ea580c',
            badge: '',
        },
    },
];

const TemplateMiniPreview = ({ color, name }: { color: string; name: string }) => (
    <div
        className="w-full h-48 rounded-xl overflow-hidden relative shadow-inner flex"
        style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
    >
        {/* Left sidebar */}
        <div style={{ width: '30%', background: color, padding: '12px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', marginBottom: 8 }} />
                <div style={{ height: 4, width: '80%', background: 'rgba(255,255,255,0.4)', borderRadius: 2, marginBottom: 4 }} />
                <div style={{ height: 3, width: '60%', background: 'rgba(255,255,255,0.25)', borderRadius: 2, marginBottom: 10 }} />
                {[1, 2, 3].map(i => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }} />
                        <div style={{ height: 3, width: '70%', background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
                    </div>
                ))}
            </div>
            <div style={{ height: 3, width: '90%', background: 'rgba(255,255,255,0.2)', borderRadius: 2 }} />
        </div>
        {/* Middle content */}
        <div style={{ flex: 1, padding: '12px 10px', borderRight: '1px solid #e2e8f0' }}>
            <div style={{ height: 3, width: '40%', background: color, borderRadius: 2, marginBottom: 6, opacity: 0.7 }} />
            <div style={{ height: 3, width: '90%', background: '#cbd5e1', borderRadius: 2, marginBottom: 3 }} />
            <div style={{ height: 3, width: '80%', background: '#cbd5e1', borderRadius: 2, marginBottom: 3 }} />
            <div style={{ height: 3, width: '85%', background: '#cbd5e1', borderRadius: 2, marginBottom: 10 }} />
            {[1, 2].map(i => (
                <div key={i} style={{ borderLeft: `2px solid ${color}`, paddingLeft: 6, marginBottom: 8 }}>
                    <div style={{ height: 3, width: '70%', background: '#94a3b8', borderRadius: 2, marginBottom: 3 }} />
                    <div style={{ height: 2.5, width: '90%', background: '#cbd5e1', borderRadius: 2 }} />
                </div>
            ))}
        </div>
        {/* Right panel */}
        <div style={{ width: '32%', padding: '12px 8px', background: '#f1f5f9' }}>
            <div style={{ height: 2.5, width: '60%', background: '#94a3b8', borderRadius: 2, marginBottom: 4 }} />
            <div style={{ height: 5, width: '80%', background: '#1e293b', borderRadius: 2, marginBottom: 6, fontWeight: 800 }} />
            <div style={{ width: 16, height: 2, background: color, borderRadius: 1, marginBottom: 8 }} />
            {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: `${color}30` }} />
                    <div style={{ height: 2.5, width: '75%', background: '#94a3b8', borderRadius: 2 }} />
                </div>
            ))}
        </div>
    </div>
);

export default function TemplatesPage() {
    return (
        <div className="bg-sky-50 min-h-screen flex flex-col">
            <Navbar />

            {/* Hero */}
            <section className="px-6 lg:px-16 xl:px-24 pt-20 pb-12 text-center">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 px-4 py-2 bg-indigo-100/60 rounded-full border border-indigo-100 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
                    </svg>
                    Pre-made Templates
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-[#0f172a] tracking-tight mb-5">
                    Choose your <span className="text-indigo-600">perfect template</span>
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    Start with a professionally designed layout. Our AI will fill it with your brand's real content automatically.
                </p>
            </section>

            {/* Templates Grid */}
            <section className="px-6 lg:px-16 xl:px-24 pb-24 flex-1">
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col"
                        >
                            {/* Mini Brochure Preview */}
                            <div className="p-5 pb-4 relative">
                                {template.preview.badge && (
                                    <span
                                        className="absolute top-7 right-7 z-10 text-[11px] font-bold px-2.5 py-1 rounded-full text-white shadow-sm"
                                        style={{ background: template.color }}
                                    >
                                        {template.preview.badge}
                                    </span>
                                )}
                                <TemplateMiniPreview color={template.color} name={template.name} />
                            </div>

                            {/* Card Content */}
                            <div className="px-5 pb-6 flex flex-col flex-1">
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: template.color }}>
                                            {template.category}
                                        </span>
                                        <h2 className="text-lg font-bold text-slate-900 mt-0.5">{template.name}</h2>
                                    </div>
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-1"
                                        style={{ background: template.accent }}
                                    >
                                        <div className="w-3 h-3 rounded-sm" style={{ background: template.color }} />
                                    </div>
                                </div>

                                <p className="text-sm text-slate-500 leading-relaxed mb-4">{template.description}</p>

                                <div className="flex flex-wrap gap-2 mb-5">
                                    {template.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="text-xs font-medium px-2.5 py-1 rounded-full"
                                            style={{ background: template.accent, color: template.color }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto">
                                    <Link
                                        href={`/generate?template=${template.id}`}
                                        className="w-full flex justify-center items-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all text-white shadow-sm hover:opacity-90 hover:shadow-md"
                                        style={{ background: template.color }}
                                    >
                                        Use This Template
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="max-w-screen-xl mx-auto mt-16 text-center">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-12 max-w-2xl mx-auto">
                        <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5542f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Let the AI pick for you</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            Not sure which template fits best? Just paste your website URL and our AI will automatically suggest the most suitable layout for your brand.
                        </p>
                        <Link
                            href="/generate"
                            className="inline-flex items-center gap-2 bg-[#5542f6] hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                        >
                            Start Generating
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
