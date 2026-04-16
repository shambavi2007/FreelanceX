import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Hero from '../components/home/Hero';
import HowItWorks from '../components/home/HowItWorks';
import CTA from '../components/home/CTA';
import toast from 'react-hot-toast';

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  // Welcome message for new users
  useEffect(() => {
    if (isAuthenticated && user) {
      const hasShownWelcome = localStorage.getItem('hasShownWelcome');
      if (!hasShownWelcome) {
        setTimeout(() => {
          toast.success(`Welcome to FreelanceX, ${user.name}! 🎉`, {
            duration: 4000,
            icon: '👋',
          });
          localStorage.setItem('hasShownWelcome', 'true');
        }, 1000);
      }
    }
  }, [isAuthenticated, user]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Call to Action */}
      <CTA />
      
      <Footer />
    </motion.div>
  );
};

export default Home;