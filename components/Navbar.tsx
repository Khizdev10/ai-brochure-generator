"use client"
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { label: "Home", href: "/" },
        { label: "Templates", href: "/templates" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <div className="bg-sky-50 py-4 px-8 md:px-16 border-b border-gray-200 relative z-50">
            <div className="flex justify-between items-center">
                <Link href="/" className="text-blue-600 font-bold text-2xl hover:opacity-80 transition-opacity">
                    BrochureAI
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 font-medium text-slate-700">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`hover:text-blue-600 transition-colors ${pathname === link.href ? "text-blue-600 font-semibold" : ""}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-sky-50 border-b border-gray-200 shadow-lg">
                    <ul className="flex flex-col px-8 py-4 space-y-4 font-medium text-slate-700">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`hover:text-blue-600 transition-colors ${pathname === link.href ? "text-blue-600 font-semibold" : ""}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;