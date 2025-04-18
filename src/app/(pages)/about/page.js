"use client"
import Footer from '@/components/LibaryComponent/FlowbiteComponent/Footer';
import Navbar from '@/components/LibaryComponent/MaterialUi Compomnent/App-Bar';
import CustomSpinner from '@/components/Spinner';
import { useFetchCartlist } from '@/customHooks/useFetchCartList';
import { useFetchWishlist } from '@/customHooks/useFetchWishList';
import useSession from '@/utils/UserExist/GetSession';
import React from 'react';

function AboutPage() {

   const session = useSession();
    const { cartListLoading } = useFetchCartlist(session?.user?.id);
    const { wishListLoading } = useFetchWishlist(session?.user?.id);
  
    if ((session?.user?.id && wishListLoading) || cartListLoading) {
      return <CustomSpinner />;
    }
  return (
    <>
    <Navbar/>
    <div className=" min-h-screen">
      {/* Hero Header */}
    
      <div className="bg-white rounded-xl shadow-lg  pt-10 overflow-hidden  border border-gray-100">
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-6 md:p-8 xl:px-14 text-center">
            <h1 className="text-4xl md:text-5xl font-bold pt-6 text-white mb-2">
            About <span className=''>ShopEase</span>
            </h1>
            <p className="text-emerald-100 text-lg">
            Your trusted shopping destination since 2015
            </p>
          </div>
          
        </div>

      {/* Our Story Section */}
      <section className="py-16  bg-gray-50 mx-auto px-4">
        <div className="mx-auto text-center">
          <h2 className="text-3xl font-bold text-dark mb-6">Our <span className='text-primary'>Story</span></h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-primary-dark mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 mb-8">
            Founded in 2015, ShopEase began with a simple vision: to create an online shopping experience that combines 
            convenience, quality, and affordability. What started as a small team of passionate individuals has grown into 
            a platform serving millions of customers worldwide.
          </p>
          <p className="text-lg text-gray-600">
            We pride ourselves on connecting customers with the best products from trusted brands, all while maintaining 
            the personal touch that sets us apart from larger retailers.
          </p>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="bg-white py-16">
        <div className="  mx-auto p-6 md:p-8 xl:px-14">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark mb-6">Our <span className='text-primary'>Mission</span></h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-primary-dark mb-8"></div>
              <p className="text-lg text-gray-600 mb-6">
                To revolutionize online shopping by providing an unparalleled customer experience through:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-secondary mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Curated selection of quality products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Competitive pricing and regular deals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Fast and reliable shipping</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2 mt-1">✓</span>
                  <span className="text-gray-600">Exceptional customer service</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Our team working"
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <div className='bg-gray-50'>
      <section className="  mx-auto p-6 md:p-8 xl:px-14">
        <div className="text-center  mb-12">
          <h2 className="text-3xl font-bold text-dark mb-4">Why Choose <span className='text-primary'>ShopEase?</span></h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-primary-dark mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-primary">
            <div className="text-primary mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center text-dark mb-3">Wide Selection</h3>
            <p className="text-gray-600 text-center">
              Thousands of products across all categories to meet your every need.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-accent">
            <div className="text-accent mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center text-dark mb-3">Secure Shopping</h3>
            <p className="text-gray-600 text-center">
              Industry-leading security measures to protect your data and transactions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-secondary">
            <div className="text-secondary mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center text-dark mb-3">Fast Delivery</h3>
            <p className="text-gray-600 text-center">
              90% of orders delivered within 2-3 business days with real-time tracking.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-primary-dark">
            <div className="text-primary-dark mb-4">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center text-dark mb-3">24/7 Support</h3>
            <p className="text-gray-600 text-center">
              Our customer care team is always ready to assist you with any questions.
            </p>
          </div>
        </div>
      </section>
      </div>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className=" mx-auto p-6 md:p-8 xl:px-14">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">What Our <span className='text-primary'>Customers Say</span></h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-primary-dark mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "ShopEase has completely transformed my shopping experience. The quality of products and delivery speed is unmatched!",
                name: "Sarah Johnson",
                role: "Loyal Customer since 2018"
              },
              {
                quote: "I love the variety and the frequent deals. Customer service is always helpful when I have questions about products.",
                name: "Michael Chen",
                role: "Verified Buyer"
              },
              {
                quote: "As a small business owner, I appreciate how easy it is to find what I need at competitive prices. Highly recommend!",
                name: "David Wilson",
                role: "Small Business Owner"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="text-yellow-400 mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <h4 className="font-semibold text-dark">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50  text-dark text-center">
        <div className="p-6 md:p-8 xl:px-14 mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience <span className='text-primary'>ShopEase?</span></h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join millions of satisfied customers shopping with confidence today.
          </p>
          <button className="bg-primary hover:bg-green-700
           text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-lg">
            Start Shopping Now
          </button>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}

export default AboutPage;