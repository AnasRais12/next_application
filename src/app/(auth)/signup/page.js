'use client';
import React, { useEffect, useState } from 'react';
import { supabaseRole } from '@/lib/supabase';
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';
import { BsFacebook } from "react-icons/bs";
import { useSearchParams } from 'next/navigation';
import { signInWithGoogle } from '@/lib/Auth';
import { signInWithFacebook } from '@/lib/Auth';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import CSpinner from '@/components/CSpinner';
const schema = yup.object().shape({
  username: yup.string().min(6, "Username Must be 6 Character").required('Username is Required'),
  email: yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    ).required(),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is Required'),
})
function Register() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) })
  const [input, setinput] = useState({ username: '', email: '', password: '' });
  const router = useRouter();
  const searchParams = useSearchParams()
  const roleFromParams = searchParams.get("role");
  const [roles, setrole] = useState(roleFromParams || 'buyer');
  // const [githubLoading, setGithubLoading] = useState(false);
  // const [googleLoading, setgoogleLoading] = useState(false);
  const { setAuthfield, authField } = GlobalDetails();
  const [loading, setLoading] = useState(false);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setinput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const OnSumbithandler = async (data) => {
    const { email, password, username,  } = data;
    setLoading(true);
    try {
      // Username check
      const { data: existingUserName } = await supabase
        .from('profiles')
        .select('*')
        .eq('name', username)
        .limit(1);

      if (existingUserName && existingUserName.length > 0) {
        Swal.fire({
          icon: "error",
          text: `Username Already Exists`
        });
        return;
      }

      console.log("authField", authField);


      // Email check
      const { data: existingEmail } = await supabaseRole
        .from('profiles')
        .select('*')
        .eq('email', email)
        .limit(1);

      if (existingEmail && existingEmail.length > 0) {
        Swal.fire({
          icon: "error",
          text: `Email Already Exists`
        });
        return;
      }

      // Signup user
      const { data: signUpData, error: authError } = await supabase.auth.signUp(
        {
          email: email,
          password: password,
          options: {
            emailRedirectTo: "https://next-application-pi.vercel.app/login",
          }
        },


      );
      if (authError) {
        Swal.fire({
          icon: "error",
          text: authError.message
        });
        return;
      }
      console.log("signUpData!", signUpData)
      setAuthfield((prev) => {
        const updatedAuthField = { ...prev, email: signUpData?.user?.email, username: username };
        localStorage.setItem("AuthFieldVerifyPage", JSON.stringify(updatedAuthField));
        return updatedAuthField;
      });
      // Insert into 'users' table
      const { data: SignIn, error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: signUpData?.user?.id,
            role:roles,
            name: username,
            email
          }

        ]);

      if (insertError) {
        Swal.fire({
          icon: "error",
          text: insertError.message
        });
        return;
      }
      console.log(SignIn, "SignIn")
      Swal.fire({
        icon: "success",
        text: `User Registered Successfully!`
      }).then(() => {
        router.push('/verifyaccount');
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message
      });
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-custom-gradient flex items-center justify-center z-50">
        <div className="bg-white p-6 border-2 rounded-2xl shadow-lg sm:w-[70%] lg:w-[40vw] w-full sm:mx-0 mx-2  relative">
         
          {/* Logo */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mt-2">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign Up  to your account</p>
          </div>

          {/* Login Form */}

          <div className="mt-4 f ">
            <form className='flex-col gap-1 flex' onSubmit={handleSubmit(OnSumbithandler)}>
              <input
                {...register('username')}
                type="text"
                required
                name="username"
                // required,
                minLength="6"
                value={input.username}
                placeholder="Enter Your Username"
                onChange={handleInput}
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors.username?.message}</p>
              <input
                {...register('email')}
                required
                type="email"
                name="email"
                value={input.email}
                placeholder="Enter Your Email"
                onChange={handleInput}
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors.email?.message}</p>
              <input
                {...register('password')}
                type="password"
                value={input.password}
                placeholder="Enter Your Password"
                onChange={handleInput}
                className="w-full px-4 py-3 sm:py-4 border  rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors.password?.message}</p>

              <button type="submit"
                // disabled={credentialLoading}
                className="w-full bg-black text-white p-3 rounded-lg mt-4 hover:bg-unique">
                {loading == true ? <CSpinner /> : 'Create Account'}
              </button>
            </form>

          </div>

          {/* Social Login */}
          {/* <div className="mt-4 text-center">
            <p className="text-black text-md">Or Login with</p>
            <div className="flex flex-col items-center justify-center gap-4 mt-2">
              <button onClick={()=>signInWithGoogle(role)} className="flex items-center bg-black text-white  justify-center w-full text-center gap-2 px-4 py-2 border rounded-lg  ">
                <FcGoogle size={20} className="text-red-500" />
                Google
              </button>
              <button onClick={signInWithFacebook(role)} className="flex w-full justify-center bg-black text-white  items-center gap-2 px-4 py-2 border rounded-lg  ">
                <BsFacebook size={20} className="text-blue-500" />
                Facebook
              </button>
            </div>

          </div> */}
        </div>
      </div>
  
    </>
  );
}

export default Register;
