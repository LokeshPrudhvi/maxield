import { useState, useEffect } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [overProducts, setOverProducts] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            if (isHomePage) {
                const productsEl = document.getElementById('products');
                if (productsEl) {
                    const rect = productsEl.getBoundingClientRect();
                    // If the navbar (approx 80px tall) is overlapping the products section
                    if (rect.top <= 80 && rect.bottom >= 80) {
                        setOverProducts(true);
                    } else {
                        setOverProducts(false);
                    }
                }
            } else {
                setOverProducts(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Trigger once on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    let navbarBg = 'bg-transparent py-6 border-b border-transparent';
    if (scrolled || !isHomePage) {
        if (overProducts) {
            // Because Precision Products uses bg-[#162032], flip header to existing industrial-dark for contrast
            navbarBg = 'bg-industrial-dark/95 backdrop-blur-md border-b border-white/10 py-4 shadow-lg';
        } else {
            // Default header color uses the Products background color per request
            navbarBg = 'bg-[#162032]/95 backdrop-blur-md border-b border-white/10 py-4 shadow-lg';
        }
    }

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Products', path: '/products' },
        { name: 'Quality', path: '/quality' },
    ];

    const getLinkClass = (path) => {
        const isActive = location.pathname === path;
        return `text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-engineering-orange' : 'text-metallic-silver hover:text-white'}`;
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${navbarBg}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link to="/" className="flex flex-row items-center gap-2 hover:opacity-80 transition-opacity">
                    {/* Using Settings Icon as a mechanical aesthetic stand-in for logo */}
                    <Settings className="w-8 h-8 text-engineering-orange" />
                    <span className="font-display font-bold text-2xl tracking-wider text-white">MAXIELD <span className="text-engineering-orange">BEARINGS</span></span>
                </Link>

                <div className="hidden md:flex space-x-8 items-center">
                    {navLinks.map((link) => (
                        <Link key={link.path} to={link.path} className={getLinkClass(link.path)}>
                            {link.name}
                        </Link>
                    ))}
                    <Link to="/contact" className="px-5 py-2 border border-engineering-orange text-engineering-orange hover:bg-engineering-orange hover:text-white transition-colors duration-300 uppercase font-semibold text-xs tracking-wider clip-diagonal">
                        Contact Us
                    </Link>
                </div>

                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white hover:text-engineering-orange transition-colors">
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-industrial-dark border-b border-white/10 absolute w-full left-0 top-full shadow-2xl">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-3 py-3 text-base font-medium rounded-md ${location.pathname === link.path ? 'text-engineering-orange bg-industrial-light/20' : 'text-white hover:bg-industrial-light/50'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3 py-3 text-base font-medium text-engineering-orange"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};
export default Navbar;
