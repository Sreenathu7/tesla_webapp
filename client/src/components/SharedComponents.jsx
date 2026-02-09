import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Linkedin } from 'lucide-react';


export const animations = {
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8 }
    },

    slideUp: {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 }
    },

    slideInLeft: {
        initial: { opacity: 0, x: -50 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 1 }
    },

    slideInRight: {
        initial: { opacity: 0, x: 50 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 1 }
    },

    scaleIn: {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { duration: 1.5 }
    }
};


export const SocialLinks = ({
    variant = 'minimal',
    size = 22,
    gap = 8,
    showLabels = false,
    className = ''
}) => {
    const socialLinks = [
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/teslamotors/',
            icon: <Instagram size={size} />
        },
        {
            name: 'X',
            url: 'https://twitter.com/Tesla',
            icon: (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            )
        },
        {
            name: 'YouTube',
            url: 'https://www.youtube.com/@Tesla',
            icon: <Youtube size={size} />
        },
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/tesla',
            icon: <Facebook size={size} />
        }
    ];

    if (variant === 'minimal') {
        return (
            <div className={`flex justify-center items-center gap-${gap} ${className}`}>
                {socialLinks.map((social) => (
                    <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/40 hover:text-tesla-red transition-colors"
                        aria-label={social.name}
                    >
                        {social.icon}
                    </a>
                ))}
            </div>
        );
    }

    if (variant === 'cards') {
        return (
            <div className={`flex flex-wrap justify-center items-center gap-${gap} ${className}`}>
                {socialLinks.map((social) => (
                    <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-3"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 group-hover:border-tesla-red/50 flex items-center justify-center transition-all group-hover:scale-110">
                            <div className="text-white/60 group-hover:text-tesla-red transition-colors">
                                {social.icon}
                            </div>
                        </div>
                        {showLabels && (
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                                {social.name}
                            </span>
                        )}
                    </a>
                ))}
            </div>
        );
    }

    return null;
};



export const SectionHeading = ({
    label,
    title,
    titleHighlight,
    subtitle,
    align = 'center',
    className = ''
}) => {
    const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';

    return (
        <motion.div
            {...animations.slideUp}
            className={`${alignClass} ${className}`}
        >
            {label && (
                <span className="text-tesla-red font-bold uppercase tracking-[0.6em] text-[10px] mb-6 block italic">
                    {label}
                </span>
            )}
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic mb-6">
                {title}
                {titleHighlight && (
                    <>
                        <br />
                        <span className="text-tesla-red">{titleHighlight}</span>
                    </>
                )}
            </h2>
            {subtitle && (
                <p className="text-white/40 text-base font-light tracking-wide max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};


// TESLA BUTTON COMPONENT


export const TeslaButton = ({
    variant = 'primary',
    size = 'md',
    children,
    to,
    onClick,
    className = '',
    type = 'button',
    disabled = false
}) => {
    const baseClasses = 'font-bold uppercase tracking-[0.3em] transition-all rounded-full inline-block text-center';

    const sizeClasses = {
        sm: 'px-8 py-3 text-[10px]',
        md: 'px-12 py-4 text-[11px]',
        lg: 'px-16 py-5 text-[11px]'
    };

    const variantClasses = {
        primary: 'bg-tesla-red text-white hover:bg-tesla-red/80',
        secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
        outline: 'bg-transparent border-2 border-tesla-red text-tesla-red hover:bg-tesla-red hover:text-white'
    };

    const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

    if (to) {
        return (
            <Link to={to} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={classes}
            disabled={disabled}
        >
            {children}
        </button>
    );
};


// GLASS CARD COMPONENT


export const GlassCard = ({
    children,
    className = '',
    border = true,
    padding = 'md',
    rounded = '3xl'
}) => {
    const paddingClasses = {
        sm: 'p-6',
        md: 'p-8 md:p-10',
        lg: 'p-10 md:p-16'
    };

    const borderClass = border ? 'border border-white/10' : '';
    const roundedClass = `rounded-${rounded}`;

    return (
        <div className={`glass backdrop-blur-xl ${borderClass} ${roundedClass} ${paddingClasses[padding]} ${className}`}>
            {children}
        </div>
    );
};
