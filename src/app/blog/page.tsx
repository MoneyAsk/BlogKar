"use client";
import { NavbarD } from "@/components/ui/Navbar";
import { useSession } from "next-auth/react";
import Image from "next/image";
// import { calsans } from "@/fonts/calsans";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam-blog";
import { trpc } from "@/_trpc/client";
import Link from "next/link";
import Loading from "../loading";

const BlogPage = () => {
  const { data: session } = useSession();
    const posts = trpc.getPosts.useQuery();
    // console.log(posts.data);
    // const fetchAuthorName = async (authorId:string) => {
    //     // Assuming there is an API endpoint to fetch author information by ID
    //     const authorInfo = trpc.getAuthorById.useQuery(authorId);
    //     return authorInfo?.data?.name || "Unknown Author";
    //   };

  return (
    <div className=" overflow-hidden">
      <NavbarD />
      {posts.isLoading ?(<div><Loading/></div>):(
      <TracingBeam className="px-6 mt-[10px]">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          {posts.data?.map((item, index) => (
            item.published &&
            <div key={`content-${index}`} className="mb-10">
              <h2 className="bg-black text-white rounded-full text-2xl font-semibold w-fit px-4 py-1 mb-3 ml-[-10px]">
                {/* {item.badge} */}
                {item.title}

              </h2>

              {/* <p className={twMerge( "text-sm  mb-4 ml-4")}>
              </p> */}

              <div className=" text-sm prose prose-sm dark:prose-invert font-serf font-normal">
                {item?.image && (
                  <Image
                    src={item.image}
                    alt="blog thumbnail"
                    height="800"
                    width="800"
                    className="rounded-lg mb-10 object-cover"
                  />
                )}

                {item.content}
                <div className="mt-2 font-bold text-blue-500">
                    <Link href={`/blog/${item.id}`}>Read More!</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>)}
      {/* {JSON.stringify(posts.data)} */}
    </div>
  );
};


export default BlogPage;

{
  /* <h1>Blog</h1>
{session ? (
    <div>
        <h2>Welcome {session.user?.name}</h2>
        <p>Blog content</p>
        {session.user?.image?(
            <Image src={session.user?.image} alt="" width={100} height={100} />
            ):(<div></div>)}
        </div>

) : (
<div>
        <p>You need to sign in to view the blog</p>
    </div>
)} */
}
