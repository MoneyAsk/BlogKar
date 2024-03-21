import {z} from "zod";
import {router,publicProcedure} from "../trpc";
import prisma from "@/db";
import bcrypt from "bcrypt";
import { TRPCError } from "@trpc/server";


const userSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

export const appRouter = router({
    getPosts: publicProcedure.query(async()=>{
        return await prisma.post.findMany();
    }),
    getAuthorById:publicProcedure.input(z.string()).query(async(opts)=>{
        return await prisma.user.findUnique({
            where:{
                id:opts.input
            },
            select:{
                id:true,
                name:true,
                username:true,
                image:true,
                Profile:true
            }
        });
    }),
    createUser:publicProcedure.input(userSchema)
        .mutation(async(opts)=>{
            

            const name = await prisma.user.findUnique({
                where:{
                    username:opts.input.username
                }
            })

            if(name){
                throw new TRPCError({
                    code:"BAD_REQUEST",
                    message:"[{\"path\":[\"username\"],\"message\":\"Username already exists!\"}]"
                })
            }
            
            const existingEmail = await prisma.user.findUnique({
                    where: {
                        email: opts.input.email
                    }
                });
        
            if (existingEmail) {
                    throw new TRPCError({
                            code:"BAD_REQUEST",
                            message:"[{\"path\":[\"email\"],\"message\":\"Email already exists!\"}]"
                    })
            }
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
            if (!opts.input.password.match(passwordRegex)) {
                throw new TRPCError({
                    code:"BAD_REQUEST",
                    message:"[{\"path\":[\"password\"],\"message\":\"Password must contain at least one uppercase letter, one lowercase letter, one number and one special character!\"}]"
                })
            }
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(opts.input.password, saltRounds);

          


            const newUser = await prisma.user.upsert({
                where:{
                    email:opts.input.email
                },
                update:{},
                create:{
                    name:opts.input.name,
                    username:opts.input.username,
                    email:opts.input.email,
                    password:hashedPassword,
                    updatedAt: new Date() // Add the updatedAt property
                }
            })
            return "newUser created successfully!";

        }),
    getPost:publicProcedure.input(z.string()).query(async(opts)=>{
        return await prisma.post.findUnique({
            where:{
                id:opts.input
            }
        });
    
    }),
    postUserLike:publicProcedure.input(z.object({
        userId:z.string(),
        postId:z.string()
    })).mutation(async(opts)=>{
        const like = await prisma.like.create({
            data:{
                userId:opts.input.userId,
                postId:opts.input.postId,
                updatedAt: new Date() // Add the updatedAt property
            }
        })
        return like;
    
    }),
    deleteLike:publicProcedure.input(z.object({
        userId:z.string(),
        postId:z.string()
    })).mutation(async(opts)=>{
        return await prisma.like.deleteMany({
            where:{
                userId:opts.input.userId,
                postId:opts.input.postId
            }
        })
    }),

    getUserLike:publicProcedure.input(z.object({
        userId:z.string(),
        postId:z.string()
    })).query(async(opts)=>{
        return await prisma.like.findFirst({
            where:{
                userId:opts.input.userId,
                postId:opts.input.postId
            }
        })
    }),
    getComments:publicProcedure.input(z.string()).query(async(opts)=>{
        return await prisma.comment.findMany({
            where:{
                postId:opts.input
            }
        })

    }),
    createComment:publicProcedure.input(z.object({
        authorId:z.string(),
        postId:z.string(),
        content:z.string()
    })).mutation(async(opts)=>{
        return await prisma.comment.create({
            data:{
                authorId:opts.input.authorId,
                postId:opts.input.postId,
                content:opts.input.content,
                updatedAt: new Date() // Add the updatedAt property
            }
        })
    }),
    getLikes:publicProcedure.input(z.string()).query(async(opts)=>{
        return await prisma.like.findMany({
            where:{
                postId:opts.input
            }
        })
    }),
    getUserLikepfps:publicProcedure.input(z.array(z.string())).query(async(opts)=>{
        return await prisma.user.findMany({
            where:{
                id:{
                    in:opts.input
                }
            },
            select:{
                id:true,
                name:true,
                username:true,
                image:true,
                Profile:true
            }

        })
    }),
    createPost:publicProcedure.input(z.object({
        authorId:z.string(),
        title:z.string(),
        content:z.string(),
        published:z.boolean(),
        image:z.string()
    })).mutation(async(opts)=>{
        return await prisma.post.create({
            data:{
                authorId:opts.input.authorId,
                title:opts.input.title,
                content:opts.input.content,
                published:opts.input.published,
                image:opts.input.image,
                updatedAt: new Date() // Add the updatedAt property
            }
        })
    }),
    getPostbyAuthor:publicProcedure.input(z.string()).query(async(opts)=>{
        return await prisma.post.findMany({
            where:{
                authorId:opts.input
            }
        })
    }),
    getLikesByUser:publicProcedure.input(z.string()).query(async(opts)=>{
        return await prisma.like.findMany({
            where:{
                userId:opts.input
            }
        })
    }),
    getPostsbyIdArray:publicProcedure.input(z.array(z.string())).query(async(opts)=>{
        return await prisma.post.findMany({
            where:{
                id:{
                    in:opts.input
                }
            }
        })
    }),
    getUser:publicProcedure.input(z.string()).query(async(opts)=>{
        return await prisma.user.findUnique({
            where:{
                id:opts.input
            },
            select:{
                id:true,
                name:true,
                username:true,
                image:true,
                Profile:true
            }
        })
    }),
    updateUserProfile:publicProcedure.input(z.object({
        id:z.string(),
        bio:z.string().optional(),
        image:z.string().optional()
    })).mutation(async(opts)=>{
        let updateData={};
        if (opts.input.bio) {
            updateData = {
                    bio: opts.input.bio
                
            };
        }
        if (opts.input.image) {
            updateData= {
                    image: opts.input.image
            };
        }
        return await prisma.profile.upsert({
            where:{
                userId:opts.input.id
            },
            update:updateData,
            create:{
                userId:opts.input.id,
                bio:opts.input.bio,
                image:opts.input.image
            }
        })
    }),
    getProfile:publicProcedure.input(z.string()).query(async(opts)=>{
        return await prisma.profile.findUnique({
            where:{
                userId:opts.input
            }
        })
    }),
    getUserByArrayIds:publicProcedure.input(z.array(z.string())).query(async(opts)=>{
        return await prisma.user.findMany({
            where:{
                id:{
                    in:opts.input
                },
            },
                select:{
                    id:true,
                    name:true,
                    username:true,
                    image:true,
                    Profile:true
                }
            })
    }),


});
    


export type AppRouter = typeof appRouter;