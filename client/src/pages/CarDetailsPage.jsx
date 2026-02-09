import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCarBySlug, clearSelectedCar } from '../store/slices/carSlice';
import { cn } from '../lib/utils';
import { ChevronRight, Battery, Zap, Gauge, Timer, Shield, Wind, ArrowLeft, MoveRight, Maximize2 } from 'lucide-react';

const CarDetailsPage = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedCar, loading, error } = useSelector((state) => state.cars);
    const [activeColor, setActiveColor] = useState(null);

    useEffect(() => {
        dispatch(fetchCarBySlug(slug));
        return () => dispatch(clearSelectedCar());
    }, [dispatch, slug]);

    useEffect(() => {
        if (selectedCar && selectedCar.colors?.length > 0) {
            setActiveColor(selectedCar.colors[0]);
        }
    }, [selectedCar]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505]">
                <div className="w-20 h-20 border-t-4 border-l-4 border-tesla-red rounded-full animate-spin mb-8 shadow-[0_0_30px_rgba(227,24,55,0.3)]"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20 animate-pulse">Establishing Uplink</p>
            </div>
        );
    }

    if (error || !selectedCar) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">404 <br /><span className="text-tesla-red">Vessel Not Found.</span></h2>
                <p className="text-white/30 uppercase tracking-widest text-xs mb-12">The coordinates provided do not match any known unit in the garage.</p>
                <Link to="/cars" className="btn-tesla-primary">Return to Garage</Link>
            </div>
        );
    }

    return (
        <div className="bg-[#050505] text-white selection:bg-tesla-red selection:text-white overflow-hidden">


            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeColor?.id}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            src={activeColor?.imageUrl}
                            alt={selectedCar.name}
                            className="w-full h-full object-cover grayscale-[0.3] brightness-[0.6]"
                        />
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />
                </div>

                {/* Performance HUD Bar */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-full max-w-6xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="glass border border-white/5 rounded-[2.5rem] p-8 md:p-12 flex flex-wrap justify-between items-center gap-12"
                    >
                        <div className="text-center md:text-left">
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 italic">Acceleration</p>
                            <p className="text-5xl font-black italic">{selectedCar.acceleration || '2.1'}<span className="text-tesla-red text-xl ml-2 font-bold">s</span></p>
                        </div>
                        <div className="w-[1px] h-16 bg-white/5 hidden md:block" />
                        <div className="text-center md:text-left">
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 italic">Top Speed</p>
                            <p className="text-5xl font-black italic">{selectedCar.top_speed}<span className="text-tesla-red text-xl ml-2 font-bold">MPH</span></p>
                        </div>
                        <div className="w-[1px] h-16 bg-white/5 hidden md:block" />
                        <div className="text-center md:text-left">
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-4 italic">Peak Range</p>
                            <p className="text-5xl font-black italic">{selectedCar.range}<span className="text-tesla-red text-xl ml-2 font-bold">MI</span></p>
                        </div>
                        <div className="w-full md:w-auto mt-4 md:mt-0">
                            <Link to="/build" className="btn-tesla-primary w-full md:w-auto inline-block text-center">
                                Start Configuration
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Vessel Heading */}
                <div className="relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-tesla-red font-black tracking-[0.8em] text-[10px] uppercase mb-4 block italic">Unit Designation</span>
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none italic">{selectedCar.name}</h1>
                    </motion.div>
                </div>
            </section>

            {/* 🛠️ TECHNICAL SPECIFICATIONS */}
            <section className="py-40 bg-black carbon-texture relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-32 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <span className="text-tesla-red font-black uppercase tracking-[0.6em] text-[10px] block mb-10 italic">Engineering Data</span>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-12 italic">Precision <br />Propulsion.</h2>
                            <p className="text-white/40 text-lg leading-relaxed mb-16 font-light tracking-wide border-l-4 border-tesla-red pl-10 italic">
                                {selectedCar.description}
                            </p>

                            <div className="grid sm:grid-cols-2 gap-12">
                                {[
                                    { icon: <Zap size={30} />, title: "AWD Drive", desc: "Digital torque vectoring across all wheels." },
                                    { icon: <Gauge size={30} />, title: "Overdrive", desc: "Optimized aerodynamics for high-speed stability." },
                                    { icon: <Shield size={30} />, title: "Fortress", desc: "Rigid structure for maximum passenger safety." },
                                    { icon: <Wind size={30} />, title: "Low Drag", desc: "The lowest drag coefficient in its class." }
                                ].map((spec, i) => (
                                    <div key={i} className="group cursor-crosshair">
                                        <div className="text-tesla-red mb-6 opacity-60 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">{spec.icon}</div>
                                        <h4 className="font-black uppercase text-xs tracking-widest mb-2 italic">{spec.title}</h4>
                                        <p className="text-white/20 text-[10px] uppercase tracking-wider font-bold">{spec.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 border border-tesla-red/20 rounded-[3rem] group-hover:inset-0 transition-all duration-1000" />
                            <img src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070" className="w-full aspect-square object-cover rounded-[2.5rem] brightness-75 group-hover:brightness-100 transition-all duration-1000 grayscale group-hover:grayscale-0" alt="Detail" />
                            <div className="absolute bottom-12 right-12 p-10 glass rounded-3xl border border-white/10">
                                <Maximize2 className="text-tesla-red mb-6" />
                                <h4 className="font-black uppercase italic tracking-tighter">Carbon Core</h4>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 🎨 CHROMATIC SELECTION */}
            <section className="py-40 bg-[#050505] px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-tesla-red font-black tracking-[0.8em] text-[10px] uppercase mb-12 italic">Chromatic Finish</h3>
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-20 italic leading-none">External <br />Aesthetics.</h2>

                    <div className="flex flex-wrap justify-center gap-8 mb-16">
                        {selectedCar.colors?.map((color) => (
                            <button
                                key={color.id}
                                onClick={() => setActiveColor(color)}
                                className={cn(
                                    "w-16 h-16 rounded-2xl border-2 transition-all p-1.5",
                                    activeColor?.id === color.id ? "border-tesla-red scale-110 shadow-[0_0_20px_rgba(227,25,55,0.4)]" : "border-white/5 opacity-40 hover:opacity-100"
                                )}
                            >
                                <div
                                    className="w-full h-full rounded-xl shadow-inner"
                                    style={{
                                        backgroundColor:
                                            color.name.toLowerCase().includes('white') ? '#eee' :
                                                color.name.toLowerCase().includes('black') ? '#080808' :
                                                    color.name.toLowerCase().includes('blue') ? '#0047AB' :
                                                        color.name.toLowerCase().includes('red') ? '#CC0000' :
                                                            color.name.toLowerCase().includes('grey') ? '#333' :
                                                                color.name.toLowerCase().includes('silver') ? '#999' :
                                                                    color.name.toLowerCase().includes('steel') ? '#A5A9B4' : '#333'
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={activeColor?.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-white/30 font-black uppercase tracking-[0.5em] text-[11px]"
                        >
                            {activeColor?.name} — ${activeColor?.price?.toLocaleString() || '0'} PREM.
                        </motion.p>
                    </AnimatePresence>
                </div>
            </section>

            {/* 🏁 BOTTOM CTA */}


        </div>
    );
};

export default CarDetailsPage;
