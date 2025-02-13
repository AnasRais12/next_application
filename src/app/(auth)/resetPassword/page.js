'use client';
import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useRouter } from 'next/navigation';
import { RxCross2 } from "react-icons/rx";
import { ImCross } from 'react-icons/im';
import UserQuery from '@/DbQuery/UserQuery';
import { supabase } from '@/lib/supabase';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { FaArrowLeftLong } from 'react-icons/fa6';
import CSpinner from '@/components/CSpinner';

import Swal from 'sweetalert2';
const forgetAccountValidation = yup.object().shape({
  resetpassword: yup.string().min(8, 'Password must be at least 8 characters').required('Password is Required')

})

function Forget_Account() {
  const router = useRouter();
  const { updateUserDetails, } = UserQuery();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(forgetAccountValidation) })
  const [loading, setLoading] = useState(false);

  const moveToLogin = () => {
    router.push('/login');
  };

  const handleResetPassword = async (data) => {
    try {
      setLoading(true)
      const { resetpassword } = data
      const { error } = await supabase.auth.updateUser({
        password: resetpassword,
      });
      if (error) {
        Swal.fire({ icon: "error", text: error.message });
      } else {
        const updatedFields = { password: resetpassword };
        await updateUserDetails(updatedFields);
        Swal.fire({ icon: "success", text: "Password reset successfully!" });
        router.push('/login')
      }
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
    }
    finally {
      setLoading(false)
    }
  };


  return (

    <div className="fixed bg-custom-gradient inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 border-2 rounded-2xl shadow-lg sm:w-[70%] lg:w-[40vw] w-full sm:mx-0 mx-2  relative">
        {/* Logo */}
        <div
          className=" 
      sm:gap-0 gap-2  sm:flex-row flex justify-between items-start sm:items-center flex-col-reverse "
        >
          <h2 className="text-[24px]  font-normal">
            Change Password
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
          <form onSubmit={handleSubmit(handleResetPassword)} className="mt-3 ">
            <div className="  flex flex-col gap-2">
              <input
                {...register('resetpassword')}
                type="password"
                placeholder="Change Password"
                className="w-full px-4 py-3 sm:py-4 border-2 border-[#ccc] rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors?.resetpassword?.message}</p>
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
