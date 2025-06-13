import React from 'react';
import AboutSection from '../components/sections/AboutSection';
import TimelineSection from '../components/sections/TimelineSection';
import ProductsSection from '../components/sections/ProductsSection';
import InstructionsSection from '../components/sections/InstructionsSection';
import FaqSection from '../components/sections/FaqSection';
import ContactSection from '../components/sections/ContactSection';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <AboutSection />
      <TimelineSection />
      <ProductsSection />
      <InstructionsSection />
      <FaqSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;