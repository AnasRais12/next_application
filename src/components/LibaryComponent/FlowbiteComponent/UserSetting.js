'use client'
import React, { useEffect, useState } from "react";
import ChangePassword from "@/components/ChangePasswordModal";
import { FaEdit } from "react-icons/fa";
import UserQuery from "@/DbQuery/UserDetailQuery";
import PhoneNumberModal from "@/components/LibaryComponent/FlowbiteComponent/EditNumber";
import { GlobalDetails } from "@/context/globalprovider/globalProvider";
import { FiMenu, FiX, } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import CustomSpinner from "@/components/Spinner";
import CSpinner from "@/components/CSpinner";
import AddressForm from "@/components/LibaryComponent/FlowbiteComponent/Addresses";

const UserSetting = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [changeNameModal, setChangeNameModal] = useState(false);
    const [phoneModal, setPhoneModal] = useState(false);
    const [changepasswordModal, setchangepasswordModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [Logoutloading, setLogoutloading] = useState(false);
    const [Deleteloading, setDeleteloading] = useState(false);



    const [newName, setNewName] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const { user } = GlobalDetails()
    const { userDetails, updateUserDetails, deleteUser, logoutUser } = UserQuery();
    console.log("user! is here", userDetails)

    const handleNameChange = async () => {
        if (newName) {
            const updatedFields = { username: newName };
            await updateUserDetails(updatedFields);
            setChangeNameModal(false)
        } else {
            console.log("Name is unchanged or invalid.");
        }
    };
    const handlePhoneNumber = async () => {
        if (newPhoneNumber) {
            const updatedFields = { phone_number: newPhoneNumber };
            await updateUserDetails(updatedFields);
            console.log('work karaha hai  ')

            setPhoneModal(false)
        } else {
            console.log('work nh karahah hai')
        }
    };
    // delete user 
    const userDelete = async () => {
        try {
            setDeleteloading(true)
            await deleteUser();
        } catch (error) {
            console.warn(error)
        }
        finally {
            setDeleteloading(false)
            setDeleteModal(false)


        }
    }
    // logout of user
    const userlogout = async () => {
        try {
            setLogoutloading(true)
            await logoutUser();
        } catch (error) {
            console.warn(error)
        }
        finally {
            setLogoutloading(false)
        }
    }
    //open passowrdModal
    const OpenPasswordModal = () => {
        setchangepasswordModal(true)
        setIsMenuOpen(false)
    }
    console.log("____________________>>>", newPhoneNumber)
    return (
        <>
            <div className="lg:flex-row flex-col h-fit  py-10  flex lg:gap-0 lg:px-0 md:px-5 px-3 lg:mt-0 mt-12 bg-gray-50">
                {/* Mobile Menu Button */}
                {changepasswordModal ? <ChangePassword setchangepasswordModal={setchangepasswordModal} /> : ''}
                {changeNameModal || phoneModal ?
                    <PhoneNumberModal
                        setChangeNameModal={setChangeNameModal}
                        handlePhoneNumber={handlePhoneNumber}
                        loading={loading}
                        label={changeNameModal ? 'Name' : 'No'}
                        setNewName={setNewName}
                        handleNameChange={handleNameChange}
                        setNewPhoneNumber={setNewPhoneNumber}
                        setPhone={setPhoneModal}
                        changeNameModal={changeNameModal}
                        type={`${changeNameModal ? 'text' : 'number'}`}
                        plaecholder={`${changeNameModal ? 'Enter Name' : 'Enter PhoneNumber'}`}
                        PhoneNumber={phoneModal}
                        heading={`${changeNameModal ? 'Change Name' : 'Phone Number'}`}

                    /> : ''}
                <button
                    className="lg:hidden px-2 py-2 h-fit  bg-[orange] mb-4 justify-start w-fit items-start  flex  text-white rounded-lg shadow-lg"
                >
                    <FiMenu onClick={() => setIsMenuOpen(true)} />
                </button>
                {/* Sidebar */}
                <aside
                    className={`w-72  bg-gradient-to-b from-orange-700 to-orange-700 z-50 lg:mt-14 mt-16 text-white sm:p-6 p-3 shadow-lg fixed inset-y-0 left-0 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 lg:relative lg:block rounded-r-lg`}
                >

                    <button
                        className="lg:hidden absolute sm:top-4 top-5 right-4 text-white text-[30px]"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <FiX />
                    </button>

                    <div className=" sm:mt-0 mt-10   mb-6">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full  flex items-center justify-center text-xl font-bold">
                            {user?.email?.charAt(0)?.toUpperCase()}
                        </div>
                        <h2 className="mt-2 font-semibold text-lg">{user?.user_metadata?.full_name || userDetails?.full_name}</h2>
                        <p className="text-sm text-gray-300">{user?.email}</p>
                    </div>
                    <nav className=" ">
                        <ul className="space-y-3 ">
                            <li className="text-white font-semibold">Personal Information</li>
                            <li className="text-gray-300 hover:text-orange-400  rounded-md py-2 px-2 mr-2 border-2 cursor-pointer transition-colors">Billing & Payments</li>
                            <li className="text-gray-300 hover:text-orange-400 cursor-pointe rounded-md border-2 py-2 px-2 mr-2 transition-colors">Order History</li>
                            {/* if google user to issey change password na dikhey  */}
                            {user?.user_metadata?.provider_id ? null : <li onClick={OpenPasswordModal} className="text-gray-300 cursor-pointer hover:text-orange-400 cursor-pointe rounded-md border-2 py-2 px-2 mr-2 transition-colors">Change Password</li>}
                            <button onClick={userlogout} className="text-gray-300 hover:text-orange-400 flex w-[90%] items-center gap-2 cursor-pointe rounded-md border-2 py-2 px-2 mr-2 transition-colors">{Logoutloading ? <CSpinner /> : 'Logout'} </button>

                            <button onClick={() => setDeleteModal(true)} className="text-gray-300 hover:text-orange-400 w-[90%] flex items-center gap-2 cursor-pointe rounded-md border-2 py-2 px-2 mr-2 transition-colors">{Deleteloading ? <CSpinner /> : 'Delete'} </button>


                        </ul>
                    </nav>
                </aside>
                <main className="flex flex-col w-full  items-start   lg:mt-10  lg:px-3 lg:py-6">
                    <h1 className="text-xl font-semibold mb-2  text-gray-800">Peronal Information</h1>
                    <p className="text-gray-600 mb-6">Manage your personal information, including phone numbers and email address.</p>
                    {/*  user Details*/}
                    {userDetails ? (
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
                                {user ? <FaEdit onClick={() => setChangeNameModal(true)} className=" text-[20px] sm:text-[25px] text-green-500" />
                                    : ''}
                            </div>


                            <div className="flex px-3 sm:px-5 py-2 bg-white rounded-lg shadow-lg border-l-4 border-2 border-[#ccc]  justify-between  ">
                                <div className="  flex  flex-col gap-1 ">
                                    <h2 className="font-semibold text-gray-700">Phone</h2>
                                    <p className="text-black">{user?.phone || userDetails?.phone_number || 'Not Set'}</p>

                                </div>

                                {user ? <FaEdit onClick={() => setPhoneModal(true)} className="sm:text-[25px] text-[20px]  text-green-500" /> : ''}
                            </div>
                            <div className="flex  px-5 py-2 bg-white rounded-lg shadow-lg border-l-4 border-2 border-[#ccc] justify-between  ">
                                <div className="  flex  flex-col gap-1 ">
                                    <h2 className="font-semibold whitespace-normal text-gray-700">Street</h2>
                                    <p className="text-gray-500">{userDetails?.address}</p>
                                </div>
                                {user ? <FaEdit onClick={() => setchangepasswordModal(true)} className=" text-[20px] sm:text-[25px] text-green-500" /> : ''}
                            </div>
                            <div className="flex  px-5 py-2 bg-white rounded-lg shadow-lg border-l-4 border-2 border-[#ccc] justify-between  ">
                                <div className="  flex  flex-col gap-1 ">
                                    <h2 className="font-semibold whitespace-normal text-gray-700">Country</h2>
                                    <p className="text-black">{userDetails?.country}</p>
                                </div>

                                {user ? <FaEdit onClick={() => setchangepasswordModal(true)} className=" text-[20px] sm:text-[25px] text-green-500" /> : ''}
                            </div>
                            <div className="flex  px-5 py-2 bg-white rounded-lg shadow-lg border-l-4 border-2 border-[#ccc] justify-between  ">
                                <div className="  flex  flex-col gap-1 ">
                                    <h2 className="font-semibold whitespace-normal text-gray-700">City</h2>
                                    <p className="text-black">{userDetails?.city}</p>

                                </div>

                                {user ? <FaEdit onClick={() => setchangepasswordModal(true)} className=" text-[20px] sm:text-[25px] text-green-500" /> : ''}
                            </div>

                            <div className="flex  px-5 py-2 bg-white rounded-lg shadow-lg border-l-4 border-2 border-[#ccc] justify-between  ">
                                <div className="  flex  flex-col gap-1 ">
                                    <h2 className="font-semibold whitespace-normal text-gray-700">Zip Code</h2>
                                    <p className="text-gray-500">{userDetails?.zip_code}</p>
                                </div>

                                {user ? <FaEdit onClick={() => setchangepasswordModal(true)} className=" text-[20px] sm:text-[25px] text-green-500" /> : ''}
                            </div>
                        </div>
                    ) :
                        <div className="w-full flex justify-start">
                            <div className=" w-full  border sm:border-2 bg-white p-4 sm:p-6 shadow-md rounded-lg">

                                <AddressForm />
                            </div>
                        </div>
                    }

                    {/* Delete User */}
                    {deleteModal ? (
                        <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center `}>

<div className="max-w-md  w-[90%] p-6 bg-gray-100 shadow-lg rounded-lg">

                                <div className="relative p-4 text-center  shadow-lg rounded-lg  dark:bg-gray-800 sm:p-5">

                                    <svg className="text-[red] dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                    <p className="mb-4  dark:text-gray-300">Are you sure you want to delete this item?</p>
                                    <div className="flex justify-center items-center space-x-4">
                                        <button onClick={() => setDeleteModal(false)} className="py-2 border-[#ccc] px-3 text-sm font-medium text-white bg-black rounded-lg    focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-white focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                            No cancel
                                        </button>
                                        <button onClick={userDelete} className="py-2 px-3 shadow-md text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                           
                                            {Deleteloading ? <CSpinner /> : "Yes, I'm sure"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ''}

                </main>
            </div>
        </>

    );
};

export default UserSetting
