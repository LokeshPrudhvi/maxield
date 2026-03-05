import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ProductsPage from './pages/ProductsPage';
import QualityControl from './pages/QualityControl';
import ContactUs from './pages/ContactUs';
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-industrial-dark min-h-screen text-metallic-silver font-sans flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/quality" element={<QualityControl />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
