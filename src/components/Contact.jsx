import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
    const location = useLocation();
    const [inquiryText, setInquiryText] = useState("");

    useEffect(() => {
        if (location.state && location.state.productQuotation) {
            setInquiryText(`Requesting an engineering quotation for the following product:
${location.state.productQuotation}

Please advise on manufacturing specifications, tolerances, and typical lead time for consultation.`);
        }
    }, [location]);

    return (
        <section id="contact" className="py-24 bg-industrial-dark relative border-t border-white/5 bg-[url('/images/hero.jpg')] bg-cover bg-center bg-fixed bg-blend-overlay">
            <div className="absolute inset-0 bg-industrial-dark/95 backdrop-blur-md z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center mb-16" ref={ref}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-wider mb-4">
                            Contact Engineering
                        </h2>
                        <div className="w-24 h-1 bg-engineering-orange mx-auto mt-6"></div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="bg-industrial-light/20 border border-white/10 p-8 clip-diagonal backdrop-blur-sm">
                            <h3 className="text-2xl font-display font-bold text-white uppercase mb-6 flex items-center gap-3">
                                <MapPin className="text-engineering-orange" /> Corporate Office & Works
                            </h3>
                            <p className="text-metallic-silver leading-relaxed font-sans max-w-xs">
                                139 / 2, 10th Cross Road<br />
                                Ganapathi Nagar, 3rd Phase<br />
                                Peenya Industrial Area<br />
                                Bengaluru, Karnataka – 560058
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-industrial-light/20 border border-white/10 p-6 backdrop-blur-sm">
                                <h4 className="text-lg font-display font-bold text-white uppercase mb-4 flex items-center gap-2">
                                    <Phone className="w-5 h-5 text-engineering-orange" /> Technical Line
                                </h4>
                                <div className="space-y-2 text-metallic-silver font-mono text-sm">
                                    <p>+91 98869 25710</p>
                                    <p>+91 92434 58857</p>
                                    <p>+91 94824 58857</p>
                                </div>
                            </div>

                            <div className="bg-industrial-light/20 border border-white/10 p-6 backdrop-blur-sm">
                                <h4 className="text-lg font-display font-bold text-white uppercase mb-4 flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-engineering-orange" /> Email Support
                                </h4>
                                <div className="space-y-4 text-metallic-silver text-sm">
                                    <a href="mailto:maxieldbearings@gmail.com" className="block hover:text-engineering-orange transition-colors truncate">maxieldbearings@gmail.com</a>
                                    <a href="mailto:info@maxieldbearings.com" className="block hover:text-engineering-orange transition-colors truncate">info@maxieldbearings.com</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        className="bg-[#1A232C] border border-white/10 p-8 shadow-2xl relative overflow-hidden"
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-engineering-orange via-orange-400 to-engineering-orange left-0"></div>
                        <h3 className="text-2xl font-display font-bold text-white uppercase mb-8">Request Engineering Consultation</h3>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Full Name</label>
                                    <input type="text" className="w-full bg-[#0F141A] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-engineering-orange transition-colors" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Company Name</label>
                                    <input type="text" className="w-full bg-[#0F141A] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-engineering-orange transition-colors" placeholder="Heavy Ind. Pvt Ltd" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Email Address</label>
                                    <input type="email" className="w-full bg-[#0F141A] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-engineering-orange transition-colors" placeholder="john@company.com" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Phone / Mobile</label>
                                    <input type="text" className="w-full bg-[#0F141A] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-engineering-orange transition-colors" placeholder="+91 99999 99999" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">Inquiry Specifications</label>
                                <textarea
                                    rows="4"
                                    className="w-full bg-[#0F141A] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-engineering-orange transition-colors resize-none"
                                    placeholder="Provide requested bearing specifications, dimensions, or application..."
                                    value={inquiryText}
                                    onChange={(e) => setInquiryText(e.target.value)}
                                ></textarea>
                            </div>

                            <button type="button" className="w-full bg-engineering-orange text-white uppercase font-bold tracking-widest py-4 px-6 hover:bg-orange-600 transition-all flex justify-center items-center gap-3 hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] clip-diagonal group">
                                Submit Inquiry
                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};
export default Contact;
