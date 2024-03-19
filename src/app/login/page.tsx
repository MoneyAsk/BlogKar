"use client";
import { trpc } from "@/_trpc/client";
import { LoginGrid } from "@/components/LoginGrid";
import { signIn } from "next-auth/react";

import Image from "next/image";
import { useState } from "react";

const LoginPage = () => {
    // const getUsers = trpc.getTodos.useQuery();
    // console.log(getUsers.data);
    const[userDetails,setuserDetails]=useState({
      username:'',
      password:''
    })

  return (
    
    <div className=" h-screen w-screen p-16 flex ">
      <div className=" h-full flex-col p-6 ">
        <div className=" font-bold text-3xl mb-8">Sign in </div>
        
        <div className='ml-5 mb-3'>
          <button
            className=" w-42 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg border border-blue-gray-500 text-blue-gray-500 hover:opacity-75 focus:ring focus:ring-blue-gray-200 active:opacity-[0.85] flex items-center gap-3"
            type="button" onClick={async()=>{ await signIn('google'),{callbackUrl:"/blog"} }}
          >
            <Image
              src="https://docs.material-tailwind.com/icons/google.svg"
              alt="metamask"
              height={6}
              width={6}
              className="w-6 h-6"
            />
            Continue with Google
          </button>
        </div>

        <div className='ml-5 mb-3'>
          <button
            className="w-[266px] align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg border border-blue-gray-500 text-blue-gray-500 hover:opacity-75 focus:ring focus:ring-blue-gray-200 active:opacity-[0.85] flex items-center gap-3"
            type="button" onClick={async()=>{ await signIn('github',{callbackUrl:"/blog"}) }}
          >
            <Image
              src="/github.svg"
              alt="github"
              height={6}
              width={6}
              className="w-6 h-6"
            />
            Continue with Github
          </button>
        </div>

        <div className='ml-5 mb-3'>
          <button
            className="w-[267px] align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg border border-blue-gray-500 text-blue-gray-500 hover:opacity-75 focus:ring focus:ring-blue-gray-200 active:opacity-[0.85] flex items-center gap-3"
            type="button"
          >
            <Image
              src="https://docs.material-tailwind.com/icons/twitter.svg"
              alt="github"
              height={6}
              width={6}
              className="w-6 h-6 border-2"
            />
            Continue with Twiiter
          </button>
        </div>
        
        <div className='flex mb-3  w-[267px] ml-5'>
            <hr className='w-full border-t border-blue-gray-300 my-4 border-2'/>
            <div className='mx-4 text-blue-gray-300 my-1 font-bold'>or</div>
            <hr className='w-full border-t border-blue-gray-300 my-4 border-2'/>
        </div>

        <div className="relative w-[267px] h-12 mb-[20px] ml-5 ">
          <input
            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            placeholder=" " onChange={(e)=>setuserDetails({...userDetails,username:e.target.value})} value={userDetails.username}
          />
          <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-[50px] before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
            Username
          </label>
        </div>

        <div className="relative w-[267px] h-12 mb-[20px] ml-5 ">
          <input type="password"
            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            placeholder=" " onChange={(e)=>setuserDetails({...userDetails,password:e.target.value})} value={userDetails.password}
          />
          <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-[50px] before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
            Password
          </label>
        </div>

        <div className=" w-[267px] text-center ml-5 mb-4 ">
          <button
            className="w-full  h-[40px] text-[17.5px] align-middle select-none font-bold text-center text-black transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs px-6  bg-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
            type="button" onClick={async()=>{ await signIn('credentials',{username:userDetails.username,password:userDetails.password},{callbackUrl:"/blog"}) }}
          >
            Login
          </button>
        </div>

        <div className=" w-[267px] text-center ml-5 mb-6 ">
          <button
            className="w-full border h-[40px] text-[17.5px] align-middle select-none font-bold text-center text-white transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs px-6  bg-black shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
            type="button"
          >
            Forgot Password?
          </button>
        </div>

        <div className="ml-5">
            Doesn&apos;t have an account? <a href="#" className="text-blue-500">Sign up</a>
        </div>

      </div>

      <div className=' w-full'>
        <LoginGrid />
      </div>

    </div>
  );
};

export default LoginPage;
