import React from 'react'

function Page() {
  return (
    <div className="mt-24 bg-gray-50">
      {/* Header Section */}
      <header className="flex bg-gradient-to-r from-orange-500 to-orange-600 justify-center items-center text-white text-center py-6 shadow-md">
        <h1 className="text-4xl font-extrabold">About Us</h1>
      </header>

      {/* Our Story Section */}
      <section className="text-center py-12 px-4">
        <h2 className="text-3xl font-semibold text-gray-800">Our Story</h2>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          We started with a vision to make online shopping seamless, affordable, and reliable. Our platform connects thousands of brands and products to customers worldwide.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="bg-gray-100 py-12 px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Our Mission</h2>
        <p className="mt-6 text-lg text-center text-gray-600 max-w-3xl mx-auto">
          To provide an unparalleled shopping experience by offering the best quality products, fast delivery, and exceptional customer service.
        </p>
      </section>

      {/* Why Shop With Us? Section */}
      <section className="text-center py-12 px-4">
        <h2 className="text-3xl font-semibold text-gray-800">Why Shop With Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          <div className="p-6 shadow-xl rounded-lg bg-white hover:bg-orange-100 transition duration-300">
            <h3 className="text-xl font-semibold text-orange-600">Wide Product Range</h3>
            <p className="text-gray-600">Find everything from electronics to fashion in one place.</p>
          </div>
          <div className="p-6 shadow-xl rounded-lg bg-white hover:bg-orange-100 transition duration-300">
            <h3 className="text-xl font-semibold text-orange-600">Secure Payments</h3>
            <p className="text-gray-600">Your transactions are safe and encrypted.</p>
          </div>
          <div className="p-6 shadow-xl rounded-lg bg-white hover:bg-orange-100 transition duration-300">
            <h3 className="text-xl font-semibold text-orange-600">Fast Shipping</h3>
            <p className="text-gray-600">Get your orders delivered quickly and on time.</p>
          </div>
          <div className="p-6 shadow-xl rounded-lg bg-white hover:bg-orange-100 transition duration-300">
            <h3 className="text-xl font-semibold text-orange-600">24/7 Customer Support</h3>
            <p className="text-gray-600">We are here to help you anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="bg-gray-50 py-12 px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Our Commitment</h2>
        <p className="mt-6 text-lg text-center text-gray-600 max-w-3xl mx-auto">
          We believe in delivering quality products at the best prices, ensuring customer satisfaction and trust in every purchase.
        </p>
      </section>

      {/* Customer Testimonials Section */}
      <section className="bg-white text-gray-800 text-center py-12 px-4">
        <h2 className="text-3xl font-semibold text-black">Customer Testimonials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
          <div className="p-6 shadow-xl rounded-lg bg-gray-50 hover:bg-gray-200 transition duration-300">
            <p className="italic">"Amazing products with fast delivery! Highly recommend shopping here."</p>
            <h3 className="mt-4 font-semibold">- Customer A</h3>
          </div>
          <div className="p-6 shadow-xl rounded-lg bg-gray-50 hover:bg-gray-200 transition duration-300">
            <p className="italic">"Great customer support and quality products at affordable prices."</p>
            <h3 className="mt-4 font-semibold">- Customer B</h3>
          </div>
          <div className="p-6 shadow-xl rounded-lg bg-gray-50 hover:bg-gray-200 transition duration-300">
            <p className="italic">"Secure payment options and trustworthy service. Love shopping here!"</p>
            <h3 className="mt-4 font-semibold">- Customer C</h3>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page
