'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { UseAuth } from '@/context/userProvider/userProvider';
import { useRouter } from 'next/navigation';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import ChangePasswordModal from '@/components/ChangePasswordModal';
import CustomSpinner from '@/components/Spinner';
const UsernameSchema = yup.object().shape({
  username: yup.string().matches(/^[A-Za-z]{3,20}$/, 'Username must contain only letters (3-20 characters) without spaces or numbers').required('Username is Required'),
})
function page() {
  const router = useRouter();
  const {data:session,} = useSession()
  // if (status === "loading") console.log('Loading')
  useEffect(() => {
    console.log(session,'Session++++++++++++++++++++++++++++++++')
  }, [session])
  
  // if (status === "unauthenticated") console.log('Unauthenticated')
  // console.log(session?.user,'Session++++++++++++++++++++++++++++++++')
  // console.log(status,'Status++++++++++++++++++++++++++++++++')


 

  const {register,reset,handleSubmit,formState:{errors}} = useForm({resolver:yupResolver(UsernameSchema)})
  const [loading, setloading] = useState(false);
  const [OPenDiv, setOpenDiv] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [changeNameModal, setChangeNameModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  // const User = JSON.parse(localStorage.getItem('User'));
  // const UserToken = localStorage.getItem('User-Token');
  // useEffect(() => {
  //   if (!UserToken) {
  //     setTimeout(() => {
  //       Swal.fire({
  //         icon: 'warning',
  //         text: 'Please Register || Login Your Account First',
  //       });
  //       router.push('/login');
  //     }, 3000);
  //   } else if (!User?.isVerified) {
  //     setTimeout(() => {
  //       Swal.fire({
  //         icon: 'warning',
  //         text: 'Please verify your email first!',
  //       });
  //       router.push('/verify_code');
  //     }, 3000);
  //   } else if (User) {
  //     setUserInfo(User);
  //   }
  // }, []);
  const LogoutUser = () => {
    localStorage.removeItem('User-Token');
    router.push('/login');
  };
  const DeletetUser = () => {
    localStorage.removeItem('User');
    localStorage.removeItem('User-Token');
    router.push('/register');
  };
  const ModalChangePassword = () => {
    setChangePasswordModal(true);
    setOpenDiv(false);
  };
  const changeUserName = () => {
    setChangeNameModal(true);
  };

  const handleFormSumbit = (data) => {
    if (userInfo) {
      userInfo.username = data.username;
      localStorage.setItem('User', JSON.stringify(userInfo));
      Swal.fire({
        icon: 'success',
        text: 'Username successfully updated!',
      });
      setChangeNameModal(false);
      setOpenDiv(false);
    }
  };
  const Setting = () => {
    setOpenDiv(true);
  };
  if (loading) {
    return <CustomSpinner />;
  }
  return (
    <>
      {changePasswordModal ? (
        <ChangePasswordModal setChangePasswordModal={setChangePasswordModal} />
      ) : (
        <div className="flex justify-center h-screen relative items-center py-30 w-full text-center text-[30px]">
          <div className="absolute top-8 right-9  text-black rounded-[20px] px-10">
            <div className="flex flex-col gap-2 px-4 pb-4">
              <button
                className="border-2 px-4 rounded-[20px]  "
                onClick={Setting}
              >
                Setting
              </button>
              {OPenDiv ? (
                <>
                  <div className="w-[100%] flex border-2  shadow-xl   flex-col gap-4 text-[20px] justify-center items-center 0 text-green-600">
                    <div className="w-[50%] flex flex-col gap-2 py-2">
                      <button
                        onClick={LogoutUser}
                        className=" rounded-[20px] py-2 hover:bg-green-300 hover:text-white"
                      >
                        Logout
                      </button>
                      <button
                        onClick={DeletetUser}
                        className="rounded-[20px] py-2 hover:bg-green-300 hover:text-white"
                      >
                        Account Delete
                      </button>
                      <button
                        onClick={ModalChangePassword}
                        className="rounded-[20px] py-2 hover:bg-green-300 hover:text-white"
                      >
                        Change Password
                      </button>
                      <button
                        onClick={changeUserName}
                        className="rounded-[20px] py-2 hover:bg-green-300 hover:text-white"
                      >
                        Change Username
                      </button>
                      {changeNameModal ? (
                        <>
                          <div className="w-[100%]  top-0 bottom-0 h-screen left-0 right-0 bg-[#0000001a] fixed   text-[20px]">
                            <div className="w-full justify-center h-screen items-center flex">
                              <form
                                className="w-[50%] bg-gray-100 rounded-[10px] flex flex-col gap-4 z-100000 border-4 py-10 px-10"
                                onSubmit={handleSubmit(handleFormSumbit)}
                              >
                                <button
                                  onClick={() => setChangeNameModal(false)}
                                  className="text-end text-red-800"
                                >
                                  X
                                </button>
                                <input
                                {...register('username')}
                                  className="w-full px-10 py-4 border-2 rounded-[10px] "
                                  placeholder="Change Username"
                                
                                />
                                <p>{errors?.username?.message}</p>
                                <button
                                  type="submit"
                                  className="px-4 py-2 text-center bg-green-800 text-white rounded-[10px] text-whiite"
                                >
                                  Save
                                </button>
                              </form>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className="w-[30%] flex flex-col gap-5 justify-center py-20 border-2 border-black items-center shadow-xl rounded-[20px]">
            <h1>Hello {session?.user.name} </h1>
            <h1>Hello {session?.user.password} </h1>
            <h1>Hello {session?.user.token} </h1>

          </div>
        </div>
      )}
    </>
  );
}

export default page;
