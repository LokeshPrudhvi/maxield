import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldAlert, Package, SearchCheck, MessageSquarePlus } from 'lucide-react';

const supportFeatures = [
    { icon: ShieldAlert, title: "18-Month Product Warranty", desc: "Comprehensive coverage against manufacturing defects ensuring complete peace of mind." },
    { icon: SearchCheck, title: "Manufacturing Quality Responsibility", desc: "Full engineering responsibility for strict adherence to dimensional tolerances." },
    { icon: Package, title: "Customer-Specified Packaging", desc: "Export-grade packaging conforming to stringent international sea-worthy requirements." },
    { icon: MessageSquarePlus, title: "Technical Support & Feedback", desc: "Dedicated engineering assistance channel for continuous product integration improvement." }
];

const Support = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

    return (
        <section className="py-24 bg-industrial-dark relative border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20" ref={ref}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-engineering-orange font-bold tracking-widest uppercase text-xs mb-4 block">After-Sales Support</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight mb-6">
                            Commitment Beyond Delivery
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {supportFeatures.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-[#1A232C] border border-white/5 p-8 transition-colors hover:border-engineering-orange/40 flex flex-col h-full"
                            >
                                <div className="mb-8">
                                    <Icon className="w-8 h-8 text-engineering-orange" />
                                </div>

                                <h3 className="text-lg font-display font-bold text-white mb-4 uppercase leading-snug tracking-wider">{feature.title}</h3>
                                <div className="w-8 h-px bg-white/10 mb-6"></div>
                                <p className="text-sm text-metallic-silver leading-relaxed flex-grow">{feature.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
export default Support;
