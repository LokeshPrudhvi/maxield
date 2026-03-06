import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Activity, Search, RefreshCcw } from 'lucide-react';

const qaSteps = [
    { icon: ShieldCheck, title: "Batch-Wise Laboratory Testing", desc: "Every batch of raw material is tested in certified laboratories." },
    { icon: Activity, title: "Ultrasonic Testing (UT)", desc: "Conducted according to ASTM SA388 standards to detect internal material defects." },
    { icon: RefreshCcw, title: "Babbitt Bonding Integrity Test", desc: "Performed as per ISO 4386/1 Class 3 reference standards." },
    { icon: Search, title: "Dye Penetrant Test (DPT)", desc: "Performed according to ISO 4386-3 Class A standards." }
];

const Quality = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

    return (
        <section id="quality" className="py-24 bg-industrial-dark relative border-t border-white/5 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20" ref={ref}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-engineering-orange font-bold tracking-widest uppercase text-xs mb-4 block">Quality & Engineering Testing</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
                            Engineering-Grade Control
                        </h2>
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 items-center relative">
                    <motion.div
                        className="w-full lg:w-1/2 relative h-[500px] border border-white/10 bg-[#162032] p-6"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-full h-full relative border border-white/5">
                            <img src="/images/quality.jpg" alt="Engineering Quality Testing" className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-70" />
                            <div className="absolute top-4 left-4 border border-steel-blue/40 bg-industrial-dark/90 p-3 flex flex-col gap-2">
                                <div className="h-1 w-12 bg-engineering-orange"></div>
                                <span className="text-white text-xs font-mono uppercase tracking-widest">Diag. 01A</span>
                            </div>
                        </div>
                    </motion.div>

                    <div className="w-full lg:w-1/2 flex flex-col space-y-6 relative">
                        {qaSteps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={index}
                                    className="flex items-start bg-[#1A232C] p-8 border border-white/5 hover:border-white/20 transition-colors"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                                    transition={{ duration: 0.6, delay: 0.1 * index }}
                                >
                                    <div className="mr-6 shrink-0 mt-1">
                                        <Icon className="w-6 h-6 text-engineering-orange" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-display font-bold text-white mb-2 uppercase tracking-wider">{step.title}</h3>
                                        <p className="text-metallic-silver text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Quality;
