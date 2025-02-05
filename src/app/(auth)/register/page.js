'use client';
import React, { useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import { signInWithGoogle } from '@/lib/Auth';
import { RxCross2 } from "react-icons/rx";
import { signInWithFacebook } from '@/lib/Auth';
import { supabase } from '@/lib/supabase';
import { ImGithub } from "react-icons/im";
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaArrowLeftLong } from 'react-icons/fa6';

import CSpinner from '@/components/CSpinner';
const schema = yup.object().shape({
  username: yup.string().min(6,"Username Must be 6 Character").required('Username is Required'),
  email: yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    ).required(),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is Required')
})

function Register() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) })
  const [githubLoading, setGithubLoading] = useState(false);
  const [googleLoading, setgoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storedRegister, setstoredRegister] = useState(null);
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  const [input, setinput] = useState({ username: '', email: '', password: '' });

  useEffect(() => {
    if (registerUser) {
      setstoredRegister(JSON.parse(registerUser));
    }
  }, [registerUser]);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setinput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const OnSumbithandler = async (data) => {
    setLoading(true);
    try {
      // Check if username already exists
      const { data: existingUserName } = await supabase
        .from('users')
        .select('*')
        .eq('username', data.username)
        .limit(1); // Limit to 1 result only
  
      if (existingUserName.length > 0) {
        Swal.fire({
          icon: "error",
          text: `Username Already Exists`
        });
        return; // Stop execution if username exists
      }
  
      // Check if email already exists
      const { data: existingEmail } = await supabase
        .from('users')
        .select('*')
        .eq('email', data.email)
        .limit(1); // Limit to 1 result only
  
      if (existingEmail.length > 0) {
        Swal.fire({
          icon: "error",
          text: `Email Already Exists`
        });
        return; // Stop execution if email exists
      }
  
      // If no errors, proceed with signup
      const { user, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      });
  
      if (authError) {
        Swal.fire({
          icon: "error",
          text: authError.message
        });
        return;
      }
  
      // Insert new user into the 'users' table
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{...data }]);
  
      if (insertError) {
        Swal.fire({
          icon: "error",
          text: insertError.message
        });
      } else {
        Swal.fire({
          icon: "success",
          text: `User Registered Successfully!`
        });
        // Redirect or perform other actions
      }
  
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message
      });
    } finally {
      setLoading(false);
      reset(); // Reset the form
    }
  };
  const handleGoogleLogin = async () => {
    setgoogleLoading(true)
    try {
      await signIn('google', { callbackUrl: 'http://localhost:3000/home' })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: `${error}`
      })
    }
    finally {
      setgoogleLoading(false)
    }

  }
  const handleGithubLogin = async () => {
    try {
      setGithubLoading(true)
      await signIn('github', { callbackUrl: 'http://localhost:3000/home' })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: `${error}`
      })
    }
    finally {
      setGithubLoading(false)
    }
  };


  return (
    <>
      <div className="fixed inset-0 bg-custom-gradient flex items-center justify-center z-50">
        <div className="bg-white p-6 border-2 rounded-2xl shadow-lg sm:w-[70%] lg:w-[40vw] w-full sm:mx-0 mx-2  relative">
          {/* <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
              <IoClose size={24} />
            </button> */}

          {/* Logo */}
          <div className="flex flex-col items-center">
            {/* <div className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl">
                E<span></span>
              </div> */}
            <h2 className="text-2xl font-bold mt-2">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign Up  to your account</p>
          </div>

          {/* Login Form */}

          <div className="mt-4 f ">
            <form className='flex-col gap-1 flex' onSubmit={handleSubmit(OnSumbithandler)}>
              <input
                {...register('username')}
                type="text"
                required
                name="username"
                // required,
                minLength="6"
                value={input.username}
                placeholder="Enter Your Username"
                onChange={handleInput}
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors.username?.message}</p>
              <input
                {...register('email')}
                required
                type="email"
                name="email"
                value={input.email}
                placeholder="Enter Your Email"
                onChange={handleInput}
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors.email?.message}</p>
              <input
                {...register('password')}
                type="password"
                value={input.password}
                placeholder="Enter Your Password"
                onChange={handleInput}
                className="w-full px-4 py-3 sm:py-4 border  rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors.password?.message}</p>
              <button type="submit"
                // disabled={credentialLoading}
                className="w-full bg-black text-white p-3 rounded-lg mt-4 hover:bg-unique">
                {loading == true ? <CSpinner /> : 'Create Account'}
              </button>
            </form>

          </div>

          {/* Social Login */}
          <div className="mt-4 text-center">
            <p className="text-black text-md">Or Login with</p>
            <div className="flex flex-col items-center justify-center gap-4 mt-2">
              <button onClick={signInWithGoogle} className="flex items-center bg-black text-white  justify-center w-full text-center gap-2 px-4 py-2 border rounded-lg  ">
                <FcGoogle size={20} className="text-red-500" />
                Google
              </button>
              <button onClick={signInWithFacebook} className="flex w-full justify-center bg-black text-white  items-center gap-2 px-4 py-2 border rounded-lg  ">
                <ImGithub size={20} className="text-white" />
                Facebook
              </button>
            </div>

          </div>
        </div>
      </div>
      {/* <div className="static h-screen flex   items-center sm:items-center  justify-center w-full z-50  bg-opacity-50">
        <div className=" w-full h-full md:h-fit overflow-y-auto  relative sm:w-[70vw]  md:w-[60vw] lg:w-[60vw] xl:w-[50vw] py-5 rounded-md shadow-2xl ">
          <div className="sm:pt-10 pt-0 px-6 sm:px-10">
            <div
              className=" 
            sm:gap-0 gap-2  sm:flex-row flex justify-between items-start sm:items-center flex-col-reverse "
            >
              <h2 className="text-[24px] sm:text-[30px] xl:text-[36px] font-normal">
                Registration
              </h2>
            </div>
            <p className="text-gray-600 mt-4 sm:mt-8 text-[16px] lg:text-[18px]  xl:text-[20px]">
              We will send you a code by SMS
            </p>
          </div>
          <form onSubmit={handleSubmit(OnSumbithandler)} className="sm:mt-8 mt-4 px-1">
            <div className="px-6 sm:px-10 flex flex-col gap-10">
              <input
                {...register('username')}
                type="text"
                required
                // name="username"
                // required
                // minLength="6"
                // value={input.username}
                placeholder="Enter Your Username"
                // onChange={handleInput}
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors.username?.message}</p>

              <input
                {...register('email')}
                required
                type="email"
                // name="email"
                // value={input.email}
                placeholder="Enter Your Email"
                // onChange={handleInput}
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors.email?.message}</p>
              <input
                {...register('password')}
                type="password"
                // value={input.password}
                placeholder="Enter Your Password"
                // onChange={handleInput}
                className="w-full px-4 py-3 sm:py-4 border  rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors.password?.message}</p>
            </div>
            <div className="w-full   flex flex-col gap-4 justify-center  mt-2  sm:static  absolute bottom-0 items-center py-2">
              <button
                type="submit"
                className="w-[80%] px-3 py-2 rounded-[8px] sm:text-[20px] text-[15px] bg-green-900 text-white "
              >
                {' '}
                {loading == true ? <CSpinner /> : 'Register'}
              </button>
              <button
                onClick={moveToLogin}
                type="button"
                className="w-[80%] px-3 py-2 rounded-[8px] sm:text-[20px] text-[15px]  bg-green-900 text-white "
              >
                {' '}
                Already Have An Account
              </button>
            </div>
          </form>
        </div>
      </div> */}
      {/* )} */}
    </>
  );
}

export default Register;
