import prisma from "@/db";
import bcrypt from "bcrypt";
export const login = async(credentials)=>{
    const{username,password}=credentials;
    // return {username,password};
    try {
        const user = await prisma.user.findUnique({
            where:{
                username:username
            }
        })
        if(!user){
            // console.log("user not found");
            throw new Error("User not found");
        }
        const validPassword = await bcrypt.compare(password,user.password);
        // console.log(validPassword);
        if(!validPassword){
            throw new Error("Invalid password");
        }
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to login");
    }
}