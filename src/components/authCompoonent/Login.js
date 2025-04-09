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
  const [googleLoading, setgoogleLoading] = useState(false);

  const moveToRegister = () => {
    router.push('signup');
  };
  const moveToForgetAccount = () => {
    router.push('/forgetaccount');
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
    <div className={`${position} ${background} inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-blue-50 to-purple-50`}>
  <div className="bg-white p-8 rounded-xl shadow-xl sm:w-[70%] lg:w-[30vw] w-full sm:mx-0 mx-4 relative border border-gray-100">
    {/* Logo */}
    <div className="flex flex-col items-center mb-6">
      <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
      <p className="text-gray-500 mt-2">Login to your account</p>
    </div>

    {/* Login Form */}
    <div className="mt-2">
      <form onSubmit={handleSubmit(handleLoginSumbit)} className="space-y-4">
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="text-right">
          <p 
            onClick={moveToForgetAccount}
            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
          >
            Forgot password?
          </p>
        </div>

        <button
          type="submit"
          disabled={credentialLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg hover:opacity-90 transition-all shadow-md"
        >
          {credentialLoading ? <CSpinner /> : 'Login'}
        </button>
      </form>
    </div>

    {/* Social Login */}
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">Or continue with</span>
      </div>
    </div>

    <button
      onClick={() => signInWithGoogle(setgoogleLoading)}
      disabled={googleLoading}
      type="button"
      className="w-full px-3 py-3 flex items-center gap-2 justify-center rounded-lg text-[16px] text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all"
    >
      {googleLoading ? (
        <CSpinner color="text-gray-700" size="sm" />
      ) : (
        <FcGoogle size={20} />
      )}
      {googleLoading ? '' : 'Sign in with Google'}
    </button>

    <div className="text-center mt-4">
      <p className="text-gray-600">
        Not registered?{' '}
        <span 
          onClick={moveToRegister}
          className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium transition-colors"
        >
          Create account
        </span>
      </p>
    </div>
  </div>
</div>
    </>
  );
}

export default Login;

{
  /* <div className="static h-screen flex   items-center sm:items-center  justify-center w-full z-50  bg-opacity-50">
        <div className=" w-full h-full sm:max-h-fit relative sm:w-[70vw]  md:w-[60vw] lg:w-[60vw] xl:w-[50vw] py-5 rounded-md shadow-2xl ">
          <div className="sm:pt-10 pt-0 px-6 sm:px-10">
            <div
              className=" 
            sm:gap-0 gap-2  sm:flex-row flex justify-between items-start sm:items-center flex-col-reverse "
            >
              <h2 className="text-[24px] sm:text-[30px] xl:text-[36px] font-normal">
                Login
              </h2>
            </div>
            <p className="text-gray-600 mt-4 sm:mt-8 text-[16px] lg:text-[18px]  xl:text-[20px]">
              We will send you a code by SMS
            </p>
          </div>
          <form onSubmit={handleSubmit(handleLoginSumbit)} className="sm:mt-8 mt-4 px-1">
            <div className="px-6 sm:px-10 flex flex-col gap-10">
              <input
                {...register('username')}
                type="text"
                placeholder="Enter Your Username"
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unique"
              />
              <p>{errors?.username?.message}</p>
              <input
                {...register('password')}
                type="password"
                placeholder="Enter Your Password"
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unique"
              />
              <p>{errors?.password?.message}</p>
            </div>
            <div className="w-full flex justify-center  mt-8    items-center py-2 border-t-2">
              <div className="flex flex-col gap-6 w-[90%]">

                <button
                  type="submit"
                  disabled={credentialLoading}
                  className="w-full px-3 py-2 rounded-[8px] text-[20px] bg-green-900 text-white my-[10px]"
                >
                  {' '}
                  {credentialLoading ? (
                    <CSpinner />
                  ) : (
                    "Login In")}
                </button>
                <button onClick={handleGoogleLogin}
                  disabled={googleLoading}
                  type="button"
                  className="w-full px-3 py-2 flex items-center gap-4 justify-center rounded-[8px] text-[20px] text-black bg-gray-200 x my-[10px]"
                >
                  {googleLoading ? (
                    <CSpinner color="text-black"  size="sm"  />
                  ) : (
                    <FcGoogle size={25} style={{ marginRight: "10px" }} />
                  )}
                  {googleLoading ? "" : "Sign In with Google"}
                </button>

                <button onClick={handleGithubLogin}
                  disabled={githubLoading}
                  type="button"
                  className="w-full px-3 py-2 flex items-center gap-4 justify-center rounded-[8px] text-[20px] bg-black text-white my-[10px]"
                >
                  {githubLoading ? (
                    <CSpinner size="sm" style={{ marginRight: "10px" }} />  // Agar loading hai toh spinner dikhaiye
                  ) : (
                    <ImGithub size={25} style={{ marginRight: "10px" }} />  // Agar loading nahi hai toh GitHub icon dikhaiye
                  )}
                  {githubLoading ? "" : "Sign In with GitHub"} {/* Button text */
}
//         </button>

//       </div>
//     </div>
//   </form>

//   <div className="w-full justify-center flex">
//     <div className="flex w-[80%] justify-between  items-center">
//       <button
//         onClick={moveToRegister}
//         className="w-[40%] py-2 rounded-[8px]  px-10 text-[20px] bg-green-900 text-white my-[10px]"
//       >
//         {' '}
//         Did'nt Have an Account
//       </button>
//       <button
//         onClick={moveToForgetAccount}
//         className="w-[40%] py-2 rounded-[8px]  px-10 text-[20px] bg-green-900 text-white my-[10px]"
//       >
//         {' '}
//         Forgetten Account?
//       </button>
//     </div>
//   </div>
// </div>
// </div> */}
