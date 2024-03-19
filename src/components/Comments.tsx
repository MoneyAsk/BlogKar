import Image from "next/image"
import CommentName from "./CommentName";
import { useEffect, useState } from "react";
const Comments = ({user,comments}:any) =>{
    console.log(user);
    // console.log(comments.data);
    
    
    
    return(
        comments.data?.map((comment:any)=>{
            return(
                <div key={comment.id} className="flex flex-row items-center justify-start mb-4 ml-  mt-2 w-full ">
                    <div className="w-14 h-14 rounded-full border-2 border-gray-300 flex-shrink-0 self-start">
                        <Image src={user.image || "/noavatar.png"} width={100} height={100} alt="" className=" object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500" />
                    </div>
                    <div className="flex flex-col items-start justify-start ml-4 flex-wrap flex-shrink">
                        <CommentName authorId={comment.authorId}/>
                        {/* <h1 className="text-lg font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">{user?.username || user?.name  || "Anonymus"}</h1> */}
                        <p className="text-sm font-light flex-wrap">{comment.content}</p>
                    </div>
                </div>
            )
        }
    )
    )
    
}


export default Comments;
// <div className="flex flex-row items-center justify-start mb-4 ml-  mt-2 w-full ">
//                 <div className="w-14 h-14 rounded-full border-2 border-gray-300 flex-shrink-0 self-start">
//                     <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80" width={100} height={100} alt="" className=" object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500" />
//                 </div>
//                 <div className="flex flex-col items-start justify-start ml-4 flex-wrap flex-shrink">
//                     <h1 className="text-lg font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">{user?.username || user?.name  || "Anonymus"}</h1>
//                     <p className="text-sm font-light flex-wrap">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, eius amet! Id, ratione. Sequi assumenda neque dicta quis illum corrupti odit cumque hic deleniti amet. Atque fugiat culpa ab asperiores.</p>
//                 </div>
//         </div>