import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials"
import {login} from "../../../../lib/action"
// import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/db";

// interface User {
//   username: string;
//   email: string;
//   id: string;
//   name: string;
// }

export const authOptions:NextAuthOptions ={
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID || "",
        clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      }),
    CredentialsProvider({
      credentials: {},

      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return { username: user.username, email: user.email, id: user.id, name: user.name };
        } catch (error) {
          return null;
        }
      }

    }),
  ],
  callbacks:{
    async jwt(params) {
      // console.log(params);
      if(params.user){
        params.token = { ...params.token, user:{...params.user}};
      }
      // console.log('Token');
      // console.log(params.token);
      return params.token;
    },
    async session(params){
      if (params.token){
        params.session= { ...params.session, ...params.token };

      }
      // console.log('Session from route');
      // console.log(params.session);
      return params.session;
    },
    async signIn(params) {
      console.log('Sign in');
      console.log(params);
      return true;
      // console.log('Sign in');
      // console.log(user
      
    },
  },
  
  
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  
};

export const handler=NextAuth(authOptions);

export { handler as GET, handler as POST };


