import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Cycles from '../components/Cycles';

import Brands from '../components/Brands';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import LocationMap from '../components/LocationMap';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Cycles />
      <Brands />
      <Services />
      <WhyChooseUs />
      <Reviews />
      <Contact />
      <LocationMap />
      <Footer />
      <ScrollToTop />
    </>
  );
}