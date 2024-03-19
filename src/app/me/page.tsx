"use client";
import { trpc } from "@/_trpc/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { NavbarD } from "@/components/ui/Navbar";

const Me = () => {
const { data: session } = useSession();
const router = useRouter();
//@ts-ignore
const post = trpc.getPostbyAuthor.useQuery(session?.user?.id);
//@ts-ignore
const likes = trpc.getLikesByUser.useQuery(session?.user?.id);
//   console.log(likes.data);
const liked = likes.data?.map((like:any) => like.postId) ?? [];
const userLikedPosts = trpc.getPostsbyIdArray.useQuery(liked);
// console.log(userLikedPosts.data);

 
//   console.log(liked);
  //   console.log(post.data);
  // console.log(session);
  return (
    <div className=" px-6 h-[100vh] w-[100vw] sm:px-2 md:px-36 lg:px-64 xl:px-96 ">
        {userLikedPosts.isLoading? (<Loading/>) :( 
      <div className=" h-full flex flex-col">
        <div className=" basis-1/3 flex gap-4 ">
          <div className=" basis-1/3 flex items-center justify-end">
            <Image
              src={session?.user?.image || "/noavatar.png"}
              alt="Profile Picture"
              width={140}
              height={100}
              className=" rounded-[70px]"
            />
          </div>
          <div className=" basis-2/3  flex flex-col gap-2 pt-14 font-mono">
            <div>
              <h1 className="text-2xl font-bold">
                {session?.user?.name}{" "}
                <span className="text-[20px] text-blue-500 font-medium">
                    {/* @ts-ignore */}
                 {session?.user?.username}
                </span>
              </h1>
            </div>
            <div className="">Life is to Short</div>
            <div className="mt-auto text-xs text-gray-700">
              <Link href="/me/edit" className="">
                {" "}
                Edit Profile{" "}
              </Link>
            </div>
          </div>
        </div>
        <div className="basis-2/3  ">
          <Tabs defaultValue="Your Posts" className="w-full h-full">
            <TabsList className="w-full h-[50px] font-mono font-bold bg-white ">
              <TabsTrigger value="Your Posts" className="text-xl">
                Posts
              </TabsTrigger>
              <TabsTrigger value="Likes" className="text-xl">
                Likes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Your Posts" className="w-3/4 h-3/4  pt-4 ml-14 xl:ml-24">
              {post.isLoading && (
                <div className="px-24 -mt-32">
                  <Loading />
                </div>
              )}
              <Carousel className="w-full  h-full mt-2 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-md">
                <CarouselContent className="h-[318px] px-4 py-2 ">
                  {post.data?.map((post) => (
                    <CarouselItem
                      key={post.id}
                      className=""
                      onClick={() => {
                        router.push(`/blog/${post.id}`);
                      }}
                    >
                      <h1 className="font-mono mb-3 font-semibold text-sm">
                        {post.title}
                      </h1>
                      <div className="w-full h-[170px]  mb-2">
                      {post.image && (
                        <Image
                          src={post.image}
                          alt="Profile Picture"
                          height={250}
                          width={250}
                            // fill={true}
                            objectFit="contain"
                          className=" mx-auto mb-4"
                        />
                      )}
                      </div>

                      <p className="font-serif line-clamp-3">
                        {post.content}.......
                      </p>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="border" />
                <CarouselNext />
              </Carousel>
            </TabsContent>
            
            <TabsContent value="Likes" className="w-3/4 h-3/4  pt-4 ml-14 xl:ml-24">
            
              <Carousel className="w-full  h-full mt-2 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-md">
                <CarouselContent className="h-[318px] px-4 py-2 ">
                  {userLikedPosts.data?.map((post) => (
                    <CarouselItem
                      key={post.id}
                      className=""
                      onClick={() => {
                        router.push(`/blog/${post.id}`);
                      }}
                    >
                      <h1 className="font-mono mb-3 font-semibold text-sm">
                        {post.title}
                      </h1>
                      <div className="w-full h-[170px]  mb-2">
                      {post.image && (
                          <Image
                          src={post.image}
                          alt="Profile Picture"
                          height={250}
                          width={250}
                          className=" mx-auto mb-4"
                          />
                          )}
                      <p className="font-serif line-clamp-3">
                        {post.content}.......
                      </p>
                          </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="border" />
                <CarouselNext />
              </Carousel>
            </TabsContent>
          </Tabs>
        </div>
      </div>)}
    </div>
  );
};
export default Me;

{
  /* <div className="grid grid-cols-1 gap-4">
                    {post.data?.map((post) => (
                    <div key={post.id} className="" onClick={()=>{
                        router.push(`/blog/${post.id}`);
                    }} >
                        <h1>{post.title}</h1>

                        {post.image && <Image
                        src={post.image}
                        alt="Profile Picture"
                        width={200}
                        height={200}
                        />}
                        <p>{post.content}</p>
                    </div>
                    ))}
                </div> */
}
