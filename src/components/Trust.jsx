import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const AnimatedCounter = ({ end, duration, title, suffix = "", prefix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

    useEffect(() => {
        if (isInView) {
            let startTime;
            let animationFrame;

            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);

                // Easing out quart
                const easeOutProgress = 1 - Math.pow(1 - progress, 4);

                setCount(Math.floor(easeOutProgress * end));

                if (progress < 1) {
                    animationFrame = window.requestAnimationFrame(step);
                }
            };

            animationFrame = window.requestAnimationFrame(step);
            return () => window.cancelAnimationFrame(animationFrame);
        }
    }, [isInView, end, duration]);

    return (
        <div className="text-center p-6" ref={ref}>
            <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">
                {prefix}{count}{suffix}
            </div>
            <div className="text-sm text-engineering-orange font-bold uppercase tracking-widest">{title}</div>
        </div>
    );
};

const Trust = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

    return (
        <section className="py-24 bg-industrial-dark relative border-y border-white/5 bg-[url('/images/hero.png')] bg-cover bg-center bg-fixed bg-blend-overlay">
            <div className="absolute inset-0 bg-industrial-dark/90 backdrop-blur-sm z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                        ref={ref}
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-wider">
                            Why Global Clients<br />Trust Maxield
                        </h2>
                        {/* Glowing neon divider */}
                        <div className="w-24 h-1 bg-engineering-orange mx-auto mt-6 shadow-[0_0_15px_#F97316]"></div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 mb-16 border-y border-white/10 py-12 relative">
                    {/* Subtle orb behind the counters */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150px] bg-steel-blue/10 blur-[80px] pointer-events-none"></div>

                    <AnimatedCounter end={18} duration={2000} suffix="+" title="Years Experience" />
                    <AnimatedCounter end={500} duration={2500} suffix="+" title="Bearings Annually" />
                    <AnimatedCounter end={50} duration={2000} suffix="+" title="Industrial Clients" />
                    <AnimatedCounter end={5} duration={1500} title="Best Vendor Awards" />
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {['ISO 9001:2015 Certified', 'Custom Bearing Engineering', 'OEM Drawing Compliance', 'Precision Manufacturing', 'Reliable Delivery'].map((highlight, i) => (
                        <div key={i} className="p-4 border border-white/10 bg-industrial-light/30 backdrop-blur-md clip-diagonal hover:border-steel-blue/50 hover:bg-steel-blue/10 transition-colors shadow-lg">
                            <span className="text-sm font-medium text-white tracking-wide uppercase">{highlight}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
export default Trust;
