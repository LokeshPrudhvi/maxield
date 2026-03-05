import { Settings } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#0B0F13] border-t border-white/5 pt-16 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-white/5 pb-10">

                    <div className="space-y-6">
                        <Link to="/" className="flex flex-row items-center gap-2 hover:opacity-80 transition-opacity">
                            <Settings className="w-6 h-6 text-engineering-orange" />
                            <span className="font-display font-bold text-xl tracking-wider text-white">MAXIELD <span className="text-engineering-orange">BEARINGS</span></span>
                        </Link>
                        <p className="text-metallic-silver text-sm max-w-sm">
                            Global leaders in manufacturing high-precision white metal-lined hydrodynamic bearings for critical rotation equipment.
                        </p>
                        <div className="inline-block border border-white/10 p-2 uppercase text-[10px] tracking-widest font-bold text-white/50 bg-[#151C23]">
                            ISO 9001:2015 CERTIFIED
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-display uppercase tracking-widest font-bold mb-6">Quick Link Engineering</h4>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-sm text-metallic-silver hover:text-engineering-orange transition-colors">Company Timeline</Link></li>
                            <li><Link to="/products" className="text-sm text-metallic-silver hover:text-engineering-orange transition-colors">Precision Products</Link></li>
                            <li><Link to="/quality" className="text-sm text-metallic-silver hover:text-engineering-orange transition-colors">Lab Testing Standards</Link></li>
                            <li><Link to="/contact" className="text-sm text-metallic-silver hover:text-engineering-orange transition-colors">Customer Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-display uppercase tracking-widest font-bold mb-6">Connect Professional</h4>
                        <p className="text-sm text-metallic-silver mb-4">Follow us for engineering updates and manufacturing milestones.</p>
                        <a href="#" className="inline-flex items-center justify-center w-10 h-10 bg-[#151C23] border border-white/10 text-white/50 hover:text-white hover:border-engineering-orange hover:bg-engineering-orange/10 transition-colors">
                            <FaLinkedin size={18} />
                        </a>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-white/30 uppercase">
                    <div><p>&copy; {new Date().getFullYear()} Maxield Bearings. All rights reserved.</p></div>
                    <div className="flex gap-4">
                        <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <span>|</span>
                        <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
