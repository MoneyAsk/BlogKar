import {z} from "zod";
import {router,publicProcedure} from "../trpc";
import prisma from "@/db";
import bcrypt from "bcrypt";


const userSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  });

export const appRouter = router({
    getPosts: publicProcedure.query(async()=>{
        return await prisma.post.findMany();
    }),
    getAuthorById:publicProcedure.input(z.string()).query(async(opts)=>{
        return await prisma.user.findUnique({
            where:{
                id:opts.input
            }
        });
    }),
    createUser:publicProcedure.input(userSchema)
        .mutation(async(opts)=>{
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
            }
        })
    }),

});
    


export type AppRouter = typeof appRouter;