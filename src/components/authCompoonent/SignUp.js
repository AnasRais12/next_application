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
import { FormControl, FormHelperText, InputAdornment, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import CSpinner from '@/components/CSpinner';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { CheckCircle, Error } from '@mui/icons-material';
import theme from '@/lib/theme';

const schema = yup.object().shape({
  username: yup
    .string()
    .min(6, 'Username Must be 6 Character')
    .required('Username is Required'),
  email: yup
    .string()
    .email('Invalid email format') 
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    )
   .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is Required'),
});

function Register() {
  const {
    register,
    handleSubmit,
     watch, 
    formState: { errors,isValid},
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const email = watch('email');
const password = watch('password');
const username = watch('username');

// ✅ Disable button if any field is empty
const isDisabled = !email?.trim() || !password?.trim() || !username?.trim();
  const router = useRouter();
  const [roleFromParams, setRoleFromParams] = useState('buyer');
  const { setAuthfield } = GlobalDetails();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setgoogleLoading] = useState(false);
  console.log(errors,isValid,"here is ")

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

  console.log(isValid, "isValid");

  return (
    <Suspense>
     <div className="fixed inset-0 flex items-center z-50 bg-white">
  {/* Image Section (Desktop Only) - Matching Login Page */}
  <div className="hidden lg:flex w-1/2 h-screen bg-gradient-to-br from-blue-100 to-purple-200 relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center p-12">
      <div className="text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Join Us Today!</h2>
        <p className="text-xl opacity-90">Your journey begins here</p>
      </div>
      <div className="absolute bottom-8 left-8 right-8 text-white opacity-80 text-sm">
        <p>"Great things start with small beginnings."</p>
      </div>
    </div>
    <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/online-shopping-concept-landing-page_52683-20156.jpg?ga=GA1.1.1568870668.1738407596&semt=ais_country_boost&w=740')] bg-cover bg-center opacity-100 border-r-2" />
  </div>

  {/* Register Form Section */}
  <div className="w-full lg:w-1/2 h-screen flex items-center justify-center p-4 sm:p-8">
    <div className="max-w-md w-full">
      {/* Logo/Header - Matching Login Page */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary  hover:bg-green-800 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-primary">Create an account</h1>
        <p className="text-gray-500 mt-2">Join our community today</p>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit(OnSubmitHandler)} className="space-y-5">
<FormControl fullWidth error={!!errors.username} sx={{ mb: 2 }}>
      <label className="block text-sm font-medium primary mb-1">Full Name</label>
      <TextField
      placeholder="Enter Your Full Name"
      {...register('username')}
        variant="outlined"
        fullWidth
 sx={(theme) => ({
      width: '100%',
   bgColor: 'white',

      '& .MuiOutlinedInput-root': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: errors.username
            ? theme.palette.error.main // Red border if there's an error
            : isValid
            ? '#4caf50' // Green border if form is valid
            : theme.palette.primary.main,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: errors.username
            ? theme.palette.error.main // Red border if there's an error
            : isValid
            ? '#4caf50' // Green border if form is valid
            : theme.palette.primary.main,
        },
      },
    })}
        InputProps={{
          endAdornment: (
                      <>
                        {errors.username && (
                          <span style={{ color: '#ef4444', fontSize: '1rem', marginRight: '8px' }}>
                            <Error />
                          </span>
                        )}
                        {!errors.username && isValid && (
                          <span style={{ color: '#4caf50', fontSize: '1rem', marginRight: '8px' }}>
                            <CheckCircle />
                          </span>
                        )}
                      </>
                    ),
        }}
      />
      {errors.username && (
               <FormHelperText sx={{ color: '#ef4444', fontSize: '0.9rem',fontWeight: '600',fontFamily:theme.typography.fontFamily,marginLeft: '4px' }}>
          {errors.username.message}
        </FormHelperText>
      )}
    </FormControl>

<FormControl fullWidth error={!!errors.email} sx={{ mb: 2 }}>
      <label className="block text-sm font-medium primary mb-1">Email</label>
      <TextField
      placeholder="Enter Your Email"
      {...register('email')}
        variant="outlined"
        fullWidth
 sx={(theme) => ({
   bgColor: 'white',
      width: '100%',
      '& .MuiOutlinedInput-root': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: errors.email
            ? theme.palette.error.main // Red border if there's an error
            : isValid
            ? '#4caf50' // Green border if form is valid
            : theme.palette.primary.main,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: errors.email
            ? theme.palette.error.main // Red border if there's an error
            : isValid
            ? '#4caf50' // Green border if form is valid
            : theme.palette.primary.main,
        },
      },
    })}
        InputProps={{
          endAdornment: (
                      <>
                        {errors.email && (
                          <span style={{ color: '#ef4444', fontSize: '1rem', marginRight: '8px',fontFamily:theme.typography.fontFamily,fontWeight: 'bold' }}>
                            <Error />
                          </span>
                        )}
                        {!errors.email && isValid && (
                          <span style={{ color: '#4caf50', fontSize: '1rem', marginRight: '8px', fontFamily:theme.typography.fontFamily,fontWeight: 'bold' }}>
                            <CheckCircle />
                          </span>
                        )}
                      </>
                    ),
        }}
      />
      {errors.email && (
        <FormHelperText sx={{ color: '#ef4444', fontSize: '0.9rem',fontWeight: '600',fontFamily:theme.typography.fontFamily,marginLeft: '4px' }}>
          {errors.email.message}
        </FormHelperText>
      )}
    </FormControl>

  <div>
    <label className="block text-sm font-medium text-[#1f2937] mb-1">Password</label>
    <input
      {...register('password')}
      type="password"
      placeholder="Enter Your Password"
      className="w-full px-4 py-3 border border-[#e6e6e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all"
    />
    {errors.password && (
      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
    )}
  </div>

  <Button
    type="submit"
    disabled={loading || isDisabled}
    className="w-full bg-primary text-white p-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center h-12"
  >
    {loading ? <CSpinner color="text-white" size="sm" /> : 'Create Account'}
  </Button>
</form>

      {/* Divider - Matching Login Page */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-white text-gray-500 text-sm">OR</span>
        </div>
      </div>

      {/* Social Login - Matching Login Page */}
      <Button
        onClick={() => signInWithGoogle(setgoogleLoading)}
        disabled={googleLoading}
        type="button"
        className="w-full px-4 py-3 flex items-center justify-center gap-2 rounded-lg "
      >
        {googleLoading ? (
          <CSpinner color="text-[#1f2937]" size="sm" />
        ) : (
          <>
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </>
        )}
      </Button>

      {/* Login Link - Similar to Sign Up Link in Login Page */}
      <div className="text-center mt-6">
        <p className="text-[#1f2937]">
          Already have an account?{' '}
          <Link href={'/login'}
            // onClick={moveToLogin}
            className="text-green-800 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>
    </Suspense>
  );
}

export default Register;