import React from 'react'
import Link from 'next/link'
import { FaCcMastercard, FaCcVisa, FaFacebook, FaInstagram, FaLinkedin, FaPaypal, FaTwitter, FaYoutube } from 'react-icons/fa6'

function Footer() {
  return (
    <footer className="bg-gradient-to-r first-letter: from-gray-900 via-gray-700 to-gray-900  pt-12 pb-6 px-10 font-sans tracking-wide relative">
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-white text-sm uppercase font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-3">
            <li>
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">Newsroom</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">Tailwind CSS</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">Careers</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-sm uppercase font-semibold mb-4">Follow Us</h2>
          <ul className="space-y-3">
            <li>
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">Github</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">linkedin</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">Twitter</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-sm uppercase font-semibold mb-4">Company</h2>
          <ul className="space-y-3">
            <li>
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">About</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">Privacy Policy</a>
            </li>
            <li>
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">Terms &amp; Conditions</a>
            </li>
          </ul>
        </div>

        <div className="flex items-center lg:justify-center max-sm:-order-1">
          
          <div className="text-[20px] w-full md:text-[25px] font-bold text-orange-600">
            ShopEase
          </div>
        </div>
      </div>

      <hr className="mt-12 mb-6 border-gray-600" />

      <div className="flex sm:justify-between flex-wrap gap-6">
        {/* iconsss */}
        <div className="flex bg-[red] space-x-5">
          <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">
            <svg className="w-5 h-5 fill-gray-400 hover:fill-white" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63
                .772-1.63 1.558V12h2.77l-.443 2.89h-2.327V22C18.343 21.128 22 16.991 22 12"></path>
            </svg>
          </a>
          <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">
            <svg className="w-5 h-5 fill-gray-400 hover:fill-white" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.486 2 2 6.486 2 12c0 5.513 4.486 10 10 10s10-4.487 10-10c0-5.514-4.486-10-10-10zm0 1.542c4.951 0 8.458 3.392 8.458 8.458 0 4.949-3.391 8.458-8.458 8.458-4.948 0-8.458-3.391-8.458-8.458
                    0-4.949 3.392-8.458 8.458-8.458zM9.743 16.747V7.128l6.027 4.31-6.027 4.309z">
              </path>
            </svg>
          </a>
          <a href="javascript:void(0)" className="text-gray-400 hover:text-white text-sm transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="fill-gray-400 hover:fill-white w-5 h-5"
              viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5zm-2.5 8.2v5.3h-2.79v-4.93a1.4 1.4 0 0 0-1.4-1.4c-.77 0-1.39.63-1.39 1.4v4.93h-2.79v-8.37h2.79v1.11c.48-.78 1.47-1.3 2.32-1.3 1.8 0 3.26 1.46 3.26 3.26zM6.88 8.56a1.686 1.686 0 0 0 0-3.37 1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68zm1.39 1.57v8.37H5.5v-8.37h2.77z"
                clip-rule="evenodd"></path>
            </svg>
          </a>
        </div>

        <p className='text-gray-400 text-sm'>© ReadymadeUI. All rights reserved.
        </p>
      </div>
    </div>
  </footer>


  )
}

export default Footer
// import React from 'react'
// import Link from 'next/link'
// import { FaCcMastercard, FaCcVisa, FaFacebook, FaInstagram, FaLinkedin, FaPaypal, FaTwitter, FaYoutube } from 'react-icons/fa6'

// function Footer() {
//   return (
//     <footer className="bg-gray-50 text-black border-t-2 py-16 px-6 md:px-24">
//     <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
//       {/* Company Info */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">About Us</h2>
//         <p className="text-gray-600 text-sm">We’re an e-commerce platform dedicated to providing top-notch products from leading brands. Our mission is to make shopping enjoyable, convenient, and affordable for everyone.</p>
//       </div>

//       {/* Quick Links */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
//         <ul className="space-y-3 text-sm">
//           <li><Link href="/about" className="text-gray-600 hover:text-black">About Us</Link></li>
//           <li><Link href="/contact" className="text-gray-600 hover:text-black">Contact</Link></li>
//           <li><Link href="/faq" className="text-gray-600 hover:text-black">FAQ</Link></li>
//           <li><Link href="/terms" className="text-gray-600 hover:text-black">Terms & Conditions</Link></li>
//           <li><Link href="/privacy" className="text-gray-600 hover:text-black">Privacy Policy</Link></li>
//         </ul>
//       </div>

//       {/* Customer Support */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Customer Support</h2>
//         <ul className="space-y-3 text-sm">
//           <li><Link href="/help-center" className="text-gray-600 hover:text-black">Help Center</Link></li>
//           <li><Link href="/shipping-info" className="text-gray-600 hover:text-black">Shipping Information</Link></li>
//           <li><Link href="/returns" className="text-gray-600 hover:text-black">Returns & Exchanges</Link></li>
//           <li><Link href="/track-order" className="text-gray-600 hover:text-black">Track Order</Link></li>
//         </ul>
//       </div>

//       {/* Payment Methods */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
//         <div className="flex space-x-6 text-xl">
//           <FaCcVisa className="text-gray-600 hover:text-black" />
//           <FaCcMastercard className="text-gray-600 hover:text-black" />
//           <FaPaypal className="text-gray-600 hover:text-black" />
//         </div>
//       </div>

//       {/* Social Media & Newsletter */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
//         <div className="flex space-x-6 text-xl">
//           <a href="#" className="text-gray-600 hover:text-black"><FaFacebook /></a>
//           <a href="#" className="text-gray-600 hover:text-black"><FaInstagram /></a>
//           <a href="#" className="text-gray-600 hover:text-black"><FaTwitter /></a>
//           <a href="#" className="text-gray-600 hover:text-black"><FaLinkedin /></a>
//           <a href="#" className="text-gray-600 hover:text-black"><FaYoutube /></a>
//         </div>
//         <h2 className="text-xl font-semibold mt-6 mb-4">Subscribe to Our Newsletter</h2>
//         <p className="text-sm text-gray-600 mb-4">Stay up to date with the latest trends, deals, and exclusive offers by signing up for our newsletter.</p>
//         <input 
//           type="email" 
//           placeholder="Enter your email" 
//           className="w-full p-3 rounded bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
//         />
//       </div>
//     </div>


//     {/* Copyright */}
//     <div className="text-center text-gray-500 mt-16 border-t border-gray-300 pt-6">
//       &copy; {new Date().getFullYear()} E-Commerce. All rights reserved. | Designed with ❤️ by [Your Company]
//     </div>
//   </footer>


//   )
// }

// export default Footer