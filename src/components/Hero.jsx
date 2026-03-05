import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import BearingScene from './BearingScene';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-industrial-dark">
            {/* Extremely clean background, no neon glows */}
            <div className="absolute inset-0 z-0 bg-industrial-dark">
                <img src="/images/hero.png" alt="Industrial Manufacturing Background" className="w-full h-full object-cover opacity-10 mix-blend-luminosity grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark via-industrial-dark/95 to-industrial-dark/70"></div>

                {/* 3D Scroll-animated Bearing Model */}
                <BearingScene />

                {/* Subtle blueprint grid */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-12 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="text-engineering-orange font-bold tracking-[0.2em] uppercase text-xs mb-6 block drop-shadow-lg">Maxield Bearings</span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white uppercase tracking-tight font-display leading-[1.1] pointer-events-auto drop-shadow-2xl">
                        Precision Hydrodynamic <br />
                        <span className="text-engineering-orange drop-shadow-none">Bearings Engineered </span>For <br />
                        Critical Systems
                    </h1>
                </motion.div>

                <motion.p
                    className="max-w-2xl mx-auto text-lg text-metallic-silver mb-12 font-light leading-relaxed mt-2 pointer-events-auto drop-shadow-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    ISO 9001:2015 Certified Manufacturer of White Metal Bearings for Turbines, Pumps, Marine Systems, and Heavy Industrial Machinery.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row justify-center items-center gap-4 pointer-events-auto shadow-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Link to="/products" className="px-8 py-4 bg-engineering-orange text-white hover:bg-orange-600 transition-colors uppercase font-bold tracking-widest text-sm w-full sm:w-auto min-w-[220px]">
                        Explore Products
                    </Link>
                    <Link to="/contact" className="px-8 py-4 border border-white/20 text-white hover:bg-white hover:text-industrial-dark transition-all duration-300 uppercase font-bold tracking-widest text-sm w-full sm:w-auto min-w-[220px] bg-industrial-dark/50 backdrop-blur-md">
                        Contact Engineering
                    </Link>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-metallic-silver z-10 flex flex-col items-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                <span className="text-[10px] uppercase tracking-[0.3em] mb-4 text-white/30">Scroll Down</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-5 h-5 text-white/50" />
                </motion.div>
            </motion.div>
        </section>
    );
};
export default Hero;
