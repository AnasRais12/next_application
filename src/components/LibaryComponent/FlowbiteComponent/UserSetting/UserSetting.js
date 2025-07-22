'use client';
import React, { useEffect, useState } from 'react';
import ChangePassword from '@/components/ChangePasswordModal';
import { FaEdit } from 'react-icons/fa';
import UserQuery from '@/DbQuery/UserDetailQuery';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import CustomSpinner from '@/components/Spinner';
import AddressForm from '@/components/LibaryComponent/FlowbiteComponent/Addresses';
import UserSideBar from './UserSideBar';
import OrderHistory from '../OrderHistory';
import AddressUpdate from '../../MaterialUi Compomnent/AddressUpdate';
const UserSetting = ({ userAddressLoading, userAddressInfo }) => {
   const { userDetails } = UserQuery();
  const { user, settingModal, setSettingModal } = GlobalDetails();
  const userInfoList = [
  { label: 'Email', value: user?.email },
  { label: 'Name', value: user?.user_metadata?.full_name || userDetails?.full_name },
  { label: 'Phone', value: user?.user_metadata?.phone_number || userDetails?.phone_number || 'Not Set' },
  { label: 'Address', value: userDetails?.address },
  { label: 'Country', value: userDetails?.country },
  { label: 'City', value: userDetails?.city },
  { label: 'Area', value: userDetails?.area },
  { label: 'State', value: userDetails?.state },
  { label: 'Zip Code', value: userDetails?.zip_code },
];
  const [UserSettingStates, setUserSettingState] = useState({
    isAddressExist:false,
    isEditing: false,
    changepasswordModal: false,
  });


  useEffect(() => {
    if (!userDetails) {
      setUserSettingState((prev) => ({ ...prev, isAddressExist: false }));
    } else {
      setUserSettingState((prev) => ({ ...prev, isAddressExist: true }));
    }
  }, [userDetails]);

  if (userAddressLoading) {
    return <CustomSpinner />;
  }
  if (settingModal) {
    return <OrderHistory />;
  }

  return (
    <>
      <div className="lg:flex-row lg:flex flex-col h-fit  pt-10  hidden lg:gap-0 lg:px-0 md:px-5 px-3 lg:mt-0 mt-12 bg-gray-50">
        {UserSettingStates?.isEditing && (
          <AddressUpdate
            setIsEditing={setUserSettingState}
            userDetails={userDetails}
          />
        )}
        {UserSettingStates.changepasswordModal && (
          <ChangePassword setchangepasswordModal={setUserSettingState} />
        )}
        <UserSideBar
          setchangepasswordModal={setUserSettingState}
          setSettingModal={setSettingModal}
        />
        <main className="flex flex-col w-full  items-start   lg:mt-10  lg:px-4 lg:py-6">
          <div className="flex sm:flex-row flex-col-reverse sm:gap-0 gap-1 justify-between items-start w-full pr-6 ">
            <div>
              <h1 className="text-xl font-semibold mb-2  text-gray-800">
             My Details
              </h1>
              <p className="text-gray-600 mb-6">
                Manage your Details, including phone numbers and
                email address.
              </p>
            </div>
          </div>
          {/*  user Details*/}
          {UserSettingStates.isAddressExist ? (
            <>
            <div className="grid grid-cols-1 mb-4 place-content-center items-center w-full pt-4 lg:grid-cols-2 gap-6">
    {userInfoList.map((item, idx) => (
      <div
        key={idx}
        className="flex px-5 py-2 bg-white rounded-lg shadow-lg border-l-4 border-2 border-[#ccc] justify-between"
      >
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold whitespace-normal text-gray-700">{item.label}</h2>
          <p className={`text-${item.label === 'Email' || item.label === 'Name' ? 'gray-900' : 'gray-500'}`}>
            {item.value}
          </p>
        </div>
        {user && (
          <FaEdit
            onClick={() => setUserSettingState((prev) => ({ ...prev, isEditing: true }))}
            className="sm:text-[25px] text-[20px] text-green-500"
          />
        )}
      </div>
    ))}
  </div>
            </>
          ) : (
            <>
              {!userAddressInfo ||
                (userAddressInfo.length === 0 && (
                  <div className="w-full flex justify-start">
                    <div className=" w-full  border sm:border-2 bg-white p-4 sm:p-6 shadow-md rounded-lg">
                      <AddressForm
                        setIsAddressExist={setUserSettingState}
                        isAddressExist={UserSettingStates.isAddressExist}
                      />
                    </div>
                  </div>
                ))}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default UserSetting;
