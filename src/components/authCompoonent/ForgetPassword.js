'use client';
import { useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabase';
import theme from '@/lib/theme';
import CSpinner from '@/components/CSpinner';
import { Button, Typography } from '@mui/material';
import ValidatedTextField from '../form/ValidatedTextField';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    )
    .required('Email is required'),
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
          buttonText: 'Ok',
        });
      } else {
        setForgetPasswordModal(false);
        AlertModal({
          icon: 'success',
          title: 'Password Reset Link Sent',
          text: `We’ve sent a password reset link to your email in 1 mins. Please check your inbox and follow the link to set a new password!`,
          buttonText: 'Ok',
        });
      }
    } catch (error) {
      AlertModal({
        icon: 'error',
        title: 'Something went wrong',
        text: `${error.message}`,
        buttonText: 'Ok',
      });
    } finally {
      setloading(false);
      reset();
    }
  };

  return (
    <div className="lg:fixed inset-0 flex items-center lg:justify-center z-50 bg-white">
      <div className="bg-white lg:rounded-2xl lg:shadow-xl w-full lg:max-w-md sm:mx-4 mx-4 overflow-hidden lg:border lg:border-gray-200">
        {/* Header with Gradient Background */}
        <div className="lg:bg-primary   sm:p-6 sm:pt-6 pt-3 lg:text-primary text-primary lg:text-center">
          <div className="w-10 h-10 mb-4 bg-white/20 rounded-lg lg:flex hidden items-center mx-auto justify-center backdrop-blur-sm">
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
          <Link href={'/login'}>
            <FaArrowLeft
              onClick={() => setForgetPasswordModal(false)}
              className="text-[25px] lg:hidden flex font-bold sm:text-[30px] mb-3 sm:mb-4 "
            />
          </Link>
          <Typography
            sx={(theme) => ({
              fontSize: {
                mobileS: '28px',
                xs: '30px',
                sm: '40px',
              },
              color: {
                lg: 'white',
                xs: 'primary',
              },
            })}
            variant="h4"
            fontWeight="bold"
            color="primary"
          >
            Forget Password
          </Typography>
          <Typography
            sx={(theme) => ({
              fontSize: {
                mobileS: '16px',
                xs: '17px',
                sm: '20px',
              },
              display: {
                lg: 'none',
                xs: 'block',
              },
            })}
            variant="body1"
            color="text.secondary"
          >
            Enter your email to receive a password reset link
          </Typography>
        </div>

        {/* Form Content */}
        <div className=" md:px-6 md:py-1  lg:px-6 lg:py-6">
          <p className="lg:flex hidden text-dark mb-6 ">
            Enter your email to receive a password reset link
          </p>

          <form
            onSubmit={handleSubmit(handleForgotPassword)}
            className="sm:space-y-7 sm:mt-0 mt-3 space-y-4 lg:space-y-5"
          >
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
              className="w-full bg-primary  text-white p-3 rounded-lg hover:shadow-md transition-all flex items-center justify-center "
            >
              {loading ? (
                <CSpinner color="text-white" size="sm" />
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>

          {/* Back to Login Link */}
          <div className="lg:flex hidden  justify-between items-center mt-6 pt-4 border-t border-gray-100">
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

