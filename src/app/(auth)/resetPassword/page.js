'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserQuery from '@/DbQuery/UserDetailQuery';
import { supabase } from '@/lib/supabase';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import theme from '@/lib/theme';
import CSpinner from '@/components/CSpinner';
import Swal from 'sweetalert2';
import Link from 'next/link';
import ValidatedTextField from '@/components/form/ValidatedTextField';
import { Button, Typography } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa6';
import AlertModal from '@/components/common/AlertModal';
const forgetAccountValidation = yup.object().shape({
  resetpassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is Required'),
  confirmPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is Required')
});

function Forget_Account() {
  const router = useRouter();
  const { updateUserDetails } = UserQuery();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm({ resolver: yupResolver(forgetAccountValidation) });
  const confirmPassword = watch('confirmPassword');
  const resetpassword = watch('resetpassword');
  const isDisabled = !resetpassword?.trim() || !confirmPassword?.trim()
  const [loading, setLoading] = useState(false);
  const handleResetPassword = async (data) => {
    try {
      setLoading(true);
      const { resetpassword } = data;
      const { error } = await supabase.auth.updateUser({
        password: resetpassword,
      });
      if (error) { AlertModal({
              icon: 'error',
              title: 'Update User Error',
              text: `${error.message}`,
              buttonText: 'Ok'
            })
      } else {
        const updatedFields = { password: resetpassword };
        await updateUserDetails(updatedFields);
          AlertModal({
              icon: 'success',
              title: 'Password reset successfully!',
              text: `Your password has been reset successfully. You can now log in with your new password.`,
              buttonText: 'Ok'
            })
        router.push('/login');
      }
    } catch (error) {
      AlertModal({
              icon: 'error',
              title: 'Something went wrong',
              text: `${error.message}`,
              buttonText: 'Ok'
            })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:fixed inset-0 flex items-center lg:justify-center z-50 bg-white">
      <div className="bg-white lg:rounded-2xl lg:shadow-xl w-full lg:max-w-md sm:mx-4 mx-4 overflow-hidden lg:border lg:border-gray-200">
        {/* Header with Gradient Background */}

        <div className="lg:bg-primary  sm:p-6 sm:pt-6 pt-3 lg:text-primary text-primary lg:text-center">

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
            <FaArrowLeft className='text-[25px] font-bold sm:text-[30px] mb-4 ' />
          </Link>
          <Typography sx={(theme) => ({
            fontSize: {
              mobileS: '28px',
              xs: '30px',
              sm: '40px',
            },
            color: {
              lg: 'white',
              xs: 'primary'

            }
          })}
            variant="h4"
            fontWeight="bold"
            color="primary"
          >
            Reset Password
          </Typography>
          <Typography sx={(theme) => ({
            fontSize: {
              mobileS: '16px',
              xs: '17px',
              sm: '20px',
            },
            display: {
              lg: 'none', 
              xs: 'block',
            },
          })} variant="body1" color="text.secondary" marginBottom={'15px'}>
            Set the new password for your account so you can log and acces all the features.
          </Typography>
        </div>

        {/* Form Content */}
        <div className=" md:px-6 md:py-1  lg:px-6 lg:py-6">
          <form onSubmit={handleSubmit(handleResetPassword)} className=" space-y-7 lg:space-y-5">
            <ValidatedTextField
              label="New Password"
              placeholder="Enter your password"
              type="password"
              register={register}
              name="resetpassword"
              errors={errors}
              isValid={isValid}
              theme={theme}
            />

            <ValidatedTextField
              label="Confirm Password"
              placeholder="Enter your password"
              type="password"
              register={register}
              name="confirmPassword"
              errors={errors}
              isValid={isValid}
              theme={theme}
            />

            {/* Password Requirements */}
            {/* <div className="bg-blue-50 p-3 rounded-lg">
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
   */}
            <Button
              type="submit"
              disabled={loading || isDisabled}
              className="w-full bg-primary  text-white p-3  hover:shadow-md "
            >
              {loading ? (
                <CSpinner color="text-white" size="sm" />
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>

          {/* Back to Login (Mobile) */}
          <div className="mt-4 lg:flex hidden ">
            <Link href={'/login'}
              className="text-primary hover:text-primary text-sm font-medium flex items-center gap-1"
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
