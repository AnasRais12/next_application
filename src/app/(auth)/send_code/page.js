'use client';
import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
function page() {
  const router = useRouter();
  const [verifyCode, setverifyCode] = useState('');
  const UserCode = localStorage.getItem('Send-Code');
  const handleVerifySumbit = (e) => {
    e.preventDefault();
    if (!verifyCode) {
      Swal.fire({
        icon: 'error',
        text: 'Empty Fields',
      });
    }
    if (verifyCode == UserCode) {
      Swal.fire({
        icon: 'success',
        text: 'Verification Successful!',
      });
      localStorage.removeItem('Send-Code');
      router.push('/changePassword');
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Invalid verification code.',
      });
    }
  };

  return (
    <div className="static h-screen flex   items-center sm:items-center  justify-center w-full z-50  bg-opacity-50">
      <div className=" w-full h-full sm:max-h-fit relative sm:w-[70vw]  md:w-[60vw] lg:w-[60vw] xl:w-[50vw] py-5 rounded-md shadow-2xl ">
        <div className="sm:pt-10 pt-0 px-6 sm:px-10">
          <div
            className=" 
            sm:gap-0 gap-2  sm:flex-row flex justify-between items-start sm:items-center flex-col-reverse "
          >
            <h2 className="text-[24px] sm:text-[30px] xl:text-[36px] font-normal">
              Verification
            </h2>
          </div>
          <p className="text-gray-600 mt-4 sm:mt-8 text-[16px] lg:text-[18px]  xl:text-[20px]">
            Please Enter Your Verification Code
          </p>
        </div>
        <form onSubmit={handleVerifySumbit} className="sm:mt-8 mt-4 px-1">
          <div className="px-6 sm:px-10 flex flex-col gap-10">
            <input
              type="password"
              name="password"
              required
              min={6}
              max={6}
              onChange={(e) => setverifyCode(e.target.value)}
              placeholder="Enter Your Password"
              className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="w-full flex justify-center  mt-8    items-center py-2 border-t-2">
            <div className="flex flex-col gap-3 w-[90%]">
              <button
                type="submit"
                className="w-full px-3 py-2 rounded-[8px] text-[20px] bg-green-900 text-white my-[10px]"
              >
                {' '}
                Verification Code
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
