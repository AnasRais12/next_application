'use client';
import Login from '@/components/authCompoonent/Login';

function page() {
  return <Login background="bg-custom-gradient " position="fixed" />;
}

export default page;

{
  /* <div className="static h-screen flex   items-center sm:items-center  justify-center w-full z-50  bg-opacity-50">
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
                  {githubLoading ? "" : "Sign In with GitHub"} {/* Button text */
}
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
