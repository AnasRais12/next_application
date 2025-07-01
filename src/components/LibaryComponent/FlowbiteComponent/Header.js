'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const categories = [
  {
    title: 'EXPLORE OUR COLLECTION',
    subtitle: 'Discover everything we offer, from fashion to tech!',
    image:
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
    bgColor: 'bg-gradient-to-r from-primary to-primary-dark',
    buttonColor: 'bg-primary hover:bg-primary-dark',
  },
  {
    title: 'NEW ARRIVALS',
    subtitle: 'Latest trends in fashion & more!',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
    bgColor: 'bg-gradient-to-r from-primary to-primary-dark',
    buttonColor: 'bg-primary hover:bg-primary-dark',
  },
  {
    title: 'BEST SELLERS',
    subtitle: 'Our top-rated and most loved products',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
    bgColor: 'bg-gradient-to-r from-primary to-primary-dark',
    buttonColor: 'bg-primary hover:bg-primary-dark',
  },
  {
    title: 'ELECTRONICS & GADGETS',
    subtitle: 'Upgrade your tech with the latest devices',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
    bgColor: 'bg-gradient-to-r from-primary to-primary-dark',
    buttonColor: 'bg-primary hover:bg-primary-dark',
  },
  {
    title: 'HOME & KITCHEN',
    subtitle: 'Make your home smarter & better',
    image:
      'https://images.unsplash.com/photo-1583845112203-4541b01c57a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
    bgColor: 'bg-gradient-to-r from-primary to-primary-dark',
    buttonColor: 'bg-primary hover:bg-primary-dark',
  },
  {
    title: 'SPORTS & FITNESS',
    subtitle: 'Stay fit with our best-selling sports gear',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
    bgColor: 'bg-gradient-to-r from-primary to-primary-dark',
    buttonColor: 'bg-primary hover:bg-primary-dark',
  },
  {
    title: 'BEAUTY & HEALTH',
    subtitle: 'Glow up with premium beauty products',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
    bgColor: 'bg-gradient-to-r from-primary to-primary-dark',
    buttonColor: 'bg-primary hover:bg-primary-dark',
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const router = useRouter();

  // Auto-rotate categories
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Manual navigation
  const goToSlide = (newIndex, newDirection) => {
    setDirection(newDirection);
    setIndex(newIndex);
  };

  return (
    <section
      className={`relative w-full h-[80vh] max-h-[800px] overflow-hidden ${categories[index].bgColor} transition-colors duration-1000`}
    >
      {/* Background Image */}
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-black"
      >
        <img
          src={categories[index].image}
          alt={categories[index].title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto h-full flex items-center relative z-10 px-6 md:px-12 lg:px-24">
        <motion.div
          key={`text-${index}`}
          initial={{ opacity: 0, x: direction * 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -100 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-2xl space-y-6"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {categories[index].title}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl opacity-90"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {categories[index].subtitle}
          </motion.p>

          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              onClick={() => router.push('/category')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-6 px-8 py-3 ${categories[index].buttonColor} text-white rounded-lg text-lg font-semibold shadow-lg transition-all`}
            >
              SHOP NOW
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {categories.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i, i > index ? 1 : -1)}
            className={`w-3 h-3 rounded-full transition-all ${i === index ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
