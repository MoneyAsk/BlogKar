"use client";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { EdgeStoreApiClientError } from "@edgestore/react/shared";
import { trpc } from "@/_trpc/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { NavbarD } from "@/components/ui/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import React, { useRef } from "react";

const AddPost = () => {
  const router = useRouter();
  const { data: session } = useSession();
  //@ts-ignore
  const id = session?.user.id;
  //   console.log(id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File>();
  console.log(file);
  const [imageSrc, setImageSrc] = useState<string>('');
  const { edgestore } = useEdgeStore();
  //   let url: string | undefined;
  // const [url, setUrl] = useState("");
  // console.log(url);

  const [post, setPost] = useState({
    title: "",
    content: "",
    publish: true,
  });
  const addPost = trpc.createPost.useMutation();
  const handlePictureChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        setImageSrc(event.target?.result as string); 
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <NavbarD />
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="flex-col h-3/4 w-4/5 mt-14 ml-20 pt-12  sm:ml-28 md:ml-40 lg:basis-1/2">
          <div className="text-2xl font-bold font-mono  mb-[30px] text-black md:text-3xl xl:text-4xl">
            Create your post
          </div>
          <div className="relative w-5/6 min-w-[200px] h-16 mb-[20px] ">
            <input
              className="peer w-full h-full bg-transparent  text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
              placeholder=""
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
            <label className="flex w-full h-full font-mono font-bold select-none pointer-events-none absolute left-0  !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-[50px] before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
              Title
            </label>
          </div>

          <div className="relative w-5/6 min-w-[200px] mb-[20px]">
            <textarea
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border-2 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500 min-h-[150px]" // Adjust min-h to your desired minimum height
              placeholder=""
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
            />
            <label className="flex w-full h-full font-mono font-bold select-none pointer-events-none absolute left-0  !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500">
              Content
            </label>
          </div>

          <div className=" w-5/6 min-w-[200px] mb-4 flex justify-between font-mono font-bold gap-2">
            <button
              className="ml-10 sm:ml-20 border  flex-shrink-0  transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 bg-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
              // onClick={async () => {
                
              // }}
              disabled={true}
            >
              Upload Image
            </button>

            <input
              type="file"
              className=" mt-2 "
              onChange={handlePictureChange}
              ref={fileInputRef}
              // (e) => {
              //   setFile(e.target.files?.[0]);
              // }
            />
          </div>
          <div className="relative w-5/6 min-w-[200px] mb-[4px] ml-2 h-10">
            <input
              type="checkbox"
              checked={post.publish}
              onChange={(e) => setPost({ ...post, publish: e.target.checked })}
              className="absolute left-0 w-4 h-4 bg-transparent border border-blue-gray-200 rounded-[7px] focus:border-blue-500"
            />
            <label className="flex w-1/4 items-center pl-7 font-semibold pointer-events-none text-black font-mono text-sm">
              Publish
            </label>
            <button
              className="absolute right-4 font-mono font-semibold top-0 text-blue-400 text-sm"
              onClick={() => {
                setPost({ title: "", content: "", publish: true });
                setImageSrc("");
                if (fileInputRef.current) {
                  fileInputRef.current.value = ""; // Clear the file input value
                }
              }}
            >
              Create New Post
            </button>
          </div>

          {/* <div className="ml-[160px] mb-3"></div> */}
          <div className=" w-5/6 text-center">
            <button
              className="w-full  h-[50px] text-[17px] align-middle select-none font-bold text-center text-black transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 bg-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
              type="button"
              onClick={async () => {
                if (!post.title && !post.content) {
                  toast.error("Title and Content are required", {
                    duration: 2000,
                  });
                  return;
                }
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
                      toast.error("File too large", {duration: 3000,});
                      return;
                    }
                    if (error.data.code === "MIME_TYPE_NOT_ALLOWED") {
                      // alert(
                      //   `File type not allowed. Allowed types are ${error.data.details.allowedMimeTypes.join(
                      //     ", "
                      //   )}`
                      // );
                      toast.error(`File type not allowed. Allowed types are ${error.data.details.allowedMimeTypes.join(
                        ", "
                      )}`, {duration: 3000,});
                      return;
                    }
                    // if it fails during the `beforeUpload` check
                    if (error.data.code === "UPLOAD_NOT_ALLOWED") {
                      // alert("You don't have permission to upload files here.");
                      toast.error("You don't have permission to upload files here", {
                        duration: 3000,
                    });
                      return;
                  }
                }
                // console.log("url", imageUrl);
                
              }
              const response = await addPost.mutateAsync({
                authorId: id,
                title: post.title,
                content: post.content,
                published: post.publish,
                image: imageUrl,
              });

              // console.log("post added", response);
              toast.success("Post created successfully", {
                duration: 2000,
              });
              }}
            >
              Create
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-4 font-mono px-8 lg:basis-1/2 gap-5">
          <div className="mb-[45px]">
            <h1 className="text-center">Your Post Looks Like this</h1>
          </div>
          <div>
            <h1 className=" text-3xl font-bold">{post.title}</h1>
          </div>
          <div>
            {imageSrc ? (
              <Image src={imageSrc} width={500} height={500} alt="Your image" />
            ) : null}
          </div>
          <div>
            <p className="flex-wrap break-all text-lg">{post.content}</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default AddPost;
