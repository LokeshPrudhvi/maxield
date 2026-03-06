import Hero from '../components/Hero';
import About from '../components/About';
import Products from '../components/Products';
import Quality from '../components/Quality';
import Industries from '../components/Industries';
import Trust from '../components/Trust';
import Clients from '../components/Clients';
import Support from '../components/Support';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Products isHomePage={true} />
            <Quality />
            <Trust />
            <Support />
            <Industries />
            <Clients />
        </>
    );
};

export default Home;
