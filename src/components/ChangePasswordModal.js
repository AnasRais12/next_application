'use client';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserQuery from "@/DbQuery/UserDetailQuery";
import { supabaseRole } from "@/lib/supabase";
import { yupResolver } from "@hookform/resolvers/yup";
import { RxCross2 } from "react-icons/rx";
import { GlobalDetails } from "@/context/globalprovider/globalProvider";
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

function ChangePassword({ setchangepasswordModal }) {
  const { user } = GlobalDetails()
  const { updateUserDetails } = UserQuery()

  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(passwordSchema) });
  const [loading, setLoading] = useState(false);
  const handleConfirmPassword = async (data) => {
    try {
      setLoading(true);
      const { currentPassword, newPassword, confirmPassword } = data;

      // Step 1: Verify Current Password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email,
        password: currentPassword,
      });

      if (signInError) {
        Swal.fire({ icon: "error", text: "Current Password is incorrect!" });
        return;
      }
      else {
        const { data: ChangePassword, error: updateError } = await supabaseRole.auth.updateUser({
          password: newPassword,
        });


        if (ChangePassword) {
          Swal.fire({ icon: "success", text: "Password changed successfully!" });
          setchangepasswordModal(false);
          console.log("asasasas", data)
        }
      }







    } catch (error) {
      Swal.fire({ icon: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center `}>
        <div className="max-w-md  w-[90%] p-6 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between px-2">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <button onClick={() => setchangepasswordModal(false)} className="text-xl font-bold mb-4 hover:text-[red]"><RxCross2 /></button>


          </div>
          <form onSubmit={handleSubmit(handleConfirmPassword)}>
            <div className="mb-3">
              <label>Current Password</label>
              <input
                type="password"
                {...register("currentPassword")}
                className="w-full border-2 border-[#ccc] focus:outline-orange-600   p-1 sm p-1:sm:p-2 rounded"
              />
              {errors.currentPassword && <p className="text-red-500">{errors.currentPassword.message}</p>}
            </div>

            <div className="mb-3">
              <label>New Password</label>
              <input
                type="password"
                {...register("newPassword")}
                className="w-full border-2 border-[#ccc] focus:outline-orange-600   p-1 sm:p-2 rounded"
              />
              {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
            </div>

            <div className="mb-3">
              <label>Confirm New Password</label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="w-full border-2 border-[#ccc] focus:outline-orange-600 p-1 sm:p-2 rounded"
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