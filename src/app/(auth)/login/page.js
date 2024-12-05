'use client';
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { UseAuth } from "@/context/userProvider/userProvider";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import CustomSpinner from "@/components/Spinner";

function Login() {
const createToken= uuidv4()
const router = useRouter()
const { User } = UseAuth()
const Validation = JSON.parse(User)

const generateToken = () => {
localStorage.setItem('User-Token', createToken)
}

  const [input, setinputs] = useState({
    username: '',
    password: '',
  })
  const handleInput = (e) => {
    const { name, value } = e.target
    setinputs((prev) => ({
      ...prev, [name]: value
    }))
  }
  const moveToRegister = (e) => {
    router.push('/register')
    
  }
  const moveToForgetAccount  = (e) => {
    router.push('/forget_account')
  }

const handleLoginSumbit = (e) => {
e.preventDefault()
if (input.username === '' || input.password === '') {
Swal.fire({
icon: "error",
text: " Fields must be required",
      });
    }
   else if (input.username === Validation?.username && input.password === Validation?.password) {

      Swal.fire({
        icon: "success",
        text: `User Login Sucessfully`,

      });
      generateToken()
      router.push('/dashboard')

    }
    else {
      Swal.fire({
        icon: "error",
        text: "Wrong Credentials",
      });

    }
  }

  return (
    <>
      <div className="static h-screen flex   items-center sm:items-center  justify-center w-full z-50  bg-opacity-50">
        <div className=" w-full h-full sm:max-h-fit relative sm:w-[70vw]  md:w-[60vw] lg:w-[60vw] xl:w-[50vw] py-5 rounded-md shadow-2xl ">
          <div className="sm:pt-10 pt-0 px-6 sm:px-10">
            <div
              className=" 
            sm:gap-0 gap-2  sm:flex-row flex justify-between items-start sm:items-center flex-col-reverse "
            >
              <h2 className="text-[24px] sm:text-[30px] xl:text-[36px] font-normal">
                Login
              </h2>
             
            </div>
            <p className="text-gray-600 mt-4 sm:mt-8 text-[16px] lg:text-[18px]  xl:text-[20px]">
              We will send you a code by SMS
            </p>
          </div>
          <form onSubmit={handleLoginSumbit} className="sm:mt-8 mt-4 px-1">
            <div className="px-6 sm:px-10 flex flex-col gap-10">
              <input
                type="text"
                name="username"
                value={input.username}

                placeholder="Enter Your Username"
                onChange={handleInput}
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="password"
                name="password"
                value={input.password}
                placeholder="Enter Your Password"
                onChange={handleInput}
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
          <div className="w-full justify-center flex">
          <div className="flex w-[80%] justify-between  items-center">
            <button onClick={moveToRegister}
              className="w-[40%] py-2 rounded-[8px]  px-10 text-[20px] bg-green-900 text-white my-[10px]"
            >         Did'nt Have an Account
            </button>
            <button onClick={moveToForgetAccount}
              className="w-[40%] py-2 rounded-[8px]  px-10 text-[20px] bg-green-900 text-white my-[10px]"
            >        Forgetten Account?
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

