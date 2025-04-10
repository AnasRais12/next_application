'use client';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import CSpinner from '@/components/CSpinner';

export const ForgetPassword = ({setForgetPasswordModal}) => {
  
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setloading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setloading(true);
      if (!email) {
        Swal.fire({ icon: 'error', text: 'Please enter your email!' });
        return;
      }

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://next-application-pi.vercel.app/resetPassword', // Yahan reset page ka URL daalna hoga
      });
      if (error) {
        Swal.fire({ icon: 'error', text: error.message });
      } else {
        setForgetPasswordModal(false)
        Swal.fire({
          icon: 'success',
          text: 'We’ve sent a password reset link to your email in 1 mins. Please check your inbox and follow the link to set a new password!',
        });
      }
    } catch (error) {
      Swal.fire({ icon: 'error', text: error.message });
    } finally {
      setloading(false);
    }
  };

  return (
 <div className="fixed inset-0 flex items-center justify-center z-50 ">
  <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden mx-4  ">
    {/* Header with Gradient Background */}
    <div className="bg-primary hover:bg-green-800 sm:p-6 p-3 text-center">
      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto backdrop-blur-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </div>
      <h1 className="text-xl font-bold text-white mt-3">Reset Your Password</h1>
    </div>

    {/* Form Content */}
    <div className="sm:p-6 p-3">
      <p className="text-dark mb-6 text-center">
        Enter your email to receive a password reset link
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          onClick={handleForgotPassword}
          disabled={loading}
          className="w-full bg-primary hover:bg-green-800 text-white p-3 rounded-lg hover:shadow-md transition-all flex items-center justify-center h-12"
        >
          {loading ? (
            <CSpinner color="text-white" size="sm" />
          ) : (
            'Send Reset Link'
          )}
        </button>
      </div>

      {/* Back to Login Link */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
        <button
           onClick={() => setForgetPasswordModal(false)}
          className="text-sm text-green-800 hover:text-primary font-medium flex items-center gap-1"
        >
          Back to Sign In
        </button>
        
        {/* <button
          onClick={() => setForgetPasswordModal(false)}
          className="text-gray-400 hover:text-gray-600 transition-colors sm:hidden"
        >
          <RxCross2 className="w-5 h-5" />
        </button> */}
      </div>
    </div>
  </div>
</div>
  );
};

//    <div className="mt-4">
//             <form onSubmit={handleSubmit(handleLoginSumbit)}>
//               <input
//                 {...register('email')}
//                 type="email"
//                 placeholder="Enter Email "
//                 className="w-full p-3 border-2 border-[#ccc] rounded-[10px]   bg-white b focus:outline-none focus:ring-2 focus:ring-orange-400"
//               />
//               <input
//                 {...register('password')}
//                 type="password"
//                 placeholder="Password"
//                 className="w-full p-3 border-2 border-[#ccc] rounded-lg bg-white mt-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
//               />
//               <div className="text-right text-sm text-unique mt-3 cursor-pointer">
//                 <p onClick={moveToForgetAccount}>Forgot password?</p>
//               </div>

//               <button type="submit"
//                 disabled={credentialLoading}
//                 className="w-full bg-black text-white p-3 rounded-lg mt-4 hover:bg-unique">
//                 {credentialLoading ? (
//                   <CSpinner />
//                 ) : (
//                   "Login In")}
//               </button>
//             </form>

//           </div>
