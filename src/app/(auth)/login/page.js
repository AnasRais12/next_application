'use client';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2';
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { useRouter } from 'next/navigation';
import CSpinner from '@/components/CSpinner';
function Login() {

  const [credentialLoading, setCredentialLoading] = useState(false); // For credential login loading
  const [githubLoading, setGithubLoading] = useState(false);
  const [googleLoading, setgoogleLoading] = useState(false);

  const LoginSchema = yup.object().shape({
    username: yup.string().min(6, '6 Characters minimum ').required('Username is Required'),
    password: yup.string().min(5, 'Password must be at least 5 characters').required('Password is Required')
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(LoginSchema)
  })
  const [storedUser, setstoredUser] = useState(null);
  const createToken = uuidv4();
  const router = useRouter();
  useEffect(() => {
    const User = localStorage.getItem('User');
    if (User) {
      setstoredUser(JSON.parse(User));
    }
  }, []);

  const generateToken = () => {
    localStorage.setItem('User-Token', createToken);
  };
  const moveToRegister = (e) => {
    router.push('/register');
  };
  const moveToForgetAccount = (e) => {
    router.push('/forget_account');
  };
  const handleLoginSumbit = async (data) => {
    const { username, password } = data;
    // if (!storedUser) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: ' No user found, please register first!',
    //   });
    // }
    setCredentialLoading(true)
    try {
      const response = await signIn('credentials', {
        redirect: false,
        username,
        password
      })
      console.log("SignIn Response:", response);
      if (response?.error) {
        Swal.fire({
          icon: 'error',
          text: response.error,
        });

        reset()
      }
      else {
        Swal.fire({
          icon: 'success',
          text: `User Login Sucessfully`,
        });
        generateToken();
        router.push('/home');
        reset()
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Wrong Credentials',
      });
      reset()

    }
    finally {
      setCredentialLoading(false)
    }

    // else if (
    //   data.username !== storedUser?.username ||
    //   data.password !== storedUser?.password
    // ) {
    //   Swal.fire({
    //     icon: 'error',
    //     text: 'Wrong Credentials',
    //   });
    //   reset()
    // } else {
    //   Swal.fire({
    //     icon: 'success',
    //     text: `User Login Sucessfully`,
    //   });
    //   generateToken();
    //   router.push('/home');
    //   reset()
    // }
  };
  const handleGoogleLogin = async () => {
    setgoogleLoading(true)
    try {
      await signIn('google', { callbackUrl: 'http://localhost:3000/home' })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: `${error}`
      })
    }
    finally {
      setgoogleLoading(false)
    }

  }
  const handleGithubLogin = async () => {
    try {
      setGithubLoading(true)
      await signIn('github', { callbackUrl: 'http://localhost:3000/home' })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: `${error}`
      })
    }
    finally {
      setGithubLoading(false)
    }
  };

  return (
    <>

      <div className="fixed bg-custom-gradient inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 border-2 rounded-2xl shadow-lg sm:w-[70%] lg:w-[40vw] w-full sm:mx-0 mx-2  relative">
          {/* <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <IoClose size={24} />
        </button> */}

          {/* Logo */}
          <div className="flex flex-col items-center">
            {/* <div className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl">
            E<span></span>
          </div> */}
            <h2 className="text-2xl font-bold mt-2">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Please login to your account</p>
          </div>

          {/* Login Form */}

          <div className="mt-4">
            <form onSubmit={handleSubmit(handleLoginSumbit)}>
              <input
                {...register('username')}
                type="text"
                placeholder="Username "
                className="w-full p-3 border-2 border-[#ccc] rounded-[10px]   bg-white b focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                {...register('password')}
                type="password"
                placeholder="Password"
                className="w-full p-3 border-2 border-[#ccc] rounded-lg bg-white mt-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <div className="text-right text-sm text-unique mt-3 cursor-pointer">
                <p onClick={moveToForgetAccount}>Forgot password?</p>
              </div>

              <button type="submit"
                disabled={credentialLoading}
                className="w-full bg-black text-white p-3 rounded-lg mt-4 hover:bg-unique">
                {credentialLoading ? (
                  <CSpinner />
                ) : (
                  "Login In")}
              </button>
            </form>

          </div>

          {/* Social Login */}
          <div className="mt-4 text-center">
            <p className="text-black text-md">Or Login with</p>
            <div className="flex flex-col items-center justify-center gap-4 mt-2">
              <button onClick={handleGoogleLogin} className="flex items-center bg-black text-white  justify-center w-full text-center gap-2 px-4 py-2 border rounded-lg  ">
                <FcGoogle size={20} className="text-red-500" />
                Google
              </button>
              <button onClick={handleGithubLogin} className="flex w-full justify-center bg-black text-white  items-center gap-2 px-4 py-2 border rounded-lg  ">
                <ImGithub size={20} className="text-white" />
                Facebook
              </button>
            </div>
            <p onClick={moveToRegister} className='text-left mt-2 cursor-pointer'>Not registered? <span className='text-unique'>Create account</span></p>

          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

















{/* <div className="static h-screen flex   items-center sm:items-center  justify-center w-full z-50  bg-opacity-50">
        <div className=" w-full h-full sm:max-h-fit relative sm:w-[70vw]  md:w-[60vw] lg:w-[60vw] xl:w-[50vw] py-5 rounded-md shadow-2xl ">
          <div className="sm:pt-10 pt-0 px-6 sm:px-10">
            <div
              className=" 
            sm:gap-0 gap-2  sm:flex-row flex justify-between items-start sm:items-center flex-col-reverse "
            >
              <h2 className="text-[24px] sm:text-[30px] xl:text-[36px] font-normal">
                Login
              </h2>
            </div>
            <p className="text-gray-600 mt-4 sm:mt-8 text-[16px] lg:text-[18px]  xl:text-[20px]">
              We will send you a code by SMS
            </p>
          </div>
          <form onSubmit={handleSubmit(handleLoginSumbit)} className="sm:mt-8 mt-4 px-1">
            <div className="px-6 sm:px-10 flex flex-col gap-10">
              <input
                {...register('username')}
                type="text"
                placeholder="Enter Your Username"
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unique"
              />
              <p>{errors?.username?.message}</p>
              <input
                {...register('password')}
                type="password"
                placeholder="Enter Your Password"
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unique"
              />
              <p>{errors?.password?.message}</p>
            </div>
            <div className="w-full flex justify-center  mt-8    items-center py-2 border-t-2">
              <div className="flex flex-col gap-6 w-[90%]">

                <button
                  type="submit"
                  disabled={credentialLoading}
                  className="w-full px-3 py-2 rounded-[8px] text-[20px] bg-green-900 text-white my-[10px]"
                >
                  {' '}
                  {credentialLoading ? (
                    <CSpinner />
                  ) : (
                    "Login In")}
                </button>
                <button onClick={handleGoogleLogin}
                  disabled={googleLoading}
                  type="button"
                  className="w-full px-3 py-2 flex items-center gap-4 justify-center rounded-[8px] text-[20px] text-black bg-gray-200 x my-[10px]"
                >
                  {googleLoading ? (
                    <CSpinner color="text-black"  size="sm"  />
                  ) : (
                    <FcGoogle size={25} style={{ marginRight: "10px" }} />
                  )}
                  {googleLoading ? "" : "Sign In with Google"}
                </button>

                <button onClick={handleGithubLogin}
                  disabled={githubLoading}
                  type="button"
                  className="w-full px-3 py-2 flex items-center gap-4 justify-center rounded-[8px] text-[20px] bg-black text-white my-[10px]"
                >
                  {githubLoading ? (
                    <CSpinner size="sm" style={{ marginRight: "10px" }} />  // Agar loading hai toh spinner dikhaiye
                  ) : (
                    <ImGithub size={25} style={{ marginRight: "10px" }} />  // Agar loading nahi hai toh GitHub icon dikhaiye
                  )}
                  {githubLoading ? "" : "Sign In with GitHub"} {/* Button text */}
//         </button>

//       </div>
//     </div>
//   </form>

//   <div className="w-full justify-center flex">
//     <div className="flex w-[80%] justify-between  items-center">
//       <button
//         onClick={moveToRegister}
//         className="w-[40%] py-2 rounded-[8px]  px-10 text-[20px] bg-green-900 text-white my-[10px]"
//       >
//         {' '}
//         Did'nt Have an Account
//       </button>
//       <button
//         onClick={moveToForgetAccount}
//         className="w-[40%] py-2 rounded-[8px]  px-10 text-[20px] bg-green-900 text-white my-[10px]"
//       >
//         {' '}
//         Forgetten Account?
//       </button>
//     </div>
//   </div>
// </div>
// </div> */}