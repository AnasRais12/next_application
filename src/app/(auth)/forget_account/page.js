'use client';
import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useRouter } from 'next/navigation';
import { RxCross2 } from "react-icons/rx";
import { ImCross } from 'react-icons/im';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { FaArrowLeftLong } from 'react-icons/fa6';
import CSpinner from '@/components/CSpinner';

import Swal from 'sweetalert2';
const forgetAccountValidation = yup.object().shape({
  emailValidation: yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    ).required(),
})

function Forget_Account() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(forgetAccountValidation) })
  const [UserAuthentication, setUserAuthentication] = useState(null);
  const [loading, setLoading] = useState(false);

  const Code = Math.floor(100000 + Math.random() * 600000);

  useEffect(() => {
    const User = localStorage.getItem('User');
    setUserAuthentication(JSON.parse(User));
  }, []);

  const moveToLogin = () => {
    router.push('/login');
  };
  const handleValidationSumbit = async (data) => {
    setLoading(true);
    try {
       if (data?.emailValidation !== UserAuthentication?.email) {
        Swal.fire({
          icon: 'warning',
          text: "Email Does'nt Exist",
        });
      } else {
        const templateParams = {
          to_email: UserAuthentication?.email,
          verification_code: Code,
          name: UserAuthentication?.username,
        };

        try {
          await emailjs.send(
            'service_v8wzwz4',
            'template_k279uoq',
            templateParams,
            'JzoH1q2wUKLPW0zyQ'
          );
          Swal.fire({
            icon: 'success',
            text: 'Email Sent SucessFully',
          });
          localStorage.setItem('Send-Code', Code);
          router.push('/send_code');
        } catch (error) {
          Swal.fire({
            icon: 'error',
            text: `Something Went Wrong${error}`,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        text: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="static h-screen flex bg-custom-gradient   items-center sm:items-center  justify-center w-full z-50  bg-opacity-50">
    //   <div className=" w-full h-full bg-white  sm:max-h-fit relative sm:w-[70vw]  md:w-[60vw] lg:w-[60vw] xl:w-[50vw] py-5 rounded-md shadow-2xl ">
    //     <div className="sm:pt-10 pt-0 px-6 sm:px-10">
    //       <div
    //         className=" 
    //   sm:gap-0 gap-2  sm:flex-row flex justify-between items-start sm:items-center flex-col-reverse "
    //       >
    //         <h2 className="text-[24px] sm:text-[30px] xl:text-[36px] font-normal">
    //           Enter Your Email
    //         </h2>
    //         <button
    //           className="text-black text-[24px] sm:text-[24px] xl:text-[35px] font-normal"
    //           onClick={moveToLogin}
    //         >
    //           <ImCross className="hidden sm:block" />
    //           <FaArrowLeftLong className="block sm:hidden" />
    //         </button>
    //       </div>
    //       <p className="text-gray-600 mt-4 sm:mt-8 text-[16px] lg:text-[18px]  xl:text-[20px]">
    //         We will send you a code by Email
    //       </p>
    //     </div>
    //     <form onSubmit={handleSubmit(handleValidationSumbit)} className="sm:mt-8 mt-4 px-1">
    //       <div className="px-6 sm:px-10 flex flex-col gap-10">
    //         <input
    //         {...register('emailValidation')}
    //           type="email"
    //           placeholder="Enter Your Email"
    //           className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
    //         />
    //         <p>{errors?.emailValidation?.message}</p>
    //       </div>
    //       <div className="w-full flex justify-center  mt-8    items-center py-2 border-t-2">
    //         <div className="flex flex-col gap-3 w-[90%]">
    //           <button
    //             type="submit"
    //             className="w-full px-3 py-2 rounded-[8px] text-[20px] bg-green-900 text-white my-[10px]"
    //           >
    //             {' '}
    //             {loading == true ? <CSpinner color={'black'} /> : 'Continue'}
    //           </button>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </div>
      <div className="fixed bg-custom-gradient inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 border-2 rounded-2xl shadow-lg sm:w-[70%] lg:w-[40vw] w-full sm:mx-0 mx-2  relative">
              {/* Logo */}
              <div
            className=" 
      sm:gap-0 gap-2  sm:flex-row flex justify-between items-start sm:items-center flex-col-reverse "
          >
            <h2 className="text-[24px]  font-normal">
              Enter Your Email
            </h2>
            <button
              className="text-black text-[24px] sm:text-[24px] xl:text-[25px] font-normal"
              onClick={moveToLogin}
            >
              <RxCross2 className="hidden hover:text-[red] sm:block" />
              <FaArrowLeftLong className="block sm:hidden" />
            </button>
          </div>
    
              {/* Login Form */}
    
              <div className="">
              <form onSubmit={handleSubmit(handleValidationSumbit)} className="mt-3 ">
         <div className="  flex flex-col gap-2">
            <input
            {...register('emailValidation')}
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-4 py-3 sm:py-4 border-2 border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <p>{errors?.emailValidation?.message}</p>
          </div>
          <div className="w-full flex justify-center  mt-2    items-center ">
            <div className="flex flex-col gap-3 w-full">
              <button
                type="submit"
                className="w-full px-3 py-2 rounded-[8px] text-[20px] bg-black text-white "
              >
                {' '}
                {loading == true ? <CSpinner color={'black'} /> : 'Continue'}
              </button>
            </div>
          </div>
        </form>
    
              </div>
            </div>
          </div>
  );
}

export default Forget_Account;
