import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { orderAPI, carAPI } from '../services/api';
import { Package, Users, Car, TrendingUp, ChevronRight } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalCars: 0,
        recentOrders: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || user.role !== 'ADMIN') {
            navigate('/');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                const [carsRes, ordersRes] = await Promise.all([
                    carAPI.getAll({ limit: 100 }),
                    orderAPI.getAll()
                ]);

                setStats({
                    totalOrders: ordersRes.data.length,
                    totalCars: carsRes.data.cars.length,
                    recentOrders: ordersRes.data.slice(0, 5) // Show top 5 recent orders
                });
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user, navigate]);

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-tesla-red border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const cards = [
        { title: 'Total Revenue', value: '$1.2M', icon: <TrendingUp className="text-green-500" />, trend: '+12.5%' },
        { title: 'Total Orders', value: stats.totalOrders, icon: <Package className="text-blue-500" />, trend: '+5.2%' },
        { title: 'Active Inventory', value: stats.totalCars, icon: <Car className="text-tesla-red" />, trend: '0%' },
        { title: 'New Users', value: '458', icon: <Users className="text-purple-500" />, trend: '+18.3%' },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-tesla-red mb-3">Control Panel</h2>
                    <h3 className="text-4xl font-bold">Admin Dashboard</h3>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#171a20] p-8 rounded-3xl border border-white/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-white/5 rounded-2xl">{card.icon}</div>
                                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">
                                    {card.trend}
                                </span>
                            </div>
                            <h4 className="text-white/40 text-sm font-medium uppercase tracking-widest mb-1">{card.title}</h4>
                            <p className="text-3xl font-bold">{card.value}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-[#171a20] rounded-3xl border border-white/5 overflow-hidden">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center">
                            <h4 className="font-bold">Recent Orders</h4>
                            <button className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white">View All</button>
                        </div>
                        <div className="p-8">
                            <div className="space-y-6">
                                {stats.recentOrders.length > 0 ? (
                                    stats.recentOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-tesla-red/10 rounded-xl flex items-center justify-center text-tesla-red font-bold">
                                                    #{order.id}
                                                </div>
                                                <div>
                                                    <p className="font-bold">{order.configurationJson?.carName || 'Unknown Vessel'}</p>
                                                    <p className="text-xs text-white/40 mt-1">
                                                        {order.user?.name} • {new Date(order.createdAt).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-lg">${order.totalPrice?.toLocaleString()}</p>
                                                <ChevronRight className="inline-block text-white/20 ml-2" size={16} />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-20 text-center text-white/20 uppercase tracking-widest text-xs">
                                        No recent transmissions found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#171a20] rounded-3xl border border-white/5 p-8">
                        <h4 className="font-bold mb-8">Inventory Status</h4>
                        <div className="space-y-8">
                            {['Model S', 'Model 3', 'Model X', 'Cybertruck'].map((model, i) => (
                                <div key={model}>
                                    <div className="flex justify-between items-end mb-2">
                                        <p className="text-sm font-medium">{model}</p>
                                        <p className="text-xs text-white/40">{[12, 45, 8, 2][i]} in stock</p>
                                    </div>
                                    <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${[40, 85, 25, 10][i]}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className="h-full bg-tesla-red"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
