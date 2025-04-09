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
  const [roleFromParams, setRoleFromParams] = useState('buyer');
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
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-xl  shadow-xl sm:w-[70%] lg:w-[50%] xl:w-[30%] w-full sm:mx-0 mx-4 relative border border-gray-100">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500 mt-2">Join our community today</p>
          </div>

          <div className="mt-2">
            <form
              className="flex-col gap-4 flex"
              onSubmit={handleSubmit(OnSubmitHandler)}
            >
              <div>
                <input
                  {...register('username')}
                  type="text"
                  required
                  name="username"
                  placeholder="Username"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('email')}
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('password')}
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg mt-2 hover:opacity-90 transition-all shadow-md"
              >
                {loading ? <CSpinner /> : 'Sign Up'}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                onClick={() => signInWithGoogle(setgoogleLoading)}
                disabled={googleLoading}
                type="button"
                className="w-full px-3 py-3 flex items-center gap-2 justify-center rounded-lg text-[16px] text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all"
              >
                {googleLoading ? (
                  <CSpinner color="text-gray-700" size="sm" />
                ) : (
                  <FcGoogle size={20} />
                )}
                {googleLoading ? '' : 'Sign up with Google'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Register;