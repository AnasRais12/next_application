'use client'
import Swal from "sweetalert2";
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import CSpinner from "@/components/CSpinner";

import { useState } from "react";
const ForgotPassword = () => {
    const router = useRouter()
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(false);


  const handleForgotPassword = async () => {
  try {
    setloading(true)
      if (!email) {
        Swal.fire({ icon: "error", text: "Please enter your email!" });
        return;
      }
  
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/resetPassword", // Yahan reset page ka URL daalna hoga
      });
  
      if (error) {
        Swal.fire({ icon: "error", text: error.message });
      } else {
        Swal.fire({
          icon: "success",
          text: "We’ve sent a password reset link to your email. Please check your inbox and follow the link to set a new password!"

        });
        router.push('/login')
    
      }
  } catch (error) {
    Swal.fire({ icon: "error", text: error.message });
    
  }
  finally{
    setloading(false)
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
              <h2>Enter Your Email to Receive a Password Reset Link</h2>
              <button
                className="text-black text-[24px] sm:text-[24px] xl:text-[25px] font-normal"
                onClick={()=> router.push('login')}
              >
                <RxCross2 className="hidden hover:text-[red] sm:block" />
                <FaArrowLeftLong className="block sm:hidden" />
              </button>
            </div>
    <div>
      <input
        type="email"
        placeholder="Enter your email"
          className="w-full p-3 border-2 border-[#ccc] rounded-lg bg-white mt-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
         <button onClick={handleForgotPassword}
                disabled={loading}
                className="w-full bg-black text-white p-3 rounded-lg mt-4 hover:bg-unique">
                {loading ? (
                  <CSpinner />
                ) : (
                  "Reset Password")}
              </button>
    </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
//    <div className="mt-4">
//             <form onSubmit={handleSubmit(handleLoginSumbit)}>
//               <input
//                 {...register('email')}
//                 type="email"
//                 placeholder="Enter Email "
//                 className="w-full p-3 border-2 border-[#ccc] rounded-[10px]   bg-white b focus:outline-none focus:ring-2 focus:ring-orange-400"
//               />
//               <input
//                 {...register('password')}
//                 type="password"
//                 placeholder="Password"
//                 className="w-full p-3 border-2 border-[#ccc] rounded-lg bg-white mt-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
//               />
//               <div className="text-right text-sm text-unique mt-3 cursor-pointer">
//                 <p onClick={moveToForgetAccount}>Forgot password?</p>
//               </div>

//               <button type="submit"
//                 disabled={credentialLoading}
//                 className="w-full bg-black text-white p-3 rounded-lg mt-4 hover:bg-unique">
//                 {credentialLoading ? (
//                   <CSpinner />
//                 ) : (
//                   "Login In")}
//               </button>
//             </form>

//           </div>