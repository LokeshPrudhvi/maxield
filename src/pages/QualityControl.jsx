import PageHeader from '../components/PageHeader';
import Quality from '../components/Quality';

const QualityControl = () => {
    return (
        <>
            <PageHeader title="Testing & Certifications" bgImage="/images/quality.png" />

            <div className="py-20 bg-gradient-to-b from-[#151C23] to-[#0F141A] border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="w-full bg-industrial-dark/50 border border-engineering-orange/30 p-10 flex flex-col md:flex-row items-center gap-12 rounded-sm relative mask-edges shadow-2xl overflow-hidden hover:border-engineering-orange/80 transition-colors duration-500">
                        {/* decorative overlay */}
                        <div className="absolute inset-0 bg-engineering-orange/5 mix-blend-overlay"></div>

                        <div className="flex-shrink-0 w-48 h-48 border-[6px] border-steel-blue bg-[#151C23] rounded-full flex items-center justify-center relative z-10 shadow-[0_0_40px_rgba(30,58,95,0.6)] group hover:border-engineering-orange transition-colors duration-500">
                            <div className="text-center group-hover:scale-110 transition-transform">
                                <span className="block text-4xl font-bold font-display text-white tracking-widest leading-none mb-1">ISO</span>
                                <span className="block text-xl font-bold text-engineering-orange tracking-widest">9001:2015</span>
                            </div>
                        </div>
                        <div className="relative z-10">
                            <span className="text-engineering-orange font-bold tracking-widest uppercase text-sm mb-2 block">Standard Compliance</span>
                            <h3 className="text-3xl font-display font-bold text-white mb-6 uppercase tracking-wider">Officially Certified Excellence</h3>
                            <p className="text-metallic-silver text-lg leading-relaxed mb-4">
                                Maxield Bearings manufacturing facilities strictly adhere to ISO 9001:2015 standards. This internationally recognized certification ensures that our engineering processes, supply chain management, and ultimate product delivery consistently meet stringent customer and regulatory requirements.
                            </p>
                            <p className="text-metallic-silver text-lg leading-relaxed">
                                Our commitment to continuous improvement guarantees top-tier mechanical accuracy and reliability for your most critical installations. Everything from Babbitt pouring to final ultrasonic scanning is calibrated and logged.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Quality />

            <style dangerouslySetInnerHTML={{
                __html: `
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}} />
        </>
    );
};
export default QualityControl;
