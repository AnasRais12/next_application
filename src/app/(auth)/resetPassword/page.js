'use client';
import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useRouter } from 'next/navigation';
import { RxCross2 } from 'react-icons/rx';
import { ImCross } from 'react-icons/im';
import { supabase } from '@/lib/supabase';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaArrowLeftLong } from 'react-icons/fa6';
import CSpinner from '@/components/CSpinner';

import Swal from 'sweetalert2';
import Link from 'next/link';
const forgetAccountValidation = yup.object().shape({
  resetpassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is Required'),
});

function Forget_Account() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(forgetAccountValidation) });
  const [loading, setLoading] = useState(false);

  const moveToLogin = () => {
    router.push('/login');
  };

  const handleResetPassword = async (data) => {
    try {
      setLoading(true);
      const { resetpassword } = data;
      const { data:Reset, error:ResetError } = await supabase.auth.updateUser({
        password: resetpassword,
      });

      if (ResetError) {
        Swal.fire({ icon: 'error', text: ResetError.message });
        return ;
     
      }
        Swal.fire({ icon: 'success', text: 'Password reset successfully!' });
        router.push('/login');
       
    } catch (error) {
      Swal.fire({ icon: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-blue-50 to-purple-50">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden border border-gray-200">
      {/* Header with Gradient Background */}
 
         <div className="bg-primary hover:bg-green-800 sm:p-6 p-3 text-center">
    
      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center mx-auto justify-center backdrop-blur-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="w-5 h-5 text-white"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" 
                />
              </svg>
            </div>
      <h1 className="text-xl font-bold text-white mt-3">Change Password</h1>
    </div>
  
      {/* Form Content */}
      <div className=" p-3 sm:p-6">
        <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-dark">
              New Password
            </label>
            <input
              {...register('resetpassword')}
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all"
            />
            {errors?.resetpassword?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.resetpassword.message}</p>
            )}
          </div>
  
          {/* Password Requirements */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-dark mb-2">Password must contain:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                At least 8 characters
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round"  strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                One uppercase letter
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round"  strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                One number or special character
              </li>
            </ul>
          </div>
  
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-green-800 text-white p-3 rounded-lg hover:shadow-md transition-all flex items-center justify-center h-12"
          >
            {loading ? (
              <CSpinner color="text-white" size="sm" />
            ) : (
              'Update Password'
            )}
          </button>
        </form>
  
        {/* Back to Login (Mobile) */}
        <div className="mt-4 ">
          <Link href={'/login'}
            className="text-green-800 hover:text-primary text-sm font-medium flex items-center gap-1"
          >
            Back to Login
          </Link >
        </div>
      </div>
    </div>
  </div>
  );
}

export default Forget_Account;
