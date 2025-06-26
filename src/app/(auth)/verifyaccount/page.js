'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
function page() {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const storedData = localStorage.getItem('AuthFieldVerifyPage');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserInfo(parsedData);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }
  }, []);

  return (
    <div className=" h-screen  inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-blue-50 to-purple-50">
    <div className="w-full max-w-lg  bg-white rounded-2xl overflow-hidden shadow-2xl mx-2 sm:mx-4">
      {/* Header with Gradient Background */}
      <div className="bg-primary p-6 text-center">
        {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.981l7.5-4.039a2.25 2.25 0 012.134 0l7.5 4.039a2.25 2.25 0 011.183 1.98V19.5z"
            />
          </svg>
        </div> */}
        <h1 className="text-2xl font-bold text-white ">Verify Your Email</h1>
      </div>
  
      {/* Content Area */}
      <div className="sm:p-8 p-4">
        <div className="text-center mb-6">
          <p className="text-lg text-gray-600 mb-4">
            Hello <span className="font-semibold text-gray-800">{userInfo?.username}</span>,
            we've sent a verification link to:
          </p>
          <p className="text-lg font-medium text-primary bg-purple-50 rounded-lg py-2 px-4 inline-block">
            {userInfo?.email}
          </p>
        </div>
  
        {/* Visual Email Graphic */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-blue-100 opacity-30"></div>
          </div>
          <div className="relative flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-16 h-16 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
        </div>
  
        <div className="space-y-4 text-center">
          <p className="text-gray-600">
            Click the link in the email to verify your account.
            <br />
            Haven't received it? Check your spam folder.
          </p>
  
          <div className="pt-4 space-y-3">
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:shadow-md transition-all"
            >
              Back to Sign In
            </button>
  
            {/* <button
              // onClick={handleResendEmail}
              className="text-sm text-purple-600 hover:text-purple-800 font-medium underline underline-offset-2 transition-colors"
            >
              Resend Verification Email
            </button> */}
          </div>
        </div>
      </div>
  
    
    </div>
  </div>
  );
}

export default page;

// import React from 'react';
// import { useState } from 'react';
// import { ImCross } from 'react-icons/im';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup'
// import Swal from 'sweetalert2';
// import { useForm } from 'react-hook-form';
// import { FaArrowLeftLong } from 'react-icons/fa6';
// import { useRouter } from 'next/navigation';

// const Verifyschema = yup.object().shape({
//   verify: yup.string().min(6, '6 Characters are required').max(6, 'Maximum 6 Character Allowed').required()
// })
// function page() {
//   const router = useRouter();
//   const { register, handleSubmit, formState: { errors }, reset } = useForm({
//     resolver: yupResolver(Verifyschema)
//   })
//   const userInfo = JSON.parse(localStorage.getItem('User'));
//   const UserToken = localStorage.getItem('User-Token');

//   const moveToforgetAccount = () => {
//     router.push('/register');
//   };
//   const handleVerifySumbit = (data) => {
//     if (data.verify == userInfo?.verificationCode) {
//       Swal.fire({
//         icon: 'success',
//         text: 'Verification Successful!',
//       });
//       userInfo.isVerified = true;
//       localStorage.setItem('User', JSON.stringify(userInfo));
//       if (UserToken) {
//         router.push('/home');
//       } else {
//         router.push('/login');a
//       }
//     } else {
//       Swal.fire({
//         icon: 'error',
//         text: 'Invalid verification code.',
//       });
//     }
//   };

//   return (
//     <div className="static h-screen flex   items-center sm:items-center  justify-center w-full z-50  bg-opacity-50">
//       <div className=" w-full h-full sm:max-h-fit relative sm:w-[70vw]  md:w-[60vw] lg:w-[60vw] xl:w-[50vw] py-5 rounded-md shadow-2xl ">
//         <div className="sm:pt-10 pt-0 px-6 sm:px-10">
//           <div
//             className="
//             sm:gap-0 gap-2  sm:flex-row flex justify-between items-start sm:items-center flex-col-reverse "
//           >
//             <h2 className="text-[24px] sm:text-[30px] xl:text-[36px] font-normal">
//               Verification
//             </h2>
//             <button
//               className="text-black text-[24px] sm:text-[24px] xl:text-[35px] font-normal"
//               onClick={moveToforgetAccount}
//             >
//               <ImCross className="hidden sm:block" />
//               <FaArrowLeftLong className="block sm:hidden" />
//             </button>
//           </div>
//           <p className="text-gray-600 mt-4 sm:mt-8 text-[16px] lg:text-[18px]  xl:text-[20px]">
//             Please Enter Your Verification Code
//           </p>
//         </div>
//         <form onSubmit={handleSubmit(handleVerifySumbit)} className="sm:mt-8 mt-4 px-1">
//           <div className="px-6 sm:px-10 flex flex-col gap-10">
//             <input
//               {...register('verify')}
//               type="password"
//               placeholder="Enter Your Verification Code"
//               className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//             <p>{errors?.verify?.message}</p>
//           </div>
//           <div className="w-full flex justify-center  mt-8    items-center py-2 border-t-2">
//             <div className="flex flex-col gap-3 w-[90%]">
//               <button
//                 type="submit"
//                 className="w-full px-3 py-2 rounded-[8px] text-[20px] bg-green-900 text-white my-[10px]"
//               >
//                 {' '}
//                 Verification Code
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// // export default page;
