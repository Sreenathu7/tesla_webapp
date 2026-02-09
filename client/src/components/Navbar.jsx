import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, LogOut, ChevronRight, Globe, Menu as MenuIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModelsOpen, setIsModelsOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        setIsModelsOpen(false);
        navigate('/login');
    };

    return (
        <>
            <nav
                className={cn(
                    'fixed top-0 left-0 right-0 z-[60] transition-all duration-700 px-6 py-10 md:px-12 flex items-center justify-between',
                    isScrolled ? 'glass py-6 border-b border-white/10' : 'bg-transparent'
                )}
            >

                <button
                    onClick={() => setIsModelsOpen(true)}
                    className="flex items-center gap-6 group"
                >
                    <div className="flex flex-col gap-1.5">
                        <div className="w-10 h-[2px] bg-white group-hover:bg-tesla-red transition-all duration-300"></div>
                        <div className="w-6 h-[2px] bg-white group-hover:bg-tesla-red transition-all duration-300 group-hover:w-10"></div>
                    </div>
                    <span className="uppercase font-black text-[11px] tracking-[0.5em] group-hover:text-tesla-red transition-colors">Menu</span>
                </button>

                <Link
                    to="/"
                    className="absolute left-1/2 -translate-x-1/2 text-3xl md:text-4xl font-extrabold tracking-[0.15em] text-white uppercase"
                    style={{ fontFamily: '"Gotham", system-ui, -apple-system, sans-serif' }}
                >
                    TESLA
                </Link>

                {/* Account Actions - Right */}
                <div className="flex items-center gap-8">
                    {user ? (
                        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setIsModelsOpen(true)}>
                            <span className="hidden sm:block text-[9px] font-bold uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">{user.name}</span>
                            <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-tesla-red font-black text-xs hover:border-tesla-red transition-colors">
                                {user.name.charAt(0)}
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="flex items-center gap-4 group">
                            <span className="hidden sm:block text-[9px] font-black uppercase tracking-[0.5em] text-white/40 group-hover:text-white transition-colors">Account</span>
                            <User size={18} className="group-hover:text-tesla-red transition-colors" />
                        </Link>
                    )}
                </div>
            </nav>

            {/* Global Menu Overlay */}
            <AnimatePresence>
                {isModelsOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ type: 'tween', ease: 'circOut', duration: 0.5 }}
                        className="fixed inset-0 z-[100] bg-black text-white overflow-y-auto"
                    >
                        <div className="min-h-screen flex flex-col container mx-auto px-6 py-8 md:px-12 md:py-12">
                            <div className="flex justify-between items-center mb-16 md:mb-24">
                                <button
                                    onClick={() => setIsModelsOpen(false)}
                                    className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-[0.2em] hover:text-tesla-red transition-colors uppercase group"
                                >
                                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                    Close Menu
                                </button>
                                <div className="hidden md:block">
                                    <MenuIcon className="text-white/20" size={32} />
                                </div>
                            </div>

                            {/* Main Navigation Links */}
                            <div className="flex-1 flex flex-col justify-center mb-20">
                                <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/20">
                                    {[
                                        { name: 'Models', href: '/cars' },
                                        { name: 'Ownership', href: '#' },
                                        { name: 'Beyond', href: '#' },
                                        { name: 'Company', href: '#' },
                                        { name: 'Museum', href: '#' },
                                        { name: 'Store', href: '#' },
                                        { name: 'Dealerships', href: '#' },
                                        { name: 'Motorsport', href: '#' },
                                        { name: 'News', href: '#' }
                                    ].map((item, index) => (
                                        <Link
                                            key={index}
                                            to={item.href}
                                            onClick={() => setIsModelsOpen(false)}
                                            className="group flex items-center justify-between py-6 md:py-8 border-b border-white/20 hover:bg-white/5 transition-colors px-4"
                                        >
                                            <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform duration-300">
                                                {item.name}
                                            </span>
                                            <ChevronRight size={16} className="text-white/40 group-hover:text-tesla-red group-hover:translate-x-2 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Secondary Links (Footer) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-8 text-xs font-medium tracking-widest uppercase text-white/50 mb-16">
                                <div className="space-y-6">
                                    <Link to="#" className="block hover:text-white transition-colors">Design</Link>
                                    <Link to="#" className="block hover:text-white transition-colors">Financial Services</Link>
                                    <Link to="#" className="block hover:text-white transition-colors">Lounge</Link>
                                </div>
                                <div className="space-y-6">
                                    <Link to="#" className="block hover:text-white transition-colors">Sustainability</Link>
                                    <Link to="#" className="block hover:text-white transition-colors">Warranty Extension</Link>
                                    <Link to="#" className="block hover:text-white transition-colors">Club</Link>
                                </div>
                                <div className="space-y-6">
                                    <Link to="#" className="block hover:text-white transition-colors">History</Link>
                                    <Link to="#" className="block hover:text-white transition-colors">Driving Programs</Link>
                                    <Link to="#" className="block hover:text-white transition-colors">Podcast</Link>
                                </div>
                            </div>

                            {/* Bottom Controls */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase pt-8 border-t border-white/10 gap-6">
                                <button className="flex items-center gap-2 hover:text-white transition-colors">
                                    <Globe size={14} />
                                    Languages
                                </button>
                                <div className="flex items-center gap-8">
                                    {user && (
                                        <button onClick={handleLogout} className="hover:text-tesla-red transition-colors">
                                            Log Out
                                        </button>
                                    )}
                                    <span className="hidden md:inline">Text Size</span>
                                    <span className="hidden md:inline">Allow Animations</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
