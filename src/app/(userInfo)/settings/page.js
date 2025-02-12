'use client'
import React, { useEffect, useState } from "react";
import ChangePassword from "@/components/ChangePasswordModal";
import { FaEdit } from "react-icons/fa";
import UserQuery from "@/DbQuery/UserQuery";
import PhoneNumberModal from "@/components/LibaryComponent/FlowbiteComponent/EditNumber";
import { GlobalDetails } from "@/context/globalprovider/globalProvider";
import { FiMenu, FiX, } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";

const SettingsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [changeNameModal, setChangeNameModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [phoneModal, setPhoneModal] = useState(false);
  const [changepasswordModal, setchangepasswordModal] = useState(false);
  const [newName, setNewName] = useState(""); 
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const { user } = GlobalDetails()
  const { speicifcUser, updateUserDetails,deleteUser,logoutUser } = UserQuery();

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
      const updatedFields = { phone: newPhoneNumber };
      await updateUserDetails(updatedFields);
      setPhoneModal(false)
    } else {
      console.log("Name is unchanged or invalid.");
    }
  };

  const userDelete = async () => {
    await deleteUser();
    setDeleteModal(false)
  }
  const userlogout = async () => {
    await logoutUser();
  }

  return (
    <>

      <div className="flex min-h-screen bg-gray-50">
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
          className="md:hidden p-3 m-2 justify-start items-start flex bg-orange-600 text-white rounded-lg shadow-lg"

        >
          <FiMenu onClick={() => setIsMenuOpen(true)} />
        </button>

        {/* Sidebar */}
        <aside
          className={`w-72  bg-gradient-to-b from-orange-700 to-orange-700 text-white sm:p-6 p-3 shadow-lg fixed inset-y-0 left-0 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 md:relative md:block rounded-r-lg`}
        >
        
          <button
            className="md:hidden absolute top-4 right-4 text-white text-[30px]"
            onClick={() => setIsMenuOpen(false)}
          >
            <FiX />
          </button>

          <div className=" sm:mt-0 mt-10  mb-6">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full  flex items-center justify-center text-xl font-bold">
              {user?.email?.charAt(0)?.toUpperCase()}
            </div>
            <h2 className="mt-2 font-semibold text-lg">{user?.user_metadata?.full_name || speicifcUser?.username}</h2>
            <p className="text-sm text-gray-300">{user?.email}</p>
          </div>
          <nav>
            <ul className="space-y-3">
              <li className="text-white font-semibold">Personal Information</li>
              <li className="text-gray-300 hover:text-orange-400  rounded-md py-2 px-2 mr-2 border-2 cursor-pointer transition-colors">Billing & Payments</li>
              <li className="text-gray-300 hover:text-orange-400 cursor-pointe rounded-md border-2 py-2 px-2 mr-2 transition-colors">Order History</li>
              <li className="text-gray-300 hover:text-orange-400 cursor-pointe rounded-md border-2 py-2 px-2 mr-2 transition-colors">Change Password</li>
              <button onClick={userlogout} className="text-gray-300 hover:text-orange-400 flex items-center gap-2 cursor-pointe rounded-md border-2 py-2 px-2 mr-2 transition-colors">Logout </button>
              {/* <span><IoLogOut className="text-[25px]"/></span> */}

            </ul>
          </nav>
        </aside>

        {/* Main Content */}

        <main className="flex flex-col w-full pt-20 items-start  pr-2 py-6 sm:p-6">
          <h1 className="text-xl font-semibold mb-2 mt-10 text-gray-800">Peronal Information</h1>
          <p className="text-gray-600 mb-6">Manage your personal information, including phone numbers and email address.</p>

          <div className="grid grid-cols-1 mb-4 place-content-center items-center w-full pt-4 sm:grid-cols-2 gap-6">
            <div className="  flex  flex-col gap-1 bg-white px-2  py-2 rounded-lg shadow-lg border-l-4 border-2 border-[#ccc]  ">
              <h2 className="font-semibold  text-gray-700">Email:</h2>
              <p className="text-gray-900  ">{user?.email}</p>


            </div>
            <div className="flex px-3 sm:px-5 py-2 bg-white rounded-lg shadow-lg border-2 border-l-4 border-[#ccc] justify-between  ">
              <div className="  flex  flex-col gap-1 ">
                <h2 className="font-semibold text-gray-700">Name: </h2>
                <p className="text-gray-900">{user?.user_metadata?.full_name || speicifcUser?.username}</p>

              </div>
              {speicifcUser ? <FaEdit onClick={() => setChangeNameModal(true)} className=" text-[20px] sm:text-[25px] text-green-500" />
                : ''}
            </div>


            <div className="flex px-3 sm:px-5 py-2 bg-white rounded-lg shadow-lg border-l-4 border-2 border-[#ccc]  justify-between  ">
              <div className="  flex  flex-col gap-1 ">
                <h2 className="font-semibold text-gray-700">Phone</h2>
                <p className="text-black">{user?.phone || speicifcUser?.phone || 'Not Set'}</p>

              </div>

              {speicifcUser ? <FaEdit onClick={() => setPhoneModal(true)} className="sm:text-[25px] text-[20px]  text-green-500" /> : ''}
            </div>
            <div className="flex  px-5 py-2 bg-white rounded-lg shadow-lg border-l-4 border-2 border-[#ccc] justify-between  ">
              <div className="  flex  flex-col gap-1 ">
                <h2 className="font-semibold whitespace-normal text-gray-700">Password</h2>
                <p className="text-gray-500">******</p>
              </div>

              {speicifcUser ? <FaEdit onClick={() => setchangepasswordModal(true)} className=" text-[20px] sm:text-[25px] text-green-500" /> : ''}
            </div>
          




            {deleteModal ? (
              <div className="  overflow-y-auto overflow-x-hidden fixed flex   top-52 right-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                  <div className="relative p-4 text-center bg-white shadow-lg rounded-lg  dark:bg-gray-800 sm:p-5">

                    <svg className="text-[red] dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    <p className="mb-4  dark:text-gray-300">Are you sure you want to delete this item?</p>
                    <div className="flex justify-center items-center space-x-4">
                      <button onClick={() => setDeleteModal(false)} className="py-2 border-[#ccc] px-3 text-sm font-medium text-white bg-black rounded-lg    focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-white focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        No cancel
                      </button>
                      <button onClick={userDelete}  className="py-2 px-3 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                        Yes, I'm sure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : ''}

          </div>
          <div className="flex justify-end px-3 w-full ">
              <button onClick={() => setDeleteModal(true)} className="block text-white bg-[red] 0 font-medium rounded-lg text-sm px-8 py-2.5 text-center " type="button">
                Delete
              </button>
            </div>

        </main>
      </div>
    </>

  );
};

export default SettingsPage;


