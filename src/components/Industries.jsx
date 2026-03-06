import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const industries = [
    { name: "Marine Industry", img: "/images/industries/marine_industry_1772683639395.jpg" },
    { name: "Gearboxes", img: "/images/industries/gearboxes_1772683657291.jpg" },
    { name: "Industrial Pumps", img: "/images/industries/industrial_pumps_1772683672498.jpg" },
    { name: "Gas & Steam Turbines", img: "/images/industries/gas_turbines_1772683692371.jpg" },
    { name: "Cement Industry", img: "/images/industries/cement_industry_1772683709446.jpg" },
    { name: "Steel Industry", img: "/images/industries/steel_industry_1772683728857.jpg" }
];

const Industries = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

    return (
        <section id="applications" className="py-24 bg-[#0F141A] relative" ref={ref}>
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-wider mb-4">
                            Application Industries
                        </h2>
                        <p className="text-metallic-silver text-lg max-w-2xl mx-auto">High-performance bearings integrated across heavy-duty industrial sectors worldwide.</p>
                    </motion.div>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 border border-white/5"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {industries.map((ind, index) => (
                        <motion.div
                            key={index}
                            className="group relative h-72 md:h-80 overflow-hidden cursor-crosshair border border-white/5"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <img src={ind.img} alt={ind.name} className="w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:scale-110 transition-all duration-700 ease-in-out" />

                            <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark/90 via-industrial-dark/50 to-transparent group-hover:from-industrial-dark transition-all duration-500"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full group-hover:-translate-y-4 transition-transform duration-500">
                                <h3 className="text-2xl font-display font-bold text-white uppercase tracking-widest">{ind.name}</h3>
                                <div className="w-0 h-0.5 bg-white group-hover:w-16 transition-all duration-500 mt-4 rounded"></div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
export default Industries;
