import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const products = [
    { name: "Journal Bearing Type 1", desc: "High-load capacity hydrodynamic bearing.", img: "/images/products/journal_bearing_1.png" },
    { name: "Journal Bearing Type 2", desc: "Precision-engineered for high-speed shafts.", img: "/images/products/journal_bearing_2.png" },
    { name: "Four Lobe Thrust Bearing", desc: "Enhanced stability for rotational equipment.", img: "/images/products/four_lobe_thrust.png" },
    { name: "Single Side Thrust Bearing", desc: "Maximized unidirectional load handling.", img: "/images/products/single_side_thrust.png" },
    { name: "Offset Bore Bearing", desc: "Customized clearance for thermal expansion.", img: "/images/products/offset_bore.png" },
    { name: "Thin Wall Bearing", desc: "Compact dimensions with extreme durability.", img: "/images/products/thin_wall.png" },
    { name: "Special Bearing", desc: "Application-specific bespoke engineering.", img: "/images/products/special_bearing.png" },
    { name: "Oil Seal", desc: "Zero-leakage precision sealing solutions.", img: "/images/products/oil_seal.png" },
    { name: "Inner Tilting Pad Bearing", desc: "Self-aligning pad configurations.", img: "/images/products/inner_tilting_pad.png" },
    { name: "Thrust Pad Bearing", desc: "Optimal axial load distribution.", img: "/images/products/thrust_pad.png" },
    { name: "Oil Inlet Fittings", desc: "Optimized fluid dynamics for lubrication.", img: "/images/products/oil_inlet_fittings.png" },
    { name: "Oil Feed Connectors", desc: "Secure and continuous oil transmission.", img: "/images/products/oil_feed_connectors.png" }
];

const Products = () => {
    const ref = useRef(null);
    const sectionRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const visibleProducts = isExpanded ? products : products.slice(0, 6);

    const toggleExpanded = () => {
        if (isExpanded) {
            setIsExpanded(false);
            setTimeout(() => {
                document.getElementById('quality')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        } else {
            setIsExpanded(true);
        }
    };

    return (
        <section ref={sectionRef} id="products" className="py-24 bg-[#162032] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <div className="mb-6 flex items-center gap-4">
                            <div className="w-8 h-px bg-engineering-orange"></div>
                            <span className="text-engineering-orange font-bold tracking-widest uppercase text-xs">Interactive Portfolio</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
                            Precision Products
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className="text-metallic-silver border-l border-engineering-orange pl-5 text-sm uppercase tracking-widest">
                            Precision engineered for critical loads<br /> built to strict OEM specifications.
                        </p>
                    </motion.div>
                </div>

                <div className="relative">
                    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visibleProducts.map((product, index) => (
                            <motion.div
                                key={product.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                                className="group block"
                            >
                                <div className="h-full bg-industrial-dark border border-white/5 group-hover:border-engineering-orange/50 transition-all duration-300 p-8 flex flex-col relative overflow-hidden group-hover:-translate-y-1">
                                    <div className="w-full h-48 bg-[#1A232C]/50 relative mb-8 overflow-hidden flex items-center justify-center">
                                        <img src={product.img} alt={product.name} className="object-cover h-full w-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                    </div>

                                    <div className="flex-grow z-10">
                                        <h3 className="text-xl font-display font-semibold text-white mb-3 uppercase tracking-wider group-hover:text-engineering-orange transition-colors">{product.name}</h3>
                                        <p className="text-sm text-metallic-silver mb-8 leading-relaxed">{product.desc}</p>
                                    </div>

                                    <div
                                        className="mt-auto z-10 border-t border-white/5 pt-4 cursor-pointer"
                                        onClick={() => setSelectedProduct(product)}
                                    >
                                        <div className="flex items-center text-xs uppercase tracking-widest font-bold text-white/30 group-hover:text-engineering-orange transition-colors">
                                            View Specifications
                                            <ArrowUpRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Fade overlay when collapsed */}
                    {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#162032] via-[#162032]/70 to-transparent pointer-events-none z-20" />
                    )}
                </div>

                {/* Expand / Collapse button */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={toggleExpanded}
                        className="flex flex-col items-center gap-2 text-white/40 hover:text-engineering-orange transition-colors group"
                    >
                        <span className="text-sm uppercase tracking-widest font-mono">
                            {isExpanded ? 'Show Less' : `Show All ${products.length} Products`}
                        </span>
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown className="w-4 h-4" />
                        </motion.div>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-industrial-dark/90 backdrop-blur-sm"
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#162032] border border-white/10 p-8 max-w-3xl w-full relative shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-industrial-dark overflow-hidden"
                        >
                            {/* Decorative blueprint grids for the modal */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-engineering-orange/5 rounded-bl-full pointer-events-none"></div>

                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="absolute top-3 right-3 p-4 text-white/50 hover:text-white transition-colors z-20"
                                aria-label="Close Technical Specification"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-12 h-1 bg-engineering-orange"></div>
                                <span className="text-engineering-orange font-bold tracking-widest uppercase text-xs">Technical Specification</span>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                <div className="w-full md:w-1/3 bg-[#1A232C]/50 p-6 border border-white/5 flex items-center justify-center shadow-inner">
                                    <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-auto object-contain" />
                                </div>

                                <div className="w-full md:w-2/3">
                                    <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tight mb-2">
                                        {selectedProduct.name}
                                    </h3>
                                    <p className="text-metallic-silver mb-8 text-sm leading-relaxed">{selectedProduct.desc}</p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-[#1A232C] p-4 border border-white/5 border-l-2 border-l-engineering-orange">
                                            <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-1">Material Standard</span>
                                            <span className="text-white font-mono text-sm">ASTM B23 Alloy 2</span>
                                        </div>
                                        <div className="bg-[#1A232C] p-4 border border-white/5 border-l-2 border-l-engineering-orange">
                                            <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-1">Testing Method</span>
                                            <span className="text-white font-mono text-sm">UT / DPT / RT</span>
                                        </div>
                                        <div className="bg-[#1A232C] p-4 border border-white/5 border-l-2 border-l-engineering-orange">
                                            <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-1">Tolerance Control</span>
                                            <span className="text-white font-mono text-sm">±0.005 mm</span>
                                        </div>
                                        <div className="bg-[#1A232C] p-4 border border-white/5 border-l-2 border-l-engineering-orange">
                                            <span className="block text-white/40 text-[10px] uppercase tracking-widest mb-1">OEM Conformity</span>
                                            <span className="text-white font-mono text-sm">100% Guaranteed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end relative z-10">
                                <button
                                    className="px-6 py-3 bg-white text-industrial-dark text-xs font-bold uppercase tracking-widest hover:bg-engineering-orange hover:text-white transition-colors"
                                    onClick={() => {
                                        const productName = selectedProduct.name;
                                        setSelectedProduct(null);
                                        navigate('/contact', { state: { productQuotation: productName } });
                                    }}
                                >
                                    Request Quotation
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
export default Products;
