import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';

const timeline = [
    { year: '2007', title: 'Company Founded', desc: 'Established by MKC Appa Rao with military-grade precision and engineering rigor.' },
    { year: '2010', title: 'Turbine Expansion', desc: 'Expanded into specialized steam and gas turbine bearings for heavy industries.' },
    { year: '2015', title: 'ISO Certification', desc: 'Achieved ISO 9001:2015 Certification for systematic engineering quality.' },
    { year: '2020', title: 'Global Reach', desc: 'Established international partnerships for global industrial supply chains.' },
    { year: '2025', title: 'Advanced Machining', desc: 'Integrated next-gen CNC manufacturing and non-destructive testing labs.' }
];

const industriesList = [
    'Steam turbines', 'Gas turbines', 'Industrial pumps', 'Gearboxes',
    'Marine propulsion systems', 'Cement plants', 'Steel plants', 'Sugar industries'
];

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

    return (
        <section id="about" className="py-24 bg-industrial-dark relative border-t border-white/5 overflow-hidden">
            {/* Mathematical Engineering SVG Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <pattern id="mathGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#mathGrid)" />

                    {/* Concentric bearing design rings */}
                    <svg x="85%" y="50%" overflow="visible">
                        {/* Outer Tolerance bounds */}
                        <circle r="400" fill="none" stroke="#F97316" strokeWidth="1" strokeDasharray="10 15" opacity="0.8" />
                        <circle r="300" fill="none" stroke="white" strokeWidth="2" opacity="0.5" />
                        <circle r="290" fill="none" stroke="white" strokeWidth="0.5" />
                        <circle r="200" fill="none" stroke="white" strokeWidth="1" strokeDasharray="5 5" opacity="0.4" />
                        <circle r="100" fill="none" stroke="white" strokeWidth="1" />

                        {/* Crosshairs & Vectors */}
                        <path d="M -550 0 L 550 0 M 0 -550 L 0 550" stroke="white" strokeWidth="0.5" opacity="0.5" />
                        <path d="M -390 -390 L 390 390 M -390 390 L 390 -390" stroke="white" strokeWidth="0.5" strokeDasharray="10 10" opacity="0.3" />

                        {/* Tech Labels */}
                        <text x="310" y="-10" fill="white" fontSize="12" fontFamily="monospace" opacity="0.8">Ø 600.00</text>
                        <text x="410" y="-10" fill="#F97316" fontSize="12" fontFamily="monospace" opacity="0.8">Ø 800.00 (TOL ±0.05)</text>
                        <text x="210" y="-10" fill="white" fontSize="12" fontFamily="monospace" opacity="0.6">INNER LINER REF</text>
                        <text x="15" y="-310" fill="white" fontSize="12" fontFamily="monospace" opacity="0.6">Y-AXIS ALIGN</text>
                    </svg>

                    {/* Floating Hydrodynamic physics equations mapping */}
                    <text x="5%" y="10%" fill="white" fontSize="14" fontFamily="monospace" opacity="0.6">W = (π/2) * μ * U * (R/C)² * L * ε / (1-ε²)²</text>
                    <text x="8%" y="14%" fill="white" fontSize="12" fontFamily="monospace" opacity="0.4">SOMMERFELD NUMBER: S = (r/c)² * (μN/P)</text>
                    <text x="10%" y="85%" fill="white" fontSize="14" fontFamily="monospace" opacity="0.5">h_min = C * (1 - ε)</text>
                    <text x="40%" y="90%" fill="white" fontSize="14" fontFamily="monospace" opacity="0.5">Re = (ρ * U * h) / μ</text>
                </svg>
            </div>

            {/* Protective shadow gradient ensuring text readability over the SVG */}
            <div className="absolute top-0 left-0 w-2/3 h-full bg-gradient-to-r from-industrial-dark via-industrial-dark/90 to-transparent pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20" ref={ref}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-center"
                    >
                        <div className="mb-6 flex items-center gap-4">
                            <div className="w-8 h-px bg-engineering-orange"></div>
                            <span className="text-engineering-orange font-bold tracking-widest uppercase text-xs">About The Company</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white uppercase tracking-tight font-display">
                            Engineering Precision<br />Since <span className="text-engineering-orange">2007</span>
                        </h2>

                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-metallic-silver mb-6 leading-relaxed bg-industrial-dark/50 backdrop-blur-sm p-4 border-l-2 border-engineering-orange">
                                Maxield Bearings is a specialized manufacturer of <strong className="text-white font-medium">white metal-lined hydrodynamic bearings</strong> designed for high-performance industrial applications.
                            </p>
                            <p className="text-lg text-metallic-silver mb-12 leading-relaxed bg-industrial-dark/50 backdrop-blur-sm p-4 border-l-2 border-white/20">
                                Established in 2007 by Mr. MKC Appa Rao, a former <strong className="text-white font-medium">Indian Air Force professional</strong>, we bring military-grade discipline and engineering rigor into manufacturing. We follow strict OEM drawings and international testing standards to ensure exceptional dimensional accuracy.
                            </p>
                        </div>

                        <div className="border border-white/10 p-8 bg-[#1A232C]/80 backdrop-blur-md relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 transform rotate-45 translate-x-8 -translate-y-8"></div>

                            <h3 className="text-sm font-display font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-3">
                                <span className="w-2 h-2 bg-engineering-orange animate-pulse"></span>
                                Engineered Applications
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {industriesList.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                                        className="flex items-center gap-3 text-xs md:text-sm text-metallic-silver border border-white/5 p-3 cursor-crosshair transition-all duration-300 hover:border-engineering-orange/50 hover:text-white group/item"
                                    >
                                        <div className="text-[10px] font-mono text-engineering-orange/60 group-hover/item:text-engineering-orange transition-colors">
                                            [{String(i + 1).padStart(2, '0')}]
                                        </div>
                                        <span className="font-medium uppercase tracking-wider">{item}</span>
                                        <div className="ml-auto w-1 h-1 bg-white/20 group-hover/item:bg-engineering-orange transition-colors"></div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex flex-col justify-center lg:pl-12"
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative border-l border-white/10 ml-4 md:ml-0 pl-10 py-4 space-y-14 bg-industrial-dark/30 backdrop-blur-sm rounded-xl">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="relative group"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute -left-[45px] top-1.5 w-2 h-2 rounded-full bg-industrial-dark border border-white/50 group-hover:border-engineering-orange group-hover:bg-engineering-orange transition-colors duration-300"></div>

                                    <h4 className="text-2xl font-display font-bold text-white mb-2 flex items-center gap-4">
                                        <span className="text-engineering-orange tracking-wider">{item.year}</span>
                                        <span className="text-xl tracking-tight">{item.title}</span>
                                    </h4>
                                    <p className="text-metallic-silver text-sm leading-relaxed max-w-md">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
export default About;
