import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import UserQuery from '@/DbQuery/UserDetailQuery';
import React, { useState } from 'react'
import CSpinner from '@/components/CSpinner';
import { FiMenu, FiX } from 'react-icons/fi';

function UserSideBar({setchangepasswordModal,setOrderHistory}) {
    const { userDetails,  deleteUser, logoutUser } = UserQuery();
    const { user } = GlobalDetails()
        const [isMenuOpen, setIsMenuOpen] = useState(false);
     const [Logoutloading, setLogoutloading] = useState(false);

         const [deleteModal, setDeleteModal] = useState(false);
    const [Deleteloading, setDeleteloading] = useState(false);

    const OpenPasswordModal = () => {
        setchangepasswordModal(true)
        setIsMenuOpen(false)
    }

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

    return (
        <>
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
                    <FiX/>
                </button>

                <div className=" sm:mt-0 mt-10   mb-6">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full  flex items-center justify-center text-xl font-bold">
                        {user?.email?.charAt(0)?.toUpperCase()}
                    </div>
                    <h2 className="mt-2 font-semibold text-lg">{ userDetails?.full_name || user?.user_metadata?.full_name  }</h2>
                    <p className="text-sm text-gray-300">{user?.email}</p>
                </div>
                <nav className=" ">
                    <ul className="space-y-3 ">
                        <li className="text-white font-semibold">Personal Information</li>
                        <li className="text-gray-300 hover:text-orange-400  rounded-md py-2 px-2 mr-2 border-2 cursor-pointer transition-colors">Billing & Payments</li>
                        <li onClick={()=> setOrderHistory(true)} className="text-gray-300 hover:text-orange-400 cursor-pointe rounded-md border-2 py-2 px-2 mr-2 transition-colors">Order History</li>
                        {user?.user_metadata?.provider_id ? null : <li onClick={OpenPasswordModal} className="text-gray-300 cursor-pointer hover:text-orange-400 cursor-pointe rounded-md border-2 py-2 px-2 mr-2 transition-colors">Change Password</li>}
                        <li onClick={userlogout} className="text-gray-300 hover:text-orange-400 cursor-pointe rounded-md border-2 py-2 px-2 mr-2 transition-colors">{Logoutloading ? <CSpinner /> : 'Logout'}</li>
                        <li  onClick={() => setDeleteModal(true)}  className="text-gray-300 hover:text-white hover:border-[red] cursor-pointe rounded-md border-2 py-2 px-2 mr-2 transition-colors hover:bg-[red]">Delete</li>

                    </ul>
                </nav>
            </aside>
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
        </>
    )
}

export default UserSideBar