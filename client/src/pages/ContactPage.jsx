import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.subject) newErrors.subject = 'Please select a subject';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="bg-[#050505] text-white min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="text-tesla-red font-bold uppercase tracking-[0.6em] text-[10px] mb-4 block italic">Get In Touch</span>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 italic">Contact Us</h1>
                    <p className="text-white/40 text-lg max-w-2xl mx-auto font-light">
                        Have questions about our vehicles or services? Reach out to our team.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 italic">Send a Message</h2>

                        {submitted && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-8 p-6 bg-green-600/10 border border-green-600/30 rounded-2xl"
                            >
                                <p className="text-green-500 font-bold text-sm">Message sent successfully! We'll get back to you soon.</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="YOUR NAME"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-tesla-red transition-all uppercase text-xs tracking-widest font-bold"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name}</p>}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="YOUR EMAIL"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-tesla-red transition-all uppercase text-xs tracking-widest font-bold"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                            </div>

                            <div>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-tesla-red transition-all uppercase text-xs tracking-widest font-bold"
                                >
                                    <option value="" className="bg-[#050505]">SELECT SUBJECT</option>
                                    <option value="Model S" className="bg-[#050505]">Model S</option>
                                    <option value="Model 3" className="bg-[#050505]">Model 3</option>
                                    <option value="Model X" className="bg-[#050505]">Model X</option>
                                    <option value="Model Y" className="bg-[#050505]">Model Y</option>
                                    <option value="Roadster" className="bg-[#050505]">Roadster</option>
                                    <option value="General Inquiry" className="bg-[#050505]">General Inquiry</option>
                                    <option value="Support" className="bg-[#050505]">Support</option>
                                </select>
                                {errors.subject && <p className="text-red-500 text-xs mt-2">{errors.subject}</p>}
                            </div>

                            <div>
                                <textarea
                                    name="message"
                                    placeholder="YOUR MESSAGE"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-tesla-red transition-all uppercase text-xs tracking-widest font-bold resize-none"
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-2">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-5 bg-tesla-red text-white rounded-xl font-bold uppercase tracking-[0.4em] text-[11px] hover:bg-tesla-red/80 transition-all flex items-center justify-center gap-4"
                            >
                                <Send size={18} />
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-12"
                    >
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 italic">Contact Information</h2>

                            <div className="space-y-8">
                                <div className="flex items-start gap-6 p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-tesla-red/50 transition-all">
                                    <div className="w-12 h-12 bg-tesla-red/10 border border-tesla-red/20 rounded-xl flex items-center justify-center text-tesla-red flex-shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Email</h3>
                                        <a href="mailto:support@tesla.com" className="text-white/60 hover:text-tesla-red transition-all">
                                            support@tesla.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-tesla-red/50 transition-all">
                                    <div className="w-12 h-12 bg-tesla-red/10 border border-tesla-red/20 rounded-xl flex items-center justify-center text-tesla-red flex-shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Phone</h3>
                                        <a href="tel:+18885181806" className="text-white/60 hover:text-tesla-red transition-all">
                                            +1 (888) 518-1806
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-tesla-red/50 transition-all">
                                    <div className="w-12 h-12 bg-tesla-red/10 border border-tesla-red/20 rounded-xl flex items-center justify-center text-tesla-red flex-shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Location</h3>
                                        <p className="text-white/60 leading-relaxed">
                                            Tesla, Inc.<br />
                                            3500 Deer Creek Road<br />
                                            Palo Alto, CA 94304
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-gradient-to-br from-tesla-red/10 to-transparent border border-tesla-red/20 rounded-2xl">
                            <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Visit a Showroom</h3>
                            <p className="text-white/60 text-sm mb-6 leading-relaxed">
                                Experience Tesla vehicles firsthand at one of our showrooms worldwide.
                            </p>
                            <Link
                                to="/cars"
                                className="inline-block px-8 py-3 bg-white/10 border border-white/20 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-all"
                            >
                                Find a Location
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
