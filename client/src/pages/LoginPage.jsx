import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { loginUser, registerUser } from '../store/slices/authSlice';
import { User, Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import { cn } from '../lib/utils';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            const result = await dispatch(loginUser({ email, password }));
            if (loginUser.fulfilled.match(result)) {
                navigate('/');
            }
        } else {
            const result = await dispatch(registerUser({ name, email, password }));
            if (registerUser.fulfilled.match(result)) {
                navigate('/');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-10 rounded-[2.5rem] bg-[#171a20] border border-white/5 shadow-[0_25px_100px_rgba(0,0,0,0.8)]"
            >
                <div className="text-center mb-10">
                    <motion.div
                        key={isLogin ? 'login-icon' : 'register-icon'}
                        initial={{ opacity: 0, rotate: -20 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-tesla-red"
                    >
                        {isLogin ? <LogIn size={32} /> : <UserPlus size={32} />}
                    </motion.div>
                    <h2 className="text-3xl font-bold uppercase tracking-[0.2em] mb-2">
                        {isLogin ? 'Welcome Back' : 'Join the Future'}
                    </h2>
                    <p className="text-white/40 text-sm">
                        {isLogin ? 'Enter your credentials to continue' : 'Create an account to start your journey'}
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-6 p-4 rounded-2xl bg-tesla-red/10 border border-tesla-red/20 text-tesla-red text-xs font-bold uppercase tracking-widest text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2 ml-4">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-black/40 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                                        placeholder="Nikola Tesla"
                                        required
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2 ml-4">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                                placeholder="example@tesla.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2 ml-4">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-white/10"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-white text-black rounded-2xl font-bold uppercase tracking-[0.2em] text-sm hover:bg-neutral-200 transition-all disabled:opacity-50 mt-4 shadow-xl shadow-white/5"
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors"
                    >
                        {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
