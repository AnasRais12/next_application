'use client';
import React, { useEffect, useState } from 'react';
import { getUser } from '@/lib/Auth';
import { supabase } from '@/lib/supabase';
import Header from '@/components/LibaryComponent/FlowbiteComponent/Header';
import E_commerceCard from '@/components/LibaryComponent/FlowbiteComponent/E-commerceCard';
import Navbar_ from '@/components/LibaryComponent/MaterialUi Compomnent/App-Bar';
import useSession from '@/utils/UserExist/GetSession';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

function page() {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const cart = useSelector((state => state?.cartItem?.cart) || "")
  const dispatch = useDispatch()
  
  const [session, setSession] = useState(null);

  // useEffect(() => {
  //   // Get the current session
  //   const fetchSession = async () => {
  //     const { data: currentSession } = await supabase.auth.getSession();
  //     setSession(currentSession);
  //   };

  //   fetchSession();

  //   // Listen for session changes (e.g., login/logout)
  //   const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
  //     setSession(session);
  //   });

  //   return () => {
  //     authListener.unsubscribe();
  //   };
  // }, []);

  console.log("session",useSession())

 
//  useEffect(() => {
//   const fetchUser = async () => {
//     const {data,error} = await supabase.auth.getUser()
//      if (error) {
//       console.error("Error fetching user:", error);
//     } else {
//       console.log(data);
//       setuser(data.user);
//     }
//   };
//   fetchUser();
//  console.log(user);
 
// }, []);
const handleLogout = async () => {
  try {
      // Manually sign out the user (removes session from Supabase)
      await supabase.auth.signOut();
      // Manually clear session cookie
      
      // Redirect to login page after logout
  } catch (error) {
      console.error("Error during logout:", error);
  }
};

   
  return (
    <>
       
      <div>
      {/* <h1>Welcome, {session.user?.email}</h1> */}
    </div>
    <div className='w-full  '>
      {/* Header */}
       <Header/>   
       {/* Trending Prodcus */}
       {/* Ayaingeeee */}
        {/* Categoreis */}
        <E_commerceCard/>
         {/* Deals waley sectin */}
       {/* Ayaingeeee */}
         {/* New arival*/}
       {/* Ayaingeeee */}
          {/* Footer*/}
       {/* Ayaingeeee */}
  </div>
    </>
  );
}

export default page ;





















// import { useSession } from 'next-auth/react';
// import { UseAuth } from '@/context/userProvider/userProvider';
// import { signOut } from 'next-auth/react';
// import * as yup from 'yup'
// import { useForm } from 'react-hook-form';
// import { increment, decrement, IncremntByAmount, IncreasedAmountWithName } from '../store/features/counter/CounterSlice';
// import { yupResolver } from '@hookform/resolvers/yup';
// import Swal from 'sweetalert2';
// import ChangePasswordModal from '@/components/ChangePasswordModal';
// import CustomSpinner from '@/components/Spinner';
// const UsernameSchema = yup.object().shape({
//   username: yup.string().matches(/^[A-Za-z]{3,20}$/, 'Username must contain only letters (3-20 characters) without spaces or numbers').required('Username is Required'),
// })




 // const { data: session, status } = useSession()
  // const { register, reset, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(UsernameSchema) })
  // const [loading, setloading] = useState(false);
  // const [OPenDiv, setOpenDiv] = useState(false);
  // const [pagesOpen, setPagesOpen] = useState(false);

  // const [userInfo, setUserInfo] = useState(null);
  // const [changeNameModal, setChangeNameModal] = useState(false);
  // const [changePasswordModal, setChangePasswordModal] = useState(false);

  // const LogoutUser = async () => {
  //   setLoading(true)
  //   try {
  //     await signOut({ callbackUrl: 'http://localhost:3000/login' })


  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       text: error
  //     });
  //   }
  //   finally {
  //     setloading(false)
  //   }
  // };
  // const DeletetUser = () => {
  //   localStorage.removeItem('User');
  //   localStorage.removeItem('User-Token');
  //   router.push('/register');
  // };
  // const ModalChangePassword = () => {
  //   setChangePasswordModal(true);
  //   setOpenDiv(false);
  // };
  // const changeUserName = () => {
  //   setChangeNameModal(true);
  // };

  // const handleFormSumbit = (data) => {
  //   if (userInfo) {
  //     userInfo.username = data.username;
  //     localStorage.setItem('User', JSON.stringify(userInfo));
  //     Swal.fire({
  //       icon: 'success',
  //       text: 'Username successfully updated!',
  //     });
  //     setChangeNameModal(false);
  //     setOpenDiv(false);
  //   }
  // };
  // const Setting = () => {
  //   setOpenDiv(!OPenDiv);
  // };
  // const Pages = () => {
  //   setPagesOpen(!pagesOpen);
  // };


  // if (loading) {
  //   return <CustomSpinner />;
  // }










 // <>
    //   {changePasswordModal ? (
    //     <ChangePasswordModal setChangePasswordModal={setChangePasswordModal} />
    //   ) : (
    //     <div className="flex justify-center h-screen relative items-center py-30 w-full text-center text-[30px]">
    //       <div className="absolute top-8 right-9  text-black rounded-[20px] px-10">
    //         <div className="flex flex-col gap-2 px-4 pb-4">
    //           <button
    //             className="border-2 px-4 rounded-[20px]  "
    //             onClick={Setting}
    //           >
    //             Setting
    //           </button>
    //           {OPenDiv ? (
    //             <>
    //               <div className="w-[100%] flex border-2  shadow-xl   flex-col gap-4 text-[20px] justify-center items-center 0 text-green-600">
    //                 <div className="w-[50%] flex flex-col gap-2 py-2">
    //                   <button
    //                     onClick={LogoutUser}
    //                     disabled={loading}
    //                     className=" rounded-[20px] py-2 hover:bg-green-300 hover:text-white"
    //                   >
    //                     {loading ? <CSpinner /> : 'Logout'}
    //                   </button>
    //                   <button
    //                     onClick={DeletetUser}
    //                     className="rounded-[20px] py-2 hover:bg-green-300 hover:text-white"
    //                   >
    //                     Account Delete
    //                   </button>
    //                   <button
    //                     onClick={ModalChangePassword}
    //                     className="rounded-[20px] py-2 hover:bg-green-300 hover:text-white"
    //                   >
    //                     Change Password
    //                   </button>
    //                   <button
    //                     onClick={changeUserName}
    //                     className="rounded-[20px] py-2 hover:bg-green-300 hover:text-white"
    //                   >
    //                     Change Username
    //                   </button>
    //                   {changeNameModal ? (
    //                     <>
    //                       <div className="w-[100%]  top-0 bottom-0 h-screen left-0 right-0 bg-[#0000001a] fixed   text-[20px]">
    //                         <div className="w-full justify-center h-screen items-center flex">
    //                           <form
    //                             className="w-[50%] bg-gray-100 rounded-[10px] flex flex-col gap-4 z-100000 border-4 py-10 px-10"
    //                             onSubmit={handleSubmit(handleFormSumbit)}
    //                           >
    //                             <button
    //                               onClick={() => setChangeNameModal(false)}
    //                               className="text-end text-red-800"
    //                             >
    //                               X
    //                             </button>
    //                             <input
    //                               {...register('username')}
    //                               className="w-full px-10 py-4 border-2 rounded-[10px] "
    //                               placeholder="Change Username"

    //                             />
    //                             <p>{errors?.username?.message}</p>
    //                             <button
    //                               type="submit"
    //                               className="px-4 py-2 text-center bg-green-800 text-white rounded-[10px] text-whiite"
    //                             >
    //                               Save
    //                             </button>
    //                           </form>
    //                         </div>
    //                       </div>
    //                     </>
    //                   ) : null}
    //                 </div>
    //               </div>
    //             </>
    //           ) : (
    //             ''
    //           )}
    //         </div>
    //       </div>
    //       <div className="absolute top-8 left-8  text-black rounded-[20px] px-10">
    //         <div className="flex flex-col gap-2 px-4 pb-4">
    //           <button
    //             className="border-2 px-4 rounded-[20px]  "
    //             onClick={Pages}
    //           >
    //             Pages
    //           </button>
    //           {pagesOpen ? (
    //             <>
    //               <div className="w-[100%] flex border-2  shadow-xl   flex-col gap-4 text-[20px] justify-center items-center 0 text-green-600">
    //                 <div className="w-[50%] flex flex-col gap-2 py-2">
    //                   <button
    //                     onClick={() => router.push('/order')}
    //                     className=" rounded-[20px] py-2 hover:bg-green-300 hover:text-white"
    //                   >
    //                     Order
    //                   </button>
    //                   <button
    //                     onClick={() => router.push('/userInfo')}
    //                     className="rounded-[20px] py-2 hover:bg-green-300 hover:text-white"
    //                   >
    //                     UserInfo
    //                   </button>
    //                   <button
    //                     onClick={() => router.push('/product')}
    //                     className="rounded-[20px] py-2 hover:bg-green-300 capitalize hover:text-white"
    //                   >
    //                     product
    //                   </button>
    //                   <button
    //                     onClick={() => router.push('/cart')}
    //                     className="rounded-[20px] py-2 hover:bg-green-300 hover:text-white"
    //                   >
    //                     Cart
    //                   </button>

    //                 </div>
    //               </div>
    //             </>
    //           ) : (
    //             ''
    //           )}
    //         </div>
    //       </div>

    //       <div className="w-[30%] flex flex-col gap-5 justify-center py-20 border-2 border-black items-center shadow-xl rounded-[20px]">
    //         <h1> {session?.user.name} </h1>
    //         <h1> {count} </h1>
    //         <button onClick={() => dispatch(increment())} className='px-3 py-2 rounded-[10px] border-2 '>Increment</button>
    //         <button className='px-3 py-2 rounded-[10px] border-2' onClick={() => dispatch(decrement())}>Decrement</button>
    //         <button className='px-3 py-2 rounded-[10px] border-2' onClick={() => dispatch(IncremntByAmount(6))}>IncremntByAmount</button>
    //         <button className='px-3 py-2 rounded-[10px] border-2' onClick={() => dispatch(IncreasedAmountWithName('ANAS'))}> IncreasedAmountWithName</button>
    //         {/* <button onClick={() => dispatch(increment())}>Increment</button> */}
    //         {/* <button onClick={() => dispatch(decrement())}>Decrement</button> */}
    //         {/* <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button> */}
    //         <h1> {session?.user.email} </h1>
    //         <h1> {session?.user.password} </h1>
    //         <h1> {session?.user.token} </h1>


    //       </div>
    //     </div>
    //   )}
    // </>