'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    terms: false,
  })

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Save to localStorage
    localStorage.setItem('contactFormData', JSON.stringify(formData))

    // Show swal message
    Swal.fire({
      icon: 'success',
      title: 'Thank you!',
      text: 'Your message has been saved.',
    })

    // Optionally reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      terms: false,
    })
  }
  return (
    <section className=" bg-gray-50 pt-10  min-h-screen">
      <div className=" mx-auto ">
        {/* Header Section */}
      
        <div className="bg-white rounded-xl mb-12 shadow-lg    overflow-hidden  border border-gray-100">
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-6 md:p-8 xl:px-14 text-center">
            <h1 className="text-4xl md:text-5xl font-bold pt-6 text-white mb-2">
            Contact Our Team
            </h1>
            <p className="text-emerald-100 text-lg">
            Have questions or feedback? We'd love to hear from you.
            </p>
          </div>
          
        </div>

        {/* Contact Form */}
        <div className="m-6 md:m-8 xl:mx-14 mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-dark border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-dark border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-dark mb-2">
            Subject
          </label>
          <select
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-dark border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          >
            <option value="">Select a subject</option>
            <option value="support">Customer Support</option>
            <option value="feedback">Product Feedback</option>
            <option value="order">Order Inquiry</option>
            <option value="business">Business Partnership</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-dark border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="How can we help you?"
            required
          ></textarea>
        </div>

        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            checked={formData.terms}
            onChange={handleChange}
            className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300"
            required
          />
          <label htmlFor="terms" className="ml-2 text-sm text-dark/80">
            I agree to the <a href="/privacy" className="text-primary hover:underline">privacy policy</a>
          </label>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-md"
        >
          Send Message
        </button>
      </form>
    </div>

        {/* Additional Contact Info */}
        <div className="m-6 md:m-8 xl:mx-14 mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dark mb-2">Call Us</h3>
            <p className="text-dark/80">+1 (555) 123-4567</p>
            <p className="text-dark/80 text-sm mt-1">Mon-Fri, 9am-5pm EST</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dark mb-2">Email Us</h3>
            <p className="text-dark/80">support@shopease.com</p>
            <p className="text-dark/80 text-sm mt-1">Typically replies within 24 hours</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-dark mb-2">Visit Us</h3>
            <p className="text-dark/80">123 Commerce St</p>
            <p className="text-dark/80">San Francisco, CA 94103</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;