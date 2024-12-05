'use client'
import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useRouter } from 'next/navigation'
import { UseAuth } from '@/context/userProvider/userProvider'
import Swal from 'sweetalert2';

function Forget_Account() {
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState("");
  const { User } = UseAuth()
  const code = Math.floor(100000 + Math.random() * 600000);
  const UserAuthentication = JSON.parse(User)
  const [input, setinput] = useState({ email: '' })



  const handleForgetInput = (e) => {
    const { name, value } = e.target
    setinput((prev) => ({
      ...prev, [name]: value
    }))
  }
  const handleForgetSumbit = async (e) => {
    e.preventDefault();
    try {
      if (input.email === '') {
        Swal.fire({
          icon: "warning",
          text: "Empty Field!",
        });
      }
      else if (UserAuthentication?.email === input.email) {
        setVerificationCode(code);
        // const templateParams = {
        //   to_email: UserAuthentication?.email,
        //   verification_code: code,
        //   name: UserAuthentication?.username,
        // };

        try {
          // await emailjs.send(
          //   "service_v8wzwz4",
          //   "template_k279uoq",
          //   // templateParams,
          //   "JzoH1q2wUKLPW0zyQ"
          // );
          router.push('/verify_code')
          Swal.fire({
            icon: "success",
            text: "Email Sent SucessFully",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            text: `Something Went Wrong${error}`,
          });
        }
      }

      else {
        Swal.fire({
          icon: "warning",
          text: "Email Does'nt Exist",
        });
      }

    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: `${error}`,
      });
    }
  };

  return (
    <div className="static h-screen flex   items-center sm:items-center  justify-center w-full z-50  bg-opacity-50">
      <div className=" w-full h-full  sm:max-h-fit relative sm:w-[70vw]  md:w-[60vw] lg:w-[60vw] xl:w-[50vw] py-5 rounded-md shadow-2xl ">
        <div className="sm:pt-10 pt-0 px-6 sm:px-10">
          <div
            className=" 
      sm:gap-0 gap-2  sm:flex-row flex justify-between items-start sm:items-center flex-col-reverse "
          >
            <h2 className="text-[24px] sm:text-[30px] xl:text-[36px] font-normal">
              Enter Your Email
            </h2>

          </div>
          <p className="text-gray-600 mt-4 sm:mt-8 text-[16px] lg:text-[18px]  xl:text-[20px]">
            We will send you a code by SMS
          </p>
        </div>
        <form onSubmit={handleForgetSumbit} className="sm:mt-8 mt-4 px-1">
          <div className="px-6 sm:px-10 flex flex-col gap-10">
            <input
              type="email"
              name="email"
              value={input.email}

              placeholder="Enter Your Email"
              onChange={handleForgetInput}
              className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>
          <div className="w-full flex justify-center  mt-8    items-center py-2 border-t-2">
            <div className="flex flex-col gap-3 w-[90%]">
              <button
                type="submit"
                className="w-full px-3 py-2 rounded-[8px] text-[20px] bg-green-900 text-white my-[10px]"
              >         Login
                {/* {loading == true ? <CSpinner color={"black"} /> : "Continue"} */}
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Forget_Account
