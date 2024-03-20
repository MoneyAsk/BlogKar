import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Roboto } from "next/font/google";
import Provider from "@/_trpc/Provider";
import SessProvider from "@/lib/Provider";
import { getServerSession } from "next-auth";
import { NextuiProviders } from "@/components/NextuiProvider";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { EdgeStoreProvider } from "@/lib/edgestore";
// const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ style: "normal", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlogKar",
  description: "Unlease your thoughts and ideas to the world",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const session = await getServerSession(authOptions);
    // console.log("Session from layout");
    // console.log(session);
  return (
    <html lang="en">
        <SessProvider session={session}>
      <body className={roboto.className}>
      <link rel="icon" href="/icons8-blog-16.png" sizes="any" />
        <Provider>
          <EdgeStoreProvider>
          {children}
          </EdgeStoreProvider>
          </Provider>
      </body>
        </SessProvider>
    </html>
  );
}
