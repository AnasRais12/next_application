'use client';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
function page() {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter()
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
    <div className="flex items-center justify-center h-screen bg-custom-gradient ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[90%] sm:w-96 text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-purple-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 12.75v4.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25v-4.5m19.5 0V9.75m0 3l-9-6.75m9 6.75L12 19.5m9-9.75L12 4.5m0 15L2.25 12.75M12 19.5l9-6.75M12 4.5L3 11.25m0 3.75v4.5a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25v-4.5"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-semibold mb-2">Verify your email address</h1>
        <p className="text-1xl font-semibold text-gray-600 mb-2"> Hello <span className='text-black'>{userInfo?.username}</span>.</p>
        <p className="text-gray-600 mb-6">
          We have sent a verification link to <strong className='text-black'>{userInfo?.email}</strong>.
          <br />Click on the link to complete the verification process.
          <br />You might need to check your spam folder.
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={()=> router.push('/login')} className="bg-purple-600 w-full text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700">
            Sign In
          </button>
          
        </div>
       
      </div>
    </div>
  );
}


 
export default page



























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
