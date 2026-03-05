import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Using text for logos to maintain high-end look without needing varied actual image assets
const clientLogos = [
    "TRIVENI TURBINE", "BHEL", "L&T HEAVY ENG", "SIEMENS ENERGY",
    "FLENDER DRIVES", "KIRLOSKAR", "THERMAX", "BELLISS INDIA"
];

const Clients = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

    return (
        <section className="py-24 bg-industrial-light/10 border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16" ref={ref}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-wider mb-4">
                            Our Clients
                        </h2>
                        <p className="text-metallic-silver text-sm uppercase tracking-widest">
                            Trusted by leading engineering and industrial companies across India
                        </p>
                    </motion.div>
                </div>

                <div className="relative flex overflow-x-hidden mb-16 py-8 mask-edges">
                    {/* Autoscrolling container */}
                    <motion.div
                        className="flex space-x-12 shrink-0 px-6 items-center"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    >
                        {/* Double the list to make seamless scrolling */}
                        {[...clientLogos, ...clientLogos].map((client, i) => (
                            <div
                                key={i}
                                className="text-2xl font-display font-bold tracking-[0.2em] text-metallic-silver/40 hover:text-white transition-colors duration-300 whitespace-nowrap px-8"
                            >
                                {client}
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    className="max-w-3xl mx-auto bg-industrial-dark border border-engineering-orange/30 p-8 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <h3 className="text-xl font-display font-bold text-white mb-2 uppercase">Highlight: Triveni Engineering & Industries Ltd – Mysore</h3>
                    <p className="text-engineering-orange text-sm uppercase tracking-wider mb-4">Recipient of Best Vendor Award for five consecutive years</p>
                    <p className="text-metallic-silver text-sm max-w-xl mx-auto">
                        A testament to our unwavering commitment to precision engineering, on-time delivery, and uncompromising quality standards in manufacturing critical hydrodynamic bearings.
                    </p>
                </motion.div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}} />
        </section>
    );
};
export default Clients;
