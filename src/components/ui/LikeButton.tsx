import { trpc } from "@/_trpc/client";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";



export default function LikeButton({onClick,isLiked}:any) {
   
    const[liked,setLiked] = useState(false);
    
    useEffect(() => {
        // Update the liked state once isLiked.data is available
        if (isLiked.data) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      }, [isLiked.data]);
    const handleClick=()=>{
        // if(liked){
        //     onClick(isLiked)
        //     console.log("ye its liked")
        // }
        onClick(isLiked);
        setLiked((prev)=>!prev);
        
        
    }
    if(liked)return (<AiOutlineLike size="40" color="red" onClick={handleClick} />)
    return (<AiOutlineLike size="40" onClick={handleClick} />)
}