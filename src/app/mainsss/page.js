import React from "react";
import { FaTrophy, FaPaintBrush, FaCrown, FaDollarSign } from "react-icons/fa";

function Page() {
  const features = [
    {
      title: "Award Winning Service",
      description: "We provide top-notch service with excellence and quality.",
      icon: <FaTrophy className="w-6 h-6 text-white" />,
      bgColor: "from-green-400 to-green-600",
      glow: "shadow-green-400",
    },
    {
      title: "Amazing Designs",
      description: "Creative and modern designs tailored to your needs.",
      icon: <FaPaintBrush className="w-6 h-6 text-white" />,
      bgColor: "from-orange-400 to-orange-600",
      glow: "shadow-orange-400",
    },
    {
      title: "Full Satisfaction",
      description: "100% customer satisfaction with quality assurance.",
      icon: <FaCrown className="w-6 h-6 text-white" />,
      bgColor: "from-purple-400 to-purple-600",
      glow: "shadow-purple-400",
    },
    {
      title: "Lowest Prices",
      description: "Best competitive prices with top-notch services.",
      icon: <FaDollarSign className="w-6 h-6 text-white" />,
      bgColor: "from-blue-400 to-blue-600",
      glow: "shadow-blue-400",
    },
  ];

  return (
    <section className="relative flex justify-center  py-10 mt-24 px-6 lg:px-12 bg-gray-900 text-white">
      {/* Container */}
      <div className="relative  mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side (Text) */}
        <div>
          <h2 className="text-4xl text-[120px] leading-tight font-extrabold ">
            Why Choose Us?
          </h2>
          <p className="text-gray-300 mt-4 text-[30px]">
            We provide exceptional services with high quality, innovation, and guaranteed satisfaction.
          </p>
        </div>

        {/* Right Side (Features) */}
        <div className="grid gap-5 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-6 p-3 sm:p-5 rounded-lg shadow-xl transition-all duration-300 border border-white/20 backdrop-blur-md bg-white/10 hover:scale-105 hover:bg-white/20"
            >
              {/* Speech Bubble Icon */}
              <div className="relative w-20 h-20 flex items-center justify-center rounded-full border-4  shadow-lg border-gray-300 after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-4 after:h-4 after:bg-white after:border-t-4 after:border-r-4 after:border-gray-300 after:rotate-45 after:translate-x-2 after:-translate-y-1/2">
              {feature.icon}
            </div>

              {/* Text Content */}
              <div>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Page;


