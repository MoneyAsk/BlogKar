"use client";
import { trpc } from "@/_trpc/client";
import Comments from "@/components/Comments";
import { LikesPic } from "@/components/LikesPic";
import Loading from "@/components/Loading";
import LikeButton from "@/components/ui/LikeButton";
import { NavbarD } from "@/components/ui/Navbar";
import { router } from "@/server/trpc";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { use, useEffect, useState } from "react";

const Id = ({ params }: any) => {
  const { id } = params;
//   console.log(id);
  const { data: session } = useSession();
  const post = trpc.getPost.useQuery(id);
  const user = trpc.getAuthorById.useQuery(post.data?.authorId ?? "");
    // @ts-ignore
  const userInsession = trpc.getUser.useQuery(session?.user?.id);
  // console.log(userInsession.data)
  const addLike = trpc.postUserLike.useMutation();
  const isLiked = trpc.getUserLike.useQuery({
    // @ts-ignore
    userId: session?.user?.id,
    postId: post.data?.id || " ",
  });
  // console.log(isLiked.data);
  const delLike = trpc.deleteLike.useMutation();
  const comments = trpc.getComments.useQuery(post.data?.id || "");
  // console.log(comments.data);
  const createComment = trpc.createComment.useMutation();
  const [comment, setComment] = useState("");
      

  // console.log(comments.data);
  function click(isLiked: any) {
    // @ts-ignore
    const userId = session?.user?.id;
    const postId = post.data?.id;
    // console.log(userId,postId);
    if (!isLiked.data) {
      if (userId && postId) {
        addLike.mutate({
          userId,
          postId: postId ?? "",
        },{
            onSuccess:()=>{
                isLiked.refetch();
            }
        
        });
      }
    }
    if (isLiked.data) {
      delLike.mutate({
        userId,
        postId: postId ?? "",
      },{
          onSuccess:()=>{
              isLiked.refetch();
          }
      
      });
    }

    return isLiked.data;
  }

  function commentHandler(e: any) {
    if (e.key === "Enter") {
      // console.log(comment);
      // @ts-ignore

      if (session?.user?.id && post.data?.id) {
        if (comment.length < 1) {
          return;
        }
       
        createComment.mutate({
          // @ts-ignore

          authorId: session?.user?.id,
          postId: post.data?.id,
          content: comment,
        },{
            onSuccess:()=>{
                comments.refetch();
            },
        }
        );
        setComment("");
      }
      
    }
  }

  return (
    <div className="xl:px-96 font-mono">
      <NavbarD />
      {post.data ? (
        <div className="flex-wrap flex-col items-center mt-[110px]  h-[100vh] px-6 py-6 sm:px-10 md:px-20 ">
          <h1 className="text-3xl font-semibold  font-mono mb-2">
            {post.data.title}
          </h1>
          <h6 className=" text-sm ml-4 mb-6 font-mono font-medium ">
            -{user.data?.username || user.data?.name}
          </h6>
          {post.data.image ? (
            <div className="  w-[100%] h-[50%]  relative">
              <Image
                src={post.data.image}
                alt=""
                fill
                objectFit="contain"
                className=" "
              />
            </div>
          ) : null}
          <p className="text-lg  mt-10 mb-4">{post.data.content}</p>
          <div className=" flex gap-2">
            <div className=" basis-1 ">
              <LikeButton
                onClick={() => {
                  click(isLiked);
                }}
                isLiked={isLiked}
              />
            </div>
            
            {/* {isLiked.data && <div className=" basis-3/4 self-end font-mono mt-4">
              Liked by <LikesPic id={id} />
            </div>} */}

           <div className=" basis-3/4 self-end font-mono mt-4">
              Liked by <LikesPic id={id} />
            </div>

          </div>

          <div className="  rounded-md flex-col  py-6  mb-4 justify-between  overflow-hidden font-mono">
            <h1 className="text-2xl font-medium mb-4 ml-4 font-mono">
              Comments
            </h1>
            <hr className=" border-[1.5px]" />
            <div className="px-4 py-2">
              <Comments  comments={comments} />
            </div>
            <div className="flex flex-col items-center justify-center ">
              <input
                type="text"
                onKeyDown={commentHandler}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value.trim());
                }}
                placeholder="Write a comment"
                className="w-[90%] h-12 rounded-md border-2 text-black border-gray-300 px-4"
              />
            </div>
          </div>
        </div>
      ) : (
        <div><Loading/></div>
      )}
    </div>
  );
};
export default Id;
