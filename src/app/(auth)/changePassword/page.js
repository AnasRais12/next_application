'use client';
import React, { useEffect, useState } from "react";
import { getUser } from '@/lib/Auth';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup.string().min(8, "New password must be at least 8 characters").required("New password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function page() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      const data = await getUser();
      setUser(data);
      console.log(data, "______");
    }

    fetchUser();
  }, []);
  
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(passwordSchema) });
  const [loading, setLoading] = useState(false);
  const handleConfirmPassword = async (data) => {
    try {
      setLoading(true);
      const { currentPassword, newPassword, confirmPassword } = data;

      // Step 2: Get current user
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        Swal.fire({ icon: "error", text: "User not found!" });
        setLoading(false);
        return;
      }

      // Step 3: Verify Current Password by signing in again
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.user.email,
        password: currentPassword,
      });

      if (signInError) {
        Swal.fire({ icon: "error", text: "Current Password is incorrect!" });
        setLoading(false);
        return;
      }

      // Step 4: Update Password in Supabase
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        Swal.fire({ icon: "error", text: updateError.message });
      } else {
        Swal.fire({ icon: "success", text: "Password changed successfully!" });
        router.push('/login');
      }
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-xl font-bold mb-4">Change Password</h2>

    <form onSubmit={handleSubmit(handleConfirmPassword)}>
      <div className="mb-3">
        <label>Current Password</label>
        <input
          type="password"
          {...register("currentPassword")}
          className="w-full border p-2 rounded"
        />
        {errors.currentPassword && <p className="text-red-500">{errors.currentPassword.message}</p>}
      </div>

      <div className="mb-3">
        <label>New Password</label>
        <input
          type="password"
          {...register("newPassword")}
          className="w-full border p-2 rounded"
        />
        {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
      </div>

      <div className="mb-3">
        <label>Confirm New Password</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full border p-2 rounded"
        />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full px-3 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        {loading ? "Updating..." : "Change Password"}
      </button>
    </form>
  </div>
  )
}

export default page
























// import React, { useEffect, useState } from 'react';
// import Swal from 'sweetalert2';
// import * as yup from 'yup'
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup'
// import { useRouter } from 'next/navigation';
// const changePasswordRouteValidation = yup.object().shape({
//      password:  yup.string().min(8, 'New Password must be at least 8 characters').required('Password is Required'),
//      confirm: yup.string().min(8, ' Confirm Password must be at least 8 characters').required('Password is Required'),
// })
// function page() {
//   const router = useRouter();
//   const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(changePasswordRouteValidation) })
//   const [Password, NewPassword] = useState(null);
//   const userToken = localStorage.getItem('User-Token');

//   useEffect(() => {
//     const User = localStorage.getItem('User');

//     if (User) {
//       NewPassword(JSON.parse(User));
//     }
//   }, []);

//   const handleChangingSumbit = (data) => {
//      if (data.password !== data.confirm) {
//       Swal.fire({
//         icon: 'info',
//         text: 'Passwords do not match!',
//       });
//       reset()
//     } else {
//       // Success case: passwords match and fields are not empty
//       Swal.fire({
//         icon: 'success',
//         text: 'Password Saved Successfully!',
//       });
//       if (Password) {
//         Password.password = data.confirm;
//         localStorage.setItem('User', JSON.stringify(Password));
//       }
//       if (userToken) {
//         router.push('/home');
//       } else {
//         router.push('/login');
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="static h-screen flex   items-center sm:items-center  justify-center w-full z-50  bg-opacity-50">
//         <div className=" w-full h-full sm:max-h-fit relative sm:w-[70vw]  md:w-[60vw] lg:w-[60vw] xl:w-[50vw] py-5 rounded-md shadow-2xl ">
//           <div className="sm:pt-10 pt-0 px-6 sm:px-10">
//             <div
//               className=" 
//             sm:gap-0 gap-2  sm:flex-row flex justify-between items-start sm:items-center flex-col-reverse "
//             >
//               <h2 className="text-[24px] sm:text-[30px] xl:text-[36px] font-normal">
//                 Change Password
//               </h2>
//             </div>
//           </div>
//           <form onSubmit={handleSubmit(handleChangingSumbit)} className="sm:mt-8 mt-4 px-1">
//             <div className="px-6 sm:px-10 flex flex-col gap-10">
//               <input
//               {...register('password')}
//                 type="password"
//                 name="password"
//                 placeholder="Enter Your Password"
//                 className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <p>{errors?.password?.message}</p>
//               <input
//               {...register('confirm')}
//                 type="password"
//                 name="confirm"
//                 placeholder="Enter Your Confirm Password"
//                 className="w-full px-4 py-3 sm:py-4 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <p>{errors?.confirm?.message}</p>

//             </div>
//             <div className="w-full flex justify-center  mt-8    items-center py-2 border-t-2">
//               <div className="flex flex-col gap-3 w-[90%]">
//                 <button
//                   type="submit"
//                   className="w-full px-3 py-2 rounded-[8px] text-[20px] bg-green-900 text-white my-[10px]"
//                 >
//                   {' '}
//                   Change Password
//                   {/* {loading == true ? <CSpinner color={"black"} /> : "Continue"} */}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default page;
