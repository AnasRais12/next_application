'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithGoogle } from '@/lib/Auth';
import { supabase } from '@/lib/supabase';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Box, Divider, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import CSpinner from '@/components/CSpinner';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import theme from '@/lib/theme';
import ValidatedTextField from '../form/ValidatedTextField';
import AlertModal from '../common/AlertModal';

const schema = yup.object().shape({
  username: yup
    .string()
    .min(6, 'Username Must be 6 Character')
    .required('Username is Required'),
  email: yup
    .string()
    .email('Invalid email format')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    )
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is Required'),
});



function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const email = watch('email');
  const password = watch('password');
  const username = watch('username');

  // ✅ Disable button if any field is empty
  const isDisabled = !email?.trim() || !password?.trim() || !username?.trim();
  const router = useRouter();
  const [roleFromParams, setRoleFromParams] = useState('buyer');
  const { setAuthfield } = GlobalDetails();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setgoogleLoading] = useState(false);
  const OnSubmitHandler = async (data) => {
    const { email, password, username } = data;
    setLoading(true);
    try {
      // Username check
      const { data: existingUserName } = await supabase
        .from('profiles')
        .select('*')
        .eq('name', username)
        .limit(1);

      if (existingUserName?.length > 0) {
        AlertModal({
          icon: 'error',
          title: 'Insert Profile Error! ',
          text: `Username Already Exists`,
          buttonText: 'Ok'
        })
        return;
      }

      // Email check
      const { data: existingEmail } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .limit(1);

      if (existingEmail?.length > 0) {
        AlertModal({
          icon: 'error',
          title: 'Insert Profile Error! ',
          text: `Email Already Exists`,
          buttonText: 'Ok'
        })
        return;
      }

      // Signup user
      const { data: signUpData, error: authError } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            emailRedirectTo: 'https://next-application-pi.vercel.app/login',
          },
        }
      );

      if (authError) {
        AlertModal({
          icon: 'error',
          title: 'Authentication Error! ',
          text: `${authError.message} `,
          buttonText: 'Ok'
        })
        return;
      }

      setAuthfield((prev) => {
        const updatedAuthField = {
          ...prev,
          email: signUpData?.user?.email,
          username,
        };
        localStorage.setItem(
          'AuthFieldVerifyPage',
          JSON.stringify(updatedAuthField)
        );
        return updatedAuthField;
      });

      // Insert into 'profiles' table
      const { error: insertError } = await supabase.from('profiles').insert([
        {
          id: signUpData?.user?.id,
          role: roleFromParams,
          name: username,
          email,
        },
      ]);

      if (insertError) {
        AlertModal({
          icon: 'error',
          title: 'Insert Profile Error! ',
          text: `${insertError.message} `,
          buttonText: 'Ok'
        })
        return;
      }
      AlertModal({
        icon: 'success',
        title: 'User Registered Successfully!',
        text: `Please check your email to verify your account.`,
        buttonText: 'Ok'
      })
        router.push('/verifyaccount');

    } catch (error) {
      AlertModal({
        icon: 'error',
        title: 'Something went wrong! ',
        text: `${error.message} `,
        buttonText: 'Ok'
      })
    } finally {
      setLoading(false);
      reset();
    }
  };


  return (
    <Suspense>
      <div className="inset-0 flex items-center z-50 bg-white">
        {/* Image Section (Desktop Only) - Matching Login Page */}
        <div className="hidden lg:flex w-1/2 border-r-2 h-screen relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-white text-center">
              <h2 className="text-4xl font-bold mb-4">Join Us Today!</h2>
              <p className="text-xl opacity-90">Your journey begins here</p>
            </div>
            <div className="absolute bottom-8 left-8 right-8 text-white opacity-80 text-sm">
              <p>"Great things start with small beginnings."</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/online-shopping-concept-landing-page_52683-20156.jpg?ga=GA1.1.1568870668.1738407596&semt=ais_country_boost&w=740')] bg-contain bg-no-repeat lg:bg-cover bg-center opacity-100 " />
        </div>

        {/* Register Form Section */}
        <div className="w-full flex items-center justify-center  lg:w-1/2 p-5 md:pt-8 md:p-12 lg:pt-8 lg:p-8">
          <div className="lg:max-w-md w-full">
            {/* Logo/Header - Matching Login Page */}
            <div className="lg:text-center mb-6 md:mb-8 lg:pt-8 pt-3 md:pt-8">
              <div className="w-16 h-16 bg-primary lg:flex hidden  rounded-xl items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <Typography
                variant="h4"
                sx={(theme) => ({
                  fontSize: {
                    mobileS: '30px',
                    xs: '40px',
                    sm: '40px',
                  },
                })}

                fontWeight="bold"
                color="primary"
              >
                Create an account
              </Typography>


              <Typography
                sx={(theme) => ({
                  fontSize: {
                    mobileS: '18px',
                    xs: '20px',
                    sm: '20px',
                  },
                })}
                variant="body1" color="text.secondary">
                Let's create your account.
              </Typography>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit(OnSubmitHandler)} className="lg:space-y-5 md:space-y-7 space-y-4  w-full">
              <ValidatedTextField
                label="Full Name"
                placeholder="Enter Your Full Name"
                register={register}
                name="username"
                errors={errors}
                isValid={isValid}
              />


              <ValidatedTextField
                label="Email"
                theme={theme}
                placeholder="Enter Your Email"
                register={register}
                name="email"
                errors={errors}
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
                  By signing up you agree to our{' '}
                  <Link className='text-primary border-b-2 border-primary' href="/terms" >
                    Terms
                  </Link>
                  ,{' '}
                  <Link className='text-primary border-b-2 border-primary' href="/privacy" color="primary">
                    Privacy Policy
                  </Link>
                  , and{' '}
                  <Link className='text-primary border-b-2 border-primary' href="/cookies" color="primary">
                    Cookie Use
                  </Link>.
                </Typography>
              </Box>

              <Button
                type="submit"
                disabled={loading || isDisabled}
                className="w-full bg-primary"
              >
                {loading ? <CSpinner color="text-white" size="sm" /> : 'Create Account'}
              </Button>
            </form>

            {/* Divider - Matching Login Page */}
            <Divider
              sx={({ theme }) => ({
                my: 3, color: 'gray', fontSize: '1.3rem',
                '&::before, &::after': {
                  borderColor: theme?.palette?.borderColor, // equivalent to Tailwind border-gray-200
                },
              })}
            >
              Or
            </Divider>

            {/* Social Login - Matching Login Page */}
            <button
              onClick={() => signInWithGoogle(setgoogleLoading)}
              disabled={googleLoading}
              type="button"
              className="w-full px-4 sm:py-4 py-3 flex items-center justify-center gap-2 rounded-lg text-primary bg-white border border-[#ccc]   transition-all"
            >
              {googleLoading ? (
                <CSpinner color="text-[#000000]" size="sm" />
              ) : (
                <>
                  <FcGoogle size={25} />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Login Link - Similar to Sign Up Link in Login Page */}
            <div className="text-center mt-6">
              <p className="text-[#808080]  text-[20px]">
                Already have an account?{' '}
                <Link href={'/login'}
                  className="text-primary text-[20px] font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Register;