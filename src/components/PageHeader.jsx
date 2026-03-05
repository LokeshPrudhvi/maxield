import { motion } from 'framer-motion';

const PageHeader = ({ title, bgImage }) => {
    return (
        <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-industrial-dark pt-20">
            <div className="absolute inset-0 z-0">
                <img src={bgImage} alt={title} className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark via-industrial-dark/60 to-transparent"></div>
                {/* Animated mechanical grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight text-glow font-display">
                        {title}
                    </h1>
                    <div className="w-24 h-1 bg-engineering-orange mx-auto mt-6"></div>
                </motion.div>
            </div>
        </section>
    );
};
export default PageHeader;
