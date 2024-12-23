'use client';
import React, { useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaArrowLeftLong } from 'react-icons/fa6';
import CSpinner from '@/components/CSpinner';
const schema = yup.object().shape({
  username: yup.string().matches(/^[A-Za-z]{6,20}$/, 'Username must contain only letters (6-20 characters) without spaces or numbers').required('Username is Required'),
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
  const [loading, setLoading] = useState(false);
  const [storedRegister, setstoredRegister] = useState(null);
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  const [input, setinput] = useState({ username: '', email: '', password: '' });
  const registerUser = localStorage.getItem('User');

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

  const moveToLogin = () => {
    router.push('/login');
  };
  const OnSumbithandler = async (data) => {
    setLoading(true);
    if (!storedRegister) {
      const templateParams = {
        to_email: data?.email,
        verification_code: verificationCode,
        name: data?.username,
      };
      try {
        await emailjs.send(
          'service_v8wzwz4',
          'template_k279uoq',
          templateParams,
          'JzoH1q2wUKLPW0zyQ'
        );
        const userData = { ...data, verificationCode, isVerified: false };
        localStorage.setItem('User', JSON.stringify(userData));
        router.push('/verify_code');
        Swal.fire({
          icon: 'success',
          text: 'User Register Sucessfully',
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: `Something Went Wrong${error}`,
        });
      } finally {
        setLoading(false);
        console.log(data, 'this data is ')
        reset()
      }
    } else {
      Swal.fire({
        icon: 'info',
        text: `You 're  Already Register This is Your Username: ${storedRegister?.username}`,
      });
      router.push('/login');
    }
  };

  return (
    <>
      <div className="static h-screen flex   items-center sm:items-center  justify-center w-full z-50  bg-opacity-50">
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
      </div>
      {/* )} */}
    </>
  );
}

export default Register;
