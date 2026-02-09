import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, MessageSquare, Check } from 'lucide-react';

const ContactDealerPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderConfig = location.state || {};

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setShowSuccessPopup(true);

        // Auto close popup and redirect after 3 seconds
        setTimeout(() => {
            setShowSuccessPopup(false);
            navigate('/');
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 py-24">
            <div className="max-w-2xl w-full">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-white/40 hover:text-tesla-red transition-colors mb-12 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">Back</span>
                </button>

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Contact Dealer
                    </h1>
                    <p className="text-white/40 text-sm">
                        Share your details and our dealer will reach out to you soon
                    </p>
                </div>

                {/* Configuration Summary */}
                {orderConfig.carName && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
                        <h3 className="text-[10px] uppercase tracking-wide text-white/40 mb-4">Your Configuration</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-white/60">Model:</span>
                                <span className="text-white ml-2 font-medium">{orderConfig.carName}</span>
                            </div>
                            <div>
                                <span className="text-white/60">Variant:</span>
                                <span className="text-white ml-2 font-medium">{orderConfig.variant}</span>
                            </div>
                            <div>
                                <span className="text-white/60">Color:</span>
                                <span className="text-white ml-2 font-medium">{orderConfig.color}</span>
                            </div>
                            <div>
                                <span className="text-white/60">Total:</span>
                                <span className="text-white ml-2 font-medium">${orderConfig.totalPrice?.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-white/60 mb-3">
                            Full Name *
                        </label>
                        <div className="relative">
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white placeholder:text-white/20 focus:border-tesla-red focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-white/60 mb-3">
                            Email Address *
                        </label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white placeholder:text-white/20 focus:border-tesla-red focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-white/60 mb-3">
                            Phone Number *
                        </label>
                        <div className="relative">
                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 000-0000"
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white placeholder:text-white/20 focus:border-tesla-red focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Message Field */}
                    <div>
                        <label className="block text-[11px] uppercase tracking-wide text-white/60 mb-3">
                            Message (Optional)
                        </label>
                        <div className="relative">
                            <MessageSquare size={18} className="absolute left-4 top-4 text-white/30" />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Any specific questions or preferences..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-white placeholder:text-white/20 focus:border-tesla-red focus:outline-none transition-colors resize-none"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-tesla-red hover:bg-tesla-red/90 text-white py-4 rounded-lg font-semibold uppercase tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                </form>

                {/* Privacy Note */}
                <p className="text-center text-[10px] text-white/30 mt-8">
                    By submitting, you agree to be contacted by our authorized dealers regarding your inquiry
                </p>
            </div>

            {/* Success Popup */}
            <AnimatePresence>
                {showSuccessPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#0a0a0a] border border-white/20 rounded-2xl p-12 max-w-md w-full text-center"
                        >
                            <div className="w-20 h-20 bg-tesla-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check size={40} className="text-tesla-red" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Request Received!</h2>
                            <p className="text-white/60 text-sm mb-8">
                                Thank you for your interest. Our dealer will get in touch with you very soon to discuss your configuration.
                            </p>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 3, ease: 'linear' }}
                                    className="h-full bg-tesla-red"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContactDealerPage;
