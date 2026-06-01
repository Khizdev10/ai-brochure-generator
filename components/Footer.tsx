import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="w-full bg-[#f8fafc] py-20 px-8 lg:px-16 xl:px-24">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between gap-12">
                
                {/* Brand Column */}
                <div className="flex flex-col max-w-sm">
                    <h2 className="text-2xl font-bold text-indigo-600 mb-6">brochure.ai</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        The future of corporate document design, powered by intelligence.
                    </p>
                </div>

                {/* Navigation Columns */}
                <div className="flex gap-16 md:gap-24">
                    <div className="flex flex-col">
                        <h3 className="text-slate-700 font-medium mb-6 text-sm tracking-widest uppercase">Navigation</h3>
                        <ul className="flex flex-col space-y-4">
                            <li><Link href="/" className="text-slate-500 hover:text-indigo-600 transition-colors text-sm">Home</Link></li>
                            <li><Link href="/templates" className="text-slate-500 hover:text-indigo-600 transition-colors text-sm">Templates</Link></li>
                            <li><Link href="/contact" className="text-slate-500 hover:text-indigo-600 transition-colors text-sm">Contact</Link></li>
                        </ul>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
