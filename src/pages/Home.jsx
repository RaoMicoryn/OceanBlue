import Hero from '../components/Hero';
import About from '../components/About';
import WhyUs from '../components/WhyUs';
import MenuSection from '../components/MenuSection';
import Gallery from '../components/Gallery';
import OrderSection from '../components/OrderSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhyUs />
      <MenuSection />
      <Gallery />
      <OrderSection />
      <Footer />
    </>
  );
}