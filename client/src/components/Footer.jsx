import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { name: 'Tesla © ' + currentYear, href: '#' },
        { name: 'Privacy & Legal', href: '#' },
        { name: 'Vehicle Recalls', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'News', href: '#' },
        { name: 'Get Newsletter', href: '#' },
        { name: 'Locations', href: '#' },
    ];

    return (
        <footer className="w-full py-8 px-6 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-4 md:space-y-0 md:flex-row md:space-x-6">
                {footerLinks.map((link) => (
                    <Link
                        key={link.name}
                        to={link.href}
                        className="text-[12px] font-medium text-white/50 hover:text-white transition-colors uppercase tracking-wider"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
