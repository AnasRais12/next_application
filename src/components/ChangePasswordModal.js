'use client';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const ChangePasswordValidation = yup.object().shape({
  oldpassoword: yup.string().min(8, 'Password must be at least 8 characters').required('Password is Required'),
    password:  yup.string().min(8, 'New Password must be at least 8 characters').required('Password is Required'),
    confirm: yup.string().min(8, ' Confirm Password must be at least 8 characters').required('Password is Required'),

}) 

function ChangePasswordModal({ setChangePasswordModal }) {
  const router = useRouter();
  const {register,handleSubmit,reset,formState:{errors}} =  useForm({resolver:yupResolver(ChangePasswordValidation)})
  const [userInfo, setUserInfo] = useState(null);
  const userToken = localStorage.getItem('User-Token');

  useEffect(() => {
    const User = localStorage.getItem('User');

    if (User) {
      setUserInfo(JSON.parse(User));
    }
  }, []);

  const MoveToForgetAccount = () => {
    router.push('/forget_account');
  };

  const handleChangingSumbit = (data) => {
   if (data.oldpassoword !== userInfo.password) {
      Swal.fire({
        icon: 'info',
        text: 'Wrong Password',
      });
    } else if (data.password !== data.confirm) {
      Swal.fire({
        icon: 'info',
        text: 'Passwords do not match!',
      });
    } else {
      Swal.fire({
        icon: 'success',
        text: 'Password Saved Successfully!',
      });
      reset()
      if (userInfo) {
        userInfo.password = data.confirm;
        localStorage.setItem('User', JSON.stringify(userInfo));
      }
      if (userToken) {
        router.push('/home');
        setChangePasswordModal(false);
      } else {
        router.push('/login');
      }
    }
  };

  return (
    <div>
      <div className="static h-screen flex   items-center sm:items-center  justify-center w-full z-50  bg-opacity-50">
        <div className=" w-full h-full sm:max-h-fit relative sm:w-[70vw]  md:w-[60vw] lg:w-[60vw] xl:w-[50vw] py-5 rounded-md shadow-2xl ">
          <div className="sm:pt-10 pt-0 px-6 sm:px-10">
            <div
              className=" 
            sm:gap-0 gap-2  sm:flex-row flex justify-between items-start sm:items-center flex-col-reverse "
            >
              <h2 className="text-[24px] sm:text-[30px] xl:text-[36px] font-normal">
                Change Password
              </h2>

              <button onClick={()=>setChangePasswordModal(false)} className='px-4 rounded-[10px] py-1 bg-red-300 text-[20px] '>
                    Close
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleChangingSumbit)} className="sm:mt-8 mt-4 px-1">
            <div className="px-6 sm:px-10 flex flex-col gap-10">
              <input
              {...register('oldpassoword')}
                type="password"
                placeholder="Enter Your Password"
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors?.oldpassoword?.message}</p>


              <input
              {...register('password')}
                type="password"
                placeholder="Enter Your New Password"
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors?.password?.message}</p>

              <input
              {...register('confirm')}
                type="password"
                name="confirm"
                placeholder="Enter Your Confirm Password"
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors?.confirm?.message}</p>
            </div>
            <div className="w-full flex justify-center  mt-8    items-center py-2 border-t-2">
              <div className="flex flex-col gap-3 w-[90%]">
                <button
                  type="submit"
                  className="w-full px-3 py-2 rounded-[8px] text-[20px] bg-green-900 text-white my-[10px]"
                >
                  {' '}
                  Change Password
                  {/* {loading == true ? <CSpinner color={"black"} /> : "Continue"} */}
                </button>
              </div>
            </div>
          </form>
          <div className="w-full justify-end gap-8 flex">
            <button
              onClick={MoveToForgetAccount}
              className="bg-green-600 px-4 py-1 text-white"
            >
              Forget Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
