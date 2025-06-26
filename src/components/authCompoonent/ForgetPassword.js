'use client';
import { useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabase';
import theme from '@/lib/theme';
import CSpinner from '@/components/CSpinner';
import { Button } from '@mui/material';
import ValidatedTextField from '../form/ValidatedTextField';
const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format').required('Email is required'),
});

export const ForgetPassword = ({ setForgetPasswordModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const email = watch('email');
  const [loading, setloading] = useState(false);

  const handleForgotPassword = async (data) => {
    const { email } = data;
    try {
      setloading(true);
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://next-application-pi.vercel.app/resetPassword', // Yahan reset page ka URL daalna hoga
      });
      if (error) {
          AlertModal({
              icon: 'error',
              title: 'Authentication Error',
              text: `${error.message}`,
              buttonText: 'Ok'
            })
      } else {
        setForgetPasswordModal(false)
          AlertModal({
              icon: 'success',
              title: 'Password Reset Link Sent',
              text: `We’ve sent a password reset link to your email in 1 mins. Please check your inbox and follow the link to set a new password!`,
              buttonText: 'Ok'
            })
      }
    } catch (error) {
       AlertModal({
              icon: 'error',
              title: 'Something went wrong',
              text: `${error.message}`,
              buttonText: 'Ok'
            })
    } finally {
      setloading(false);
      reset()
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden mx-4  ">
        {/* Header with Gradient Background */}
        <div className="bg-primary  sm:p-6 p-3 text-center">
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
          <p className="text-dark mb-6 ">
            Enter your email to receive a password reset link
          </p>

          <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-4">
            <ValidatedTextField
              label="Email"
              placeholder="Enter Your Email"
              register={register}
              name="email"
              errors={errors}
              theme={theme}
              isValid={isValid}
            />

            <Button
              type="submit"
              disabled={loading || !email?.trim()}
              className="w-full bg-primary  text-white p-3 rounded-lg hover:shadow-md transition-all flex items-center justify-center h-12"
            >
              {loading ? (
                <CSpinner color="text-white" size="sm" />
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>

          {/* Back to Login Link */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => setForgetPasswordModal(false)}
              className="text-sm text-primary hover:text-primary font-medium flex items-center gap-1"
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
