import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import UserQuery from '@/DbQuery/UserDetailQuery';
import React, {  useEffect, useState } from 'react';
import CSpinner from '@/components/CSpinner';
import { FiMenu, FiX } from 'react-icons/fi';

function UserSideBar({ setchangepasswordModal, setSettingModal }) {
  const { userDetails, deleteUser, logoutUser } = UserQuery();
  const { user } = GlobalDetails();
  const [userSidebarState, setUserSideBarState] = useState({
isMenuOpen: false,
    changepasswordModal: false,
    logout:false
  });

   const OpenPasswordModal = () => {
    setchangepasswordModal((prev) => ({ ...prev, changepasswordModal: true }));
  };

 
  const userlogout = async () => {
    try {
      setUserSideBarState((prev) => ({ ...prev, logout: true }));
      await logoutUser();
    } catch (error) {
      console.warn(error);
    } finally {
      setUserSideBarState((prev) => ({ ...prev, logout: false }));
    }
  };
 
 
 const menuItems = [
  {
    label: 'My Orders',
    onClick: () => setSettingModal(true),
    hidden: false,
      style: 'hover:text-white ',
  },
  {
    label: 'Change Password',
    onClick: OpenPasswordModal,
    hidden: !!user?.user_metadata?.provider_id,
    style: 'hover:text-white',
  },
  {
    label: 'Notification',
    onClick: null,
    hidden: false,
    style: 'hover:text-white ',
  },
  {
    label: userSidebarState.logout ? <CSpinner /> : 'Logout',
    onClick: userlogout,
    hidden: false,
      style: 'hover:text-[red] ',
  },
];

 
  return (
    <>
      <button className="lg:hidden px-2 py-2 h-fit  bg-primary mb-4 justify-start w-fit items-start  flex  text-white rounded-lg shadow-lg">
        <FiMenu onClick={() => setUserSideBarState((prev) => ({ ...prev, isMenuOpen: true }))} />
      </button>
      {/* Sidebar */}
      <aside
        className={`w-72  bg-primary z-50 pt-16 px-6  text-white  shadow-lg fixed inset-y-0 left-0 transform ${userSidebarState.isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 lg:relative lg:block `}
      >
        <button
          className="lg:hidden absolute sm:top-4 top-5 right-4 text-white text-[30px]"
          onClick={() => setUserSideBarState((prev) => ({ ...prev, isMenuOpen: false }))}
        >
          <FiX />
        </button>

        <div className=" sm:mt-0 mt-10   mb-6">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full  flex items-center justify-center text-xl font-bold">
            {user?.email?.charAt(0)?.toUpperCase()}
          </div>
          <h2 className="mt-2 font-semibold text-lg">
            {user?.user_metadata?.full_name || userDetails?.full_name}
          </h2>
          <p className="text-sm text-gray-300">{user?.email}</p>
        </div>
          <ul className="space-y-3">
  <li className="text-white font-semibold">Personal Information</li>
  {menuItems.map((item, idx) =>
    !item.hidden ? (
      <li
        key={idx}
        onClick={item.onClick}
        className={`text-gray-300 cursor-pointer rounded-md border-2 py-2 px-2 mr-2 transition-colors ${item.style}`}
      >
        {item.label}
      </li>
    ) : null
  )}
</ul>
      </aside>
      
    </>
  );
}

export default UserSideBar;
