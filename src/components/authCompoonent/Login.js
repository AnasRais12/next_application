'use client';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { BsFacebook } from 'react-icons/bs';
import { signInWithFacebook, signInWithGoogle } from '@/lib/Auth';
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import { supabase } from '@/lib/supabase';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import { useRouter } from 'next/navigation';
import CSpinner from '@/components/CSpinner';
import { ForgetPassword } from './ForgetPassword';
import { Box, Button, Divider, Typography } from '@mui/material';
import ValidatedTextField from '../form/ValidatedTextField';
import theme from '@/lib/theme';
import Link from 'next/link';
import AlertModal from '../common/AlertModal';

//scheman//
const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    )
    .required(),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is Required'),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm({ resolver: yupResolver(LoginSchema) });
  const email = watch('email');
  const password = watch('password');

  const isDisabled = !email?.trim() || !password?.trim()
  const { setUser } = GlobalDetails();
  const router = useRouter();
  const [credentialLoading, setCredentialLoading] = useState(false);
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
  const [roleFromParams, setRoleFromParams] = useState('buyer');
  const [googleLoading, setgoogleLoading] = useState(false);


  const moveToRegister = () => {
    router.push('/signup');
  };

  const handleLoginSumbit = async (data) => {
    const { email, password } = data;
    setCredentialLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        AlertModal({
          icon: 'error',
          title: 'Authentication Error! ',
          text: `${error.message === 'Email not confirmed' ? 'Email not verified' : error.message}`,
          buttonText: 'Ok'
        })
      } else {
        const user = data.user;
        if (!user) {
          AlertModal({
            icon: 'error',
            title: 'Authentication Error! ',
            text: `Email not verified`,
            buttonText: 'Ok'
          })
        } else {
          // console.log('User logged in successfully:', user);
          if (data.session || data.user) {
            Cookies.set('sb-access-token', data.session.access_token, {
              expires: 7,
              secure: true,
            });
            Cookies.set('sb-refresh-token', data.session.refresh_token, {
              expires: 7,
              secure: true,
            });
            localStorage.setItem('sb-user', JSON.stringify(data.user));
            setUser(data?.user);
          }

          const { data: Profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data?.user?.id)
            .maybeSingle()
            .select();
          if (Profile) {
            // Check if "seller" is already in roles
            if (!Profile.role.includes("buyer")) {
              const updatedRoles = [...Profile.role, "buyer"];

              // Update profile to include seller role
              await supabase
                .from('profiles')
                .update({ role: updatedRoles })
                .eq('id', data?.user?.id);
            }

            // Set cookie
            Cookies.set('sb-user-role', roleFromParams, {
              expires: 7,
              secure: true,
              path: '/',
            });

            AlertModal({
              icon: 'success',
              title: 'User Login Sucessfully ',
              text: `Welcome ${Profile?.full_name || Profile?.username || Profile?.email}`,
              buttonText: 'Ok'
            })
            router.push('/');
          }
          else {
            AlertModal({
              icon: 'error',
              title: 'Profile Role Not Found! ',
              text: `Invalid role! Please contact support`,
              buttonText: 'Ok'
            })

          }
        }
      }
    } catch (error) {
      AlertModal({
        icon: 'error',
        title: 'Something went wrong! ',
        text: `${error?.message}`,
        buttonText: 'Ok'
      })
    } finally {
      setCredentialLoading(false);
      reset();
    }
  };
  //  {forgetPasswordModal && (
  //         <>
  //           <div className="lg:fixed inset-0 bg-black backdrop-blur-sm z-40" />
  //           <ForgetPassword setForgetPasswordModal={setForgetPasswordModal} />
  //         </>
  //       )}
  if (forgetPasswordModal) {
    return (
      <>
        <div className="lg:fixed inset-0 bg-black backdrop-blur-sm z-40" />
        <ForgetPassword setForgetPasswordModal={setForgetPasswordModal} />
      </>
    )

  }

  return (
    <>
      <div className={` inset-0 flex items-center z-50 bg-[white]`}>
        {/* Image Section (Desktop Only) */}
        <div className="hidden lg:flex w-1/2 h-screen  relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-white text-center">
              <h2 className="text-4xl text-[#1f2937] font-bold mb-4">Welcome Back!</h2>
              <p className="text-xl opacity-90">Your journey begins here</p>
            </div>
            <div className="absolute bottom-8 left-8 right-8 text-white opacity-80 text-sm">
              <p>"The best way to predict the future is to create it."</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/online-shopping-concept-landing-page_52683-20156.jpg?ga=GA1.1.1568870668.1738407596&semt=ais_hybrid&w=740')] lg:bg-cover bg-contain bg-no-repeat bg-center opacity-100 border-r-2" />
        </div>

        {/* Login Form Section */}
        <div className="w-full flex items-center justify-center  lg:w-1/2 p-5 md:pt-8 md:p-12 lg:pt-8 lg:p-8">
          <div className="lg:max-w-md w-full">
            {/* Logo/Header */}
            <div className="lg:text-center mb-6 md:mb-8 lg:pt-8 pt-3 md:pt-8">
              <div className="w-16 h-16 bg-primary lg:flex hidden  rounded-xl items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <Typography sx={(theme) => ({
                fontSize: {
                  mobileS: '30px',
                  xs: '40px',
                  sm: '40px',
                },
              })}
                variant="h4"
                fontWeight="bold"
                color="primary"
              >
                Welcome Back!
              </Typography>

              <Typography sx={(theme) => ({
                fontSize: {
                  mobileS: '18px',
                  xs: '20px',
                  sm: '20px',
                },
              })} variant="body1" color="text.secondary">
                it's great to see you again.
              </Typography>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(handleLoginSumbit)} className="lg:space-y-5 md:space-y-7 space-y-4  w-full">
              <ValidatedTextField
                label="Email"
                placeholder="Enter Your Email"
                register={register}
                name="email"
                errors={errors}
                theme={theme}
                isValid={isValid}
              />

              <ValidatedTextField
                label="Password"
                placeholder="Enter your password"
                type="password"
                register={register}
                name="password"
                errors={errors}
                isValid={isValid}
                theme={theme}
              />
              <Box>
                <Typography fontSize={"16px"} variant="body2" color="textSecondary">
                  Forgot your password?{' '}
                  <a onClick={() => setForgetPasswordModal(true)} className='text-primary cursor-pointer border-b-2 border-primary'  >
                    Reset your password
                  </a>

                </Typography>
              </Box>

              <Button
                type="submit"
                disabled={credentialLoading || isDisabled}
                className="w-full  p-3 flex items-center justify-center h-12"
              >
                {credentialLoading ? (
                  <CSpinner color="text-white" size="sm" />
                ) : (
                  'Login'
                )}
              </Button>
            </form>

            {/* Divider */}
            <Divider
              sx={({ theme }) => ({
                my: 3, color: 'gray', fontSize: '0.875rem',
                '&::before, &::after': {
                  borderColor: theme?.palette?.borderColor, // equivalent to Tailwind border-gray-200
                },
              })}
            >
              Or
            </Divider>

            {/* Social Login */}
            <button
              onClick={() => signInWithGoogle(setgoogleLoading)}
              disabled={googleLoading}
              type="button"
              className="w-full px-4 sm:py-4 py-3 flex items-center justify-center gap-2 rounded-lg text-primary bg-white border border-[#ccc]   transition-all"
            >
              {googleLoading ? (
                <CSpinner color="text-gray-700" size="sm" />
              ) : (
                <>
                  <FcGoogle size={25} />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-[#1f2937]">
                Don't have an account?{' '}
                <button
                  onClick={moveToRegister}
                  className="text-primary  hover:text-primary font-medium"
                >
                  Join
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default Login;
