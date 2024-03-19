"use client";
import { trpc } from "@/_trpc/client";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { EdgeStoreApiClientError } from "@edgestore/react/shared";
import { useEdgeStore } from "@/lib/edgestore";

const Edit = () => {
  const { data: session } = useSession();
  const { edgestore } = useEdgeStore();

  const [userDetails, setUserDetails] = useState({
    bio: "",
  });
  // console.log(userDetails);
  const [file, setFile] = useState<File>();
  // console.log(file);
  //@ts-ignore
  const user = trpc.getUser.useQuery(session?.user?.id);
  //@ts-ignore
  const userProfile = trpc.getProfile.useQuery(session?.user?.id);
  // console.log(userProfile.data);
  const updateUserProfile = trpc.updateUserProfile.useMutation();
  // console.log(user.data);

  useEffect(() => {
    setUserDetails({
      bio: userProfile.data?.bio || "",
    });
  }, [userProfile.data]);

  return (
    <div className="flex justify-center">
      <div className=" flex-col h-3/4 w-4/5 max-w-[540px] mt-14 border-2 py-12 rounded-3xl shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
        {/* <div className=" w-5/6 mb-2 text-2xl font-mediumtext-black md:text-3xl xl:text-4xl">
          Edit Your Profile
        </div> */}
        <div className=" w-5/6 mb-10  mx-auto">
          <Image
            src={userProfile.data?.image || "/noavatar.png"}
            alt="profile picture"
            width={100}
            height={100}
            className="mx-auto rounded-[50px]"
          />
        </div>

        <div className="relative w-5/6 min-w-[200px]  mb-[20px] mx-auto">
          <textarea
            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500 min-h-[70px]" // Adjust min-h to your desired minimum height
            // Adjust min-h to your desired minimum height
            placeholder=""
            value={userDetails.bio}
            onChange={(e) => {
              setUserDetails({ ...userDetails, bio: e.target.value });
            }}
          />
          <label className="flex w-full h-full font-mono font-bold select-none pointer-events-none absolute left-0  !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
            Bio
          </label>
        </div>

        <div className=" w-5/6 min-w-[200px]  flex justify-center  font-normal mt-4 gap-1 mx-auto">
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
        <div className=" w-5/6 text-center mx-auto">
          <button
            className="w-full   h-[50px] text-[17px] align-middle select-none font-bold text-center text-black transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3 px-6 bg-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
            type="button"
            onClick={async () => {
              let imageUrl = "";
              try {
                if (file) {
                  const res = await edgestore.publicFiles.upload({
                    file,
                    onProgressChange: (progress) => {
                      console.log(progress);
                    },
                  });
                  //   console.log(res.url);
                  //   url = res.url;
                  // setUrl(res.url);
                  imageUrl = res.url;
                  //   console.log(url);
                }
              } catch (error) {
                if (error instanceof EdgeStoreApiClientError) {
                  // if it fails due to the `maxSize` set in the router config
                  if (error.data.code === "FILE_TOO_LARGE") {
                    // alert("File too large.");
                    toast.error("File too large", { duration: 3000 });
                    return;
                  }
                  if (error.data.code === "MIME_TYPE_NOT_ALLOWED") {
                    // alert(
                    //   `File type not allowed. Allowed types are ${error.data.details.allowedMimeTypes.join(
                    //     ", "
                    //   )}`
                    // );
                    toast.error(
                      `File type not allowed. Allowed types are ${error.data.details.allowedMimeTypes.join(
                        ", "
                      )}`,
                      { duration: 3000 }
                    );
                    return;
                  }
                  // if it fails during the `beforeUpload` check
                  if (error.data.code === "UPLOAD_NOT_ALLOWED") {
                    // alert("You don't have permission to upload files here.");
                    toast.error(
                      "You don't have permission to upload files here",
                      {
                        duration: 3000,
                      }
                    );
                    return;
                  }
                }
              }
              const response = await updateUserProfile.mutateAsync(
                {
                  //@ts-ignore
                  id: session?.user?.id,
                  bio: userDetails.bio,
                  image: imageUrl,
                },
                {
                  onSuccess: () => {
                    setFile(undefined);
                    userProfile.refetch();
                  },
                }
              );
              if (response) {
                console.log("Profile updated successfully:", response);
                toast.success("Profile updated successfully", { duration: 3000 })
              } else {
                console.error("Failed to update profile");
                toast.error("Failed to update profile", { duration: 3000 });
              }
            }}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
