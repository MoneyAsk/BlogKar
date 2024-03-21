// export { default } from "next-auth/middleware"
// export const config = { matcher: ["/addPost","/me","/me/edit"] }

import { withAuth } from "next-auth/middleware"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        const token = req.nextauth?.token;
        const isOnLoginPanel = req.nextUrl?.pathname.startsWith("/login");
        const isOnSignupPanel = req.nextUrl?.pathname.startsWith("/signup");
        const isOnaddPost = req.nextUrl?.pathname.startsWith("/addPost");
        const isOnme = req.nextUrl?.pathname.startsWith("/me");
        const isOnmeedit = req.nextUrl?.pathname.startsWith("/me/edit");

        if(token && (isOnLoginPanel || isOnSignupPanel)){
            return Response.redirect(new URL("/blog", req.nextUrl));          
        }
        if(!token && (isOnaddPost || isOnme || isOnmeedit)){
            return Response.redirect(new URL("/login", req.nextUrl));
        }


    },
    {
        callbacks: {
            authorized:({ token, req }) => {
              return true;
            }, // Add a comma here
        },
    }
)

// export const config = { matcher: ["/addPost","/me","/me/edit"] }
export const config = {
        matcher: ["/((?!api|static|.*\\..*|_next).*)"],
    };
  

