import React from 'react'
import Link from 'next/link'
import { FaCcMastercard, FaCcVisa, FaFacebook, FaInstagram, FaLinkedin, FaPaypal, FaTwitter, FaYoutube } from 'react-icons/fa6'

function Footer() {
  return (
    <footer className="bg-gray-100 border-t-2 pt-12 pb-6 px-10 font-sans tracking-wide relative">
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex items-center lg:justify-center max-sm:-order-1">
          <div className="text-[30px] w-full md:text-[35px] tracking-wide font-bold text-orange-600">
            ShopEase
          </div>
        </div>
  
        <div>
          <h2 className="text-gray-800 text-md uppercase font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-3">
            <li><Link href="/about" className="text-gray-600 hover:text-orange-600" target='_blank'>About Us</Link></li>
            <li><Link href="/contact" className="text-gray-600 hover:text-orange-600" target='_blank'>Contact</Link></li>
            <li><Link href="/faq" className="text-gray-600 hover:text-orange-600" target='_blank'>FAQ</Link></li>
          </ul>
        </div>
  
        <div>
          <h2 className="text-gray-800 text-md uppercase font-semibold mb-4">Follow Us</h2>
          <ul className="space-y-3">
            <li><Link href="https://pk.linkedin.com/" className="text-gray-600 hover:text-orange-600" target='_blank'>LinkedIn</Link></li>
            <li><Link href="https://www.skype.com/en/" className="text-gray-600 hover:text-orange-600" target='_blank'>Skype</Link></li>
            <li><Link href="https://www.facebook.com/" className="text-gray-600 hover:text-orange-600" target='_blank'>Facebook</Link></li>
          </ul>
        </div>
  
        <div>
          <h2 className="text-gray-800 text-md uppercase font-semibold mb-4">Company</h2>
          <ul className="space-y-3">
            <li><Link href="/terms" className="text-gray-600 hover:text-orange-600" target='_blank'>Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="text-gray-600 hover:text-orange-600" target='_blank'>Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
  
      <hr className="mt-12 mb-6 border-gray-300" />
  
      <div className="flex sm:justify-between flex-wrap gap-6">
        {/* icons */}
        <p className='text-gray-600 text-sm'>{new Date().getFullYear()} ShopEase All rights reserved..</p>
        <div className="flex text-gray-700 space-x-5">
          <p>
            <FaCcMastercard className='text-[24px]' />
          </p>
          <p>
            <FaCcVisa className='text-[24px]' />
          </p>
          <p>
            <FaPaypal className='text-[24px]' />
          </p>
          <p>
            <FaFacebook className='text-blue-600 text-[24px]' />
          </p>
          <p>
            <FaLinkedin className='text-blue-600 text-[24px]' />
          </p>
        </div>
  
       
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