import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

const categories = [
  {
    name: 'Electronics',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    bgColor: 'bg-white',
  },
  {
    name: 'Clothing',
    image:
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    bgColor: 'bg-white',
  },
  {
    name: 'Electronics',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    bgColor: 'bg-white',
  },
  {
    name: 'Clothing',
    image:
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    bgColor: 'bg-white',
  },

  {
    name: 'Books',
    image:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    bgColor: 'bg-white',
  },
  {
    name: 'Furniture',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    bgColor: 'bg-white',
  },
  {
    name: 'Shoes',
    image:
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    bgColor: 'bg-white',
  },
  {
    name: 'Accessories',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    bgColor: 'bg-white',
  },
];

const Categories = () => {
  return (
    <div className="w-full py-8 md:py-12 bg-white">
      <div className=" px-4 sm:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-dark mb-4 md:mb-0">
            Shop by <span className="text-primary">Categories</span>
          </h2>
          <div className="flex space-x-3">
            <button
              className="categories-prev p-2 rounded-full bg-white shadow-md hover:bg-primary hover:text-white transition-colors duration-200"
              aria-label="Previous category"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="categories-next p-2 rounded-full bg-white shadow-md hover:bg-primary hover:text-white transition-colors duration-200"
              aria-label="Next category"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: '.categories-prev',
            nextEl: '.categories-next',
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={16}
          slidesPerView={2}
          centeredSlides={false}
          loop={true}
          breakpoints={{
            480: {
              slidesPerView: 2.5,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 24,
            },
          }}
          className="!pb-2"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <div
                className={`flex flex-col h-full items-center p-3 sm:p-4 ${category.bgColor} rounded-xl border border-gray-200/80 cursor-pointer transition-all hover:shadow-md hover:border-primary/30 hover:-translate-y-1`}
              >
                <div className="w-full aspect-square overflow-hidden rounded-lg mb-3 sm:mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-dark text-center">
                  {category.name}
                </h3>
                <button className="mt-2 sm:mt-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors duration-200">
                  Shop Now
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;
