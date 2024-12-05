'use client'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { UseAuth } from '@/context/userProvider/userProvider'
function page() {

    const [ChangePassword, setChangePassword] = useState({ password: '', confirm: '' })
    const { User } = UseAuth()
    let new_User = JSON.parse(User)



    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setChangePassword((prev) => ({ ...prev, [name]: value }))
    }

    const handleChangingSumbit = (e) => {
        e.preventDefault()
       if (ChangePassword.password || ChangePassword.confirm === "") {
            Swal.fire({
                icon: "info",
                text: "Password Does'nt Match",
            });
            }
          
          if(ChangePassword.password === ChangePassword.confirm){
            Swal.fire({
                icon: "success",
                text: "Password Changed",
            });
            if (new_User) {
                new_User.password = ChangePassword.confirm
                localStorage.setItem('User', JSON.stringify(new_User))
            }
           }
           else   {
            Swal.fire({
                icon: "warning",
                text: "?????????/",
            });
            }
     
    
      
    }
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
                        </div>
                    </div>
                    <form onSubmit={handleChangingSumbit} className="sm:mt-8 mt-4 px-1">
                        <div className="px-6 sm:px-10 flex flex-col gap-10">
                            <input
                                type="password"
                                name="password"
                                value={ChangePassword.password}
                                placeholder="Enter Your Password"
                                onChange={handleChangeInput}
                                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <input
                                type="password"
                                name="confirm"
                                value={ChangePassword.confirm}
                                placeholder="Enter Your Confirm Password"
                                onChange={handleChangeInput}
                                className="w-full px-4 py-3 sm:py-4 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div className="w-full flex justify-center  mt-8    items-center py-2 border-t-2">
                            <div className="flex flex-col gap-3 w-[90%]">
                                <button
                                    type="submit"
                                    className="w-full px-3 py-2 rounded-[8px] text-[20px] bg-green-900 text-white my-[10px]"
                                >         ChangePassword
                                    {/* {loading == true ? <CSpinner color={"black"} /> : "Continue"} */}
                                </button>

                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default page
