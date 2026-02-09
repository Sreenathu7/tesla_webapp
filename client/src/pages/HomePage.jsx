import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ChevronDown, Zap, Shield, Globe, Cpu, Gauge, Wind, Battery,
    ArrowRight, Play, Maximize2, MoveRight, Mail, Smartphone, MapPin, Wifi, Star
} from 'lucide-react';
import { SocialLinks } from '../components/SharedComponents';

// Count-up component for performance stats
const Counter = ({ value, label, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0);
    const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ''));

    useEffect(() => {
        let start = 0;
        const end = numericValue;
        const duration = 2000;
        let startTime = null;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const currentCount = progress * (end - start) + start;
            setCount(currentCount);
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                requestAnimationFrame(animate);
                observer.disconnect();
            }
        });

        const element = document.getElementById(`stat-${label.replace(/\s+/g, '-')}`);
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, [numericValue, label]);

    return (
        <div id={`stat-${label.replace(/\s+/g, '-')}`} className="text-center">
            <h4 className="text-5xl md:text-8xl font-black tracking-tighter mb-2 italic">
                {prefix}{numericValue % 1 === 0 ? Math.floor(count) : count.toFixed(1)}{suffix}
            </h4>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">{label}</p>
        </div>
    );
};

const HomePage = () => {
    const { scrollYProgress } = useScroll();
    const [videoIndex, setVideoIndex] = useState(0);
    const [email, setEmail] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [emailError, setEmailError] = useState('');

    // Reliable background videos
    const backgroundVideos = [
        "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto/Model-3-Main-Hero-Video-Desktop-NA.mp4",
        "https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto/Model-3-Main-Hero-Video-Desktop-NA.mp4"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setVideoIndex((prev) => (prev + 1) % backgroundVideos.length);
        }, 20000);
        return () => clearInterval(interval);
    }, []);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setEmailError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('Email is required');
            return;
        }
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email');
            return;
        }

        setShowSuccessPopup(true);
        setEmail('');
        setTimeout(() => {
            setShowSuccessPopup(false);
        }, 4000);
    };

    const slideUp = {
        initial: { opacity: 0, y: 80 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    };

    const models = [
        { name: 'Model S', price: '74,990', image: 'https://images.unsplash.com/photo-1617788138017-80ad42243c59?q=80&w=2070', href: '/cars/model-s' },
        { name: 'Model 3', price: '38,990', image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070', href: '/cars/model-3' },
        { name: 'Model X', price: '79,990', image: 'https://images.unsplash.com/photo-1561580119-e93297a7cc21?q=80&w=2070', href: '/cars/model-x' },
        { name: 'Model Y', price: '43,990', image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2070', href: '/cars/model-y' },
        { name: 'Roadster', price: '200,000', image: 'https://images.unsplash.com/photo-1617788138017-80ad42243c59?q=80&w=2070', href: '/cars/roadster' },
    ];

    return (
        <div className="bg-[#050505] text-white selection:bg-tesla-red selection:text-white overflow-x-hidden">
            <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                        <motion.video
                            key={videoIndex}
                            autoPlay
                            muted
                            loop
                            playsInline
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="w-full h-full object-cover brightness-[0.7]"
                        >
                            <source src={backgroundVideos[videoIndex]} type="video/mp4" />
                        </motion.video>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="text-3xl md:text-[5vw] font-bold tracking-[0.1em] mb-8 uppercase leading-tight italic opacity-95"
                    >
                        Experience the <br />
                        <span className="text-tesla-red font-black tracking-[0.2em]">Future</span> of Driving
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-xs md:text-sm font-light tracking-[0.8em] text-white/40 mb-14 uppercase"
                    >
                        Electric performance Intelligent design Zero compromise.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-8 justify-center"
                    >
                        <Link to="/cars" className="px-16 py-5 border border-white/20 text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all backdrop-blur-md">
                            Explore Models
                        </Link>
                        <Link to="/build" className="px-16 py-5 border border-white/20 text-white font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black transition-all backdrop-blur-md">
                            Build & Price
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 cursor-pointer"
                    onClick={() => document.getElementById('models').scrollIntoView({ behavior: 'smooth' })}
                >
                    <ChevronDown size={32} />
                </motion.div>
            </section>

            {/* <section id="models" className="py-40 px-6 md:px-24">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...slideUp} className="mb-24 text-center">
                        <span className="text-tesla-red font-bold uppercase tracking-[0.6em] text-[10px] mb-4 block italic">The Collection</span>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Current Fleet</h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {models.map((model, i) => (
                            <motion.div
                                key={model.name}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -20 }}
                                className="group bg-[#111] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-tesla-red/50 transition-all duration-700 glass"
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img src={model.image} alt={model.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                                </div>
                                <div className="p-10">
                                    <h3 className="text-3xl font-black uppercase italic mb-2 tracking-tighter">{model.name}</h3>
                                    <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest mb-8">From ${model.price}</p>
                                    <Link to={`/cars/${model.name.toLowerCase().replace(' ', '-')}`} className="block w-full py-4 text-center rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                                        Order Now
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}


            <section className="py-32 bg-black carbon-texture">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-tesla-red font-bold uppercase tracking-[0.6em] text-[10px] mb-6">Features</h2>
                        <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">Built For<br /><span className="text-tesla-red">The Future</span></h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 text-center">
                        {[
                            { icon: <Cpu />, title: "Autopilot AI", desc: "Advanced AI driving systems for safety and convenience." },
                            { icon: <Wifi />, title: "Digital Sync", desc: "Continuous improvements through over-the-air updates." },
                            { icon: <Star />, title: "Evolved Interior", desc: "A minimalist workspace built around the driver." },
                            { icon: <Zap />, title: "Energy Grid", desc: "Access the world's most reliable charging network." }
                        ].map((feature, i) => (
                            <motion.div key={i} {...slideUp} transition={{ delay: i * 0.1 }}>
                                <div className="w-16 h-16 mx-auto bg-tesla-red/10 border border-tesla-red/20 rounded-2xl flex items-center justify-center text-tesla-red mb-10">
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-bold uppercase tracking-tighter mb-4">{feature.title}</h4>
                                <p className="text-white/30 text-sm leading-relaxed font-light">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* 🏁 PERFORMANCE SECTION */}
            <section className="relative py-40 bg-black overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-24">
                    <div className="relative rounded-[4rem] overflow-hidden border border-white/10 min-h-[700px] flex items-center">
                        {/* Background Image */}
                        <motion.div
                            initial={{ scale: 1.1 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=2070&auto=format&fit=crop"
                                alt="Tesla Performance"
                                className="w-full h-full object-cover brightness-75"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                        </motion.div>

                        {/* Content Overlay */}
                        <motion.div {...slideUp} className="relative z-10 p-12 md:p-20 max-w-3xl">
                            <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic mb-24">
                                Peak<br />
                                <span className="text-tesla-red">Performance</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-x-16 gap-y-24">
                                <Counter value="2.1" label="0-100 km/h" suffix="s" />
                                <Counter value="1020" label="Peak Power" suffix="HP" />
                                <Counter value="396" label="Range" suffix="mi" />
                                <Counter value="322" label="Top Speed" suffix="km/h" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>



            <section className="py-40 bg-[#0a0a0a] px-6 lg:px-24">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center border border-white/5 rounded-[4rem] overflow-hidden bg-[#050505]">
                    <div className="p-16 md:p-24 flex flex-col justify-center">
                        <Globe className="text-tesla-red mb-12" size={48} />
                        <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-10 italic">Pure <br />Energy</h3>
                        <p className="text-white/40 text-lg font-light leading-relaxed mb-12 border-l-4 border-tesla-red pl-10">
                            We are not just a car company. We are building the energy ecosystem of the future. From solar to transport, zero compromise.
                        </p>
                        <button className="text-[10px] font-bold uppercase tracking-[0.5em] text-tesla-red flex items-center gap-6 group hover:gap-10 transition-all">
                            Learn More <ArrowRight size={16} />
                        </button>
                    </div>
                    <div className="relative h-[600px] overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1466611653911-954ffea112cd?q=80&w=2070" className="w-full h-full object-cover brightness-50" />
                        <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-black" />
                    </div>
                </div>
            </section>

            {/* 🧪 TESLA EXPERIENCE SECTION */}
            <section className="py-32 bg-black px-6 md:px-24 relative overflow-hidden">
                <div className="text-center mb-24 relative z-10">
                    <h2 className="text-tesla-red font-bold uppercase tracking-[0.6em] text-[10px] mb-6">Experience</h2>
                    <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic z-10 relative">Tesla<br /><span className="text-tesla-red">Ecosystem</span></h3>
                </div>
                <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto relative z-10">
                    {[
                        { icon: <Gauge />, title: "Demo Drive", desc: "Feel the instant torque and high-performance engineering." },
                        { icon: <MapPin />, title: "Charging", desc: "Plan your trip across 50,000+ Superchargers worldwide." },
                        { icon: <Smartphone />, title: "Mobile App", desc: "Control everything from cabin climate to software updates." }
                    ].map((item, i) => (
                        <div key={i} className="p-12 rounded-[3rem] bg-white/5 border border-white/10 hover:border-tesla-red/50 transition-all text-center group">
                            <div className="mx-auto text-tesla-red mb-8 group-hover:scale-110 transition-transform">{item.icon}</div>
                            <h4 className="text-2xl font-black uppercase italic mb-4">{item.title}</h4>
                            <p className="text-white/30 text-sm font-light leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-32 bg-black text-white px-6 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic mb-8">Get In<br /><span className="text-tesla-red">Touch</span></h3>
                    <p className="text-white/40 text-base mb-12 font-light tracking-wide max-w-xl mx-auto">Have questions? Our team is here to help you</p>
                    <Link to="/contact" className="inline-block px-16 py-5 bg-tesla-red hover:bg-tesla-red/80 text-white font-bold uppercase tracking-[0.3em] text-[11px] rounded-full transition-all">
                        Contact Us
                    </Link>

                    {/* Social Media Links - Minimal */}
                    <SocialLinks
                        variant="minimal"
                        size={22}
                        gap={8}
                        className="mt-16 pt-12 border-t border-white/10"
                    />
                </div>

                {/* Success Popup */}
                {/* <AnimatePresence>
                    {showSuccessPopup && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowSuccessPopup(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.8, y: 20 }}
                                transition={{ type: "spring", duration: 0.5 }}
                                className="bg-white rounded-3xl p-12 max-w-md mx-4 text-center shadow-2xl border border-neutral-200"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
                                >
                                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </motion.div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-black">Success!</h3>
                                <p className="text-neutral-600 text-sm mb-8 leading-relaxed">
                                    Thank you for subscribing. You'll receive the latest Tesla updates and exclusive content in your terminal.
                                </p>
                                <button
                                    onClick={() => setShowSuccessPopup(false)}
                                    className="px-8 py-3 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-neutral-800 transition-all"
                                >
                                    Close
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence> */}
            </section>


            <footer className="bg-black pt-40 pb-12 px-6 md:px-24 border-t border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-24 mb-40">
                    <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/10 mb-10">Fleet</h5>
                        <ul className="space-y-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                            <li><Link to="/cars" className="hover:text-tesla-red transition-all">S / Plaid</Link></li>
                            <li><Link to="/cars" className="hover:text-tesla-red transition-all">3 / Perf</Link></li>
                            <li><Link to="/cars" className="hover:text-tesla-red transition-all">X / Falcon</Link></li>
                            <li><Link to="/cars" className="hover:text-tesla-red transition-all">Y / Utility</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/10 mb-10">Energy</h5>
                        <ul className="space-y-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                            <li><a href="#" className="hover:text-tesla-red transition-all">Powerwall</a></li>
                            <li><a href="#" className="hover:text-tesla-red transition-all">Solar</a></li>
                            <li><a href="#" className="hover:text-tesla-red transition-all">Megapack</a></li>
                        </ul>
                    </div>
                    <div className="hidden sm:block">
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/10 mb-10">Company</h5>
                        <ul className="space-y-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                            <li><a href="#" className="hover:text-tesla-red transition-all">About</a></li>
                            <li><a href="#" className="hover:text-tesla-red transition-all">Careers</a></li>
                            <li><Link to="/contact" className="hover:text-tesla-red transition-all">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/10 mb-10">Terminal</h5>
                        <ul className="space-y-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                            <li><Link to="/login" className="hover:text-tesla-red transition-all">Account</Link></li>
                            <li><Link to="/cars" className="hover:text-tesla-red transition-all">Garage</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.8em] text-white/10">
                    <p>© 2026 Tesla Clone Project</p>
                    <div className="flex gap-12 mt-8 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Legal</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
