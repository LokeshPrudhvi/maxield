import PageHeader from '../components/PageHeader';
import Products from '../components/Products';

const ProductsPage = () => {
    return (
        <div className="bg-industrial-dark">
            <PageHeader title="Bearing Portfolio" bgImage="/images/bearing.png" />

            <div className="bg-industrial-light/10 py-16 text-center border-b border-white/5 px-4">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 uppercase tracking-widest">Precision Built For Maximum Loads</h3>
                <p className="text-metallic-silver max-w-4xl mx-auto text-lg leading-relaxed">
                    Explore our extensive catalog of white metal bearings. We accommodate both strict OEM drawing specifications and engineered custom designs built directly from operational requirements and dimensional tolerances. Advanced CNC machining guarantees zero compromises.
                </p>
            </div>

            <Products />
        </div>
    );
};
export default ProductsPage;
