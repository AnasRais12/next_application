'use client'
import React, { useEffect, useState } from "react";
import ChangePassword from "@/components/ChangePasswordModal";
import { FaEdit } from "react-icons/fa";
import UserQuery from "@/DbQuery/UserDetailQuery";
import { GlobalDetails } from "@/context/globalprovider/globalProvider";
import CustomSpinner from "@/components/Spinner";
import AddressForm from "@/components/LibaryComponent/FlowbiteComponent/Addresses";
import UserSideBar from "./UserSideBar";
import OrderHistory from "../OrderHistory";
import { supabase, supabaseRole } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import AddressUpdate from "../../MaterialUi Compomnent/AddressUpdate";
import { RxCross2 } from "react-icons/rx";
import { GoArrowLeft } from "react-icons/go";
const UserSetting = ({ userAddressLoading, userAddressInfo, }) => {
    const { userDetails, } = UserQuery();
    const [orderHistory, setOrderHistory] = useState(false);
    const { user,settingModal,setSettingModal } = GlobalDetails()
    const router = useRouter()
    const [changepasswordModal, setchangepasswordModal] = useState(false);
    const [isAddressExist, setIsAddressExist] = useState(false);
    const [isEditing, setIsEditing] = useState(false);  // Editing mode track karega

    const handleEditClick = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        if (!userDetails) {
            setIsAddressExist(false)
        }
        else {
            setIsAddressExist(true)
        }
    }, [userDetails])

    if (userAddressLoading) {
        return <CustomSpinner />
    }
    if (settingModal) {
        return <OrderHistory />
    }

    return (
        <>
            <div className="lg:flex-row flex-col h-fit  py-10  flex lg:gap-0 lg:px-0 md:px-5 px-3 lg:mt-0 mt-12 bg-gray-50">
                {isEditing ? <AddressUpdate setIsEditing={setIsEditing} userDetails={userDetails} /> : ''}
                {changepasswordModal ? <ChangePassword setchangepasswordModal={setchangepasswordModal} /> : ''}
                <UserSideBar setchangepasswordModal={setchangepasswordModal} setSettingModal={setSettingModal}  />
                <main className="flex flex-col w-full  items-start   lg:mt-10  lg:px-3 lg:py-6">
                    <div className="flex sm:flex-row flex-col-reverse sm:gap-0 gap-1 justify-between items-start w-full pr-6 ">
                        <div>
                            <h1 className="text-xl font-semibold mb-2  text-gray-800">Peronal Information</h1>
                            <p className="text-gray-600 mb-6">Manage your personal information, including phone numbers and email address.</p>
                        </div>
                        <button onClick={() => router.push('/home')} className="text-[25px] hover:text-[red] hidden sm:block">
                            <RxCross2 />
                        </button>
                        {/* ⬅️ Arrow icon (sm screens par dikhega) */}
                        <button onClick={() => router.push('/home')} className="text-[25px] hover:text-[red] block sm:hidden">
                            <GoArrowLeft />
                        </button>

                    </div>
                    {/*  user Details*/}
                    {isAddressExist ?
                        <>
                            <div className="grid grid-cols-1 mb-4 place-content-center items-center w-full pt-4 lg:grid-cols-2 gap-6">
                                <div className="  flex  flex-col gap-1 bg-white px-2  py-2 rounded-lg shadow-lg border-l-4 border-2 border-[#ccc]  ">
                                    <h2 className="font-semibold  text-gray-700">Email:</h2>
                                    <p className="text-gray-900  ">{user?.email}</p>


                                </div>
                                <div className="flex px-3 sm:px-5 py-2 bg-white rounded-lg shadow-lg border-2 border-l-4 border-[#ccc] justify-between  ">
                                    <div className="  flex  flex-col gap-1 ">
                                        <h2 className="font-semibold text-gray-700">Name: </h2>
                                        <p className="text-gray-900">{user?.user_metadata?.full_name || userDetails?.full_name}</p>

                                    </div>
                                    {user ? <FaEdit onClick={handleEditClick} className="sm:text-[25px] text-[20px]  text-green-500" /> : ''}
                                </div>


                                <div className="flex px-3 sm:px-5 py-2 bg-white rounded-lg shadow-lg border-l-4 border-2 border-[#ccc]  justify-between  ">
                                    <div className="  flex  flex-col gap-1 ">
                                        <h2 className="font-semibold text-gray-700">Phone</h2>
                                        <p className="text-black">{user?.user_metadata?.phone_number || userDetails?.phone_number || 'Not Set'}</p>

                                    </div>
                                    {user ? <FaEdit onClick={handleEditClick} className="sm:text-[25px] text-[20px]  text-green-500" /> : ''}

                                </div>
                                <div className="flex  px-5 py-2 bg-white rounded-lg shadow-lg border-l-4 border-2 border-[#ccc] justify-between  ">
                                    <div className="  flex  flex-col gap-1 ">
                                        <h2 className="font-semibold whitespace-normal text-gray-700">Address</h2>
                                        <p className="text-gray-500">{userDetails?.address}</p>
                                    </div>
                                    {user ? <FaEdit onClick={handleEditClick} className="sm:text-[25px] text-[20px]  text-green-500" /> : ''}

                                </div>
                                <div className="flex  px-5 py-2 bg-white rounded-lg shadow-lg border-l-4 border-2 border-[#ccc] justify-between  ">
                                    <div className="  flex  flex-col gap-1 ">
                                        <h2 className="font-semibold whitespace-normal text-gray-700">Country</h2>
                                        <p className="text-black">{userDetails?.country}</p>
                                    </div>
                                    {user ? <FaEdit onClick={handleEditClick} className="sm:text-[25px] text-[20px]  text-green-500" /> : ''}
                                </div>
                                <div className="flex  px-5 py-2 bg-white rounded-lg shadow-lg border-l-4 border-2 border-[#ccc] justify-between  ">
                                    <div className="  flex  flex-col gap-1 ">
                                        <h2 className="font-semibold whitespace-normal text-gray-700">City</h2>
                                        <p className="text-black">{userDetails?.city}</p>

                                    </div>
                                    {user ? <FaEdit onClick={handleEditClick} className="sm:text-[25px] text-[20px]  text-green-500" /> : ''}
                                </div>
                                <div className="flex  px-5 py-2 bg-white rounded-lg shadow-lg border-l-4 border-2 border-[#ccc] justify-between  ">
                                    <div className="  flex  flex-col gap-1 ">
                                        <h2 className="font-semibold whitespace-normal text-gray-700">Area</h2>
                                        <p className="text-gray-500">{userDetails?.area}</p>
                                    </div>
                                    {user ? <FaEdit onClick={handleEditClick} className="sm:text-[25px] text-[20px]  text-green-500" /> : ''}

                                </div>
                                <div className="flex  px-5 py-2 bg-white rounded-lg shadow-lg border-l-4 border-2 border-[#ccc] justify-between  ">
                                    <div className="  flex  flex-col gap-1 ">
                                        <h2 className="font-semibold whitespace-normal text-gray-700">State</h2>
                                        <p className="text-gray-500">{userDetails?.state}</p>
                                    </div>
                                    {user ? <FaEdit onClick={handleEditClick} className="sm:text-[25px] text-[20px]  text-green-500" /> : ''}

                                </div>

                                <div className="flex  px-5 py-2 bg-white rounded-lg shadow-lg border-l-4 border-2 border-[#ccc] justify-between  ">
                                    <div className="  flex  flex-col gap-1 ">
                                        <h2 className="font-semibold whitespace-normal text-gray-700">Zip Code</h2>
                                        <p className="text-gray-500">{userDetails?.zip_code}</p>
                                    </div>
                                    {user ? <FaEdit onClick={handleEditClick} className="sm:text-[25px] text-[20px]  text-green-500" /> : ''}

                                </div>
                            </div>
                        </>
                        : (
                            <>
                                {!userAddressInfo || userAddressInfo.length === 0 &&
                                    <div className="w-full flex justify-start">
                                        <div className=" w-full  border sm:border-2 bg-white p-4 sm:p-6 shadow-md rounded-lg">

                                            <AddressForm setIsAddressExist={setIsAddressExist} isAddressExist={isAddressExist} />
                                        </div>
                                    </div>
                                }

                            </>
                        )}







                </main>
            </div>
        </>

    );
};

export default UserSetting
