'use client';
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useRouter } from "next/navigation";

import { UseAuth } from "../../../context/userProvider/userProvider";
import Swal from "sweetalert2";
import { FaArrowLeftLong } from "react-icons/fa6";

function Register() {

    const { User } = UseAuth()
    const router = useRouter()
    const userAlreadyExist = JSON.parse(User)
    const [loading, setLoading] = useState(false);
    const [input, setinput] = useState({ username: '', email: '', password: '' })
   


    const handleInput = (e) => {
        const { name, value } = e.target
        setinput((prev) => ({
            ...prev, [name]: value
        }))
    }
    const handleSumbit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (input.email === '' || input.password === '' || input.username === '') {
            // console.log("Field is Required")
            Swal.fire({
                icon: "error",
                text: "Field is requried",
            });
        }
        else if (!User) {
            Swal.fire({
                icon: "success",
                text: "User Reigster Suceesfully",
            });
            localStorage.setItem('User', JSON.stringify(input))
            router.push('/login')


        }
        else {
            Swal.fire({
                icon: "info",
                text: `You 're  Already Register This is Your Username: ${userAlreadyExist?.username}`,
            });
            router.push('/login')

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
                                Registration
                            </h2>
                            <button
                                className="text-black text-[24px] sm:text-[24px] xl:text-[35px] font-normal"
                            // onClick={LoginScreenModal}
                            >
                                <ImCross className="hidden sm:block" />
                                <FaArrowLeftLong className="block sm:hidden" />
                            </button>
                        </div>
                        <p className="text-gray-600 mt-4 sm:mt-8 text-[16px] lg:text-[18px]  xl:text-[20px]">
                            We will send you a code by SMS
                        </p>
                    </div>
                    <form onSubmit={handleSumbit} className="sm:mt-8 mt-4 px-1">
                        <div className="px-6 sm:px-10 flex flex-col gap-10">
                            <input
                                type="text"
                                name="username"
                                required
                                minLength='6'
                                value={input.username}

                                placeholder="Enter Your Username"
                                onChange={handleInput}
                                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <input
                                type="text"
                                name="email"
                                value={input.email}

                                placeholder="Enter Your Email"
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
                        <div className="w-full flex justify-center  mt-8  sm:static  absolute bottom-20 items-center py-2 border-t-2">
                            <button
                                type="submit"
                                className="w-[80%] px-3 py-2 rounded-[8px] text-[20px] bg-green-900 text-white my-[10px]"
                            >   Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* )} */}
        </>
    );
}

export default Register
