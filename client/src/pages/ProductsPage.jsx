import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchCars } from '../store/slices/carSlice';
import { Search, SlidersHorizontal, ChevronRight, ChevronLeft, Gauge, Wind, Zap, LayoutGrid } from 'lucide-react';
import { cn } from '../lib/utils';

const CarCard = ({ car }) => {
    const [activeColor, setActiveColor] = useState(car.colors?.[0] || null);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-tesla-red/30 transition-all duration-500 shadow-2xl"
        >
            {/* Category Badge */}
            <div className="absolute top-6 left-6 z-20 px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white/60">
                {car.category}
            </div>

            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeColor?.id}
                        src={activeColor?.imageUrl}
                        alt={car.name}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0"
                    />
                </AnimatePresence>

                {/* HUD Overlay */}
                <div className="absolute inset-x-6 bottom-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex gap-6">
                        <div className="text-left font-black italic">
                            <p className="text-[10px] text-tesla-red uppercase mb-1">Top Speed</p>
                            <p className="text-xl leading-none">{car.top_speed}<span className="text-[10px] ml-1 uppercase">Mph</span></p>
                        </div>
                        <div className="text-left font-black italic border-l border-white/10 pl-6">
                            <p className="text-[10px] text-tesla-red uppercase mb-1">Range</p>
                            <p className="text-xl leading-none">{car.range}<span className="text-[10px] ml-1 uppercase">Mi</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="p-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h3 className="text-4xl font-black tracking-tighter uppercase italic leading-none mb-4">{car.name}</h3>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em]">From ${car.base_price?.toLocaleString()}</p>
                    </div>
                </div>

                {/* Swatches (Lambo Style) */}
                <div className="flex gap-4 mb-10 pb-8 border-b border-white/5">
                    {car.colors?.map((color) => (
                        <button
                            key={color.id}
                            onClick={() => setActiveColor(color)}
                            className={cn(
                                "w-10 h-10 rounded-2xl border-2 transition-all p-1",
                                activeColor?.id === color.id ? "border-tesla-red scale-110" : "border-transparent opacity-40 hover:opacity-100"
                            )}
                        >
                            <div
                                className="w-full h-full rounded-xl"
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

                <div className="flex gap-4">
                    <Link
                        to={`/cars/${car.slug}`}
                        className="flex-1 py-5 bg-white text-black text-center rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                    >
                        Review
                    </Link>
                    <Link
                        to="/build"
                        className="flex-1 py-5 border-2 border-white/10 text-white text-center rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/5 hover:border-white transition-all"
                    >
                        Configure
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

const ProductsPage = () => {
    const dispatch = useDispatch();
    const { cars, loading, meta, error } = useSelector((state) => state.cars);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('base_price');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const loadCars = useCallback(() => {
        dispatch(fetchCars({
            search: searchTerm,
            sortBy,
            order,
            page,
            category,
            minPrice,
            maxPrice,
            limit: 6
        }));
    }, [dispatch, searchTerm, sortBy, order, page, category, minPrice, maxPrice]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            loadCars();
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [loadCars]);

    return (
        <div className="min-h-screen bg-black pt-40 pb-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <header className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-tesla-red font-black tracking-[0.5em] uppercase text-[10px] mb-6 block italic"
                        >
                            Propulsion Systems
                        </motion.span>
                        <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-8">Ready <br />To Launch.</h2>
                        <p className="text-white/30 text-lg uppercase tracking-[0.2em] font-light italic border-l-4 border-tesla-red pl-8">
                            Engineered for Mars. Driven on Earth.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
                        <div className="relative flex-1 w-full lg:w-96 group">
                            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-tesla-red transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search garage..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                                className="w-full bg-white/[0.03] border-2 border-white/5 rounded-[2rem] pl-20 pr-10 py-6 text-[11px] font-black uppercase tracking-[0.3em] focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                            />
                        </div>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={cn(
                                "p-6 rounded-[2rem] border-2 transition-all group",
                                isFilterOpen ? "bg-white text-black border-white" : "bg-white/[0.03] border-white/5 text-white/40 hover:text-white"
                            )}
                        >
                            <SlidersHorizontal size={24} className="group-hover:rotate-180 transition-transform duration-500" />
                        </button>
                    </div>
                </header>

                <AnimatePresence>
                    {isFilterOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mb-20"
                        >
                            <div className="p-12 rounded-[3.5rem] bg-[#050505] border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-12">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-8 border-l-2 border-tesla-red pl-4">Model Class</p>
                                    <div className="flex flex-wrap gap-4">
                                        {['', 'Sedan', 'SUV', 'Truck', 'Sports'].map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => { setCategory(cat); setPage(1); }}
                                                className={cn(
                                                    "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all",
                                                    category === cat
                                                        ? "bg-tesla-red border-tesla-red text-white"
                                                        : "bg-transparent border-white/5 text-white/30 hover:border-white/20"
                                                )}
                                            >
                                                {cat || 'All Class'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-8 border-l-2 border-tesla-red pl-4">Price Range</p>
                                    <div className="flex gap-4">
                                        <input
                                            type="number"
                                            placeholder="MIN"
                                            value={minPrice}
                                            onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                                            className="w-full bg-white/[0.03] border-2 border-white/5 rounded-2xl p-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-tesla-red/50 transition-all placeholder:text-white/20"
                                        />
                                        <input
                                            type="number"
                                            placeholder="MAX"
                                            value={maxPrice}
                                            onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                                            className="w-full bg-white/[0.03] border-2 border-white/5 rounded-2xl p-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-tesla-red/50 transition-all placeholder:text-white/20"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-8 border-l-2 border-tesla-red pl-4">Telemetry Order</p>
                                    <div className="flex flex-wrap gap-4">
                                        {[
                                            { label: 'Msrp', value: 'base_price' },
                                            { label: 'Range', value: 'range' },
                                            { label: 'Speed', value: 'top_speed' },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    if (sortBy === option.value) setOrder(order === 'asc' ? 'desc' : 'asc');
                                                    else { setSortBy(option.value); setOrder('asc'); }
                                                    setPage(1);
                                                }}
                                                className={cn(
                                                    "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all",
                                                    sortBy === option.value
                                                        ? "bg-white text-black border-white"
                                                        : "bg-transparent border-white/5 text-white/30 hover:border-white/20"
                                                )}
                                            >
                                                {option.label} {sortBy === option.value && (order === 'asc' ? '↑' : '↓')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && (
                    <div className="py-24 text-center bg-[#050505] rounded-[4rem] border-2 border-tesla-red/20">
                        <h4 className="text-3xl font-black uppercase italic mb-4">Uplink Lost</h4>
                        <p className="text-white/30 mb-10 tracking-widest uppercase text-xs">{error}</p>
                        <button
                            onClick={() => loadCars()}
                            className="btn-tesla-primary"
                        >
                            Reconnect
                        </button>
                    </div>
                )}

                {!error && (
                    <>
                        {loading && page === 1 ? (
                            <div className="py-48 flex items-center justify-center">
                                <div className="w-24 h-24 border-t-4 border-l-4 border-tesla-red rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                {cars.map((car) => (
                                    <CarCard key={car.id} car={car} />
                                ))}
                            </div>
                        )}

                        {/* Pagination (Lambo Style) */}
                        {meta.totalPages > 1 && (
                            <div className="mt-32 flex justify-center items-center gap-10">
                                <button
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                    className="p-6 rounded-[2rem] border-2 border-white/5 disabled:opacity-5 hover:border-white/20 transition-all group"
                                >
                                    <ChevronLeft size={28} className="group-hover:-translate-x-2 transition-transform" />
                                </button>
                                <div className="flex gap-6">
                                    {[...Array(meta.totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setPage(i + 1)}
                                            className={cn(
                                                "w-16 h-16 rounded-[1.5rem] text-xs font-black transition-all border-2 italic",
                                                page === i + 1 ? "bg-tesla-red border-tesla-red text-white shadow-[0_0_30px_rgba(227,25,55,0.4)]" : "bg-transparent border-white/5 text-white/20 hover:border-white/10"
                                            )}
                                        >
                                            0{i + 1}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setPage(page + 1)}
                                    disabled={page === meta.totalPages}
                                    className="p-6 rounded-[2rem] border-2 border-white/5 disabled:opacity-5 hover:border-white/20 transition-all group"
                                >
                                    <ChevronRight size={28} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        )}

                        {cars.length === 0 && !loading && (
                            <div className="py-48 text-center bg-[#050505] rounded-[4rem] border-2 border-white/5">
                                <p className="text-3xl font-black uppercase italic text-white/10 tracking-widest mb-10 underline decoration-tesla-red/20 underline-offset-[20px]">Coordinates Not Found</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setCategory(''); setPage(1); }}
                                    className="text-tesla-red font-black uppercase tracking-[0.5em] text-[10px] hover:tracking-[0.8em] transition-all"
                                >
                                    Reset Telemetry
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
