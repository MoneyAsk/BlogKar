"use client";
import { trpc } from "@/_trpc/client";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

const Edit = () => {
  const { data: session } = useSession();
  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    image: "",
  });
  const [file, setFile] = useState<File>();
  //@ts-ignore
  const user = trpc.getUser.useQuery(session?.user?.id);
  console.log(user.data);

  useEffect(() => {
    setUserDetails({
      name: user.data?.name || "Add Name",
      username: user.data?.username || "Add Username",
      email: user.data?.email || "Add Email",
      bio: "Add Bio",
      image: user.data?.image || "/noavatar.png",
    });
  }, [user.data]);

  return (
    <div className="flex justify-center">
      <div className=" flex-col h-3/4 w-4/5 max-w-[540px] mt-14 ml-14 ">
        {/* <div className=" w-5/6 mb-2 text-2xl font-mediumtext-black md:text-3xl xl:text-4xl">
          Edit Your Profile
        </div> */}
        <div className=" w-5/6 mb-2">
          <Image
            src={user.data?.image || "/noavatar.png"}
            alt="profile picture"
            width={100}
            height={100}
            className="mx-auto rounded-[50px]"
          />
        </div>

        <div className="relative w-5/6 min-w-[200px] h-16 mb-[20px]">
          <input
            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent  focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
            placeholder=""
          />
          <label className="flex  w-full h-full select-none pointer-events-none absolute left-0 font-bold !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:flex-grow before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
            Username: {userDetails.username}
          </label>
        </div>

        <div className="relative w-5/6 min-w-[200px]  mb-[20px]">
          <textarea
            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500 min-h-[70px]" // Adjust min-h to your desired minimum height
            // Adjust min-h to your desired minimum height
            placeholder=""
          />
          <label className="flex w-full h-full font-mono font-bold select-none pointer-events-none absolute left-0  !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
            Bio
          </label>
        </div>

        <div className=" w-5/6 min-w-[200px]  flex justify-center  font-normal mt-4 gap-1">
          <SingleImageDropzone
            width={100}
            height={100}
            className=""
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
          />
        </div>
        <div className="ml-[160px] mb-3"></div>
        <div className=" w-5/6 text-center">
          <button
            className="w-full  h-[50px] text-[17px] align-middle select-none font-bold text-center text-black transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 bg-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
            type="button"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
