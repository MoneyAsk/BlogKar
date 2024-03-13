import { trpc } from "@/_trpc/client";

const CommentName = ({authorId}:any)=>{
    // console.log(authorId);
    const user = trpc.getAuthorById.useQuery(authorId);
    // console.log(user.data);
    return (
        <h1 className="text-lg font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">{user.data?.username || user.data?.name  || "Anonymus"}</h1>
    )
}
export default CommentName;