import PageHeader from '../components/PageHeader';
import About from '../components/About';
import { ShieldCheck, Target, Crosshair } from 'lucide-react';

const AboutUs = () => {
    return (
        <>
            <PageHeader title="Company Overview" bgImage="/images/hero.jpg" />

            {/* Expanded Vision Mission section */}
            <section className="py-24 bg-[#151C23] border-b border-white/5 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-industrial-dark p-8 border hover:border-engineering-orange transition-colors border-white/10 glass-panel clip-diagonal hover-metallic relative group">
                            <div className="mb-6 p-4 bg-industrial-light/20 inline-block clip-diagonal group-hover:bg-engineering-orange/10 transition-colors">
                                <Target className="w-8 h-8 text-engineering-orange group-hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase">Our Mission</h3>
                            <p className="text-metallic-silver text-sm leading-relaxed">
                                To engineer and deliver the most robust and precision-crafted white metal-lined hydrodynamic bearings, ensuring unparalleled uptime and reliability for global industrial equipment.
                            </p>
                        </div>

                        <div className="bg-industrial-dark p-8 border hover:border-engineering-orange transition-colors border-white/10 glass-panel clip-diagonal hover-metallic relative group">
                            <div className="mb-6 p-4 bg-industrial-light/20 inline-block clip-diagonal group-hover:bg-engineering-orange/10 transition-colors">
                                <Crosshair className="w-8 h-8 text-engineering-orange group-hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase">Our Vision</h3>
                            <p className="text-metallic-silver text-sm leading-relaxed">
                                To be the undisputed international benchmark of mechanical precision and trust for large-scale original equipment manufacturers and critical rotation machinery operators.
                            </p>
                        </div>

                        <div className="bg-industrial-dark p-8 border hover:border-engineering-orange transition-colors border-white/10 glass-panel clip-diagonal hover-metallic relative group">
                            <div className="mb-6 p-4 bg-industrial-light/20 inline-block clip-diagonal group-hover:bg-engineering-orange/10 transition-colors">
                                <ShieldCheck className="w-8 h-8 text-engineering-orange group-hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase">Core Values</h3>
                            <p className="text-metallic-silver text-sm leading-relaxed">
                                Military-Grade Discipline in processes, Infallible Quality Assurance, Continuous Innovation, and Radical Transparency in our customer and vendor relationships.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <About />
        </>
    );
}

export default AboutUs;
