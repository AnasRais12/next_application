'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

  const categories = [
    {
      title: "EXPLORE OUR COLLECTION",
      subtitle: "Discover everything we offer, from fashion to tech!",
      image: "https://img.freepik.com/free-vector/realistic-kitchen-interior_1284-15414.jpg?ga=GA1.1.908455001.1724928643&semt=ais_hybrid",
    },
    {
      title: "NEW ARRIVALS",
      subtitle: "Latest trends in fashion & more!",
      image: "",
    },
    {
      title: "BEST SELLERS",
      subtitle: "Our top-rated and most loved products",
      image: "https://img.freepik.com/free-vector/realistic-kitchen-interior_1284-15414.jpg?ga=GA1.1.908455001.1724928643&semt=ais_hybrid",
    },
    {
      title: "ELECTRONICS & GADGETS",
      subtitle: "Upgrade your tech with the latest devices",
      image: "https://img.freepik.com/free-vector/realistic-kitchen-interior_1284-15414.jpg?ga=GA1.1.908455001.1724928643&semt=ais_hybrid",
    },
    {
      title: "HOME & KITCHEN",
      subtitle: "Make your home smarter & better",
      image: "https://img.freepik.com/free-vector/realistic-kitchen-interior_1284-15414.jpg?ga=GA1.1.908455001.1724928643&semt=ais_hybrid",
    },
    {
      title: "SPORTS & FITNESS",
      subtitle: "Stay fit with our best-selling sports gear",
      image: "https://img.freepik.com/free-vector/realistic-kitchen-interior_1284-15414.jpg?ga=GA1.1.908455001.1724928643&semt=ais_hybrid",
    },
    {
      title: "BEAUTY & HEALTH",
      subtitle: "Glow up with premium beauty products",
      image: "https://img.freepik.com/free-vector/realistic-kitchen-interior_1284-15414.jpg?ga=GA1.1.908455001.1724928643&semt=ais_hybrid",
    },
  ];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section className="relative w-full py-16 sm:mt-16 mt-10 gap-10 overflow-hidden  bg-gray-50 flex md:flex-row items-center justify-center md:justify-between px-6 md:pl-16 lg:pl-24">
      
      {/* Text Section */}
      <motion.div 
        key={categories[index].title}
        className="text-center md:text-left md:w-1/2 space-y-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="sm:text-4xl text-3xl md:text-4xl xl:text-6xl font-bold text-gray-900">{categories[index].title}</h1>
        <p className="text-gray-500 text-md sm:text-2xl">{categories[index].subtitle}</p>

        <motion.button onClick={()=> router.push('/category')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-4 px-8 w-fit sm:w-[50%] py-3 bg-orange-600 text-1xl text-white rounded-lg hover:bg-orange-600 transition"
        >
          SHOP NOW
        </motion.button>
      </motion.div>


    </section>
  );
}
