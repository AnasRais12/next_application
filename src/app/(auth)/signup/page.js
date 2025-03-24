'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { supabaseRole } from '@/lib/supabase';
import { signInWithGoogle } from '@/lib/Auth';
import { supabase } from '@/lib/supabase';
import { GlobalDetails } from '@/context/globalprovider/globalProvider';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import CSpinner from '@/components/CSpinner';
import { FcGoogle } from 'react-icons/fc';

const schema = yup.object().shape({
  username: yup
    .string()
    .min(6, 'Username Must be 6 Character')
    .required('Username is Required'),
  email: yup
    .string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    )
    .required(),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is Required'),
});

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const router = useRouter();
  const [roleFromParams, setRoleFromParams] = useState('buyer'); // ✅ Fix by using state
  const { setAuthfield } = GlobalDetails();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setgoogleLoading] = useState(false);

  const OnSubmitHandler = async (data) => {
    const { email, password, username } = data;
    setLoading(true);
    try {
      // Username check
      const { data: existingUserName } = await supabase
        .from('profiles')
        .select('*')
        .eq('name', username)
        .limit(1);

      if (existingUserName?.length > 0) {
        Swal.fire({ icon: 'error', text: `Username Already Exists` });
        return;
      }

      // Email check
      const { data: existingEmail } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .limit(1);

      if (existingEmail?.length > 0) {
        Swal.fire({ icon: 'error', text: `Email Already Exists` });
        return;
      }

      // Signup user
      const { data: signUpData, error: authError } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            emailRedirectTo: 'https://next-application-pi.vercel.app/login',
          },
        }
      );

      if (authError) {
        Swal.fire({ icon: 'error', text: authError.message });
        return;
      }

      setAuthfield((prev) => {
        const updatedAuthField = {
          ...prev,
          email: signUpData?.user?.email,
          username,
        };
        localStorage.setItem(
          'AuthFieldVerifyPage',
          JSON.stringify(updatedAuthField)
        );
        return updatedAuthField;
      });

      // Insert into 'profiles' table
      const { error: insertError } = await supabase.from('profiles').insert([
        {
          id: signUpData?.user?.id,
          role: roleFromParams,
          name: username,
          email,
        },
      ]);

      if (insertError) {
        Swal.fire({ icon: 'error', text: insertError.message });
        return;
      }

      Swal.fire({
        icon: 'success',
        text: `User Registered Successfully!`,
      }).then(() => {
        router.push('/verifyaccount');
      });
    } catch (error) {
      Swal.fire({ icon: 'error', text: error.message });
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <Suspense>
      <div className="fixed inset-0 bg-custom-gradient flex items-center justify-center z-50">
        <div className="bg-white p-6 border-2 rounded-2xl shadow-lg sm:w-[70%] lg:w-[40vw] w-full sm:mx-0 mx-2 relative">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mt-2">Welcome Back</h2>
            <p className="text-gray-500 text-sm">Sign Up to your account</p>
          </div>

          <div className="mt-4">
            <form
              className="flex-col gap-1 flex"
              onSubmit={handleSubmit(OnSubmitHandler)}
            >
              <input
                {...register('username')}
                type="text"
                required
                name="username"
                placeholder="Enter Your Username"
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors.username?.message}</p>

              <input
                {...register('email')}
                required
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors.email?.message}</p>

              <input
                {...register('password')}
                type="password"
                placeholder="Enter Your Password"
                className="w-full px-4 py-3 sm:py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <p>{errors.password?.message}</p>

              <button
                type="submit"
                className="w-full bg-black text-white p-3 rounded-lg mt-4 hover:bg-unique"
              >
                {loading ? <CSpinner /> : 'Create Account'}
              </button>
              <div className="mt-4 text-center">
                <p className="text-black text-md">Or Login with</p>
                <div className="flex flex-col items-center justify-center gap-4 mt-2">
                  <button
                    onClick={() => signInWithGoogle(setgoogleLoading)}
                    disabled={googleLoading}
                    type="button"
                    className="w-full px-3 py-2 flex items-center gap-2 justify-center rounded-[8px] text-[16px] text-black bg-gray-200 x my-[10px]"
                  >
                    {googleLoading ? (
                      <CSpinner color="text-black" size="sm" />
                    ) : (
                      <FcGoogle size={20} style={{ marginRight: '2px' }} />
                    )}
                    {googleLoading ? '' : 'Sign In with Google'}
                  </button>
                  {/* <button onClick={signInWithFacebook} className="flex w-full justify-center bg-black text-white  items-center gap-2 px-4 py-2 border rounded-lg  ">
                              <BsFacebook size={20} className="text-blue-500" />
                              Facebook
                            </button> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Register;
