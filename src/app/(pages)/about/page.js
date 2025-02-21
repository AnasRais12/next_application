import React from 'react'

function page() {
  return (
    <div className=" mt-24 ">
      <header className=" flex bg-unique justify-center items-center text-white text-center py-4">
        <h1 className="text-4xl font-bold ">About Us</h1>
      </header>

      <section className="text-center py-12 px-4">
        <h2 className="text-2xl font-bold">Our Story</h2>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          We started with a vision to make online shopping seamless, affordable, and reliable. Our platform connects thousands of brands and products to customers worldwide.
        </p>
      </section>

      <section className="bg-unique text-white py-12 px-4">
        <h2 className="text-2xl font-bold text-center">Our Mission</h2>
        <p className="mt-4 text-center max-w-2xl mx-auto">
          To provide an unparalleled shopping experience by offering the best quality products, fast delivery, and exceptional customer service.
        </p>
      </section>

      <section className="text-center py-12 px-4">
        <h2 className="text-2xl font-bold">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8 text-white">
          <div className="p-4 shadow-lg rounded-lg bg-orange-400 hover:bg-gray-600  transition-colors">
            <h3 className="text-xl font-bold">Wide Product4Range</h3>
            <p className="text-gray-50">Find everything from electronics to fashion in one place.</p>
          </div>
          <div className="p-4 shadow-lg rounded-lg bg-orange-400 hover:bg-gray-600 transition-colors">
            <h3 className="text-xl font-bold">Secure Payments</h3>
            <p className="text-gray-50">Your transactions are safe and encrypted.</p>
          </div>
          <div className="p-4 shadow-lg rounded-lg bg-orange-400 hover:bg-gray-600 transition-colors">
            <h3 className="text-xl font-bold">Fast Shipping</h3>
            <p className="text-gray-50">Get your orders delivered quickly and on time.</p>
          </div>
          <div className="p-4 shadow-lg rounded-lg bg-orange-400 hover:bg-gray-600 transition-colors">
            <h3 className="text-xl font-bold">24/7 Customer Support</h3>
            <p className="text-gray-50">We are here to help you anytime, anywhere.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-12 px-4">
        <h2 className="text-2xl font-bold text-center">Our Commitment</h2>
        <p className="mt-4 text-center max-w-2xl mx-auto">
          We believe in delivering quality products at the best prices, ensuring customer satisfaction and trust in every purchase.
        </p>
      </section>

      <section className="bg-gray-100 text-white text-center py-12 px-4">
        <h2 className="text-2xl font-bold text-black">Customer Testimonials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
          <div className="p-4 shadow-lg rounded-lg hover:bg-gray-600 bg-unique transition-colors">
            <p>"Amazing products with fast delivery! Highly recommend shopping here."</p>
            <h3 className="mt-4 font-bold">- Customer A</h3>
          </div>
          <div className="p-4 shadow-lg rounded-lg hover:bg-gray-600 bg-unique transition-colors">
            <p>"Great customer support and quality products at affordable prices."</p>
            <h3 className="mt-4 font-bold">- Customer B</h3>
          </div>
          <div className="p-4 shadow-lg rounded-lg hover:bg-gray-600 bg-unique transition-colors">
            <p>"Secure payment options and trustworthy service. Love shopping here!"</p>
            <h3 className="mt-4 font-bold">- Customer C</h3>
          </div>
        </div>
      </section>

      <footer className="bg-unique text-white text-center py-8">
        <p>&copy; {new Date().getFullYear()} Your E-Commerce Brand. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default page;
