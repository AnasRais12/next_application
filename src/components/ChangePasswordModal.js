'use client';
import React, { useEffect, useState } from "react";
import { getUser } from '@/lib/Auth';
import { useForm } from "react-hook-form";
import UserQuery from "@/DbQuery/UserQuery";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { BsFillCaretUpSquareFill } from "react-icons/bs";
const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup.string().min(8, "New password must be at least 8 characters").required("New password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function ChangePassword({setchangepasswordModal}) {
  const [user, setUser] = useState(null);
  const {speicifcUser,updateUserDetails} = UserQuery()
 console.log(
  speicifcUser,"from change password"
 );
 
  
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(passwordSchema) });
  const [loading, setLoading] = useState(false);
  const handleConfirmPassword = async (data) => {
    try {
      setLoading(true);
      const { currentPassword, newPassword, confirmPassword } = data;
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: speicifcUser?.email,
        password: currentPassword,
      });

      if (signInError) {
        Swal.fire({ icon: "error", text: "Current Password is incorrect!" });
        setLoading(false);
        return;
      }

      // Step 4: Update Password in Supabase
      const {data:UpdateUser, error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if(UpdateUser){
        const updatedFields = { password: newPassword };
        await updateUserDetails(updatedFields);
        Swal.fire({ icon: "success", text: "Password changed successfully!" });
      }
      if (updateError) {
        Swal.fire({ icon: "error", text: updateError.message });
      } 
    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };
  const handleNameChange = async () => {
    if (newName) {
      const updatedFields = { username: newName };
      await updateUserDetails(updatedFields);
      setChangeNameModal(false)
    } else {
      console.log("Name is unchanged or invalid.");
    }
  };

  return (
    <>
    <div
    className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center `}>
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between px-2">
    <h2 className="text-xl font-bold mb-4">Change Password</h2>
    <h2 onClick={() => setchangepasswordModal(false)} className="text-xl font-bold mb-4">X</h2>

   
    </div>
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
  </div>
  </>
  )
}

export default ChangePassword