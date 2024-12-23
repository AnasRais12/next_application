'use client';
import React, {  useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
function Login() {
  const LoginSchema = yup.object().shape({
    username: yup.string().matches(/^[A-Za-z]{3,20}$/, 'Username must contain only letters (3-20 characters) without spaces or numbers').required('Username is Required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is Required')
  })

  const {register,handleSubmit,formState:{errors},reset} = useForm({
    resolver:yupResolver(LoginSchema)
  })
  const [storedUser, setstoredUser] = useState(null);
  const createToken = uuidv4();
  const router = useRouter();
  useEffect(() => {
    const User = localStorage.getItem('User');
    if (User) {
      setstoredUser(JSON.parse(User));
    }
  }, []);

  const generateToken = () => {
    localStorage.setItem('User-Token', createToken);
  };
  const moveToRegister = (e) => {
    router.push('/register');
  };
  const moveToForgetAccount = (e) => {
    router.push('/forget_account');
  };
  const handleLoginSumbit = async (data) => {
    if (!storedUser) {
      Swal.fire({
        icon: 'error',
        text: ' No user found, please register first!',
      });
    }
    const response = await signIn('credentials',{
      redirect: false,  
      username,
      password
    })
    if(response?.error){
      Swal.fire({
        icon: 'error',
        text: response.error,
      });
      reset()
    }
      else{
        Swal.fire({
          icon: 'success',
          text: `User Login Sucessfully`,
        });
        generateToken();
        router.push('/dashboard');
        reset()
      }

    // else if (
    //   data.username !== storedUser?.username ||
    //   data.password !== storedUser?.password
    // ) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: 'Wrong Credentials',
    //   });
    //   reset()
    // } else {
    //   Swal.fire({
    //     icon: 'success',
    //     text: `User Login Sucessfully`,
    //   });
    //   generateToken();
    //   router.push('/dashboard');
    //   reset()
    // }
  };

  return (
    <>
      <div className="static h-screen flex   items-center sm:items-center  justify-center w-full z-50  bg-opacity-50">
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
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors?.username?.message}</p>
              <input
              {...register('password')}
                type="password"
                placeholder="Enter Your Password"
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors?.password?.message}</p>
            </div>
            <div className="w-full flex justify-center  mt-8    items-center py-2 border-t-2">
              <div className="flex flex-col gap-3 w-[90%]">
                <button
                  type="submit"
                  className="w-full px-3 py-2 rounded-[8px] text-[20px] bg-green-900 text-white my-[10px]"
                >
                  {' '}
                  Login
                </button>
              </div>
            </div>
          </form>
          <div className="w-full justify-center flex">
            <div className="flex w-[80%] justify-between  items-center">
              <button
                onClick={moveToRegister}
                className="w-[40%] py-2 rounded-[8px]  px-10 text-[20px] bg-green-900 text-white my-[10px]"
              >
                {' '}
                Did'nt Have an Account
              </button>
              <button
                onClick={moveToForgetAccount}
                className="w-[40%] py-2 rounded-[8px]  px-10 text-[20px] bg-green-900 text-white my-[10px]"
              >
                {' '}
                Forgetten Account?
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
