import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaCcMastercard,
  FaCcVisa,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPaypal,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import Swal from 'sweetalert2';

function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = () => {
    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter an email address.',
      })
      return
    }

    // Save to localStorage
    localStorage.setItem('newsletterEmail', email)

    // Show confirmation
    Swal.fire({
      icon: 'success',
      title: 'Subscribed!',
      text: 'You will now receive updates and offers.',
    })

    // Clear input
    setEmail('')
  }

  return (
    <footer className="bg-white border-t-2 border-[#facc15] pt-16 pb-8 px-6 sm:px-12 font-sans">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="text-3xl font-bold text-[#047857] mb-4">ShopEase</div>
            <p className="text-[#1f2937] text-sm mb-6">
              Your premier destination for quality products and exceptional shopping experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#1f2937] hover:text-[#047857] transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="text-[#1f2937] hover:text-[#047857] transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-[#1f2937] hover:text-[#047857] transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-[#1f2937] hover:text-[#047857] transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#1f2937] mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-[#6b7280] hover:text-[#047857] transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#6b7280] hover:text-[#047857] transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#6b7280] hover:text-[#047857] transition-colors text-sm">
                  FAQs
                </Link>
              </li>
           
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-[#1f2937] mb-4 uppercase tracking-wider">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/returnPolicy" className="text-[#6b7280] hover:text-[#047857] transition-colors text-sm">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-[#6b7280] hover:text-[#047857] transition-colors text-sm">
                  Account Support
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-[#6b7280] hover:text-[#047857] transition-colors text-sm">
                Shipping Information
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold text-[#1f2937] mb-4 uppercase tracking-wider">Policies</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-[#6b7280] hover:text-[#047857] transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#6b7280] hover:text-[#047857] transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
             
           
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2 xl:col-span-1">
      <h3 className="text-lg font-semibold text-[#1f2937] mb-4 uppercase tracking-wider">Newsletter</h3>
      <p className="text-[#6b7280] text-sm mb-4">
        Subscribe to get updates on new arrivals and special offers
      </p>
      <div className="flex">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 w-full text-sm border border-[#d1d5db] rounded-l focus:outline-none focus:ring-1 focus:ring-[#047857]"
        />
        <button
          onClick={handleSubscribe}
          className="bg-[#047857] text-white px-4 py-2 text-sm rounded-r hover:bg-[#03684a] transition-colors"
        >
          Subscribe
        </button>
      </div>
    </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center border-t border-[#e5e7eb] pt-8">
          <div className="flex space-x-6 mb-4 sm:mb-0">
            <FaCcVisa className="text-2xl text-[#1f2937]" />
            <FaCcMastercard className="text-2xl text-[#1f2937]" />
            <FaPaypal className="text-2xl text-[#1f2937]" />
          </div>
          <p className="text-sm text-[#6b7280]">
            © {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;