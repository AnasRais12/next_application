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

function Login({ background, position }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(LoginSchema) });
  const { setUser } = GlobalDetails();
  const router = useRouter();
  const [credentialLoading, setCredentialLoading] = useState(false);
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);
  const [googleLoading, setgoogleLoading] = useState(false);

  const moveToRegister = () => {
    router.push('signup');
  };
  const moveToForgetAccount = () => {
    setForgetPasswordModal(true);
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
        Swal.fire({
          icon: 'error',
          text: `${error.message === 'Email not confirmed' ? 'Email not verified' : error.message}`,
        });
      } else {
        const user = data.user;
        console.log('Data is Here ', data);

        if (!user) {
          console.error('Login failed: Email not verified.');
          Swal.fire({
            icon: 'info',
            text: `Email not verified`,
          });
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
            Cookies.set('sb-user-role', Profile?.role, {
              expires: 7,
              secure: true,
              path: '/',
            });

            if (Profile?.role === 'buyer') {
              Swal.fire({
                icon: 'success',
                text: `User Login Sucessfully`,
              });
              router.push('/home');
            } else {
              Swal.fire({
                icon: 'error',
                text: `Invalid role! Please contact support `,
              });
            }
          }
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error?.message,
      });
    } finally {
      setCredentialLoading(false);
      reset();
    }
  };

  return (
    <>
<div className={` inset-0 flex items-center z-50 bg-white`}>
  {/* Image Section (Desktop Only) */}
  <div className="hidden lg:flex w-1/2 h-screen bg-gradient-to-br from-blue-100 to-purple-200 relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center p-12">
      <div className="text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
        <p className="text-xl opacity-90">Your journey begins here</p>
      </div>
      <div className="absolute bottom-8 left-8 right-8 text-white opacity-80 text-sm">
        <p>"The best way to predict the future is to create it."</p>
      </div>
    </div>
    <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/online-shopping-concept-landing-page_52683-20156.jpg?ga=GA1.1.1568870668.1738407596&semt=ais_hybrid&w=740')] bg-cover bg-center opacity-100 border-r-2" />
  </div>

  {/* Login Form Section */}
  <div className="w-full lg:w-1/2 h-screen flex items-center justify-center p-4 sm:p-8">
    <div className="max-w-md w-full">
      {/* Logo/Header */}
      <div className="text-center mb-8">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-gray-500 mt-2">Login to continue your journey</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(handleLoginSumbit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>

          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <button
              type="button"
              onClick={moveToForgetAccount}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </button>
          </div>
          <input
            {...register('password')}
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={credentialLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center h-12"
        >
          {credentialLoading ? (
            <CSpinner color="text-white" size="sm" />
          ) : (
            'Login to your account'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-white text-gray-500 text-sm">OR</span>
        </div>
      </div>

      {/* Social Login */}
      <button
        onClick={() => signInWithGoogle(setgoogleLoading)}
        disabled={googleLoading}
        type="button"
        className="w-full px-4 py-3 flex items-center justify-center gap-2 rounded-lg text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all"
      >
        {googleLoading ? (
          <CSpinner color="text-gray-700" size="sm" />
        ) : (
          <>
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </>
        )}
      </button>

      {/* Sign Up Link */}
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={moveToRegister}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  </div>
  {forgetPasswordModal && (
    <>
     <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" />
     <ForgetPassword setForgetPasswordModal={setForgetPasswordModal}/>
    </>
  )}
</div>
    </>
  );
}

export default Login;
