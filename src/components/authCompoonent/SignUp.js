'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { supabaseRole } from '@/lib/supabase';
import { signInWithGoogle } from '@/lib/Auth';
import { supabase } from '@/lib/supabase';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Box, Divider, FormControl, FormHelperText, InputAdornment, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import CSpinner from '@/components/CSpinner';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { CheckCircle, Error } from '@mui/icons-material';
import theme from '@/lib/theme';
import ValidatedTextField from '../form/ValidatedTextField';

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
  console.log(errors, isValid, "here is ")

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
        Swal.fire({ icon: 'error', text: `Username Already Exists` });
        return;
      }

      // Email check
      const { data: existingEmail } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .limit(1);

      if (existingEmail?.length > 0) {
        Swal.fire({ icon: 'error', text: `Email Already Exists` });
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
        Swal.fire({ icon: 'error', text: authError.message });
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
        Swal.fire({ icon: 'error', text: insertError.message });
        return;
      }

      Swal.fire({
        icon: 'success',
        text: `User Registered Successfully!`,
      }).then(() => {
        router.push('/verifyaccount');
      });
    } catch (error) {
      Swal.fire({ icon: 'error', text: error.message });
    } finally {
      setLoading(false);
      reset();
    }
  };

  console.log(isValid, "isValid");

  return (
    <Suspense>
      <div className="fixed inset-0 flex items-center z-50 bg-white">
        {/* Image Section (Desktop Only) - Matching Login Page */}
        <div className="hidden lg:flex w-1/2 h-screen bg-gradient-to-br from-blue-100 to-purple-200 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-white text-center">
              <h2 className="text-4xl font-bold mb-4">Join Us Today!</h2>
              <p className="text-xl opacity-90">Your journey begins here</p>
            </div>
            <div className="absolute bottom-8 left-8 right-8 text-white opacity-80 text-sm">
              <p>"Great things start with small beginnings."</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/online-shopping-concept-landing-page_52683-20156.jpg?ga=GA1.1.1568870668.1738407596&semt=ais_country_boost&w=740')] bg-cover bg-center opacity-100 border-r-2" />
        </div>

        {/* Register Form Section */}
        <div className="w-full lg:w-1/2 h-screen flex items-center justify-center p-4 sm:p-8">
          <div className="max-w-md w-full">
            {/* Logo/Header - Matching Login Page */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary  rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <Typography
                variant="h4"
                fontWeight="bold"
                color="primary"
              >
                Create an account
              </Typography>

              <Typography variant="body1" color="text.secondary">
                Let's create your account.
              </Typography>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit(OnSubmitHandler)} className="space-y-5">
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
                <Typography variant="body2" color="textSecondary">
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
                className="w-full bg-primary text-white p-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center h-12"
              >
                {loading ? <CSpinner color="text-white" size="sm" /> : 'Create Account'}
              </Button>
            </form>

            {/* Divider - Matching Login Page */}
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

            {/* Social Login - Matching Login Page */}
            <Button
              onClick={() => signInWithGoogle(setgoogleLoading)}
              disabled={googleLoading}
              type="button"
              className="w-full px-4 py-3 flex items-center justify-center gap-2 "
              sx={{
                backgroundColor: 'white',
                color: '#000000',
                borderBottom: '3px solid #FFFFFF', 

                '&:hover': {
                  backgroundColor: 'white', 
                  color: '#000000',
                  borderBottom: '3px solid #4285F4'
                },
                '&.Mui-disabled': {
                  color: '#000000', 
                },
              }}
            >
              {googleLoading ? (
                <CSpinner color="text-[#000000]" size="sm" />
              ) : (
                <>
                  <FcGoogle size={25} />
                  <span>Continue with Google</span>
                </>
              )}
            </Button>

            {/* Login Link - Similar to Sign Up Link in Login Page */}
            <div className="text-center mt-6">
              <p className="text-[#808080]">
                Already have an account?{' '}
                <Link href={'/login'}
                  // onClick={moveToLogin}
                  className="text-primary font-medium"
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