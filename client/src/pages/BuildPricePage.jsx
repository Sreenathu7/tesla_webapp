import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCars } from '../store/slices/carSlice';
import { orderAPI } from '../services/api';
import { cn } from '../lib/utils';
import { Check, ChevronRight, Info, Zap, Shield, Gauge, ArrowLeft, ArrowRight, MoveRight } from 'lucide-react';

const BuildPricePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cars, loading } = useSelector((state) => state.cars);
    const { user } = useSelector((state) => state.auth);

    const [selectedCar, setSelectedCar] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [autopilot, setAutopilot] = useState(false);
    const [isOrdering, setIsOrdering] = useState(false);

    useEffect(() => {
        dispatch(fetchCars({ limit: 50 })); // Get all available models
    }, [dispatch]);

    useEffect(() => {
        if (cars.length > 0 && !selectedCar) {
            const initialCar = cars[0];
            setSelectedCar(initialCar);
            setSelectedVariant(initialCar.variants?.[0]);
            setSelectedColor(initialCar.colors?.[0]);
        }
    }, [cars, selectedCar]);

    const handleCarChange = (car) => {
        setSelectedCar(car);
        setSelectedVariant(car.variants?.[0]);
        setSelectedColor(car.colors?.[0]);
    };

    const totalPrice = (selectedCar?.base_price || 0) +
        (selectedVariant?.price || 0) +
        (selectedColor?.price || 0) +
        (autopilot ? 12000 : 0);

    const handleConfirmOrder = async () => {
        // Navigate to dealer contact page with configuration details
        navigate('/contact-dealer', {
            state: {
                carName: selectedCar.name,
                variant: selectedVariant.name,
                color: selectedColor.name,
                autopilot,
                totalPrice,
                carId: selectedCar.id
            }
        });
    };

    if (loading || !selectedCar) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505]">
                <div className="w-20 h-20 border-t-4 border-l-4 border-tesla-red rounded-full animate-spin mb-8 shadow-[0_0_30px_rgba(227,24,55,0.3)]"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20">Configuring Terminal</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col lg:flex-row overflow-hidden italic-headings">


            <div className="lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-[60%] w-full bg-[#080808] flex items-center justify-center p-12 overflow-hidden border-r border-white/5">
                <div className="absolute top-12 left-12 z-20">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-4 text-white/40 hover:text-tesla-red transition-all group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Abort</span>
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${selectedCar.id}-${selectedColor?.id}`}
                        initial={{ opacity: 0, scale: 1.1, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -50 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-6xl"
                    >
                        <img
                            src={selectedColor?.imageUrl}
                            alt={selectedCar.name}
                            className="w-full h-auto drop-shadow-[0_40px_100px_rgba(227,25,55,0.2)] grayscale-[0.2]"
                        />

                        {/* Telemetry Data (Perspective) */}
                        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex gap-12 text-center w-full justify-center opacity-40">
                            <div>
                                <p className="text-3xl font-black italic">{selectedCar.range}mi</p>
                                <p className="text-[9px] uppercase tracking-[0.4em] font-bold">Range</p>
                            </div>
                            <div className="w-[1px] h-12 bg-white/10" />
                            <div>
                                <p className="text-3xl font-black italic">{selectedCar.acceleration || '2.1'}s</p>
                                <p className="text-[9px] uppercase tracking-[0.4em] font-bold">0-60</p>
                            </div>
                            <div className="w-[1px] h-12 bg-white/10" />
                            <div>
                                <p className="text-3xl font-black italic">{selectedCar.top_speed}mph</p>
                                <p className="text-[9px] uppercase tracking-[0.4em] font-bold">Top</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>


                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.01] uppercase select-none pointer-events-none italic">
                    {selectedCar.name.split(' ')[1] || selectedCar.name}
                </div>
            </div>

            <div className="lg:ml-[60%] w-full lg:w-[40%] bg-black p-12 md:p-24 overflow-y-auto custom-scrollbar h-screen">
                <div className="max-w-md mx-auto">
                    <header className="mb-20">
                        <span className="text-tesla-red font-black tracking-[0.6em] text-[10px] uppercase block mb-4 italic">Configuration Stage</span>
                        <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none">{selectedCar.name}</h1>
                    </header>

                    {/* Vessel Type */}
                    <section className="mb-16">
                        <p className="text-[9px] font-black uppercase tracking-[0.6em] text-white/20 mb-8 border-l-2 border-tesla-red pl-4 italic">Vessel Selection</p>
                        <div className="grid grid-cols-2 gap-4">
                            {cars.map((car) => (
                                <button
                                    key={car.id}
                                    onClick={() => handleCarChange(car)}
                                    className={cn(
                                        "px-6 py-4 rounded-xl border-2 transition-all font-black uppercase text-[10px] tracking-widest",
                                        selectedCar.id === car.id ? "border-tesla-red bg-tesla-red/5 text-white" : "border-white/5 text-white/30 hover:border-white/20"
                                    )}
                                >
                                    {car.name}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="mb-16">
                        <p className="text-[9px] font-black uppercase tracking-[0.6em] text-white/20 mb-8 border-l-2 border-tesla-red pl-4 italic">Propulsion Logic</p>
                        <div className="space-y-4">
                            {selectedCar.variants?.map((variant) => (
                                <button
                                    key={variant.id}
                                    onClick={() => setSelectedVariant(variant)}
                                    className={cn(
                                        "w-full p-8 rounded-2xl border-2 transition-all flex justify-between items-center group",
                                        selectedVariant?.id === variant.id ? "border-tesla-red bg-tesla-red/5" : "border-white/5 hover:border-white/10"
                                    )}
                                >
                                    <div className="text-left">
                                        <p className="font-black text-xl uppercase italic tracking-tighter">{variant.name}</p>
                                        <p className="text-[9px] text-white/20 mt-2 uppercase tracking-widest font-bold">
                                            {variant.name.includes('Plaid') || variant.name.includes('Cyber') ? 'Extreme Output Mode' : 'Standard High Performance'}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black italic">
                                            {variant.price === 0 ? 'PRIME' : `+$${variant.price.toLocaleString()}`}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="mb-16">
                        <p className="text-[9px] font-black uppercase tracking-[0.6em] text-white/20 mb-8 border-l-2 border-tesla-red pl-4 italic">Chromatic Finish</p>
                        <div className="flex flex-wrap gap-5">
                            {selectedCar.colors?.map((color) => (
                                <button
                                    key={color.id}
                                    onClick={() => setSelectedColor(color)}
                                    className={cn(
                                        "w-12 h-12 rounded-xl border-2 transition-all p-1",
                                        selectedColor?.id === color.id ? "border-tesla-red scale-110 shadow-[0_0_15px_rgba(227,25,55,0.3)]" : "border-transparent opacity-40 hover:opacity-100"
                                    )}
                                >
                                    <div
                                        className="w-full h-full rounded-lg"
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
                        <p className="mt-6 text-[11px] font-black uppercase tracking-[0.4em] text-white/30 italic">
                            {selectedColor?.name} — {selectedColor?.price === 0 ? 'Prime' : `+$${selectedColor?.price.toLocaleString()}`}
                        </p>
                    </section>

                    {/* Neural Network */}
                    <section className="mb-24">
                        <p className="text-[9px] font-black uppercase tracking-[0.6em] text-white/20 mb-8 border-l-2 border-tesla-red pl-4 italic">Neural Networks</p>
                        <div
                            onClick={() => setAutopilot(!autopilot)}
                            className={cn(
                                "w-full p-8 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center",
                                autopilot ? "border-tesla-red bg-tesla-red/5" : "border-white/5 hover:border-white/10"
                            )}
                        >
                            <div className="text-left">
                                <p className="font-black text-xl uppercase italic tracking-tighter">Full Autonomy</p>
                                <p className="text-[9px] text-white/20 mt-2 uppercase tracking-widest font-bold">A.I. Neural Overdrive System</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-black italic">+$12,000</p>
                            </div>
                        </div>
                    </section>

                    {/* Price Terminal Footer */}
                    <div className="sticky bottom-0 bg-black pt-12 pb-8 border-t border-white/10 mt-20">
                        <div className="flex items-end justify-between mb-10">
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.5em] font-black text-white/20 mb-3 italic">Est. Acquisition Price</p>
                                <p className="text-5xl font-black italic tracking-tighter">${totalPrice.toLocaleString()}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleConfirmOrder}
                            disabled={isOrdering}
                            className="w-full btn-tesla-primary py-6 rounded-2xl flex items-center justify-center gap-6 group"
                        >
                            {isOrdering ? 'TRANSMITTING...' : 'CONFIRM ACQUISITION'} <MoveRight size={20} className="group-hover:translate-x-4 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildPricePage;
