import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const categories = [
    { name: "Electronics", image: "path/to/electronics-image.jpg" },
    { name: "Clothing", image: "path/to/clothing-image.jpg" },
    { name: "Home Appliances", image: "path/to/home-appliances-image.jpg" },
    { name: "Books", image: "path/to/books-image.jpg" },
    { name: "Furniture", image: "path/to/furniture-image.jpg" },
    { name: "Shoes", image: "path/to/shoes-image.jpg" },
    { name: "Accessories", image: "path/to/accessories-image.jpg" },
];

const Categories = () => {
    return (
        <div className="w-full py-6">
            <div className="container mx-auto border-b-2 sm:px-2 px-4    pb-5  ">
                <h2 className=" text-2xl sm:text-3xl font-normal  pt-6 pb-2 mb-6 text-left">Categories</h2>

                <Swiper
                    modules={[Navigation]}
                    navigation
                    scrollbar={{ draggable: true }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    spaceBetween={20}
                    slidesPerView={2}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4, pagination: false, },
                        0: {
                            slidesPerView: 2,
                            pagination: false,
                        },
                        480: {
                            slidesPerView: 2,
                            pagination: false,
                        },
                        1024: { slidesPerView: 5 },
                    }}
                    className="px-6"
                >
                    {categories.map((category, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col cursor-grab items-center bg- p-4 bg-gray-50 border-2 shadow-lg rounded-lg transition-all hover:scale-105">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg font-semibold">{category.name}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Categories;
