
import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ObjectDetection from '@/components/ObjectDetection';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex flex-col">
        <Hero />
        <Features />
        <ObjectDetection />
        <Dashboard />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
